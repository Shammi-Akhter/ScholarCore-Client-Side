import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function AddScholarship() {
  const [form, setForm] = useState({ universityLogo: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form };
      const res = await fetch('http://localhost:5000/scholarships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success('Scholarship added!');
        setForm({ universityLogo: '' });
      } else {
        toast.error('Failed to add scholarship');
      }
    } catch {
      toast.error('Failed to add scholarship');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">Add Scholarship</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-1">Scholarship Name</label>
          <input name="scholarshipName" className="input input-bordered w-full" onChange={handleChange} required />
        </div>
        <div>
          <label className="block font-medium mb-1">University Name</label>
          <input name="universityName" className="input input-bordered w-full" onChange={handleChange} required />
        </div>
        <div>
          <label className="block font-medium mb-1">University Logo URL</label>
          <input name="universityLogo" className="input input-bordered w-full" onChange={handleChange} value={form.universityLogo} placeholder="Paste image URL here" />
          {form.universityLogo && (
            <div className="flex justify-center mt-2">
              <img src={form.universityLogo} alt="Logo Preview" className="w-20 h-20 rounded-full border-4 border-amber-200 shadow" />
            </div>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Scholarship Category</label>
          <input name="scholarshipCategory" className="input input-bordered w-full" onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium mb-1">Degree</label>
          <select name="degree" className="input input-bordered w-full" onChange={handleChange}>
            <option>Diploma</option>
            <option>Bachelor</option>
            <option>Masters</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input name="location" className="input input-bordered w-full" onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium mb-1">World Rank</label>
            <input name="worldRank" className="input input-bordered w-full" onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium mb-1">Application Deadline</label>
            <input type="date" name="applicationDeadline" className="input input-bordered w-full" onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium mb-1">Subject Category</label>
            <input name="subjectCategory" className="input input-bordered w-full" onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium mb-1">Application Fees</label>
            <input name="applicationFees" className="input input-bordered w-full" onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium mb-1">Ratings</label>
            <input name="rating" className="input input-bordered w-full" onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium mb-1">Scholarship Description</label>
            <input name="scholarshipDescription" className="input input-bordered w-full" onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium mb-1">Service Charge</label>
            <input name="serviceCharge" className="input input-bordered w-full" onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium mb-1">Post Date</label>
            <input type="date" name="postDate" className="input input-bordered w-full" onChange={handleChange} />
          </div>
        </div>
        <div className="flex justify-center pt-2">
          <button type="submit" className="btn bg-amber-400 text-white w-full" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
        </div>
      </form>
    </div>
  );
} 