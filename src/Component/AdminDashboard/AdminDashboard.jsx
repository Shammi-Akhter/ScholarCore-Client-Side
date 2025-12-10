import React, { useContext, useState, useEffect } from 'react';
import { User, Plus, LayoutDashboard, Users, Star, FileText, BarChart3 } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import AdminProfile from './AdminProfile';
import AddScholarship from './AddScholarship';
import ManageScholarships from './ManageScholarships';
import ManageApplications from './ManageApplications';
import ManageUsers from './ManageUsers';
import ManageReviews from './ManageReviews';
import Analytics from './Analytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const tabs = [
  { key: 'profile', label: 'Admin Profile', icon: User },
  { key: 'add', label: 'Add Scholarship', icon: Plus },
  { key: 'scholarships', label: 'Manage Scholarships', icon: LayoutDashboard },
  { key: 'users', label: 'Manage Users', icon: Users },
  { key: 'reviews', label: 'Manage Reviews', icon: Star },
  { key: 'applications', label: 'Manage Applications', icon: FileText },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
];

export default function AdminDashboard() {
  const { role } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [activeTab]);

  if (role !== 'admin') {
    return <div className="text-center text-red-500 font-bold mt-10">Access Denied: Admin Only</div>;
  }

  return (
    <div className="px-2 sm:px-4 md:px-8 py-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-black">Admin Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8">
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className="data-[state=active]:bg-[#FEE685] data-[state=active]:text-black"
            >
              <tab.icon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile">
          <AdminProfile />
        </TabsContent>
        <TabsContent value="add">
          <AddScholarship />
        </TabsContent>
        <TabsContent value="scholarships">
          <ManageScholarships />
        </TabsContent>
        <TabsContent value="applications">
          <ManageApplications />
        </TabsContent>
        <TabsContent value="users">
          <ManageUsers />
        </TabsContent>
        <TabsContent value="reviews">
          <ManageReviews />
        </TabsContent>
        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}