import React from "react";
import LoginForm from "../components/LoginForm";
import BackgroundImage from '../images/background.png'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 sm:p-6"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className="w-full max-w-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-sm bg-white">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Continue your learning journey
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

