import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function ReviewModal({ open, onClose, application, review, isEdit }) {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    rating: review?.rating || '',
    comment: review?.comment || '',
    reviewDate: review?.reviewDate || new Date().toISOString().slice(0, 10),
  });

 
  const [scholarshipInfo, setScholarshipInfo] = useState({
    scholarshipName: application?.scholarshipName || review?.scholarshipName || '',
    universityName: application?.universityName || review?.universityName || '',
    subjectCategory: application?.subjectCategory || review?.subjectCategory || '',
  });
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    async function fetchScholarship() {
      if (!scholarshipInfo.scholarshipName && application?.scholarshipId) {
        setLoading(true);
        setFetchError('');
        try {
          const res = await fetch(`https://scholarcore.vercel.app/scholarships/${application.scholarshipId}`);
          if (res.ok) {
            const data = await res.json();
            setScholarshipInfo({
              scholarshipName: data.scholarshipName || data.name || application.scholarshipName || application.scholarshipCategory || application.subjectCategory || '',
              universityName: data.universityName || data.university || application.universityName || '',
              subjectCategory: application.subjectCategory || data.subjectCategory || '',
            });
            if (!(data.scholarshipName || data.name || application.scholarshipName || application.scholarshipCategory || application.subjectCategory)) {
              setFetchError('Scholarship name not found.');
            }
          } else {
            setScholarshipInfo({
              scholarshipName: application.scholarshipName || application.scholarshipCategory || application.subjectCategory || '',
              universityName: application.universityName || '',
              subjectCategory: application.subjectCategory || '',
            });
            if (!(application.scholarshipName || application.scholarshipCategory || application.subjectCategory)) {
              setFetchError('Scholarship name not found.');
            }
          }
        } catch {
          setScholarshipInfo({
            scholarshipName: application.scholarshipName || application.scholarshipCategory || application.subjectCategory || '',
            universityName: application.universityName || '',
            subjectCategory: application.subjectCategory || '',
          });
          if (!(application.scholarshipName || application.scholarshipCategory || application.subjectCategory)) {
            setFetchError('Scholarship name not found.');
          }
        } finally {
          setLoading(false);
        }
      }
    }
    fetchScholarship();
    // eslint-disable-next-line
  }, [application, review]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      toast.error('Please wait for scholarship info to load.');
      return;
    }
    if (fetchError) {
      toast.error(fetchError);
      return;
    }
    
    const reviewData = {
      rating: form.rating,
      comment: form.comment,
      reviewDate: form.reviewDate,
      scholarshipName: scholarshipInfo.scholarshipName,
      universityName: scholarshipInfo.universityName,
      subjectCategory: scholarshipInfo.subjectCategory || application?.subjectCategory || '-',
      scholarshipId: application?.scholarshipId || application?._id || review?.scholarshipId || '',
      userName: user?.displayName || '',
      userImage: user?.photoURL || '',
      userEmail: user?.email || '',
    };
   
    
    if (!reviewData.scholarshipId || typeof reviewData.scholarshipId !== 'string' || reviewData.scholarshipId.length < 10) {
      toast.error('Invalid or missing scholarship ID. Cannot submit review.');
      return;
    }
   
    if (!reviewData.scholarshipName || !reviewData.universityName || !reviewData.scholarshipId || !reviewData.userName || !reviewData.userEmail || !reviewData.rating || !reviewData.comment || !reviewData.reviewDate) {
      toast.error('All fields are required.');
      return;
    }
    const url = isEdit
      ? `https://scholarcore.vercel.app/reviews/${review._id}`
      : 'https://scholarcore.vercel.app/reviews';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (res.ok) {
      toast.success(isEdit ? 'Review updated!' : 'Review added!');
      onClose();
    } else {
      toast.error('Failed to submit review');
    }
  };

  if (!open) return null;

  
  if (!isEdit && !application?.scholarshipId) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
          <button className="absolute top-2 right-2 text-xl" onClick={onClose}>&times;</button>
          <h2 className="text-2xl font-bold mb-4">Add Review</h2>
          <div className="text-red-500 font-semibold">This application is missing a scholarship ID and cannot be reviewed.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>&times;</button>
        <h2 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Review' : 'Add Review'}</h2>
     
        <div className="mb-4 space-y-1 text-sm text-gray-700">
          <div><strong>Scholarship:</strong> {loading ? 'Loading...' : (scholarshipInfo.scholarshipName || '-')}</div>
          <div><strong>University:</strong> {loading ? 'Loading...' : (scholarshipInfo.universityName || '-')}</div>
          <div><strong>Subject Category:</strong> {loading ? 'Loading...' : (scholarshipInfo.subjectCategory || '-')}</div>
          <div><strong>Your Name:</strong> {user?.displayName || '-'}</div>
          <div><strong>Your Email:</strong> {user?.email || '-'}</div>
          {fetchError && <div className="text-red-500 font-semibold">{fetchError}</div>}
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1 font-medium">Rating</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={e => {
                let value = e.target.value;
                
                if (value.includes('.')) {
                  const [intPart, decPart] = value.split('.');
                  value = intPart + '.' + decPart.slice(0, 1);
                }
                
                let num = parseFloat(value);
                if (isNaN(num)) num = '';
                else if (num < 1) num = 1;
                else if (num > 5) num = 5;
                setForm({ ...form, rating: num });
              }}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Comment</label>
            <textarea name="comment" value={form.comment} onChange={handleChange} required className="input input-bordered w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Review Date</label>
            <input type="date" name="reviewDate" value={form.reviewDate} onChange={handleChange} required className="input input-bordered w-full" />
          </div>
          <button type="submit" className="btn bg-amber-400 hover:bg-amber-500 text-white font-bold px-8 py-2 rounded-full shadow transition-all duration-200 w-full" disabled={loading || !!fetchError}>Submit</button>
        </form>
      </div>
    </div>
  );
} 