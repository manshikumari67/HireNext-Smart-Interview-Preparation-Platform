import React, { useState, useEffect } from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import { HiMiniTrophy } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import leaderboardAPI from '../api/leaderboard';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        // Fetch global leaderboard
        const leaderboardResponse = await leaderboardAPI.getGlobalLeaderboard(50);
        if (leaderboardResponse.data) {
          setLeaderboard(leaderboardResponse.data);
        }

        // Fetch user rank
        try {
          const rankResponse = await leaderboardAPI.getUserRank();
          setUserRank(rankResponse.user);
        } catch (error) {
          console.warn('Failed to fetch user rank:', error);
        }
      } catch (error) {
        toast.error(error?.message || 'Failed to load leaderboard');
        console.error('Leaderboard error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankBadgeColor = (rank) => {
    if (rank === 1) return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    if (rank === 2) return 'bg-gray-100 border-gray-300 text-gray-800';
    if (rank === 3) return 'bg-orange-100 border-orange-300 text-orange-800';
    return 'bg-blue-50 border-blue-200 text-blue-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 py-6 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6 transition-colors"
        >
          <HiArrowLeft size={20} /> Back
        </button>

        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap justify-center">
            <HiMiniTrophy size={32} className="text-yellow-500 sm:size-[40px]" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Global Leaderboard
            </h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            Compete and see how you rank among all users
          </p>
        </div>

        {/* User's Current Rank */}
        {userRank && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 text-white">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div>
                <div className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">#{userRank.rank}</div>
                <div className="text-xs sm:text-base text-blue-100">Your Rank</div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">{userRank.score || 0}</div>
                <div className="text-xs sm:text-base text-blue-100">Total Score</div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">{userRank.quizzesTaken || 0}</div>
                <div className="text-xs sm:text-base text-blue-100">Quizzes Taken</div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-4">Loading leaderboard...</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow">
            <p className="text-gray-600">No leaderboard data available yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-gray-700 text-xs sm:text-base">Rank</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-gray-700 text-xs sm:text-base">User</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-center font-semibold text-gray-700 text-xs sm:text-base">Score</th>
                    <th className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-center font-semibold text-gray-700">Quizzes</th>
                    <th className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 text-center font-semibold text-gray-700">Average %</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((user, index) => (
                    <tr
                      key={user._id || index}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition ${
                        index === 0 ? 'bg-yellow-50' : index === 1 ? 'bg-gray-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <span className={`inline-block px-4 py-2 rounded-full font-bold text-sm border ${getRankBadgeColor(index + 1)}`}>
                          {getMedalEmoji(index + 1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900 capitalize">
                          {user.name || 'Anonymous'}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-lg text-blue-600">
                          {user.score || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-gray-700 font-medium">
                          {user.totalQuizzesTaken || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                            <div
                              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                              style={{ width: `${Math.min(user.averageScore || 0, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-700">
                            {user.averageScore?.toFixed(1) || '0'}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border-l-4 border-yellow-400">
            <div className="text-2xl sm:text-3xl mb-2">🥇</div>
            <h3 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Top 1-3 Ranks</h3>
            <p className="text-xs sm:text-sm text-gray-600">Get special medals and recognition</p>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border-l-4 border-blue-400">
            <div className="text-2xl sm:text-3xl mb-2">📈</div>
            <h3 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Score Calculation</h3>
            <p className="text-xs sm:text-sm text-gray-600">Based on quiz performance and consistency</p>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border-l-4 border-purple-400">
            <div className="text-2xl sm:text-3xl mb-2">🎯</div>
            <h3 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Real-time Updates</h3>
            <p className="text-xs sm:text-sm text-gray-600">Leaderboard updates after each quiz</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
