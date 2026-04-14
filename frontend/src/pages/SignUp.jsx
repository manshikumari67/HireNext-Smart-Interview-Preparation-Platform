// src/pages/SignUp.jsx
import React from "react";
import SignUpForm from "../components/SignUpForm";
import BackgroundImage from '../images/background.png';

const SignUp = ({ setIsLoggedIn }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 sm:p-6"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-sm bg-white flex flex-col items-center gap-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-purple-900">Sign Up</h2>
        <SignUpForm setIsLoggedIn={setIsLoggedIn} />
      </div>
    </div>
  );
};

export default SignUp;
