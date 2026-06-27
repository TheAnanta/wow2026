// src/services/registrationStubs.ts

export interface RegistrationProfile {
  displayName: string;
  pronoun: string;
  cityTown?: string;
  role?: string;
  organization: string;
  phoneNumber: string;
}

export interface RegistrationData extends RegistrationProfile {
  interests: string[];
  termsAgreed: boolean;
  agreeToTerms: boolean;
  marketingConsent: boolean;
  newsletterConsent: boolean;
  fcm_token?: string;
  intended_tier_id?: string;
}

import { getBearerToken, auth } from './firebase';

const API_BASE_URL = 'https://now-in-google-backend-1010379975924.asia-south1.run.app/nowingoogle-backend/api';

export const validateProfile = (data: Partial<RegistrationProfile>): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  if (!data.displayName?.trim()) errors.displayName = 'Display name is required.';
  if (!data.pronoun?.trim()) errors.pronoun = 'Pronoun is required.';
  if (!data.organization?.trim()) errors.organization = 'University/School name is required.';

  // 10-digit Indian mobile number validation
  if (!data.phoneNumber?.trim()) {
    errors.phoneNumber = 'Phone number is required.';
  } else if (!/^\d{10}$/.test(data.phoneNumber)) {
    errors.phoneNumber = 'Please enter a valid 10-digit mobile number.';
  }

  return errors;
};

/**
 * Real Registration Integration with Dynamic Firebase Token
 */
export const submitRegistration = async (data: RegistrationData): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const token = await getBearerToken();
    const user = auth.currentUser;
    if (!token || !user) return { success: false, error: 'User is not authenticated with Firebase' };

    // Robust Name Splitting or Fallback to Firebase Data
    const fullName = data.displayName || user.displayName || 'User';
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || 'User';
    const lastName = nameParts.slice(1).join(' ') || '.'; // Fallback '.' if empty

    // Map UI Data to API Model using Real Firebase Context
    const apiPayload = {
      username: (data.displayName || user.displayName || 'user').toLowerCase().replace(/\s+/g, '_'),
      first_name: firstName,
      last_name: lastName,
      email: user.email || '',
      phone: data.phoneNumber ? (data.phoneNumber.startsWith('+91') ? data.phoneNumber : `+91${data.phoneNumber}`) : '',
      gender: data.pronoun.toUpperCase().replace(/\s+/g, '_').replace(/\//g, '_'),
      bio: 'Developer at I/O 2026', // Improved default
      designation: data.role || 'Student',
      organization: data.organization || '',
      city: data.cityTown || '',
      interests: data.interests || [],
      profile_url: user.photoURL || '',
      fcm_token: data.fcm_token,
      intended_tier_id: data.intended_tier_id || null,
    };

    console.log('Sending Registration to API:', apiPayload);

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(apiPayload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error Response:', errorData);

      // If user already exists, treat as success so we don't get stuck in a loop
      if (errorData.message?.toLowerCase().includes('already exists')) {
        return { success: true, data: errorData.data || errorData };
      }

      return { success: false, error: errorData.message || 'Registration failed' };
    }

    const result = await response.json();
    return { success: true, data: result };

  } catch (error: any) {
    console.error('Registration Catch Error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Fetch profile using the dynamic Firebase Token
 */
export const fetchCurrentUser = async () => {
  try {
    const token = await getBearerToken();
    if (!token) return null;

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    //return {isError: false, status: 200};

    if (response.status === 404) return null; // Explicitly unregistered

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Fetch Current User Error:', response.status, errorData);
      return { isError: true, status: response.status }; // Indicate a server error
    }

    const result = await response.json();
    return result.data || result; // Handle potential nesting
  } catch (err) {
    console.error('Fetch Current User Cache Error:', err);
    return { isError: true };
  }
};

/**
 * Update profile using the dynamic Firebase Token
 */
export const updateProfile = async (data: any) => {
  try {
    const token = await getBearerToken();
    if (!token) throw new Error('Unauthenticated');

    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update profile');
    }

    const result = await response.json();
    return { success: true, data: result.data || result };
  } catch (err: any) {
    console.error('Update Profile Error:', err);
    return { success: false, error: err.message };
  }
};

/**
 * Commerce APIs
 */

export const fetchTicketTiers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/commerce/tiers`);
    if (!response.ok) return [];
    const result = await response.json();
    return result.data || [];
  } catch (err) {
    console.error('Fetch Tiers Error:', err);
    return [];
  }
};

export const validateCoupon = async (code: string, tierId?: string) => {
  try {
    const token = await getBearerToken();
    const response = await fetch(`${API_BASE_URL}/commerce/validate-coupon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ code, tier_id: tierId })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Invalid coupon');
    return result.data;
  } catch (err: any) {
    console.error('Validate Coupon Error:', err);
    throw err;
  }
};

export const initiateCheckout = async (tierId: string, couponCode?: string, isSettlement?: boolean, hasTshirt?: boolean) => {
  const token = await getBearerToken();
  if (!token) throw new Error('Unauthenticated');

  const response = await fetch(`${API_BASE_URL}/commerce/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ 
      tier_id: tierId, 
      coupon_code: couponCode, 
      is_settlement: isSettlement,
      has_tshirt: hasTshirt 
    })
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Checkout failed');
  return result.data;
};

export const verifyPayment = async (paymentData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {
  const token = await getBearerToken();
  if (!token) throw new Error('Unauthenticated');

  const response = await fetch(`${API_BASE_URL}/commerce/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(paymentData)
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Verification failed');
  return result.data;
};

export const fetchMyTickets = async () => {
  try {
    const token = await getBearerToken();
    if (!token) return [];

    const response = await fetch(`${API_BASE_URL}/commerce/my-tickets`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) return [];
    const result = await response.json();
    return result.data || [];
  } catch (err) {
    console.error('Fetch My Tickets Error:', err);
    return [];
  }
};

export const generateGroupCoupons = async (orderId: string, emails: string[]) => {
  try {
    const token = await getBearerToken();
    if (!token) throw new Error('Unauthenticated');

    const response = await fetch(`${API_BASE_URL}/commerce/generate-group-coupons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ order_id: orderId, emails })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to generate coupons');
    return result.data;
  } catch (err: any) {
    console.error('Generate Group Coupons Error:', err);
    throw err;
  }
};

/**
 * FCM Token APIs
 */
export const patchFCMToken = async (token: string, action: 'ADD' | 'REMOVE' = 'ADD') => {
  try {
    const bearerToken = await getBearerToken();
    if (!bearerToken) return { success: false, error: 'User is not authenticated' };

    const response = await fetch(`${API_BASE_URL}/fcm-token`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`
      },
      body: JSON.stringify({ token, action })
    });

    const result = await response.json();
    return { success: response.ok, data: result };
  } catch (error: any) {
    console.error('FCM Token Patch Error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Referral APIs
 */

export const fetchMyReferrals = async () => {
  try {
    const token = await getBearerToken();
    if (!token) return null;

    const response = await fetch(`${API_BASE_URL}/referral/my-referrals`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) return null;
    const result = await response.json();
    return result.data;
  } catch (err) {
    console.error('Fetch Referrals Error:', err);
    return null;
  }
};

export const applyReferralCode = async (referralCode: string) => {
  const token = await getBearerToken();
  if (!token) throw new Error('Unauthenticated');

  const response = await fetch(`${API_BASE_URL}/referral/apply-referral`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ referral_code: referralCode })
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Failed to apply referral code');
  return result;
};

export const fetchUserBadges = async (): Promise<any[]> => {
  try {
    const token = await getBearerToken();
    if (!token) return [];

    const response = await fetch(`${API_BASE_URL}/gamification/user-badges`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) return [];
    const result = await response.json();
    return result.data || [];
  } catch (err) {
    console.error('Fetch User Badges Error:', err);
    return [];
  }
};

export const fetchMyCoupons = async (): Promise<any[]> => {
  try {
    const token = await getBearerToken();
    if (!token) return [];

    const response = await fetch(`${API_BASE_URL}/commerce/my-coupons`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) return [];
    const result = await response.json();
    return result.data || [];
  } catch (err) {
    console.error('Fetch My Coupons Error:', err);
    return [];
  }
};


