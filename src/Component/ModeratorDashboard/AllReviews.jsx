import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmModal from './ConfirmModal';

export default function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://scholarcore.vercel.app/reviews'); 
      const data = await res.json();
      setReviews(data);
    } catch {
      toast.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    const res = await fetch(`https://scholarcore.vercel.app/reviews/${pendingDeleteId}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Review deleted');
      setReviews(reviews.filter(r => r._id !== pendingDeleteId));
    } else {
      toast.error('Delete failed');
    }
    setConfirmOpen(false);
    setPendingDeleteId(null);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Reviews</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map(r => (
            <div key={r._id} className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
              <div className="w-full flex flex-col items-center mb-2">
                <img src={r.userImage || 'https://i.pravatar.cc/100'} alt="Reviewer" className="w-16 h-16 rounded-full mb-2" />
              </div>
              <div className="mb-1 font-semibold">Name:<span className="font-normal"> {r.userName}</span></div>
              <div className="mb-1"><span className="font-semibold text-gray-700">University:</span> <span className="text-gray-700">{r.universityName}</span></div>
              <div className="mb-1"><span className="font-semibold text-gray-700">Subject Category:</span> <span className="text-gray-700">{r.subjectCategory || '-'}</span></div>
              <div className="mb-1"><span className="font-semibold text-yellow-600">Rating:</span> <span className="text-yellow-600 font-bold">{r.rating}</span></div>
              <div className="mb-1"><span className="font-semibold text-gray-700">Comment:</span> <span className="text-gray-700">{r.comment}</span></div>
              <div className="mb-2 text-xs text-gray-400">{r.reviewDate ? new Date(r.reviewDate).toLocaleDateString() : '-'}</div>
              <button className="btn btn-xs bg-red-100 text-red-700" onClick={() => handleDelete(r._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
      <ConfirmModal
        open={confirmOpen}
        onConfirm={confirmDelete}
        onCancel={() => { setConfirmOpen(false); setPendingDeleteId(null); }}
        message="Are you sure you want to delete this review?"
      />
    </div>
  );
} 