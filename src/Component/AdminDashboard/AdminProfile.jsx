import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function AdminProfile() {
  const { user, role } = useContext(AuthContext);
  if (!user) return <div>Loading...</div>;
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
      {user.photoURL && <img src={user.photoURL} alt="User" className="w-24 h-24 rounded-full mb-4 border-4 border-amber-200" />}
      <h2 className="text-2xl font-bold mb-2">{user.displayName || 'Admin'}</h2>
      <p className="text-gray-600 mb-2">{user.email}</p>
      {role === 'admin' && <span className="px-3 py-1 bg-amber-400 text-white rounded-full font-semibold">Admin</span>}
    </div>
  );
} 