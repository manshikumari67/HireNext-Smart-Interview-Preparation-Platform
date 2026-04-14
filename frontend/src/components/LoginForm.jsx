import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/store';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FormField, FormValidator, useFormValidation } from './FormField';
import authAPI from '../api/auth';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useFormValidation({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ validation
    const isValid = form.validate({
      email: FormValidator.email,
      password: FormValidator.password,
    });

    if (!isValid) return;

    try {
      setIsLoading(true);

      console.log("Login Attempt:", form.values);

      const response = await authAPI.login(
        form.values.email,
        form.values.password
      );

      console.log("FULL RESPONSE:", response);

      // 🔥 SAFE USER FETCH (ALL CASES COVERED)
      const user =
        response?.data?.user ||
        response?.data?.data?.user ||
        response?.user ||
        {};

      // 🔥 SAFE TOKEN FETCH
      const token =
        response?.data?.token ||
        response?.data?.data?.token ||
        response?.token;

      // ❗ अगर token ही नहीं आया
      if (!token) {
        toast.error("Login failed: Token missing");
        return;
      }

      // 🔥 FINAL USER DATA (IMPORTANT FIX)
      const userData = {
        _id: user?._id || user?.id,
        name: user?.name || form.values.email.split('@')[0],
        email: user?.email || form.values.email,
      };

      // console.log("FINAL USER DATA:", userData);
      // console.log("TOKEN:", token);
      // console.log("✅ SAVING USER:", userData);

      // ❗ अगर _id missing है
      if (!userData._id) {
        console.error("❌ USER ID MISSING");
        toast.error("Login error: User ID missing");
        return;
      }

      // ✅ REDUX
      dispatch(login({
        user: userData,
        token: token
      }));

      // ✅ LOCAL STORAGE
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      toast.success("Login successful");

      form.resetForm();
      navigate("/");

    } catch (error) {
      console.error("Login Error:", error);

      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Invalid email or password";

      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>

      {/* Email */}
      <FormField
        label="Email Address"
        type="email"
        name="email"
        value={form.values.email}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        placeholder="you@example.com"
        error={form.touched.email ? form.errors.email : null}
        required
      />

      {/* Password */}
      <div>
        <label className="text-sm font-semibold block mb-2 text-gray-700">
          Password <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.values.password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="Enter your password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
      </div>

      {/* Forgot */}
      <div className="flex justify-between text-sm">
        <label className="flex gap-2">
          <input type="checkbox" />
          Remember me
        </label>

        <Link to="/forgot-password" className="text-blue-600">
          Forgot password?
        </Link>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 rounded-lg text-white ${
          isLoading ? "bg-gray-400" : "bg-blue-600"
        }`}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>

      {/* Signup */}
      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600">
          Sign Up
        </Link>
      </p>

    </form>
  );
};

export default LoginForm;