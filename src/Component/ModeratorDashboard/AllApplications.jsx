import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmModal from './ConfirmModal';

export default function AllApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsApp, setDetailsApp] = useState(null);
  const [feedbackApp, setFeedbackApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingCancelApp, setPendingCancelApp] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDegree, setFilterDegree] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://scholarcore.vercel.app/applied-scholarships');
      const data = await res.json();
      setApplications(data);
    } catch {
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackLoading(true);
    try {
      const res = await fetch(`https://scholarcore.vercel.app/applied-scholarships/${feedbackApp._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: feedbackText }),
      });
      if (res.ok) {
        toast.success('Feedback submitted!');
        setFeedbackApp(null);
        setFeedbackText('');
        fetchApplications();
      } else {
        toast.error('Failed to submit feedback');
      }
    } catch {
      toast.error('Failed to submit feedback');
    } finally {
      setFeedbackLoading(false);
    }
  };

  const handleCancel = (app) => {
    setPendingCancelApp(app);
    setConfirmOpen(true);
  };

  const confirmCancel = async () => {
    if (!pendingCancelApp) return;
    const res = await fetch(`https://scholarcore.vercel.app/applied-scholarships/${pendingCancelApp._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'rejected' }),
    });
    if (res.ok) {
      setApplications(applications.map(a =>
        a._id === pendingCancelApp._id ? { ...a, status: 'rejected' } : a
      ));
      toast.success('Application cancelled!');
    } else {
      toast.error('Failed to cancel application');
    }
    setConfirmOpen(false);
    setPendingCancelApp(null);
  };

  // Filtering and sorting logic
  let filtered = applications.filter(app => {
    return (
      (!filterStatus || app.status === filterStatus) &&
      (!filterDegree || app.degree === filterDegree) &&
      (!filterCategory || app.scholarshipCategory === filterCategory)
    );
  });

  if (sortBy) {
    filtered = [...filtered].sort((a, b) => {
      let aVal = a[sortBy] || '';
      let bVal = b[sortBy] || '';
      if (sortBy === 'appliedAt' && aVal && bVal) {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return (
    <div className="px-2 sm:px-4 md:px-8">
      <h2 className="text-xl font-bold mb-4">All Applied Scholarships</h2>
      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <div>
          <label className="mr-2 font-medium">Status:</label>
          <select className="input input-bordered" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="mr-2 font-medium">Degree:</label>
          <select className="input input-bordered" value={filterDegree} onChange={e => setFilterDegree(e.target.value)}>
            <option value="">All</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>
     
        <div>
          <label className="mr-2 font-medium">Sort By:</label>
          <select className="input input-bordered" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="universityName">University Name</option>
            <option value="degree">Degree</option>
            <option value="appliedAt">Application Date</option>
          </select>
         
        </div>
        <button className="btn btn-xs ml-2" onClick={() => { setFilterStatus(''); setFilterDegree(''); setFilterCategory(''); setSortBy(''); setSortOrder('asc'); }}>Reset</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-amber-100 text-center">
                <th className="p-2">University Name</th>
                <th className="p-2">Degree</th>
                <th className="p-2">Scholarship Category</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(app => (
                <tr key={app._id} className="text-center">
                  <td className="p-2 align-middle">{app.universityName}</td>
                  <td className="p-2 align-middle">{app.degree}</td>
                  <td className="p-2 align-middle">{app.scholarshipCategory}</td>
                  <td className="p-2 align-middle">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-2 align-middle flex gap-2 justify-center">
                    <button className="btn btn-xs bg-blue-100 text-blue-700" onClick={() => setDetailsApp(app)}>Details</button>
                    <button className="btn btn-xs bg-green-100 text-green-700" onClick={() => { setFeedbackApp(app); setFeedbackText(app.feedback || ''); }}>Feedback</button>
                    <button className="btn btn-xs bg-red-100 text-red-700" onClick={() => handleCancel(app)}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Details Modal */}
      {detailsApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative p-0">
            <button className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-700 transition" onClick={() => setDetailsApp(null)}>&times;</button>
            <div className="px-8 pt-8 pb-4 max-h-[90vh] overflow-y-auto rounded-2xl">
              <h2 className="text-3xl font-bold mb-6 text-center">Application Details</h2>
              {detailsApp.userPhoto && (
                <div className="flex justify-center mb-4">
                  <img src={detailsApp.userPhoto} alt="User" className="w-20 h-20 rounded-full border-4 border-amber-200 shadow" />
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-gray-700">User Name:</span>
                  <div className="text-gray-800 mb-2">{detailsApp.userName || '-'}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">User Email:</span>
                  <div className="text-gray-800 mb-2">{detailsApp.userEmail || '-'}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">University Name:</span>
                  <div className="text-gray-800 mb-2">{detailsApp.universityName || '-'}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Degree:</span>
                  <div className="text-gray-800 mb-2">{detailsApp.degree || '-'}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Scholarship Category:</span>
                  <div className="text-gray-800 mb-2">{detailsApp.scholarshipCategory || '-'}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Subject Category:</span>
                  <div className="text-gray-800 mb-2">{detailsApp.subjectCategory || '-'}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Status:</span>
                  <div className="text-gray-800 mb-2">{detailsApp.status || '-'}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Phone:</span>
                  <div className="text-gray-800 mb-2">{detailsApp.phone || '-'}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Address:</span>
                  <div className="text-gray-800 mb-2">{detailsApp.address || '-'}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Gender:</span>
                  <div className="text-gray-800 mb-2">{detailsApp.gender || '-'}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">SSC:</span>
                  <div className="text-gray-800 mb-2">{detailsApp.ssc || '-'}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">HSC:</span>
                  <div className="text-gray-800 mb-2">{detailsApp.hsc || '-'}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Study Gap:</span>
                  <div className="text-gray-800 mb-2">{detailsApp.studyGap || '-'}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Feedback:</span>
                  <div className="text-gray-800 mb-2">{detailsApp.feedback || '-'}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Applied At:</span>
                  <div className="text-gray-800 mb-2">{detailsApp.appliedAt ? new Date(detailsApp.appliedAt).toLocaleDateString() : '-'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Feedback Modal */}
      {feedbackApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-xl" onClick={() => setFeedbackApp(null)}>&times;</button>
            <h2 className="text-2xl font-bold mb-4">Give Feedback</h2>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <textarea
                className="input input-bordered w-full h-24"
                value={feedbackText}
                onChange={e => setFeedbackText(e.target.value)}
                placeholder="Enter feedback here..."
                required
              />
              <button type="submit" className="btn bg-amber-400 text-white w-full" disabled={feedbackLoading}>
                {feedbackLoading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </div>
        </div>
      )}
      <ConfirmModal
        open={confirmOpen}
        onConfirm={confirmCancel}
        onCancel={() => { setConfirmOpen(false); setPendingCancelApp(null); }}
        message="Are you sure you want to cancel this application?"
      />
    </div>
  );
} 