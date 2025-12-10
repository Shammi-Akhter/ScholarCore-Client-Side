import React, { useState, useEffect, useContext } from 'react';
import { User, FileText, Star } from 'lucide-react';
import MyProfile from './MyProfile';
import MyApplications from './MyApplications';
import MyReviews from './MyReviews';
import { AuthContext } from '../../context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const TABS = [
  { key: 'profile', label: 'My Profile', icon: User },
  { key: 'applications', label: 'My Applications', icon: FileText },
  { key: 'reviews', label: 'My Reviews', icon: Star },
];

export default function UserDashboard() {
  const [tab, setTab] = useState('profile');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [tab]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-4xl font-bold mb-8 text-black">User Dashboard</h2>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-[#FEE685] data-[state=active]:text-black">
              <User className="w-4 h-4" />
              My Profile
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2 data-[state=active]:bg-[#FEE685] data-[state=active]:text-black">
              <FileText className="w-4 h-4" />
              My Applications
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2 data-[state=active]:bg-[#FEE685] data-[state=active]:text-black">
              <Star className="w-4 h-4" />
              My Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <MyProfile />
          </TabsContent>
          <TabsContent value="applications">
            <MyApplications />
          </TabsContent>
          <TabsContent value="reviews">
            <MyReviews />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}