import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [backendUser, setBackendUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await sendUserToBackend(user);
  }

  async function login(email, password) {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await sendUserToBackend(user);
  }

  async function logout() {
    await signOut(auth);
  }

  async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
  }

  async function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleAuthProvider);
    await sendUserToBackend(result.user);
    return result.user;
  }

  async function githubSignIn() {
    const githubAuthProvider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, githubAuthProvider);
    await sendUserToBackend(result.user);
    return result.user;
  }

  async function sendUserToBackend(user) {
    const token = await user.getIdToken();
    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uid: user.uid, email: user.email }),
      });
      const payload = await res.json();
      console.log("↪ backend replied", res.status, payload);

      if (res.ok) {
        setBackendUser(payload);
      } else {
        if (res.status === 409 && payload.error?.includes("already exists")) {
          console.warn("User already exists, skipping...");
        } else {
          throw new Error(payload.error || "Unknown error from backend");
        }
      }
      return payload;
    } catch (error) {
      console.error("Failed to send user to backend:", error.message || error);
      throw error;
    }
  }
  const updateBackendUser = async (updatedUser) => {
    setBackendUser((prev)=>({
      ...prev,
      ...updatedUser,
    }));
  }
  const reauthenticate = async (password) => {
    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        password
      );
      await reauthenticateWithCredential(currentUser, credential);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const deleteUserAccount = async (password) => {
    try {
      await reauthenticate(password);
      await deleteUser(currentUser);
      const deleteRes = await fetch(
        `http://localhost:3000/api/users/${currentUser.uid}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${await currentUser.getIdToken()}`,
          },
        }
      );
      if (!deleteRes.ok) throw new Error("Failed to delete account");
      setCurrentUser(null);
      setBackendUser(null);
      return true;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await sendUserToBackend(user);
      }
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser, 
    // what is the current user in firebase it is not the backend user  it is not giving the 
    // mongo object id and other details and also it is not the upadted user
    backendUser,
    setBackendUser,
    updateBackendUser,
    signup,
    login,
    logout,
    resetPassword,
    googleSignIn,
    githubSignIn,
    reauthenticate,
    deleteUserAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
