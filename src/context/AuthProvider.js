import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

// custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      setLoading(false);
    });
    return unsubscribe;
  }, []);

  function signIn(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function Login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function accountSignOut() {
    return signOut(auth);
  }

  const value = {
    signIn,
    currentUser,
    Login,
    accountSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
