import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function EditApplicationModal({ open, onClose, application }) {
  const [form, setForm] = useState({
    phone: application.phone || '',
    address: application.address || '',
    gender: application.gender || '',
    degree: application.degree || '',
    ssc: application.ssc || '',
    hsc: application.hsc || '',
    studyGap: application.studyGap || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://scholarcore.vercel.app/applied-scholarships/${application._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      toast.success('Application updated!');
      onClose();
    } else {
      toast.error('Failed to update application');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative p-0">
        <button className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-700 transition" onClick={onClose}>&times;</button>
        <div className="px-8 pt-8 pb-4 max-h-[90vh] overflow-y-auto rounded-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Edit Application</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {application.userPhoto && (
              <div className="flex justify-center mb-4">
                <img src={application.userPhoto} alt="User" className="w-20 h-20 rounded-full border-4 border-amber-200 shadow" />
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <label className="font-medium text-gray-700 text-right pr-2">User Name</label>
              <input type="text" value={application.userName || ''} readOnly className="input input-bordered w-full bg-gray-100 rounded-lg col-span-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <label className="font-medium text-gray-700 text-right pr-2">User Email</label>
              <input type="text" value={application.userEmail || ''} readOnly className="input input-bordered w-full bg-gray-100 rounded-lg col-span-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <label className="font-medium text-gray-700 text-right pr-2">Scholarship ID</label>
              <input type="text" value={application.scholarshipId || ''} readOnly className="input input-bordered w-full bg-gray-100 rounded-lg col-span-2" />
            </div>
          
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <label className="font-medium text-gray-700 text-right pr-2">Phone Number</label>
              <input type="text" name="phone" value={form.phone} required className="input input-bordered w-full rounded-lg col-span-2" onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <label className="font-medium text-gray-700 text-right pr-2">Address</label>
              <input type="text" name="address" value={form.address} required className="input input-bordered w-full rounded-lg col-span-2" onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <label className="font-medium text-gray-700 text-right pr-2">Gender</label>
              <select name="gender" value={form.gender} required className="input input-bordered w-full rounded-lg col-span-2" onChange={handleChange}>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <label className="font-medium text-gray-700 text-right pr-2">Applying Degree</label>
              <select name="degree" value={form.degree} required className="input input-bordered w-full rounded-lg col-span-2" onChange={handleChange}>
                <option value="">Applying Degree</option>
                <option>Diploma</option>
                <option>Bachelor</option>
                <option>Masters</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <label className="font-medium text-gray-700 text-right pr-2">SSC Result</label>
              <input type="text" name="ssc" value={form.ssc} required className="input input-bordered w-full rounded-lg col-span-2" onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <label className="font-medium text-gray-700 text-right pr-2">HSC Result</label>
              <input type="text" name="hsc" value={form.hsc} required className="input input-bordered w-full rounded-lg col-span-2" onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <label className="font-medium text-gray-700 text-right pr-2">Study Gap (optional)</label>
              <select name="studyGap" value={form.studyGap} className="input input-bordered w-full rounded-lg col-span-2" onChange={handleChange}>
                <option value="">Study Gap (optional)</option>
                <option>None</option>
                <option>1 year</option>
                <option>2 years</option>
                <option>3+ years</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <label className="font-medium text-gray-700 text-right pr-2">University Name</label>
              <input type="text" value={application.universityName || ''} readOnly className="input input-bordered w-full bg-gray-100 rounded-lg col-span-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <label className="font-medium text-gray-700 text-right pr-2">Scholarship Category</label>
              <input type="text" value={application.scholarshipCategory || ''} readOnly className="input input-bordered w-full bg-gray-100 rounded-lg col-span-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <label className="font-medium text-gray-700 text-right pr-2">Subject Category</label>
              <input type="text" value={application.subjectCategory || ''} readOnly className="input input-bordered w-full bg-gray-100 rounded-lg col-span-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <label className="font-medium text-gray-700 text-right pr-2">Current Date</label>
              <input type="text" value={new Date().toLocaleDateString()} readOnly className="input input-bordered w-full bg-gray-100 rounded-lg col-span-2" />
            </div>
            <div className="flex justify-center pt-2">
              <button type="submit" className="btn bg-amber-400 hover:bg-amber-500 text-white font-bold px-8 py-2 rounded-full shadow transition-all duration-200 w-full max-w-xs">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 