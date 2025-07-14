import React, { useState } from 'react';
import MyProfile from './MyProfile';
import MyApplications from './MyApplications';
import MyReviews from './MyReviews';

const TABS = [
  { key: 'profile', label: 'My Profile' },
  { key: 'applications', label: 'My Application' },
  { key: 'reviews', label: 'My Reviews' },
];

export default function UserDashboard() {
  const [tab, setTab] = useState('profile');

  return (
    <div className="flex min-h-screen">
      
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-6">User Dashboard</h2>
        <nav className="flex flex-col gap-3">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`text-left px-4 py-2 rounded-lg font-medium ${tab === t.key ? 'bg-amber-400 text-white' : 'hover:bg-amber-200'}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </aside>
    
      <main className="flex-1 p-2">
        {tab === 'profile' && <MyProfile />}
        {tab === 'applications' && <MyApplications />}
        {tab === 'reviews' && <MyReviews />}
      </main>
    </div>
  );
} 