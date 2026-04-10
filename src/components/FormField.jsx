import React, { useCallback } from 'react';
import { HiExclamationCircle, HiCheckCircle } from 'react-icons/hi';

export const FormField = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  placeholder,
  required = false,
  ...props 
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold block text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
            placeholder-opacity-50
            ${error 
              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20'
              : 'border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-blue-500/20'
            }
            focus:outline-none focus:ring-2
          `}
          {...props}
        />
        
        {!error && value && (
          <HiCheckCircle className="absolute right-3 top-3.5 text-green-500" size={20} />
        )}
        {error && (
          <HiExclamationCircle className="absolute right-3 top-3.5 text-red-500" size={20} />
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <HiExclamationCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
};

export const FormValidator = {
  email: (value) => {
    if (!value) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
    return null;
  },
  password: (value, minLength = 8) => {
    if (!value) return 'Password is required';
    if (value.length < minLength) return `Password must be at least ${minLength} characters`;
    if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
    return null;
  },
  name: (value) => {
    if (!value) return 'Name is required';
    if (value.trim().length < 2) return 'Name must be at least 2 characters';
    return null;
  },
  required: (value, fieldName = 'This field') => {
    if (!value || value.trim() === '') return `${fieldName} is required`;
    return null;
  },
  minLength: (value, minLength, fieldName = 'This field') => {
    if (value.length < minLength) return `${fieldName} must be at least ${minLength} characters`;
    return null;
  },
};

export const useFormValidation = (initialValues) => {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const validate = useCallback((validators) => {
    const newErrors = {};
    Object.entries(validators).forEach(([field, validator]) => {
      const error = typeof validator === 'function' ? validator(values[field]) : null;
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    resetForm,
    setValues,
  };
};
