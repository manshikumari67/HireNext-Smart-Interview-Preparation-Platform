import React from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

const TopicCard = ({ topic, color = "from-pink-600 to-blue-600" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/qa/${topic}`);
  };

  const colors = {
    JavaScript: "from-yellow-400 via-yellow-500 to-orange-600",
    React: "from-cyan-400 to-blue-600",
    DBMS: "from-emerald-400 to-teal-600",
    "System Design": "from-purple-500 to-pink-600",
    HTML: "from-orange-400 to-red-600",
    "Computer Networks": "from-indigo-500 to-purple-600",
  };

  const selectedColor = colors[topic] || color;

  return (
    <div
      onClick={handleClick}
      className="
        group relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-500
        hover:scale-105 hover:shadow-2xl shadow-lg
      "
    >
      {/* Glassmorphism background */}
      <div className={`
        absolute inset-0 bg-gradient-to-r ${selectedColor} opacity-90
        transition-opacity duration-300 group-hover:opacity-100
      `}></div>

      {/* Animated gradient overlay */}
      <div className="
        absolute -top-full inset-x-0 h-full bg-gradient-to-b from-white/20 to-transparent
        group-hover:top-0 transition-all duration-500
      "></div>

      {/* Content */}
      <div className="relative p-8 sm:p-10 text-center text-white min-h-[200px] flex flex-col justify-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 transition-transform duration-300 group-hover:scale-110">
          {topic}
        </h2>

        {/* Subtle description */}
        <p className="text-white/70 text-sm mb-6 group-hover:text-white transition-colors duration-300">
          Master interview questions & solutions
        </p>

        {/* Button */}
        <button className="
          px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300
          flex items-center justify-center gap-2 mx-auto group-hover:gap-3
          bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30
        ">
          <span>Explore</span>
          <HiArrowRight className="transition-transform group-hover:translate-x-1" />
        </button>

        {/* Bottom accent bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-white/50 w-0 group-hover:w-full transition-all duration-500"></div>
      </div>
    </div>
  );
};

export default TopicCard;
