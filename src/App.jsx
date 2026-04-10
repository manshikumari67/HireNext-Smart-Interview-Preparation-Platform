// src/App.jsx
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import { questions } from './data/questions';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const location = useLocation();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-300 via-white to-purple-700 flex flex-col">
      <NavBar />
      <ScrollToTop />

      <div className="flex-1">
        <Routes location={location}>
          <Route path='/' element={<Home questions={questions} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/askQuestion' element={<AskQuestion />} />
          <Route path='/quiz' element={<Quiz />} />

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
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
