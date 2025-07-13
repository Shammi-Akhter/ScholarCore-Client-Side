import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AdminProfile from './AdminProfile';
import AddScholarship from './AddScholarship';
import ManageScholarships from './ManageScholarships';
import ManageApplications from './ManageApplications';
import ManageUsers from './ManageUsers';
import ManageReviews from './ManageReviews';

const tabs = [
  { key: 'profile', label: 'Admin Profile' },
  { key: 'add', label: 'Add Scholarship' },
  { key: 'scholarships', label: 'Manage Scholarship' },
  { key: 'applications', label: 'Manage Applied Application' },
  { key: 'users', label: 'Manage Users' },
  { key: 'reviews', label: 'Manage Review' },
];

export default function AdminDashboard() {
  const { role } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');

  if (role !== 'admin') {
    return <div className="text-center text-red-500 font-bold mt-10">Access Denied: Admin Only</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 border-r">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
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
        {activeTab === 'profile' && <AdminProfile />}
        {activeTab === 'add' && <AddScholarship />}
        {activeTab === 'scholarships' && <ManageScholarships />}
        {activeTab === 'applications' && <ManageApplications />}
        {activeTab === 'users' && <ManageUsers />}
        {activeTab === 'reviews' && <ManageReviews />}
      </main>
    </div>
  );
} 