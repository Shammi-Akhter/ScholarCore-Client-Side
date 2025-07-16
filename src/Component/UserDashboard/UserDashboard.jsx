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
    <div className="px-2 sm:px-4 md:px-8 flex flex-col md:flex-row min-h-screen gap-6">
     
      <aside className="w-full md:w-64 bg-gray-100 p-6 border-r md:border-b-0 border-b md:rounded-none rounded-b-xl">
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
    
      <main className="flex-1 p-4 md:p-8">
        {tab === 'profile' && <MyProfile />}
        {tab === 'applications' && <MyApplications />}
        {tab === 'reviews' && <MyReviews />}
      </main>
    </div>
  );
} 