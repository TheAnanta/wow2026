// src/services/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAev__FPd2lcGleH9jR5HFbQ3TU46xTiOI",
  authDomain: "nowingdev.firebaseapp.com",
  projectId: "nowingdev",
  storageBucket: "nowingdev.firebasestorage.app",
  messagingSenderId: "1010379975924",
  appId: "1:1010379975924:web:157d29fcd02871991182a1",
  measurementId: "G-4VNC7HWMQX"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Analytics (Client-side only)
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  });
}

/**
 * Trigger Google Sign In and return the ID token
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();
    return { user: result.user, token };
  } catch (error) {
    console.error("Google Sign In Error:", error);
    throw error;
  }
};

/**
 * Get the current user's bearer token refreshingly
 */
export const getBearerToken = async (): Promise<string | null> => {
  // Wait for auth to initialize if needed
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      unsubscribe();
      if (user) {
        const token = await user.getIdToken(true);
        resolve(token);
      } else {
        resolve(null);
      }
    });
  });
};

export { auth, db };
