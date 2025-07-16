import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ReviewModal from './ReviewModal';
import EditApplicationModal from './EditApplicationModal';
import toast from 'react-hot-toast';
import ConfirmModal from '../ModeratorDashboard/ConfirmModal';

export default function MyApplications() {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingCancelId, setPendingCancelId] = useState(null);

  useEffect(() => {
    if (user?.uid) {
      fetch(`https://scholarcore.vercel.app/applied-scholarships?userId=${user.uid}`)
        .then(res => res.json())
        .then(data => setApplications(data));
    }
  }, [user]);

  const handleCancel = (appId) => {
    setPendingCancelId(appId);
    setConfirmOpen(true);
  };

  const confirmCancel = async () => {
    if (!pendingCancelId) return;
    const res = await fetch(`https://scholarcore.vercel.app/applied-scholarships/${pendingCancelId}`, { method: 'DELETE' });
    if (res.ok) {
      setApplications(applications.filter(app => app._id !== pendingCancelId));
      toast.success('Application cancelled');
    }
    setConfirmOpen(false);
    setPendingCancelId(null);
  };

 
  const fetchScholarshipDetails = async (scholarshipId) => {
    try {
      const res = await fetch(`https://scholarcore.vercel.app/scholarships/${scholarshipId}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  };

  return (
    <div className="overflow-x-auto">
      {applications.length === 0 ? (
        <div className="text-center text-gray-500 py-10 text-lg font-semibold">You have no applications yet.</div>
      ) : (
        <table className=" w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-amber-100 ">
              <th className="p-2">University Name</th>
              <th className="p-2">University Address</th>
              <th className="p-2">Feedback</th>
              <th className="p-2">Subject</th>
              <th className="p-2">Degree</th>
              <th className="p-2">Fees</th>
              <th className="p-2">Service Charge</th>
              <th className="p-2">Status</th>
              <th className="p-2">Applied At</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id} className="border-b">
                <td className="p-2 text-center">{app.universityName}</td>
                <td className="p-2 text-center">{app.location || '-'}</td>
                <td className="p-2">{app.feedback || '-'}</td>
                <td className="p-2 text-center">{app.subjectCategory}</td>
                <td className="p-2">{app.degree}</td>
                <td className="p-2 text-center">${app.applicationFees || '-'}</td>
                <td className="p-2 text-center">${app.serviceCharge || '-'}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-sm text-xs font-semibold ${
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    app.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    app.status === 'completed' ? 'bg-green-100 text-green-800' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {app.status || 'pending'}
                  </span>
                </td>
               
                <td className="p-2">{app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : '-'}</td>
                <td className="p-2 flex gap-2">
                  <button className="btn btn-xs bg-blue-100 text-blue-700" onClick={() => window.open(`/scholarship-details/${app.scholarshipId}`)}>Details</button>
                  <button
                    className="btn btn-xs bg-green-100 text-green-700"
                    onClick={() => {
                      const status = app.status ? app.status.trim().toLowerCase() : '';
                      if (status === 'pending') {
                        setSelectedApp(app);
                        setShowEditModal(true);
                      } else {
                        toast.error('Cannot edit: application is processing or completed.');
                      }
                    }}
                  >Edit</button>
                  <button className="btn btn-xs bg-red-100 text-red-700" onClick={() => handleCancel(app._id)}>Cancel</button>
                  <button className="btn btn-xs bg-amber-100 text-amber-700" onClick={async () => {
                    if (!app.scholarshipId) {
                      toast.error('This application is missing a scholarship ID and cannot be reviewed.');
                      return;
                    }
                    let appWithNames = app;
                    if (!app.scholarshipName || !app.universityName || !app.subjectCategory) {
                      const details = await fetchScholarshipDetails(app.scholarshipId);
                      if (details) {
                        appWithNames = {
                          ...app,
                          scholarshipName: details.scholarshipName || details.name || app.scholarshipName || '',
                          universityName: details.universityName || details.university || app.universityName || '',
                          subjectCategory: app.subjectCategory || details.subjectCategory || '',
                        };
                      }
                    }
                    setSelectedApp(appWithNames);
                    setShowReviewModal(true);
                  }}>Add Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showReviewModal && selectedApp && (
        <ReviewModal
          open={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          application={selectedApp}
        />
      )}
      {showEditModal && selectedApp && (
        <EditApplicationModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          application={selectedApp}
        />
      )}
      <ConfirmModal
        open={confirmOpen}
        onConfirm={confirmCancel}
        onCancel={() => { setConfirmOpen(false); setPendingCancelId(null); }}
        message="Are you sure you want to cancel this application?"
      />
    </div>
  );
} 