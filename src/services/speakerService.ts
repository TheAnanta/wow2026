// src/services/speakerService.ts

import { getBearerToken } from './firebase';

const API_BASE_URL = 'https://now-in-google-backend-1010379975924.asia-south1.run.app/nowingoogle-backend/api';

const DRAFT_KEY = 'wow2026_speaker_draft';
const TAGS_KEY = 'wow2026_speaker_tags';

export interface SpeakerFormData {
  sessionTitle: string;
  description: string;
  sessionFormat: string;
  level: string;
  additionalNotes: string;
  isGDE: string;
  takenBefore: string;
  experienceRef: string;
  firstName: string;
  lastName: string;
  gdgOnCampus: string;
  gitam: string;
  tagline: string;
  email: string;
  biography: string;
  socialX: string;
  socialLinkedIn: string;
  socialInstagram: string;
  socialWebsite: string;
  coSpeakers: string[];
  agreed: boolean;
}

/**
 * Save form draft to localStorage for auto-save
 */
export const saveDraft = (formData: SpeakerFormData, tags: string[]) => {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
    localStorage.setItem(TAGS_KEY, JSON.stringify(tags));
  } catch (err) {
    console.warn('Failed to save speaker draft:', err);
  }
};

/**
 * Load saved draft from localStorage
 */
export const loadDraft = (): { formData: SpeakerFormData | null; tags: string[] } => {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    const tagsRaw = localStorage.getItem(TAGS_KEY);
    return {
      formData: raw ? JSON.parse(raw) : null,
      tags: tagsRaw ? JSON.parse(tagsRaw) : [],
    };
  } catch (err) {
    console.warn('Failed to load speaker draft:', err);
    return { formData: null, tags: [] };
  }
};

/**
 * Clear saved draft after successful submission
 */
export const clearDraft = () => {
  try {
    localStorage.removeItem(DRAFT_KEY);
    localStorage.removeItem(TAGS_KEY);
  } catch (err) {
    console.warn('Failed to clear speaker draft:', err);
  }
};

/**
 * Submit speaker application to backend API
 */
export const submitSpeakerApplication = async (
  formData: SpeakerFormData,
  tags: string[]
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const token = await getBearerToken();
    
    const apiPayload = {
      session_title: formData.sessionTitle,
      description: formData.description,
      session_format: formData.sessionFormat,
      level: formData.level,
      tags,
      additional_notes: formData.additionalNotes,
      is_gde: formData.isGDE === 'Yes',
      taken_before: formData.takenBefore === 'Yes',
      experience_ref: formData.experienceRef,
      first_name: formData.firstName,
      last_name: formData.lastName,
      tagline: formData.tagline,
      email: formData.email,
      biography: formData.biography,
      social_x: formData.socialX,
      social_linkedin: formData.socialLinkedIn,
      social_instagram: formData.socialInstagram,
      social_website: formData.socialWebsite,
      co_speakers: formData.coSpeakers.filter(e => e.trim()),
    };

    console.log('Submitting speaker application:', apiPayload);

    const response = await fetch(`${API_BASE_URL}/speaker/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(apiPayload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Speaker API Error:', result);
      return { success: false, error: result.message || 'Submission failed' };
    }

    // Clear draft on successful submission
    clearDraft();

    return { success: true, data: result.data };
  } catch (error: any) {
    console.error('Speaker submission error:', error);
    return { success: false, error: error.message || 'Network error' };
  }
};

/**
 * Update an existing CFP
 */
export const updateSpeakerApplication = async (
  cfpId: number,
  formData: SpeakerFormData,
  tags: string[]
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const token = await getBearerToken();
    if (!token) return { success: false, error: 'Unauthorized' };

    const apiPayload = {
      session_title: formData.sessionTitle,
      description: formData.description,
      session_format: formData.sessionFormat,
      level: formData.level,
      tags,
      additional_notes: formData.additionalNotes,
      experience_ref: formData.experienceRef,
    };

    const response = await fetch(`${API_BASE_URL}/speaker/cfp/${cfpId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(apiPayload),
    });

    const result = await response.json();
    if (!response.ok) return { success: false, error: result.message || 'Update failed' };

    return { success: true, data: result.data };
  } catch (error: any) {
    console.error('Update CFP error:', error);
    return { success: false, error: error.message || 'Network error' };
  }
};

/**
 * Fetch the current user's past submissions and profile
 */
export const fetchMySubmissions = async (): Promise<{ user: any; submissions: any[] } | null> => {
  try {
    const token = await getBearerToken();
    if (!token) return null;

    const response = await fetch(`${API_BASE_URL}/speaker/my-submissions`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) return null;
    const result = await response.json();
    return result.data || { user: null, submissions: [] };
  } catch (err) {
    console.error('Fetch submissions error:', err);
    return null;
  }
};
