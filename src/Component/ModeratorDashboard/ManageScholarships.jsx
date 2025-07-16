import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmModal from './ConfirmModal';

const FIELDS = [
  { key: 'scholarshipName', label: 'Scholarship Name' },
  { key: 'universityName', label: 'University Name' },
  { key: 'universityCountry', label: 'University Country' },
  { key: 'universityCity', label: 'University City' },
  { key: 'universityWorldRank', label: 'University World Rank' },
  {key:'universityLogo', label:'University Logo' },
  { key: 'location', label: 'University Location' },
  { key: 'subjectCategory', label: 'Subject Category' },
  { key: 'scholarshipCategory', label: 'Scholarship Category' },
  { key: 'degree', label: 'Degree' },
  { key: 'applicationFees', label: 'Application Fees' },
  { key: 'serviceCharge', label: 'Service Charge' },
  { key: 'applicationDeadline', label: 'Application Deadline' },
  { key: 'postDate', label: 'Post Date' },
  { key: 'postedUserEmail', label: 'Posted User Email' },
];

export default function ManageScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editScholarship, setEditScholarship] = useState(null);
  const [detailsScholarship, setDetailsScholarship] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://scholarcore.vercel.app/scholarships');
      const data = await res.json();
      setScholarships(data);
    } catch {
      toast.error('Failed to fetch scholarships');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    const res = await fetch(`https://scholarcore.vercel.app/scholarships/${pendingDeleteId}`, { method: 'DELETE' });
    if (res.ok) {
      setScholarships(scholarships.filter(s => s._id !== pendingDeleteId));
      toast.success('Scholarship deleted');
    } else {
      toast.error('Delete failed');
    }
    setConfirmOpen(false);
    setPendingDeleteId(null);
  };

  const openEditModal = (sch) => {
    setEditScholarship(sch);
    setEditForm({ ...sch });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(f => ({ ...f, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    // Build payload with all required fields, matching your schema
    const payload = {
      scholarshipName: editForm.scholarshipName || '',
      universityName: editForm.universityName || '',
      universityCountry: editForm.universityCountry || '',
      universityCity: editForm.universityCity || '',
      universityWorldRank: editForm.universityWorldRank || '',
      universityLogo: editForm.universityLogo || '',
      location: editForm.location || '',
      subjectCategory: editForm.subjectCategory || '',
      scholarshipCategory: editForm.scholarshipCategory || '',
      degree: editForm.degree || '',
      applicationFees: editForm.applicationFees || '',
      serviceCharge: editForm.serviceCharge || '',
      applicationDeadline: editForm.applicationDeadline || '',
      postDate: editForm.postDate || '',
      postedUserEmail: editForm.postedUserEmail || '',
    };
 
    if (!payload.scholarshipName || !payload.universityName) {
      toast.error('Scholarship Name and University Name are required.');
      return;
    }
    setEditLoading(true);
    try {
      const res = await fetch(`https://scholarcore.vercel.app/scholarships/${editScholarship._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success('Scholarship updated');
        setEditScholarship(null);
        fetchScholarships();
      } else {
        toast.error('Update failed');
      }
    } catch {
      toast.error('Update failed');
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="px-2 sm:px-4 md:px-8">
      <h2 className="text-xl font-bold mb-4">Manage Scholarships</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-amber-100">
                <th className="p-2 text-center">Scholarship Name</th>
                <th className="p-2 text-center">University Name</th>
                <th className="p-2 text-center">Subject Category</th>
                <th className="p-2 text-center">Degree</th>
                <th className="p-2 text-center">Application Fees</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map(s => (
                <tr key={s._id} className="text-center">
                  <td className="p-2 text-center">{s.scholarshipName || s.name}</td>
                  <td className="p-2 text-center">{s.universityName}</td>
                  <td className="p-2 text-center">{s.subjectCategory}</td>
                  <td className="p-2 text-center">{s.degree}</td>
                  <td className="p-2 text-center">{s.applicationFees}</td>
                  <td className="p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button className="btn btn-xs bg-blue-100 text-blue-700" onClick={() => setDetailsScholarship(s)}>Details</button>
                      <button className="btn btn-xs bg-green-100 text-green-700" onClick={() => openEditModal(s)}>Edit</button>
                      <button className="btn btn-xs bg-red-100 text-red-700" onClick={() => handleDelete(s._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {detailsScholarship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
            <button className="absolute top-2 right-2 text-xl" onClick={() => setDetailsScholarship(null)}>&times;</button>
            <h2 className="text-2xl font-bold mb-4">Scholarship Details</h2>
            <div className="space-y-2">
              {FIELDS.map(f => (
                <div key={f.key} className="flex gap-2">
                  <span className="font-semibold w-48">{f.label}:</span>
                  {f.key === 'universityLogo' && detailsScholarship.universityLogo ? (
                    <img src={detailsScholarship.universityLogo} alt="Logo" className="w-12 h-12 rounded" />
                  ) : (
                    <span>{detailsScholarship[f.key] || '-'}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {editScholarship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative p-0">
            <button className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-700 transition" onClick={() => setEditScholarship(null)}>&times;</button>
            <div className="px-8 pt-8 pb-4 max-h-[90vh] overflow-y-auto rounded-2xl">
              <h2 className="text-3xl font-bold mb-6 text-center">Edit Scholarship</h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                {/* Logo */}
                {editForm.logo && (
                  <div className="flex justify-center mb-4">
                    <img src={editForm.logo} alt="Logo" className="w-20 h-20 rounded-full border-4 border-amber-200 shadow" />
                  </div>
                )}
                {/* Scholarship Info Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700 mb-1">Scholarship Name</label>
                    <input name="scholarshipName" value={editForm.scholarshipName || ''} onChange={handleEditChange} className="input input-bordered w-full rounded-lg" />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700 mb-1">University Name</label>
                    <input name="universityName" value={editForm.universityName || ''} onChange={handleEditChange} className="input input-bordered w-full rounded-lg" />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700 mb-1">University Country</label>
                    <input name="universityCountry" value={editForm.universityCountry || ''} onChange={handleEditChange} className="input input-bordered w-full rounded-lg" />
                  </div>
                 
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700 mb-1">University City</label>
                    <input name="universityCity" value={editForm.universityCity || ''} onChange={handleEditChange} className="input input-bordered w-full rounded-lg" />
                  </div>
                
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700 mb-1">University World Rank</label>
                    <input name="universityWorldRank" type="number" min="1" value={editForm.universityWorldRank || ''} onChange={handleEditChange} className="input input-bordered w-full rounded-lg" />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700 mb-1">University Logo</label>
                    <input name="universityLogo" value={editForm.universityLogo || ''} onChange={handleEditChange} className="input input-bordered w-full rounded-lg" />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700 mb-1">University Location</label>
                    <input name="location" value={editForm.location || ''} onChange={handleEditChange} className="input input-bordered w-full rounded-lg" />
                  </div>
                 
                  <div className="flex flex-col relative">
                    <label className="font-medium text-gray-700 mb-1">Subject Category</label>
                    <select name="subjectCategory" value={editForm.subjectCategory || ''} onChange={handleEditChange} className="input input-bordered w-full appearance-none pr-10 rounded-lg">
                      <option value="">Select Subject</option>
                      <option>Agriculture</option>
                      <option>Engineering</option>
                      <option>Doctor</option>
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                  
                  <div className="flex flex-col relative">
                    <label className="font-medium text-gray-700 mb-1">Scholarship Category</label>
                    <select name="scholarshipCategory" value={editForm.scholarshipCategory || ''} onChange={handleEditChange} className="input input-bordered w-full appearance-none pr-10 rounded-lg">
                      <option value="">Select Category</option>
                      <option>Full fund</option>
                      <option>Partial</option>
                      <option>Self-fund</option>
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                 
                  <div className="flex flex-col relative">
                    <label className="font-medium text-gray-700 mb-1">Degree</label>
                    <select name="degree" value={editForm.degree || ''} onChange={handleEditChange} className="input input-bordered w-full appearance-none pr-10 rounded-lg">
                      <option value="">Select Degree</option>
                      <option>Diploma</option>
                      <option>Bachelor</option>
                      <option>Masters</option>
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700 mb-1">Application Fees</label>
                    <input name="applicationFees" value={editForm.applicationFees || ''} onChange={handleEditChange} className="input input-bordered w-full rounded-lg" />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700 mb-1">Service Charge</label>
                    <input name="serviceCharge" value={editForm.serviceCharge || ''} onChange={handleEditChange} className="input input-bordered w-full rounded-lg" />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700 mb-1">Application Deadline</label>
                    <input name="applicationDeadline" type="date" value={editForm.applicationDeadline || ''} onChange={handleEditChange} className="input input-bordered w-full rounded-lg" />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700 mb-1">Post Date</label>
                    <input name="postDate" type="date" value={editForm.postDate || ''} onChange={handleEditChange} className="input input-bordered w-full rounded-lg" />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700 mb-1">Posted User Email</label>
                    <input name="postedUserEmail" value={editForm.postedUserEmail || ''} readOnly className="input input-bordered w-full rounded-lg bg-gray-100" />
                  </div>
                </div>
                <div className="flex justify-center pt-2">
                  <button type="submit" className="btn bg-amber-400 hover:bg-amber-500 text-white font-bold px-8 py-2 rounded-full shadow transition-all duration-200 w-full max-w-xs" disabled={editLoading}>
                    {editLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <ConfirmModal
        open={confirmOpen}
        onConfirm={confirmDelete}
        onCancel={() => { setConfirmOpen(false); setPendingDeleteId(null); }}
        message="Are you sure you want to delete this scholarship?"
      />
    </div>
  );
} 