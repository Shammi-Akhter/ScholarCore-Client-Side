import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const FIELDS = [
  { key: 'scholarshipName', label: 'Scholarship Name' },
  { key: 'universityName', label: 'University Name' },
  {key:'universityLogo', label:'University Logo' },
  { key: 'location', label: 'University Location' },
  { key: 'subjectCategory', label: 'Subject Category' },
  { key: 'scholarshipCategory', label: 'Scholarship Category' },
  { key: 'degree', label: 'Degree' },
  { key: 'applicationFees', label: 'Application Fees' },
  { key: 'serviceCharge', label: 'Service Charge' },
  { key: 'applicationDeadline', label: 'Application Deadline' },
  { key: 'postDate', label: 'Post Date' },

];

export default function ManageScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editScholarship, setEditScholarship] = useState(null);
  const [detailsScholarship, setDetailsScholarship] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/scholarships');
      const data = await res.json();
      setScholarships(data);
    } catch {
      toast.error('Failed to fetch scholarships');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this scholarship?')) return;
    const res = await fetch(`http://localhost:5000/scholarships/${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Scholarship deleted');
      setScholarships(scholarships.filter(s => s._id !== id));
    } else {
      toast.error('Delete failed');
    }
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
      universityLogo: editForm.universityLogo || '',
      location: editForm.location || '',
      subjectCategory: editForm.subjectCategory || '',
      scholarshipCategory: editForm.scholarshipCategory || '',
      degree: editForm.degree || '',
      applicationFees: editForm.applicationFees || '',
      serviceCharge: editForm.serviceCharge || '',
      applicationDeadline: editForm.applicationDeadline || '',
      postDate: editForm.postDate || '',
    };
    // Optionally, check for required fields
    if (!payload.scholarshipName || !payload.universityName) {
      toast.error('Scholarship Name and University Name are required.');
      return;
    }
    setEditLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/scholarships/${editScholarship._id}`, {
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
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Scholarships</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-amber-100">
              <th className="p-2">Scholarship Name</th>
              <th className="p-2">University Name</th>
              <th className="p-2">Subject Category</th>
              <th className="p-2">Degree</th>
              <th className="p-2">Application Fees</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map(s => (
              <tr key={s._id}>
                <td className="p-2">{s.scholarshipName || s.name}</td>
                <td className="p-2">{s.universityName}</td>
                <td className="p-2">{s.subjectCategory}</td>
                <td className="p-2">{s.degree}</td>
                <td className="p-2">{s.applicationFees}</td>
                <td className="p-2 flex gap-2">
                  <button className="btn btn-xs bg-blue-100 text-blue-700" onClick={() => setDetailsScholarship(s)}>Details</button>
                  <button className="btn btn-xs bg-green-100 text-green-700" onClick={() => openEditModal(s)}>Edit</button>
                  <button className="btn btn-xs bg-red-100 text-red-700" onClick={() => handleDelete(s._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Details Modal */}
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
                  {FIELDS.filter(f => f.key !== 'logo').map(f => (
                    <div key={f.key} className="flex flex-col">
                      <label className="font-medium text-gray-700 mb-1">{f.label}</label>
                      <input
                        name={f.key}
                        value={editForm[f.key] || ''}
                        onChange={handleEditChange}
                        className="input input-bordered w-full rounded-lg"
                        disabled={f.key === 'postedUserEmail'}
                      />
                    </div>
                  ))}
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
    </div>
  );
} 