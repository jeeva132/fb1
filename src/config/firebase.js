import { initializeApp } from "firebase/app";
import { getFirestore, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAAar8N4k9Ht1keSdTSgNJxr8yESuS0-I",
  authDomain: "facebook-988fd.firebaseapp.com",
  projectId: "facebook-988fd",
  storageBucket: "facebook-988fd.appspot.com",
  messagingSenderId: "1005465075026",
  appId: "1:1005465075026:web:49f47bb4108fa5145a0e8b",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export { doc };
