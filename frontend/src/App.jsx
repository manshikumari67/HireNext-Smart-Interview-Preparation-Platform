import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import NavBar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AskQuestion from './pages/AskQuestion';
import Quiz from './pages/Quiz';
import QA from './pages/QA';
import Result from './pages/Result';
import Profile from './pages/Profile';
import EditProfile from "./pages/EditProfile";
import Leaderboard from './pages/Leaderboard';
import { questions } from './data/questions';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from "./components/ScrollToTop";
import VerifyOtp from './pages/VerifyOtp';
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import { login } from './store/store';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const location = useLocation();

  // 🔥 SAFE RESTORE (NO CRASH)
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      const user = storedUser ? JSON.parse(storedUser) : null;

      if (user && token) {
        dispatch(login({ user, token }));
      }
    } catch (error) {
      localStorage.removeItem("user"); // corrupted data remove
      localStorage.removeItem("token");
    }
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-300 via-white to-purple-700 flex flex-col">
      
      <NavBar />
      <ScrollToTop />

      <div className="flex-1">
        <Routes location={location}>

          {/* PUBLIC ROUTES */}
          <Route path='/' element={<Home questions={questions} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />

          {/* 🔒 PRIVATE ROUTES */}
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path='/askQuestion' element={<AskQuestion />} />
            <Route path='/qa/:topic' element={<QA />} />
            <Route path='/result' element={<Result />} />
          </Route>

        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;