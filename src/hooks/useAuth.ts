import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  AuthError,
} from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  const clearError = () => setError(null);

  const handleAuthError = (error: AuthError) => {
    let errorMessage = "Authentication failed";
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "Email already in use";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email";
        break;
      case "auth/weak-password":
        errorMessage = "Password should be at least 6 characters";
        break;
      case "auth/user-not-found":
      case "auth/wrong-password":
        errorMessage = "Invalid email or password";
        break;
      default:
        errorMessage = error.message;
    }
    setError(errorMessage);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleAuthError(error as AuthError);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      // Add additional scopes if needed
      provider.addScope("profile");
      provider.addScope("email");
      await signInWithPopup(auth, provider);
    } catch (error) {
      handleAuthError(error as AuthError);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleAuthError(error as AuthError);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Failed to sign out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    clearError,
    login,
    loginWithGoogle,
    register,
    logout, // Make sure this is included
  };
};
