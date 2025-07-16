import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ReviewModal from './ReviewModal';
import toast from 'react-hot-toast';
import ConfirmModal from '../ModeratorDashboard/ConfirmModal';

export default function MyReviews() {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [editReview, setEditReview] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://scholarcore.vercel.app/reviews?email=${user.email}`)
        .then(res => res.json())
        .then(data => setReviews(data));
    }
  }, [user]);

  const handleDelete = (reviewId) => {
    setPendingDeleteId(reviewId);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    const res = await fetch(`https://scholarcore.vercel.app/reviews/${pendingDeleteId}`, { method: 'DELETE' });
    if (res.ok) {
      setReviews(reviews.filter(r => r._id !== pendingDeleteId));
      toast.success('Review deleted');
    }
    setConfirmOpen(false);
    setPendingDeleteId(null);
  };

  return (
    <div className="overflow-x-auto">
      {reviews.length === 0 ? (
        <div className="text-center text-gray-500 py-10 text-lg font-semibold">You have no reviews yet.</div>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-amber-100">
              <th className="p-2">Scholarship Name</th>
              <th className="p-2">University Name</th>
              <th className="p-2">Comment</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(r => (
              <tr key={r._id} className="border-b">
                <td className="p-2">{r.scholarshipName}</td>
                <td className="p-2">{r.universityName}</td>
                <td className="p-2">{r.comment}</td>
                <td className="p-2">{r.reviewDate}</td>
                <td className="p-2 flex gap-2">
                  <button className="btn btn-xs bg-green-100 text-green-700" onClick={() => setEditReview(r)}>Edit</button>
                  <button className="btn btn-xs bg-red-100 text-red-700" onClick={() => handleDelete(r._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editReview && (
        <ReviewModal
          open={!!editReview}
          onClose={() => setEditReview(null)}
          review={editReview}
          isEdit
        />
      )}
      <ConfirmModal
        open={confirmOpen}
        onConfirm={confirmDelete}
        onCancel={() => { setConfirmOpen(false); setPendingDeleteId(null); }}
        message="Delete this review?"
      />
    </div>
  );
} 