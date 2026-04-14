import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const navigate = useNavigate();

  const email = sessionStorage.getItem("resetEmail");

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 अगर email नहीं है तो redirect
  useEffect(() => {
    if (!email) {
      toast.error("Session expired. Try again.");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || !password || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (otp.length !== 6) {
      return toast.error("OTP must be 6 digits");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      await API.post("/auth/reset-password", {
        email,
        otp,
        password,
      });

      toast.success("Password updated successfully");

      sessionStorage.removeItem("resetEmail");

      navigate("/login");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">

        {/* Icon */}
        <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl">
          🔐
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-2">
          Reset Your Password
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-6">
          Enter OTP and create a new password
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

        </form>

        {/* Back */}
        <div className="mt-6">
          <Link
            to="/login"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Login
          </Link>
        </div>

      </div>

    </div>
  );
}