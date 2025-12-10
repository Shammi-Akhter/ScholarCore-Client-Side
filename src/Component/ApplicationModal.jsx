import React, { useState } from 'react';
import { X, User, Mail, Hash, Phone, MapPin, GraduationCap, FileText, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export default function ApplicationModal({ open, onClose, scholarship, user, scholarshipId, onSubmit }) {
  const [form, setForm] = useState({
    phone: '',
    address: '',
    gender: '',
    degree: '',
    ssc: '',
    hsc: '',
    studyGap: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const application = {
      ...form,
      userName: user?.displayName || '',
      userEmail: user?.email || '',
      userId: user?.uid || '',
      userPhoto: user?.photoURL || '',
      scholarshipId: scholarshipId,
      scholarshipName: scholarship.scholarshipName || scholarship.name || '',
      universityName: scholarship.universityName,
      scholarshipCategory: scholarship.scholarshipCategory,
      subjectCategory: scholarship.subjectCategory,
      location: scholarship.location || '',
      applicationFees: scholarship.applicationFees || '',
      serviceCharge: scholarship.serviceCharge || '',
      appliedAt: new Date().toISOString(),
    };
    try {
      const res = await fetch('https://scholarcore.vercel.app/applied-scholarships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(application),
      });
      const data = await res.json();
      if (data.insertedId) {
        toast.success('Applied successfully!');
        onSubmit();
      } else {
        toast.error('Failed to apply');
      }
    } catch {
      toast.error('Failed to submit application');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#FEE685] to-[#ffd93d] px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#FEE685]" />
            </div>
            <h2 className="text-2xl font-bold text-black">Scholarship Application</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg hover:bg-black/10 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* User Photo */}
          {user?.photoURL && (
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-[#FEE685] shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#FEE685] rounded-full flex items-center justify-center shadow-md">
                  <User className="w-4 h-4 text-black" />
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Read-only Fields */}
            <div className="space-y-4 pb-4 border-b">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <User className="w-4 h-4" />
                  User Name
                </Label>
                <Input
                  type="text"
                  value={user?.displayName || ''}
                  readOnly
                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="w-4 h-4" />
                  User Email
                </Label>
                <Input
                  type="text"
                  value={user?.email || ''}
                  readOnly
                  className="bg-gray-50"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Hash className="w-4 h-4" />
                    User ID
                  </Label>
                  <Input
                    type="text"
                    value={user?.uid || ''}
                    readOnly
                    className="bg-gray-50 font-mono text-xs"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Hash className="w-4 h-4" />
                    Scholarship ID
                  </Label>
                  <Input
                    type="text"
                    value={scholarshipId}
                    readOnly
                    className="bg-gray-50 font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Phone className="w-4 h-4" />
                  Phone Number *
                </Label>
                <Input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  required
                  onChange={handleChange}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="w-4 h-4" />
                  Address *
                </Label>
                <Input
                  type="text"
                  name="address"
                  placeholder="Village, district, country"
                  required
                  onChange={handleChange}
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <User className="w-4 h-4" />
                  Gender *
                </Label>
                <select
                  name="gender"
                  required
                  onChange={handleChange}
                  className="flex h-11 w-full rounded-lg bg-white px-3 py-2 text-base shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FEE685] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <GraduationCap className="w-4 h-4" />
                  Applying Degree *
                </Label>
                <Input
                  type="text"
                  name="degree"
                  placeholder="e.g., Bachelor's, Master's"
                  required
                  onChange={handleChange}
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="w-4 h-4" />
                  SSC Result *
                </Label>
                <Input
                  type="text"
                  name="ssc"
                  placeholder="e.g., GPA 5.00"
                  required
                  onChange={handleChange}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="w-4 h-4" />
                  HSC Result *
                </Label>
                <Input
                  type="text"
                  name="hsc"
                  placeholder="e.g., GPA 5.00"
                  required
                  onChange={handleChange}
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <GraduationCap className="w-4 h-4" />
                Study Gap (Optional)
              </Label>
              <Input
                type="text"
                name="studyGap"
                placeholder="e.g., 1 year"
                onChange={handleChange}
                className="h-11"
              />
            </div>

            {/* Scholarship Info */}
            <div className="pt-4 border-t space-y-3 bg-gray-50 -mx-8 px-8 py-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Scholarship Details</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">University:</span>
                  <p className="font-medium">{scholarship.universityName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Category:</span>
                  <p className="font-medium">{scholarship.scholarshipCategory}</p>
                </div>
                <div>
                  <span className="text-gray-600">Subject:</span>
                  <p className="font-medium">{scholarship.subjectCategory}</p>
                </div>
                <div>
                  <span className="text-gray-600">Location:</span>
                  <p className="font-medium">{scholarship.location}</p>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t px-8 py-4 flex gap-3">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-[#FEE685] text-black hover:bg-[#FEE685]/90 font-semibold shadow-md"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit Application
          </Button>
        </div>
      </div>
    </div>
  );
}