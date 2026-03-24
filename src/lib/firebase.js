/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
import {
  setPersistence,
  signInWithPopup,
  browserLocalPersistence,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyCjVYUXWpzZ237nGgMEC2Qb2G61tYjSOLY",
  authDomain: "wonder-of-wonders-2026.firebaseapp.com",
  projectId: "wonder-of-wonders-2026",
  storageBucket: "wonder-of-wonders-2026.firebasestorage.app",
  messagingSenderId: "1065450620167",
  appId: "1:1065450620167:web:48e8ffefd5ede78b7031a2",
  measurementId: "G-YVLFWJQSR1",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.useDeviceLanguage();
(async () => {
  await setPersistence(auth, browserLocalPersistence);
})();
function signInWithGoogleAsPopup(onSuccess, onFailure) {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential === null) {
        alert("Error signing in");
        return;
      }
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      onSuccess(user);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      onFailure(errorMessage);
      // ...
    });
}
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, storage, signInWithGoogleAsPopup };
