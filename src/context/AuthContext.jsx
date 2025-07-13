import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase.init';

export const AuthContext = createContext();

const fetchUserRole = async (email) => {
  try {
    const res = await fetch(`http://localhost:5000/users/role/${email}`);
    const data = await res.json();
    return data.role || 'user';
  } catch (err) {
    console.error('Role fetch error:', err);
    return 'user';
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const userRole = await fetchUserRole(currentUser.email);
        setRole(userRole);
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, role, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
