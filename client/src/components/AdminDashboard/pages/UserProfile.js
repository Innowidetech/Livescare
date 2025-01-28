import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../../redux/users';
import { UserCircle, Mail, Phone, Calendar, MapPin } from 'lucide-react';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header/Banner */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        {/* Profile Content */}
        <div className="relative px-6 py-8">
          {/* Profile Picture */}
          <div className="absolute -top-16 left-6">
            <div className="h-32 w-32 rounded-full bg-white p-2 shadow-lg">
              <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center">
                <UserCircle className="h-16 w-16 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="mt-16">
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-600 mt-2">{profile.role || 'Admin User'}</p>

            {/* Contact Information */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center text-gray-700">
                <Mail className="h-5 w-5 mr-3" />
                <span>{profile.email}</span>
              </div>
              {profile.phone && (
                <div className="flex items-center text-gray-700">
                  <Phone className="h-5 w-5 mr-3" />
                  <span>{profile.phone}</span>
                </div>
              )}
              {profile.joinDate && (
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 mr-3" />
                  <span>Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>

            {/* Additional Information */}
            {profile.bio && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
                <p className="text-gray-700">{profile.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;