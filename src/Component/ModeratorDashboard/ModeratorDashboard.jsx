import React, { useContext, useState, useEffect } from 'react';
import { User, FileText, Star, MessageSquare, Plus, LayoutDashboard } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import MyProfile from './MyProfile';
import ManageScholarships from './ManageScholarships';
import AllReviews from './AllReviews';
import AllApplications from './AllApplications';
import AddScholarship from './AddScholarship';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const tabs = [
  { key: 'profile', label: 'My Profile', icon: User },
  { key: 'scholarships', label: 'Manage Scholarships', icon: LayoutDashboard },
  { key: 'reviews', label: 'All Reviews', icon: Star },
  { key: 'applications', label: 'All Applications', icon: FileText },
  { key: 'add', label: 'Add Scholarship', icon: Plus },
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
    <div className="px-2 sm:px-4 md:px-8 py-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-black">Moderator Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
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
          <MyProfile />
        </TabsContent>
        <TabsContent value="scholarships">
          <ManageScholarships />
        </TabsContent>
        <TabsContent value="reviews">
          <AllReviews />
        </TabsContent>
        <TabsContent value="applications">
          <AllApplications />
        </TabsContent>
        <TabsContent value="add">
          <AddScholarship />
        </TabsContent>
      </Tabs>
    </div>
  );
}