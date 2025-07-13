import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import MyProfile from './MyProfile';
import ManageScholarships from './ManageScholarships';
import AllReviews from './AllReviews';
import AllApplications from './AllApplications';
import AddScholarship from './AddScholarship';

const tabs = [
  { key: 'profile', label: 'My Profile' },
  { key: 'scholarships', label: 'Manage Scholarships' },
  { key: 'reviews', label: 'All Reviews' },
  { key: 'applications', label: 'All Applied Scholarships' },
  { key: 'add', label: 'Add Scholarship' },
];

export default function ModeratorDashboard() {
  const { role } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');

  if (role !== 'moderator') {
    return <div className="text-center text-red-500 font-bold mt-10">Access Denied: Moderator Only</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 border-r">
        <h2 className="text-xl font-bold mb-6">Moderator Dashboard</h2>
        <nav className="flex flex-col gap-3">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`text-left px-4 py-2 rounded-lg font-medium ${activeTab === tab.key ? 'bg-amber-400 text-white' : 'hover:bg-amber-100'}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === 'profile' && <MyProfile />}
        {activeTab === 'scholarships' && <ManageScholarships />}
        {activeTab === 'reviews' && <AllReviews />}
        {activeTab === 'applications' && <AllApplications />}
        {activeTab === 'add' && <AddScholarship />}
      </main>
    </div>
  );
} 