// src/services/registrationStubs.ts

export interface RegistrationProfile {
  displayName: string;
  pronoun?: string;
  cityTown: string;
  role: string;
}

export interface RegistrationData extends RegistrationProfile {
  interests: string[];
  termsAgreed: boolean;
  agreeToTerms: boolean;
  marketingConsent: boolean;
}

export const validateProfile = (data: Partial<RegistrationProfile>): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  if (!data.displayName) errors.displayName = 'Display name is required';
  if (!data.cityTown) errors.cityTown = 'City/town is required';
  if (!data.role) errors.role = 'Role or job title is required';
  return errors;
};

export const submitRegistration = async (formData: RegistrationData): Promise<{ success: boolean; message: string }> => {
  console.log('Submitting Registration:', formData);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate success
      resolve({ success: true, message: 'Successfully registered!' });
    }, 1500);
  });
};
