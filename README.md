# 🚀 HireNext – Smart Interview Preparation Platform

> A full-stack web application designed to help users prepare for technical interviews with AI-powered questions, discussion forums, quizzes, leaderboards, and performance tracking.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [API Endpoints](#-api-endpoints)
- [Responsive Design](#-responsive-design)
- [Deployment](#-deployment)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)
- [Support](#-support)

---

## 📌 Overview

HireNext is a comprehensive interview preparation platform that combines:
- **AI-powered Q&A generation** using Mistral API
- **Interactive discussion forums** for peer learning
- **Topic-based quiz system** with instant feedback
- **Performance tracking** with leaderboard rankings
- **Secure authentication** with JWT tokens
- **Responsive design** for all devices

Perfect for developers preparing for technical interviews across multiple domains.

---

## 🌟 Features

### 🧠 AI-Powered Q&A Generation
- Generates interview questions and answers using Mistral AI
- Covers key technical topics:
  - JavaScript
  - React.js
  - DBMS (Database Management Systems)
  - System Design
  - HTML & CSS
  - Computer Networks
- Smart content delivery with caching

### 💬 Discussion Forum
- **Post Questions** - Share your doubts with the community
- **Edit/Delete** - Update or remove your posts
- **Add Answers** - Contribute to community knowledge
- **Smart Filtering** - Only user-posted content (no AI mix)
- **Like & Accept** - Mark helpful answers

### 📝 Quiz System
- **Topic-based MCQs** - Practice with multiple-choice questions
- **Timer-based Quizzes** - Real interview-like experience
- **Instant Scoring** - Immediate feedback after submission
- **Result Analytics** - View detailed performance metrics
- **History Tracking** - Review past quiz attempts

### 🔐 Authentication & Security
- **JWT-based Authentication** - Secure token-based login
- **Email OTP Verification** - Two-factor authentication
- **Protected Routes** - Role-based access control
- **Persistent Sessions** - Stay logged in across sessions
- **Password Hashing** - bcryptjs with 10 salt rounds

### 👤 User Profile & Statistics
- **Profile Management** - Update name and personal info
- **Performance Metrics** - Track scores and averages
- **Quiz History** - View all quiz attempts with timestamps
- **Achievement Tracking** - Monitor progress over time
- **Profile Editing** - Update user information anytime

### 🏆 Leaderboard System
- **Global Rankings** - Compare with all users
- **User Rankings** - Find your position
- **Performance Comparison** - See top performers
- **Stat Aggregation** - Total scores, averages, attempts

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React.js** | Dynamic UI components |
| **Tailwind CSS** | Responsive styling |
| **Redux Toolkit** | State management |
| **React Router** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **Vite** | Build tool & dev server |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Nodemailer** | Email service |

### AI Integration
| Service | Purpose |
|---------|---------|
| **Mistral API** | AI-powered Q&A generation |

### Deployment Platforms
- **Frontend**: Vercel / Netlify
- **Backend**: Render / Railway / AWS
- **Database**: MongoDB Atlas

---

## 🐧 Project Structure

```
HireNext/
├── frontend/
│   ├── public/
│   │   └── site.webmanifest
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── SignUpForm.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── ...
│   │   ├── pages/               # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Quiz.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   └── ...
│   │   ├── api/                 # API service files
│   │   │   ├── auth.js
│   │   │   ├── quiz.js
│   │   │   └── ...
│   │   ├── store/               # Redux store configuration
│   │   ├── context/             # React Context (Theme, etc.)
│   │   ├── hooks/               # Custom React hooks
│   │   ├── data/                # Static data files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/         # Business logic (6 controllers)
│   │   ├── models/              # Database schemas (6 models)
│   │   ├── routes/              # API routes (6 route files)
│   │   ├── middleware/          # Custom middleware
│   │   ├── config/              # Configuration files
│   │   ├── services/            # Utility services
│   │   ├── utils/               # Helper functions
│   │   └── server.js            # Main entry point
│   ├── .env                     # Environment variables (template)
│   ├── .gitignore
│   ├── package.json
│   ├── README.md                # Backend documentation
│   └── SETUP.md                 # Quick start guide
│
├── README.md                    # This file (project overview)
├── PROJECT_SUMMARY.md           # Backend summary
├── DEBUGGING_GUIDE.md
├── QUICK_FIX_SUMMARY.md
├── RESPONSIVE_IMPROVEMENTS.md
└── .gitignore

```

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** v14+ and npm
- **MongoDB** (local or MongoDB Atlas)
- **Git** for version control
- **Code Editor** (VS Code recommended)

### 🔹 Step 1: Clone Repository

```bash
git clone https://github.com/your-username/hirenext.git
cd hirenext
```

### 🔹 Step 2: Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd ../backend
npm install
```

### 🔹 Step 3: Configure Environment Variables

Create `.env` file in the `backend` folder:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/nexthire
# OR use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/nexthire

# Authentication
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# Email Configuration (Gmail with App Password)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your_app_password_here
EMAIL_SMTP=smtp.gmail.com
EMAIL_PORT=587

# Frontend URL
FRONTEND_URL=http://localhost:5173

# OTP Configuration
OTP_EXPIRY=10

# AI Integration
MISTRAL_API_KEY=your_mistral_api_key_here
```

### 🔹 Step 4: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [mongodb.com](https://mongodb.com)
2. Create a cluster and get connection string
3. Update `MONGODB_URI` in `.env`
4. Add your IP to IP Whitelist

### 🔹 Step 5: Run the Application

**Start Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Start Frontend (in new terminal):**
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🌐 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### 🔐 Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register new user |
| POST | `/auth/send-otp` | Send OTP to email |
| POST | `/auth/verify-otp` | Verify OTP |
| POST | `/auth/login` | Login & get JWT token |

### 👤 User Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user/profile` | Get user profile |
| PUT | `/user/update` | Update profile |
| PUT | `/user/stats/update` | Update user statistics |

### ❓ Question Endpoints (Q&A Forum)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/questions/:topic` | Get questions by topic |
| GET | `/questions/detail/:id` | Get single question |
| POST | `/questions` | Create new question |
| PUT | `/questions/:id` | Update question |
| DELETE | `/questions/:id` | Delete question |

### 💬 Answer Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/answers/:questionId` | Get answers for question |
| POST | `/answers` | Post an answer |
| PUT | `/answers/:id/like` | Like/unlike answer |
| PUT | `/answers/:id/accept` | Mark as accepted answer |
| DELETE | `/answers/:id` | Delete answer |

### 🎯 Quiz Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/quiz/:topic` | Get quiz for topic |
| POST | `/quiz/submit` | Submit quiz & calculate score |
| GET | `/quiz/results/list` | Get user's quiz history |
| GET | `/quiz/result/:resultId` | Get result details |

### 🏆 Leaderboard Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/leaderboard` | Get global leaderboard |
| GET | `/leaderboard/user/rank` | Get user's rank |

📖 **For detailed API documentation**, see [backend/README.md](./backend/README.md)

---

## 📱 Responsive Design

HireNext is built with mobile-first responsive design:

✅ **Mobile Devices** - Optimized for phones (320px and up)
✅ **Tablets** - Perfect tablet experience (768px and up)
✅ **Desktop** - Full-featured desktop layout (1024px and up)
✅ **Wide Screens** - Adapts gracefully to large displays (1536px and up)

**Responsive Features:**
- Fluid typography that scales with viewport
- Flexible grid layouts using Tailwind CSS
- Touch-friendly button sizes
- Optimized navigation for mobile
- Responsive images and spacing
- Dark mode support ready

---

## 📦 Build for Production

### Frontend Production Build
```bash
cd frontend
npm run build
# Creates optimized build in dist/ folder
```

### Backend Production Ready
The backend is production-ready with:
- Input validation on all routes
- Error handling middleware
- CORS protection
- JWT token security
- Password hashing (bcryptjs)
- Environment-based configuration

---

## 🚀 Deployment

### Frontend Deployment
**Option 1: Vercel**
```bash
npm install -g vercel
vercel
```

**Option 2: Netlify**
```bash
npm run build
# Drag & drop dist/ folder to Netlify
```

### Backend Deployment

**Option 1: Render**
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables
5. Deploy with one click

**Option 2: Railway**
1. Connect GitHub repository
2. Railway auto-detects Node.js
3. Add MongoDB Atlas URI
4. Deploy automatically on push

**Option 3: AWS / Heroku / Azure**
- Platform-specific documentation available
- Ensure MongoDB Atlas is used (not local MongoDB)
- Update `FRONTEND_URL` to production domain

---

## 🧪 Future Enhancements

- [ ] 🌙 Dark mode toggle
- [ ] 🔖 Bookmark favorite questions
- [ ] 💬 Real-time chat for discussions
- [ ] 📊 Advanced analytics dashboard
- [ ] 📱 Mobile app (React Native)
- [ ] 🎤 Video interview preparation
- [ ] 🤖 AI-powered feedback on answers
- [ ] 🌍 Multi-language support
- [ ] 🔔 Push notifications
- [ ] 💾 Offline mode support

---

## 🔧 Troubleshooting & Support

### Common Issues
- **MongoDB Connection Error**: Ensure MongoDB is running or Atlas connected
- **CORS Error**: Verify `FRONTEND_URL` in `.env` matches frontend origin
- **API Not Responding**: Check backend is running on port 5000
- **JWT Token Invalid**: Clear localStorage and re-login

📖 **Detailed Help**: See [backend/README.md](./backend/README.md) and [backend/SETUP.md](./backend/SETUP.md)

---

## 👨‍💻 Author

**Manshi Kumari** 
- 🚀 Full-Stack Developer
- 💡 Tech Enthusiast
- 🎯 Interview Preparation Specialist

---

## 📜 License

This project is open source and available under the MIT License.

---

## ⭐ Support & Contribution

### Love HireNext? 
- ⭐ **Star this repository** on GitHub
- 🐛 **Report issues** if you find bugs
- 💡 **Suggest features** for improvements
- 🤝 **Contribute** with pull requests

### Contributing
Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Made with ❤️ by Manshi Kumari**
