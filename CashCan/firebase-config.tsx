import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//  Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_82lvzme5ceQLr2YDOeqZrUEy2a2XeWI",
  authDomain: "team-2-cashcan.firebaseapp.com",
  projectId: "team-2-cashcan",
  storageBucket: "team-2-cashcan.appspot.com",
  messagingSenderId: "747880833486",
  appId: "1:747880833486:web:2b3b898185cbe7e9998b9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
