import React, { useContext } from 'react';
import { User, Mail, Shield, Calendar } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

export default function MyProfile() {
  const { user, role } = useContext(AuthContext);

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card className="shadow-lg border-0">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Photo */}
            <div className="relative">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-32 h-32 rounded-2xl object-cover ring-4 ring-[#FEE685] shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#FEE685] to-[#ffd93d] flex items-center justify-center shadow-lg">
                  <User className="w-16 h-16 text-black" />
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-[#FEE685]" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2">
                  {user?.displayName || 'User'}
                </h2>
                <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  {user?.email}
                </p>
              </div>

              {/* Role Badge */}
              {role && (
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Shield className="w-4 h-4 text-gray-600" />
                  <Badge className="bg-black text-white text-sm px-3 py-1">
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Badge>
                </div>
              )}

              {/* Account Created */}
              {user?.metadata?.creationTime && (
                <p className="text-sm text-gray-500 flex items-center justify-center md:justify-start gap-2">
                  <Calendar className="w-4 h-4" />
                  Member since {new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Details Card */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Account Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Display Name</p>
              <p className="font-semibold">{user?.displayName || 'Not set'}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Email Address</p>
              <p className="font-semibold break-all">{user?.email}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">User ID</p>
              <p className="font-mono text-xs font-semibold break-all">{user?.uid}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Email Verified</p>
              <p className="font-semibold">
                {user?.emailVerified ? (
                  <span className="text-green-600">✓ Verified</span>
                ) : (
                  <span className="text-orange-600">Not verified</span>
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}