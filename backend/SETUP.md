# ⚡ NextHire Backend - Quick Start Guide

> Get the NextHire backend up and running in 5 minutes. Step-by-step setup with MongoDB, environment configuration, and testing commands.

---

## 📑 Table of Contents

- [Prerequisites](#-prerequisites)
- [Installation](#-installation-5-minutes)
- [Quick Test](#-quick-test)
- [Seed Sample Data](#-seed-sample-data)
- [Frontend Integration](#-frontend-integration)
- [Common Workflows](#-common-workflows)
- [Troubleshooting](#-troubleshooting)
- [Next Steps](#-next-steps)

---

## ✅ Prerequisites

Before you start, ensure you have:
- **Node.js** v14+ (check: `node --version`)
- **npm** (comes with Node.js)
- **MongoDB** (local or MongoDB Atlas account)
- **Code Editor** (VS Code recommended)

---

## 📦 Installation (5 minutes)

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

✅ This installs all required packages (Express, MongoDB, JWT, etc.)

### Step 2: Setup MongoDB

**Option A: Local MongoDB** (Simple for development)
```bash
# Make sure MongoDB is installed and running
mongod
```

**Option B: MongoDB Atlas** (Recommended for production)
1. Go to [mongodb.com](https://www.mongodb.com)
2. Create a free account
3. Create a cluster
4. Get connection string
5. Whitelist your IP address
6. Copy connection string for `.env` file

### Step 3: Configure Environment Variables

Create a `.env` file in the `backend` folder:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/nexthire
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/nexthire

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d

# Email Configuration (Gmail SMTP)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your_app_password_here
EMAIL_SMTP=smtp.gmail.com
EMAIL_PORT=587

# Frontend Configuration
FRONTEND_URL=http://localhost:5173

# OTP Configuration
OTP_EXPIRY=10
```

#### 🔑 Gmail Setup for Email Service

1. **Enable 2-Step Verification:**
   - Go to Gmail Security settings
   - Enable 2-Step Verification

2. **Generate App Password:**
   - Security settings → App passwords
   - Select Mail and Windows Computer
   - Copy the generated 16-character password
   - Use this in `EMAIL_PASSWORD` (not your regular Gmail password)

### Step 4: Start the Backend Server

```bash
npm run dev
```

**Expected Output:**
```
✅ MongoDB Connected: localhost:27017
🚀 NextHire Backend Server running on port 5000
📝 Environment: development
🌐 Frontend URL: http://localhost:5173
```

✅ Backend is now running on `http://localhost:5000`

---

## 🧪 Quick Test

### Test 1: Check Backend Health
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{ "status": "OK" }
```

### Test 2: Get Quiz Questions
```bash
curl http://localhost:5000/api/quiz/JavaScript
```

**Expected Response:** Array of 5 quiz questions

### Test 3: Get Q&A Questions
```bash
curl http://localhost:5000/api/questions/JavaScript
```

**Expected Response:** Pagination object with questions

### Test 4: Get Global Leaderboard
```bash
curl http://localhost:5000/api/leaderboard
```

**Expected Response:** Array of top users

---

## 🌱 Seed Sample Data

Populate quiz database with 25 pre-made questions:

```bash
node src/utils/seedData.js
```

**Expected Output:**
```
✅ MongoDB Connected
Cleared existing quiz data
✅ Successfully seeded 25 quiz questions

📊 Topics distributed:
   JavaScript: 5 questions
   React: 5 questions
   DBMS: 5 questions
   Node.js: 5 questions
   MongoDB: 5 questions

✅ Seeding completed successfully!
```

✅ Now visit `http://localhost:5000/api/quiz/:topic` to see questions

---

## 🔗 Frontend Integration

### Step 1: Create API Client in Frontend

Create `frontend/src/api/client.js`:

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Automatically add JWT token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
```

### Step 2: Use API in Components

**Login Example:**
```javascript
import API from '../api/client';

const handleLogin = async (email, password) => {
  try {
    const response = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    // Store user data in Redux/Context
    navigate('/home');
  } catch (error) {
    console.error('Login failed:', error.response.data.message);
  }
};
```

**Get Quiz Example:**
```javascript
const fetchQuiz = async (topic) => {
  try {
    const response = await API.get(`/quiz/${topic}`);
    setQuizQuestions(response.data.data);
  } catch (error) {
    console.error('Failed to fetch quiz:', error);
  }
};
```

**Submit Quiz Example:**
```javascript
const submitQuiz = async (topic, answers, timeTaken) => {
  try {
    const response = await API.post('/quiz/submit', {
      topic,
      answers,
      timeTaken
    });
    // Handle result
    navigate('/result', { state: response.data.result });
  } catch (error) {
    console.error('Quiz submission failed:', error);
  }
};
```

---

## 💡 Common Workflows

### 1️⃣ User Registration Flow
```bash
# Step 1: Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"test123"}'

# Step 2: Send OTP (OTP goes to email)
curl -X POST http://localhost:5000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com"}'

# Step 3: Verify OTP (use OTP from email)
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","otp":"123456"}'

# Step 4: Login (get JWT token)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"test123"}'

# Response includes token - save it!
```

### 2️⃣ Quiz Workflow
```bash
# Step 1: Get Quiz Questions
curl http://localhost:5000/api/quiz/JavaScript

# Step 2: Submit Quiz (requires token)
curl -X POST http://localhost:5000/api/quiz/submit \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "topic":"JavaScript",
    "answers":[{"selectedAnswer":0},{"selectedAnswer":1},...],
    "timeTaken":300
  }'

# Step 3: Get Quiz Results
curl -X GET http://localhost:5000/api/quiz/results/list \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3️⃣ Q&A Forum Workflow
```bash
# Step 1: Get Questions by Topic
curl http://localhost:5000/api/questions/JavaScript?page=1

# Step 2: Get Single Question with Answers
curl http://localhost:5000/api/questions/detail/QUESTION_ID

# Step 3: Post an Answer (requires token)
curl -X POST http://localhost:5000/api/answers \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "questionId":"QUESTION_ID",
    "answer":"My answer text"
  }'

# Step 4: Like an Answer (requires token)
curl -X PUT http://localhost:5000/api/answers/ANSWER_ID/like \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 4️⃣ Leaderboard Workflow
```bash
# Get Global Leaderboard (public)
curl http://localhost:5000/api/leaderboard

# Get User's Rank (requires token)
curl -X GET http://localhost:5000/api/leaderboard/user/rank \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📁 Key Files Reference

| File | Purpose |
|------|---------|
| `src/server.js` | Main server entry point |
| `src/config/database.js` | MongoDB connection setup |
| `src/models/` | Database schemas (6 files) |
| `src/controllers/` | Business logic (6 files) |
| `src/routes/` | API routes (6 files) |
| `src/middleware/` | Custom middleware (3 files) |
| `src/utils/` | Helper utilities (jwt, email, etc.) |
| `.env` | Configuration variables (create this) |
| `package.json` | Project dependencies |

---

## 🆘 Troubleshooting

### ❌ MongoDB Connection Error
```
Error connecting to MongoDB: MongoNetworkError
```

**Solutions:**
- Ensure MongoDB is running: `mongod` (for local)
- Check `MONGODB_URI` in `.env` is correct
- For Atlas: verify IP is whitelisted
- For local: verify port 27017 is available

---

### ❌ Email/OTP Not Sending
```
Email sending failed
```

**Solutions:**
- For Gmail: use App Password, not regular password
- First enable 2-Step Verification on Gmail
- Check `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`
- Verify email credentials are correct
- Check spam folder for OTP email

---

### ❌ Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**
```bash
# Option 1: Kill process on port 5000
# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:5000 | xargs kill -9

# Option 2: Use different port
# Change PORT=5000 to PORT=5001 in .env
```

---

### ❌ CORS Error from Frontend
```
Access to XMLHttpRequest blocked by CORS
```

**Solutions:**
- Update `FRONTEND_URL` in `.env` to match frontend URL
- Must match exactly: `http://localhost:5173` (no trailing slash)
- Restart backend after `.env` changes
- Check backend CORS middleware is enabled

---

### ❌ JWT Token Invalid
```
No authorized token, access denied
```

**Solutions:**
- Token must be in `Authorization` header as `Bearer <token>`
- Token expires after 7 days - login again
- Copy token exactly from login response
- Don't include "Bearer" when storing, only when sending in header

---

## 🔐 Security Checklist

Before using in production:
- [ ] Change `JWT_SECRET` to a long random string (32+ characters)
- [ ] Set `NODE_ENV=production`
- [ ] Use MongoDB Atlas (not local database)
- [ ] Update `FRONTEND_URL` to production domain
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Enable password reset functionality
- [ ] Setup error logging service
- [ ] Backup MongoDB regularly
- [ ] Review security headers

---

## 📊 Database Collections

After running for first time, you'll have these collections in MongoDB:

```
Database: nexthire
├── users           # User accounts and stats
├── otps            # Email OTP records (auto-delete)
├── questions       # Q&A forum questions
├── answers         # Answers to questions
├── quizzes         # Quiz MCQ questions
└── quizresults     # User quiz attempt results
```

---

## 🚀 Next Steps

1. ✅ Backend running on `http://localhost:5000`
2. ✅ MongoDB connected and working
3. ✅ Sample data seeded (optional)
4. → Start frontend development
5. → Update frontend API calls to use backend
6. → Test authentication workflows
7. → Deploy to production

---

## 💻 Development Tips

1. **Terminal Logs**: Check backend terminal for request logs and errors
2. **Postman**: Use Postman to test APIs before frontend integration
3. **Network Tab**: Check browser Network tab to verify API calls
4. **Nodemon**: Backend automatically restarts on file changes
5. **Token Storage**: Save JWT token in localStorage for frontend
6. **Error Messages**: Backend returns clear error messages in responses

---

## 📖 Detailed Documentation

For more information, see:
- 📘 **Full API Docs**: [backend/README.md](./README.md)
- 📝 **Project Summary**: [PROJECT_SUMMARY.md](../PROJECT_SUMMARY.md)
- 🎯 **Main Overview**: [Root README.md](../README.md)
- 🧪 **Testing Examples**: [API_TESTING.js](./API_TESTING.js)
- 🔗 **React Integration**: [FRONTEND_INTEGRATION.js](./FRONTEND_INTEGRATION.js)

---

## 🎓 Valid Topic Values

For all topic-based endpoints, use these exact strings:
- `JavaScript`
- `React`
- `DBMS`
- `Node.js`
- `MongoDB`
- `System Design`

---

## 💡 Pro Tips

1. **Seed First**: Run `node src/utils/seedData.js` after setup for test data
2. **Check Status**: Visit `http://localhost:5000/api/health` to verify backend
3. **Save Token**: Copy JWT from login response for testing protected routes
4. **Test Endpoints**: Use provided cURL examples to test before frontend code
5. **Watch Logs**: Monitor backend terminal for request details and errors
6. **Keep .env Safe**: Never commit `.env` file - it's in .gitignore

---

## ✅ Verification Checklist

- [ ] Node.js installed (`node --version`)
- [ ] npm working (`npm --version`)
- [ ] MongoDB installed/accessible
- [ ] `.env` file created with all variables
- [ ] `npm install` completed
- [ ] `npm run dev` starts without errors
- [ ] Health check returns OK
- [ ] Quiz endpoint returns questions
- [ ] Leaderboard endpoint works
- [ ] Ready for frontend integration!

---

**Happy Coding! 🎉**

For help, check terminal logs and browser DevTools Network tab.

---

**Version**: 1.0.0 | **Last Updated**: January 2024