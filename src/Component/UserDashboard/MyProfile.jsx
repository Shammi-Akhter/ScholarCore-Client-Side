import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function MyProfile() {
  const { user, role } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center gap-4">
      {user?.photoURL && <img src={user.photoURL} alt="User" className="w-24 h-24 rounded-full border-4 border-amber-200" />}
      <div className="text-xl font-bold">{user?.displayName}</div>
      <div className="text-gray-600">{user?.email}</div>
      {role && role !== 'user' && (
        <div className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-semibold">
          Role: {role}
        </div>
      )}
    </div>
  );
} 