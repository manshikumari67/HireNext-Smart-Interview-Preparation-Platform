import React from 'react';
import { HiCheckCircle, HiXCircle, HiClock } from 'react-icons/hi';

const ProgressCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color = 'blue',
  percentage = null 
}) => {
  const colorClasses = {
    blue: 'from-blue-100 to-cyan-100 border-blue-200',
    green: 'from-emerald-100 to-teal-100 border-emerald-200',
    red: 'from-red-100 to-pink-100 border-red-200',
    purple: 'from-purple-100 to-pink-100 border-purple-200',
    amber: 'from-amber-100 to-orange-100 border-amber-200',
  };

  return (
    <div className={`
      relative rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300
      hover:scale-105 hover:shadow-xl
      bg-gradient-to-br ${colorClasses[color]}
      shadow-lg
    `}>
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative p-6 sm:p-8">
        {/* Icon */}
        <div className="
          w-12 h-12 rounded-xl flex items-center justify-center mb-4
          bg-white/50
        ">
          {Icon && <Icon size={24} className={`text-${color}-600`} />}
        </div>

        {/* Title */}
        <p className="text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wide text-gray-600">
          {title}
        </p>

        {/* Main value */}
        <h3 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">
          {value}
        </h3>

        {/* Progress bar */}
        {percentage !== null && (
          <div className="
            w-full h-1.5 rounded-full mb-3 overflow-hidden
            bg-white/50
          ">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="text-xs sm:text-sm text-gray-600">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgressCard;
