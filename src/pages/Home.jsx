import React from 'react';
import TopicCard from '../components/TopicCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiArrowRight } from 'react-icons/hi';
import { HiBolt } from 'react-icons/hi2';
import About from '../components/About';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorks from '../components/HowItWorks';
import CallSection from '../components/CallSection';

const Home = ({ questions }) => {
  const { isLoggedIn } = useSelector(state => state.auth);
  const topics = Object.keys(questions);

  return (
    <div>
      {/* Hero Section */}
      <div className={`
        text-center mt-12 sm:mt-20 relative px-4
        transition-colors duration-300
      `}>
        <div className="inline-block mb-4 px-4 py-2 rounded-full backdrop-blur-sm bg-blue-100 border border-blue-200 text-blue-700">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <HiBolt size={16} />
            Master Technical Interviews
          </div>
        </div>

        <h2 className="text-4xl sm:text-5xl font-medium mb-4 text-gray-900">
          Welcome to
        </h2>
        
        <h1 className="text-6xl sm:text-7xl md:text-8xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold mb-6">
          HireNext
        </h1>

        {/* Decorative underline */}
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-pink-600 mx-auto rounded-full mb-8"></div>
        
        <p className="text-lg sm:text-xl max-w-3xl mx-auto pt-4 px-4 leading-relaxed text-gray-700">
          Practice curated interview questions with detailed explanations. Build confidence for your dream role.
        </p>

        {/* CTA Button */}
        <div className="mt-12">
          <Link to={isLoggedIn ? "/quiz" : "/login"} className="inline-block">
            <button className="px-8 sm:px-12 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/60">
              {isLoggedIn ? 'Start Quiz' : 'Get Started'}
              <HiArrowRight size={20} />
            </button>
          </Link>
        </div>

        <div className="mt-12 text-center text-sm text-gray-600">
          <p className="font-semibold">Join thousands of students ace their interviews</p>
        </div>
      </div>

      {/* Topics Section */}
      <div className="p-8 sm:p-12 mt-20 rounded-t-3xl shadow-2xl transition-colors duration-300 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Explore Interview Topics
            </h2>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-700">
              Practice questions across 6 core technical domains. Track progress, get instant feedback, and build the skills you need.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {topics.map((topic) => (
              <TopicCard key={topic} topic={topic} />
            ))}
          </div>
        </div>
      </div>

      <About/>
      <FeaturesSection/>
      <CallSection/>
      <HowItWorks/>
    </div>
  );
};

export default Home;
