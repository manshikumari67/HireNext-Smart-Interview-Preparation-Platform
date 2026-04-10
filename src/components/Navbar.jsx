import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/store';
import { toast } from 'react-toastify';
import { LuBrain } from 'react-icons/lu';
import { HiMenu, HiX, HiHome, HiPlusCircle, HiLightBulb } from 'react-icons/hi';
import { HiOutlineTrophy } from "react-icons/hi2";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged Out');
  };

  const navLinkClass = (path) => `
    flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
    ${isActive(path) 
      ? 'bg-blue-50 text-blue-600' 
      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
    }
  `;

  const authBtnClass = `
    py-2 px-4 rounded-lg transition-all duration-200 font-medium text-sm
    bg-blue-50 text-blue-600 hover:bg-blue-100
  `;

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full h-[65px] flex justify-between items-center sticky top-0 z-50 bg-white/95 shadow-lg backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          {/* Left: Logo */}
          <div className="flex items-center ml-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                <LuBrain className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HireNext
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-x-4 text-base">
              <li><Link to="/" className={navLinkClass('/')}><HiHome size={18} /><span>Home</span></Link></li>
              <li>
                <Link to="/askQuestion" className={navLinkClass('/askQuestion')}>
                  <HiPlusCircle size={18} />
                  <span>Ask Question</span>
                </Link>
              </li>
              <li><Link to="/quiz" className={navLinkClass('/quiz')}><HiLightBulb size={18} /><span>Quiz</span></Link></li>
              <li><Link to="/result" className={navLinkClass('/result')}><HiOutlineTrophy size={18} /><span>Results</span></Link></li>
            </ul>
          </nav>

          {/* Right: Auth buttons */}
          <div className="flex items-center gap-3">
            {/* Desktop Auth */}
            <div className="hidden md:flex gap-3">
              {!isLoggedIn ? (
                <>
                  <Link to="/login">
                    <button className={authBtnClass}>Log In</button>
                  </Link>
                  <Link to="/signup">
                    <button className={authBtnClass}>Sign Up</button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/profile">
                    <button className={authBtnClass}>
                      {user?.name || 'Profile'}
                    </button>
                  </Link>
                  <button onClick={handleLogout} className={authBtnClass}>
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile: Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 transition-all duration-200 backdrop-blur-sm">
            <div className="px-4 pt-3 pb-4 space-y-1">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass('/')}>
                <HiHome size={18} /> Home
              </Link>
              <Link to="/askQuestion" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass('/askQuestion')}>
                <HiPlusCircle size={18} /> Ask Question
              </Link>
              <Link to="/quiz" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass('/quiz')}>
                <HiLightBulb size={18} /> Quiz
              </Link>
              <Link to="/result" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass('/result')}>
                <HiOutlineTrophy size={18} /> Results
              </Link>

              {/* Mobile Auth buttons */}
              <div className="pt-3 border-t mt-3 border-gray-200">
                {!isLoggedIn ? (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="w-full py-2 rounded-lg mb-2 font-medium transition-all bg-blue-600 text-white hover:bg-blue-700">
                        Log In
                      </button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="w-full py-2 rounded-lg font-medium transition-all bg-gray-600 text-white hover:bg-gray-700">
                        Sign Up
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="w-full py-2 rounded-lg mb-2 font-medium transition-all bg-blue-600 text-white hover:bg-blue-700">
                        Profile
                      </button>
                    </Link>
                    <button 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full py-2 rounded-lg font-medium transition-all bg-red-100 text-red-700 hover:bg-red-200"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
