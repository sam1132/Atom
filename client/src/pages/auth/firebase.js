import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB55egJ6BhP0b4dW3R-IAkJP-fgOpV9n-U",
  authDomain: "atom-quarks.firebaseapp.com",
  projectId: "atom-quarks",
  storageBucket: "atom-quarks.firebasestorage.app",
  messagingSenderId: "191704227673",
  appId: "1:191704227673:web:7304e5986f250dbd4e7648",
  measurementId: "G-ZC812MQYRH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
