import React, { useContext, useEffect, useState } from 'react';
import { GraduationCap, MapPin, BookOpen, DollarSign, Calendar, Eye, Edit, Trash2, Star, FileText } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import ReviewModal from './ReviewModal';
import EditApplicationModal from './EditApplicationModal';
import toast from 'react-hot-toast';
import ConfirmModal from '../ModeratorDashboard/ConfirmModal';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

export default function MyApplications() {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingCancelId, setPendingCancelId] = useState(null);

  useEffect(() => {
    if (user?.uid) {
      fetch(`https://scholarcore.vercel.app/applied-scholarships?userId=${user.uid}`)
        .then(res => res.json())
        .then(data => setApplications(data));
    }
  }, [user]);

  const handleCancel = (appId) => {
    setPendingCancelId(appId);
    setConfirmOpen(true);
  };

  const confirmCancel = async () => {
    if (!pendingCancelId) return;
    const res = await fetch(`https://scholarcore.vercel.app/applied-scholarships/${pendingCancelId}`, { method: 'DELETE' });
    if (res.ok) {
      setApplications(applications.filter(app => app._id !== pendingCancelId));
      toast.success('Application cancelled');
    }
    setConfirmOpen(false);
    setPendingCancelId(null);
  };


  const fetchScholarshipDetails = async (scholarshipId) => {
    try {
      const res = await fetch(`https://scholarcore.vercel.app/scholarships/${scholarshipId}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase() || 'pending';
    if (s === 'pending') return 'bg-yellow-100 text-yellow-800';
    if (s === 'processing') return 'bg-blue-100 text-blue-800';
    if (s === 'completed') return 'bg-green-100 text-green-800';
    if (s === 'rejected') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {applications.length === 0 ? (
        <Card className="shadow-lg border-0">
          <CardContent className="py-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Applications Yet</h3>
            <p className="text-gray-500">You haven't applied to any scholarships yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {applications.map(app => (
            <Card key={app._id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl flex items-center gap-2 mb-2">
                      <GraduationCap className="w-5 h-5 text-[#FEE685]" />
                      {app.universityName}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {app.location || 'N/A'}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {app.subjectCategory}
                      </span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(app.status)}>
                    {app.status || 'pending'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Application Details Grid */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Degree</p>
                    <p className="font-semibold">{app.degree}</p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      Application Fee
                    </p>
                    <p className="font-semibold">${app.applicationFees || 'N/A'}</p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      Service Charge
                    </p>
                    <p className="font-semibold">${app.serviceCharge || 'N/A'}</p>
                  </div>
                </div>

                {/* Feedback & Applied Date */}
                <div className="grid md:grid-cols-2 gap-4">
                  {app.feedback && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-600 mb-1 font-semibold">Feedback</p>
                      <p className="text-sm text-blue-800">{app.feedback}</p>
                    </div>
                  )}

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Applied On
                    </p>
                    <p className="font-semibold text-sm">
                      {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  <Button
                    onClick={() => window.open(`/scholarship-details/${app.scholarshipId}`)}
                    variant="outline"
                    size="sm"
                    className="hover:bg-gray-100"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Details
                  </Button>

                  <Button
                    onClick={() => {
                      const status = app.status ? app.status.trim().toLowerCase() : '';
                      if (status === 'pending') {
                        setSelectedApp(app);
                        setShowEditModal(true);
                      } else {
                        toast.error('Cannot edit: application is processing or completed.');
                      }
                    }}
                    variant="outline"
                    size="sm"
                    className="hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>

                  <Button
                    onClick={() => handleCancel(app._id)}
                    variant="outline"
                    size="sm"
                    className="hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>

                  <Button
                    onClick={async () => {
                      if (!app.scholarshipId) {
                        toast.error('This application is missing a scholarship ID and cannot be reviewed.');
                        return;
                      }
                      let appWithNames = app;
                      if (!app.scholarshipName || !app.universityName || !app.subjectCategory) {
                        const details = await fetchScholarshipDetails(app.scholarshipId);
                        if (details) {
                          appWithNames = {
                            ...app,
                            scholarshipName: details.scholarshipName || details.name || app.scholarshipName || '',
                            universityName: details.universityName || details.university || app.universityName || '',
                            subjectCategory: app.subjectCategory || details.subjectCategory || '',
                          };
                        }
                      }
                      setSelectedApp(appWithNames);
                      setShowReviewModal(true);
                    }}
                    size="sm"
                    className="bg-[#FEE685] text-black hover:bg-[#FEE685]/90"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Add Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showReviewModal && selectedApp && (
        <ReviewModal
          open={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          application={selectedApp}
        />
      )}

      {showEditModal && selectedApp && (
        <EditApplicationModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          application={selectedApp}
        />
      )}

      <ConfirmModal
        open={confirmOpen}
        onConfirm={confirmCancel}
        onCancel={() => { setConfirmOpen(false); setPendingCancelId(null); }}
        message="Are you sure you want to cancel this application?"
      />
    </div>
  );
}