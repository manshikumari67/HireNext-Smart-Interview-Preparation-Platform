import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { HiArrowLeft, HiCheckCircle, HiAcademicCap } from "react-icons/hi";
import { HiOutlineTrophy } from "react-icons/hi2";
import { toast } from "react-toastify";
import userAPI from "../api/user";
import { setUser } from "../store/store";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector(state => state.auth);
  const { results } = useSelector(state => state.quiz);
  const { savedQuestions } = useSelector(state => state.user);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch profile only once when user logs in
  useEffect(() => {
    const fetchProfile = async () => {
      if (!isLoggedIn) {
        console.log("⚠️ User not logged in");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        console.log("📥 Fetching profile from API...");
        const response = await userAPI.getProfile();
        
        if (response?.user) {
          console.log("✅ Profile fetched successfully:", response.user);
          setProfileData(response.user);
          dispatch(setUser(response.user));
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error('❌ API error:', error.message);
        console.log("📦 Using Redux state as fallback");
        setError(error.message);
        // Use Redux state as fallback
        setProfileData(user);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
    // Only run once when isLoggedIn changes to true
  }, [isLoggedIn]);

  // Get user stats
  const displayUser = profileData || user;
  const totalQuizzesTaken = results?.length || displayUser?.totalQuizzesTaken || 0;
  const totalQuestionsSolved = savedQuestions?.length || 0;
  const averageScore = results && results.length > 0
    ? Math.round((results.reduce((sum, r) => sum + r.score, 0) / totalQuizzesTaken) * 100) 
    : displayUser?.averageScore || 0;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-12 px-6 flex items-center justify-center">
        <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full text-center">
          <p className="text-xl text-gray-700 mb-6">Please log in to view your profile</p>
          <Link to="/login">
            <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Show loading spinner while fetching
  if (isLoading || !profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-4">Loading profile...</p>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 py-6 sm:py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header with Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6 transition-colors"
        >
          <HiArrowLeft size={20} /> Back
        </button>

        {/* Main Profile Card */}
        <div className="bg-white shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center mb-6 sm:mb-8">
          
          {/* Profile Picture with Badge */}
          <div className="flex flex-col items-center mb-6 sm:mb-8 relative">
            <div className="relative">
              <FaUserCircle className="text-blue-400 w-24 h-24 sm:w-[140px] sm:h-[140px]" />
              {totalQuizzesTaken > 0 && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-3 border-4 border-white">
                  <HiCheckCircle className="text-white" size={24} />
                </div>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 capitalize">
              {displayUser?.name || 'User'}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 flex items-center justify-center gap-2 flex-wrap">
              📧 {displayUser?.email || 'Not specified'}
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col items-center">
              <HiAcademicCap className="text-blue-600 mb-1 sm:mb-2 w-6 h-6 sm:w-8 sm:h-8" />
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">{totalQuizzesTaken}</p>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Quizzes Completed</p>
            </div>
            <div className="flex flex-col items-center">
              <HiCheckCircle className="text-green-600 mb-1 sm:mb-2 w-6 h-6 sm:w-8 sm:h-8" />
              <p className="text-2xl sm:text-3xl font-bold text-green-600">{totalQuestionsSolved}</p>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Questions Solved</p>
            </div>
            <div className="flex flex-col items-center">
              <HiOutlineTrophy className="text-amber-500 mb-1 sm:mb-2 w-6 h-6 sm:w-8 sm:h-8" />
              <p className="text-2xl sm:text-3xl font-bold text-amber-500">{averageScore}%</p>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Average Score</p>
            </div>
          </div>

          {/* Recent Quiz Results */}
          {results.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Quiz Results</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {results.slice(-5).reverse().map((result, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 capitalize">{result.topic}</p>
                      <p className="text-sm text-gray-500">{new Date(result.timestamp).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-600">
                        {result.score}/{result.total}
                      </p>
                      <p className="text-sm text-gray-500">
                        {Math.round((result.score / result.total) * 100)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Empty State */}
          {results.length === 0 && (
            <div className="bg-gray-50 rounded-xl p-6 text-center mb-8">
              <p className="text-gray-600 mb-4">No quizzes taken yet. Start practicing now!</p>
              <Link to="/quiz">
                <button className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300">
                  Start Quiz
                </button>
              </Link>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/edit-profile"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
            >
              Edit Profile
            </Link>
            <Link
              to="/quiz"
              className="px-8 py-3 rounded-full bg-green-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
            >
              Practice Quiz
            </Link>
            <Link
              to="/"
              className="px-8 py-3 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition duration-300 text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
