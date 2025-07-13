import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AllApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsApp, setDetailsApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/applied-scholarships');
      const data = await res.json();
      setApplications(data);
    } catch {
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Applied Scholarships</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-amber-100">
              <th className="p-2">University Name</th>
              <th className="p-2">Degree</th>
              <th className="p-2">Scholarship Category</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id}>
                <td className="p-2">{app.universityName}</td>
                <td className="p-2">{app.degree}</td>
                <td className="p-2">{app.scholarshipCategory}</td>
                <td className="p-2">{app.status}</td>
                <td className="p-2 flex gap-2">
                  <button className="btn btn-xs bg-blue-100 text-blue-700" onClick={() => setDetailsApp(app)}>Details</button>
                  <button className="btn btn-xs bg-green-100 text-green-700">Feedback</button>
                  <button className="btn btn-xs bg-red-100 text-red-700">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Details Modal */}
      {detailsApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
            <button className="absolute top-2 right-2 text-xl" onClick={() => setDetailsApp(null)}>&times;</button>
            <h2 className="text-2xl font-bold mb-4">Application Details</h2>
            <div className="space-y-2 text-sm">
              {Object.entries(detailsApp).map(([key, value]) => (
                <div key={key} className="flex gap-2">
                  <span className="font-semibold w-48">{key}:</span>
                  <span>{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 