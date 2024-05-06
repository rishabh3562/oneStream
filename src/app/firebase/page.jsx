"use client";
import { useAuth } from "@clerk/nextjs";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "clerk-example-xxxxx.firebaseapp.com",
  databaseURL: "https://clerk-example-xxxxx-default-xxxx.firebaseio.com",
  projectId: "clerk-test-xxxx",
  storageBucket: "clerk-test-xxxx.appspot.com",
  messagingSenderId: "012345678910",
  appId: "1:012345678:web:abcdef123456hijklm",
  measurementId: "G-ABC123DEF",
};

// Connect to your Firebase app
const app = initializeApp(firebaseConfig);
// Connect to your Firestore database
const db = getFirestore(app);
// Connect to Firebase auth
const auth = getAuth(app);

// Remove this if you do not have Firestore set up
// for your Firebase app
const getFirestoreData = async () => {
  const docRef = doc(db, "example", "example-document");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

export default function FirebaseUI() {
  const { getToken } = useAuth();
  const signInWithClerk = async () => {
    console.log("Sign in with clerk");
    const token = await getToken({ template: "integration_firebase" });
    const userCredentials = await signInWithCustomToken(auth, token || "");
     // The userCredentials.user object can call the methods of
     // the Firebase platform as an authenticated user.
    console.log("User:", userCredentials.user);
  };

  return (
    <main style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      <button onClick={signInWithClerk}>Sign in</button>
      <button onClick={getFirestoreData}>Get document</button>
    </main>
  );
}