import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/store";
import { toast } from "react-toastify";
import { FaUserCircle, FaLock, FaTrash } from "react-icons/fa";
import { HiArrowLeft, HiPencil } from "react-icons/hi";
import { HiOutlineCamera } from "react-icons/hi2";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux data
  const { user } = useSelector(state => state.auth);
  const { results } = useSelector(state => state.quiz);
  
  // Local state
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "Passionate about learning and practicing coding interviews",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // User stats
  const totalQuizzes = results?.length || 0;
  const averageScore = results.length > 0 
    ? Math.round((results.reduce((sum, r) => sum + r.score, 0) / totalQuizzes) * 100) 
    : 0;

  // Handle profile photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        toast.success("Profile picture updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile info change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Save profile changes
  const handleSaveProfile = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    dispatch(setUser({ ...user, ...formData }));
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    // Simulate password change
    toast.success("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    toast.success("Account deleted successfully");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header with Back Button */}
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8 transition-colors"
        >
          <HiArrowLeft size={20} /> Back to Profile
        </button>

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Settings & Profile</h1>

        {/* PROFILE SECTION */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaUserCircle size={28} className="text-blue-600" /> Profile Picture
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Profile Photo */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center border-4 border-white shadow-lg">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <FaUserCircle size={100} className="text-white" />
                )}
              </div>
              
              {/* Camera Icon Overlay */}
              <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full cursor-pointer shadow-lg transition-all group-hover:scale-110">
                <HiOutlineCamera size={20} />
                <input
                  type="file"
                  onChange={handlePhotoChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>

            {/* Photo Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Change Profile Picture</h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload a JPG, PNG or GIF image (max 5MB)
              </p>
              <button
                onClick={() => setProfilePic(null)}
                className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                Remove Photo
              </button>
            </div>
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <p className="text-4xl font-bold mb-2">{totalQuizzes}</p>
            <p className="text-blue-100 text-sm font-medium">Total Quizzes</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <p className="text-4xl font-bold mb-2">{averageScore}%</p>
            <p className="text-green-100 text-sm font-medium">Average Score</p>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <p className="text-4xl font-bold mb-2">★</p>
            <p className="text-amber-100 text-sm font-medium">Rank Badge</p>
          </div>
        </div>

        {/* PERSONAL INFO SECTION */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <HiPencil size={28} className="text-blue-600" /> Personal Information
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-600 transition-all"
              />
            </div>

            {/* Email Field (Read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed for security reasons</p>
            </div>

            {/* Bio Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bio / About
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-600 resize-none transition-all"
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Save Button */}
            {isEditing && (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all hover:scale-105"
              >
                Save Changes
              </button>
            )}
          </form>
        </div>

        {/* SECURITY SECTION */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaLock size={28} className="text-green-600" /> Account Security
          </h2>

          <form onSubmit={handlePasswordChange} className="space-y-5">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-all"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 8 characters)"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-all"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all hover:scale-105"
            >
              Change Password
            </button>
          </form>
        </div>

        {/* DANGER ZONE */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-2 flex items-center gap-2">
            <FaTrash size={28} /> Danger Zone
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Deleting your account will permanently remove all your data, quiz results, and progress. This action cannot be undone.
          </p>
          
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all hover:shadow-lg"
          >
            Delete My Account
          </button>
        </div>
      </div>

      {/* DELETE ACCOUNT MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-red-600 mb-3">Delete Account?</h3>
            <p className="text-gray-600 mb-6">
              Are you absolutely sure you want to delete your account? This action is permanent and cannot be undone. All your quiz results and progress will be lost forever.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all hover:shadow-lg"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
