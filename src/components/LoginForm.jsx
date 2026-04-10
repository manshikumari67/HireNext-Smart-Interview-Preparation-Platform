import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiCheckCircle } from 'react-icons/hi';
import { FormField, FormValidator, useFormValidation } from './FormField';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useFormValidation({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const isValid = form.validate({
      email: FormValidator.email,
      password: FormValidator.password,
    });

    if (!isValid) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        name: form.values.email.split('@')[0],
        email: form.values.email,
      };

      dispatch(login({ 
        user: userData, 
        token: 'mock-token-' + Date.now() 
      }));
      
      toast.success('Login successful!');
      form.resetForm();
      navigate('/');
      setIsLoading(false);
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
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
            className={`
              w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
              ${form.touched.password && form.errors.password
                ? 'border-red-300 bg-red-50 focus:border-red-500'
                : 'border-gray-300 bg-gray-50 focus:border-blue-500'
              }
              focus:outline-none focus:ring-2
            `}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 transition-colors hover:text-blue-600"
          >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </button>
        </div>
        {form.touched.password && form.errors.password && (
          <p className="text-sm text-red-500 mt-2">{form.errors.password}</p>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer text-gray-700">
          <input type="checkbox" className="w-4 h-4 rounded" />
          Remember me
        </label>
        <a href="#" className="font-semibold transition-colors text-blue-600 hover:text-blue-700">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2
          ${isLoading 
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30'
          }
        `}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            Signing in...
          </>
        ) : (
          <>
            <HiCheckCircle size={20} />
            Sign In
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <a href="/signup" className="font-semibold transition-colors text-blue-600 hover:text-blue-700">
          Sign Up
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
