
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authAPI from '../api/auth';
import { Link } from "react-router-dom";

const SignUpForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const changeHandler = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName.trim()) {
      toast.error("First name is required!");
      return;
    }
    if (!formData.lastName.trim()) {
      toast.error("Last name is required!");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required!");
      return;
    }
    if (!formData.password) {
      toast.error("Password is required!");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      // Call signup API
      const response = await authAPI.signup({
       name: `${formData.firstName} ${formData.lastName}`,
       email: formData.email,
       password: formData.password
     });

      toast.success(response.message || 'Account created! Check your email for OTP.');
      
      // Store email in session for OTP verification
      sessionStorage.setItem('signupEmail', formData.email);
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

      // Navigate to login or OTP verification page
      navigate('/verify-otp');
    } catch (error) {
      const errorMsg = error?.message || 'Signup failed. Please try again.';
      toast.error(errorMsg);
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="w-full flex flex-col gap-4 sm:gap-6 animate-fadeIn">
      {/* Name fields */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <label className="flex-1">
          <p className="text-xs sm:text-sm text-gray-700 mb-1">First Name <sup className="text-pink-500">*</sup></p>
          <input
            required
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="Enter First Name"
            onChange={changeHandler}
            className="w-full p-2 sm:p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none transition text-sm sm:text-base"
          />
        </label>
        <label className="flex-1">
          <p className="text-xs sm:text-sm text-gray-700 mb-1">Last Name <sup className="text-pink-500">*</sup></p>
          <input
            required
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Enter Last Name"
            onChange={changeHandler}
            className="w-full p-2 sm:p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none transition text-sm sm:text-base"
          />
        </label>
      </div>

      {/* Email */}
      <label>
        <p className="text-xs sm:text-sm text-gray-700 mb-1">Email Address <sup className="text-pink-500">*</sup></p>
        <input
          required
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter Email"
          onChange={changeHandler}
          className="w-full p-2 sm:p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none transition text-sm sm:text-base"
        />
      </label>

      {/* Passwords */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <label className="relative flex-1">
          <p className="text-xs sm:text-sm text-gray-700 mb-1">Password <sup className="text-pink-500">*</sup></p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            placeholder="Enter Password"
            onChange={changeHandler}
            className="w-full p-2 sm:p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none transition text-sm sm:text-base"
          />
          <span className="absolute right-3 top-[30px] sm:top-[38px] cursor-pointer text-gray-600"
            onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? <AiOutlineEyeInvisible fontSize={18} className="sm:size-[20px]" /> : <AiOutlineEye fontSize={18} className="sm:size-[20px]" />}
          </span>
        </label>

        <label className="relative flex-1">
          <p className="text-xs sm:text-sm text-gray-700 mb-1">Confirm Password <sup className="text-pink-500">*</sup></p>
          <input
            required
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            onChange={changeHandler}
            className="w-full p-2 sm:p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none transition text-sm sm:text-base"
          />
          <span className="absolute right-3 top-[30px] sm:top-[38px] cursor-pointer text-gray-600"
            onClick={() => setShowConfirmPassword(prev => !prev)}>
            {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={18} className="sm:size-[20px]" /> : <AiOutlineEye fontSize={18} className="sm:size-[20px]" />}
          </span>
        </label>
      </div>

      <button disabled={isLoading}
      className="w-full py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-xl sm:rounded-2xl hover:from-purple-700 hover:to-purple-900 transition-all text-sm sm:text-base">
        {isLoading ? "Creating..." : "Create Account"}
      </button>

      <p className="text-center text-xs sm:text-sm text-gray-600 mt-2">
        Already have an account?{" "}
        <Link to="/login" className="text-purple-700 font-semibold hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
