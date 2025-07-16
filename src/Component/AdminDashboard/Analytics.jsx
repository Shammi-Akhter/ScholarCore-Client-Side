import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export default function Analytics() {
  const [stats, setStats] = useState({ users: 0, scholarships: 0, reviews: 0, applications: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const [usersRes, scholarshipsRes, reviewsRes, applicationsRes] = await Promise.all([
          fetch('https://scholarcore.vercel.app/users'),
          fetch('https://scholarcore.vercel.app/scholarships'),
          fetch('https://scholarcore.vercel.app/reviews'),
          fetch('https://scholarcore.vercel.app/applied-scholarships'),
        ]);
        const users = await usersRes.json();
        const scholarships = await scholarshipsRes.json();
        const reviews = await reviewsRes.json();
        const applications = await applicationsRes.json();
        setStats({
          users: Array.isArray(users) ? users.length : 0,
          scholarships: Array.isArray(scholarships) ? scholarships.length : 0,
          reviews: Array.isArray(reviews) ? reviews.length : 0,
          applications: Array.isArray(applications) ? applications.length : 0,
        });
      } catch {
        setStats({ users: 0, scholarships: 0, reviews: 0, applications: 0 });
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const chartData = [
    { name: 'Users', value: stats.users },
    { name: 'Scholarships', value: stats.scholarships },
    { name: 'Reviews', value: stats.reviews },
    { name: 'Applications', value: stats.applications },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Analytics Overview</h2>
      {loading ? (
        <div>Loading analytics...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-4xl font-bold text-amber-500">{stats.users}</span>
              <span className="mt-2 text-lg font-medium text-gray-700">Total Users</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-4xl font-bold text-blue-500">{stats.scholarships}</span>
              <span className="mt-2 text-lg font-medium text-gray-700">Total Scholarships</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-4xl font-bold text-green-500">{stats.reviews}</span>
              <span className="mt-2 text-lg font-medium text-gray-700">Total Reviews</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-4xl font-bold text-purple-500">{stats.applications}</span>
              <span className="mt-2 text-lg font-medium text-gray-700">Total Applications</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-8 flex items-center justify-center min-h-[300px]">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#f59e42" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
} 