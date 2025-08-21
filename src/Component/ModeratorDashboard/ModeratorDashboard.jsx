import React, { useContext, useState, useEffect } from 'react';
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [activeTab]);

  if (role !== 'moderator') {
    return <div className="text-center text-red-500 font-bold mt-10">Access Denied: Moderator Only</div>;
  }

  return (
    <div className="px-2 sm:px-4 md:px-8 flex flex-col md:flex-row min-h-screen gap-6">
   
      <aside className="w-full md:w-64 bg-gray-100 p-6 border-r md:border-b-0 border-b md:rounded-none rounded-b-xl">
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
     
      <main className="flex-1 p-4 md:p-8">
        {activeTab === 'profile' && <MyProfile />}
        {activeTab === 'scholarships' && <ManageScholarships />}
        {activeTab === 'reviews' && <AllReviews />}
        {activeTab === 'applications' && <AllApplications />}
        {activeTab === 'add' && <AddScholarship />}
      </main>
    </div>
  );
} 