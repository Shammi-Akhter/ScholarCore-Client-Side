import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/reviews'); // changed from /all-reviews
      const data = await res.json();
      setReviews(data);
    } catch {
      toast.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    const res = await fetch(`http://localhost:5000/reviews/${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Review deleted');
      setReviews(reviews.filter(r => r._id !== id));
    } else {
      toast.error('Delete failed');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Reviews</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map(r => (
            <div key={r._id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
              <img src={r.userImage || 'https://i.pravatar.cc/100'} alt="Reviewer" className="w-16 h-16 rounded-full mb-2" />
              <div className="font-bold">{r.userName}</div>
              <div className="text-gray-500 text-sm mb-1">{r.universityName}</div>
              <div className="text-gray-500 text-sm mb-1">{r.subjectCategory || '-'}</div>
              <div className="text-yellow-500 font-bold">Rating: {r.rating}</div>
              <div className="text-gray-700 mb-2">{r.comment}</div>
              <div className="text-xs text-gray-400 mb-2">{r.reviewDate ? new Date(r.reviewDate).toLocaleDateString() : '-'}</div>
              <button className="btn btn-xs bg-red-100 text-red-700" onClick={() => handleDelete(r._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 