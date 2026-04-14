# 🎯 NextHire Backend - Project Summary

> A comprehensive Node.js + Express + MongoDB backend powering the NextHire interview preparation platform with AI integration, secure authentication, and rich API endpoints.

---

## 📖 Documentation Structure

This is a **high-level backend summary**. For detailed information:
- 📘 **Complete API Documentation**: See [backend/README.md](./backend/README.md)
- ⚡ **Quick Start Guide**: See [backend/SETUP.md](./backend/SETUP.md)
- 💻 **API Testing Examples**: See `backend/API_TESTING.js`
- 🔗 **Frontend Integration Code**: See `backend/FRONTEND_INTEGRATION.js`

---

## 🎯 Backend Overview

### What is NextHire Backend?
A production-ready REST API built with:
- **Node.js + Express.js** - Scalable, fast server
- **MongoDB + Mongoose** - Flexible, powerful database
- **JWT Authentication** - Secure token-based auth
- **Email OTP Verification** - Two-factor authentication
- **Input Validation** - express-validator on all routes
- **Error Handling** - Centralized middleware for consistency
- **CORS Support** - Ready for frontend integration

### Backend Capabilities
✅ **21 API Endpoints** across 6 resource types
✅ **6 Database Models** with proper schema validation
✅ **Security Features** - JWT, bcrypt, OTP, input validation
✅ **Performance Optimized** - Indexes, pagination, async/await
✅ **Developer Friendly** - Clean code, good documentation
✅ **Frontend Ready** - JSON responses, CORS enabled, sample code

---

## 📊 Database Models (6 Collections)

### 1. **User Collection**
Stores user account information and statistics.

**Fields:**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  isEmailVerified: Boolean,
  score: Number (total across all quizzes),
  totalQuizzesTaken: Number,
  averageScore: Number,
  createdAt: Date,
  updatedAt: Date
}
```

**Key Features:**
- Passwords hashed with bcryptjs (10 salt rounds)
- Email uniqueness enforced
- Automatic timestamp management
- Indexes for fast lookups

### 2. **OTP Collection**
Manages one-time passwords for email verification.

**Fields:**
```javascript
{
  _id: ObjectId,
  email: String,
  otp: String (6-digit),
  expiry: Date (10 minutes),
  createdAt: Date
}
```

**Key Features:**
- Auto-expires after 10 minutes
- Referenced in signup flow
- Prevents unauthorized email registration

### 3. **Question Collection**
Stores Q&A forum questions posted by users.

**Fields:**
```javascript
{
  _id: ObjectId,
  question: String,
  answer: String,
  topic: String (enum: JavaScript, React, DBMS, Node.js, MongoDB, System Design),
  author: ObjectId (ref to User),
  likes: Number,
  views: Number,
  answersCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

**Key Features:**
- Author-specific modifications
- Like/view counting
- Topic-based filtering
- Indexed for fast retrieval

### 4. **Answer Collection**
Stores answers posted by users on questions.

**Fields:**
```javascript
{
  _id: ObjectId,
  answer: String,
  questionId: ObjectId (ref to Question),
  author: ObjectId (ref to User),
  likes: Number,
  likedBy: [ObjectId] (array of users who liked),
  isAccepted: Boolean (marked by question author),
  createdAt: Date,
  updatedAt: Date
}
```

**Key Features:**
- Only answer author can delete
- Question author can mark accepted
- Like/unlike toggle functionality
- Tracks who liked the answer

### 5. **Quiz Collection**
Stores pre-defined multiple-choice quiz questions.

**Fields:**
```javascript
{
  _id: ObjectId,
  question: String,
  options: [String] (array of 4 options),
  correctAnswer: Number (0-3),
  explanation: String,
  topic: String (enum),
  difficulty: String (easy, medium, hard),
  createdAt: Date
}
```

**Key Features:**
- Standard MCQ format
- Pre-seeded with 25 questions
- Distributed across 6 topics
- Educational explanations included

### 6. **QuizResult Collection**
Stores user's quiz attempt results and scores.

**Fields:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref to User),
  topic: String,
  totalQuestions: Number,
  correctAnswers: Number,
  score: Number,
  percentage: Number,
  timeTaken: Number (in seconds),
  answers: [{
    questionId: ObjectId,
    selectedAnswer: Number (0-3),
    isCorrect: Boolean
  }],
  createdAt: Date
}
```

**Key Features:**
- Complete attempt history
- Tracks time taken
- Stores user's selections
- Updates user stats on submission

---

## 🔗 API Routes Overview (21 Endpoints)

### Route Organization
The backend is structured with 6 main route files, each handling specific functionality:

#### **Authentication Routes** (4 endpoints)
- `POST /auth/signup` - User registration
- `POST /auth/send-otp` - Send OTP to email
- `POST /auth/verify-otp` - Verify OTP
- `POST /auth/login` - Login with JWT token generation

#### **User Routes** (3 endpoints)
- `GET /user/profile` - Get authenticated user profile
- `PUT /user/update` - Update profile information
- `PUT /user/stats/update` - Update quiz statistics

#### **Question Routes** (5 endpoints)
- `GET /questions/:topic` - Get questions by topic (paginated)
- `GET /questions/detail/:id` - Get single question with answers
- `POST /questions` - Create new question (requires auth)
- `PUT /questions/:id` - Update question (author only)
- `DELETE /questions/:id` - Delete question (author only)

#### **Answer Routes** (5 endpoints)
- `GET /answers/:questionId` - Get all answers for a question
- `POST /answers` - Post new answer (requires auth)
- `PUT /answers/:id/like` - Like/unlike an answer (toggle)
- `PUT /answers/:id/accept` - Mark answer as accepted (author only)
- `DELETE /answers/:id` - Delete answer (author only)

#### **Quiz Routes** (4 endpoints)
- `GET /quiz/:topic` - Get quiz questions by topic
- `POST /quiz/submit` - Submit quiz and calculate score
- `GET /quiz/results/list` - Get user's quiz history
- `GET /quiz/result/:resultId` - Get specific result details

#### **Leaderboard Routes** (2 endpoints)
- `GET /leaderboard` - Get global leaderboard
- `GET /leaderboard/user/rank` - Get current user's rank

---

## 🛠️ Middleware & Utilities

### Middleware (3 files)

#### 1. **authenticate.js**
- Verifies JWT tokens from request headers
- Extracts user ID from token payload
- Attaches user info to request object
- Returns 401 if token invalid/missing
- Protects authenticated routes

#### 2. **validateRequest.js**
- Uses express-validator for input validation
- Validates email format, password strength
- Checks required fields
- Sanitizes inputs to prevent injection
- Returns validation errors with details

#### 3. **errorHandler.js**
- Centralized error handling middleware
- Catches and formats errors consistently
- Returns proper HTTP status codes
- Logs errors for debugging
- Returns user-friendly error messages

### Utilities (3 files)

#### 1. **jwt.js**
- `generateToken()` - Creates JWT tokens with 7-day expiry
- `verifyToken()` - Validates and decodes JWT tokens
- Smart token management for both frontend and backend

#### 2. **emailService.js**
- `sendOTP()` - Generates and sends 6-digit OTP via email
- `generateOTP()` - Creates random 6-digit numbers
- Uses Nodemailer with Gmail SMTP
- Handles email sending with error management

#### 3. **seedData.js**
- Pre-seeds 25 quiz questions into database
- Distributed across 6 topics (5 each)
- Useful for development and testing
- Run with: `node src/utils/seedData.js`

---

## 📁 File Structure

```
backend/
├── src/
│   ├── controllers/              # Business logic (6 files)
│   │   ├── authController.js     # Signup, login, OTP
│   │   ├── userController.js     # Profile & stats
│   │   ├── questionController.js # Q&A forum
│   │   ├── answerController.js   # Answer management
│   │   ├── quizController.js     # Quiz & results
│   │   └── leaderboardController.js # Rankings
│   ├── models/                   # Mongoose schemas (6 files)
│   │   ├── User.js
│   │   ├── OTP.js
│   │   ├── Question.js
│   │   ├── Answer.js
│   │   ├── Quiz.js
│   │   └── QuizResult.js
│   ├── routes/                   # API routes (6 files)
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── questionRoutes.js
│   │   ├── answerRoutes.js
│   │   ├── quizRoutes.js
│   │   └── leaderboardRoutes.js
│   ├── middleware/               # Custom middleware (3 files)
│   │   ├── authenticate.js
│   │   ├── validateRequest.js
│   │   └── errorHandler.js
│   ├── config/
│   │   └── database.js           # MongoDB connection
│   ├── utils/                    # Helper utilities (3 files)
│   │   ├── jwt.js
│   │   ├── emailService.js
│   │   └── seedData.js
│   └── server.js                 # Main entry point
│
├── package.json                  # Dependencies
├── .env                          # Environment variables (template)
├── .gitignore
│
├── README.md                     # Complete API documentation
├── SETUP.md                      # Quick start guide
├── PROJECT_SUMMARY.md            # This file
├── API_TESTING.js                # CURL examples
└── FRONTEND_INTEGRATION.js       # React code samples
```

---

## ✨ Key Features

### 🔒 Security
✅ **Passwords hashed** with bcryptjs (10 salt rounds)
✅ **JWT tokens** for stateless authentication
✅ **Email OTP** verification for signup
✅ **Input validation** on all routes (express-validator)
✅ **Authorization checks** for user-specific operations
✅ **No sensitive data** in API responses
✅ **CORS protection** for cross-origin requests
✅ **MongoDB injection** prevention through Mongoose

### ⚡ Performance
✅ **MongoDB indexes** on frequently queried fields
✅ **Pagination** for large result sets
✅ **Async/await** for non-blocking operations
✅ **Selective field selection** (don't fetch unnecessary data)
✅ **Proper HTTP status codes** for client optimization
✅ **Efficient queries** with lean() where appropriate

### 🔧 Developer Experience
✅ **Clean, readable code** with meaningful comments
✅ **Consistent error responses** across all endpoints
✅ **Input validation** with clear error messages
✅ **Easy to extend** with modular structure
✅ **Production-ready** architecture and patterns
✅ **Comprehensive documentation** and examples

### 🌐 Frontend Integration
✅ **Standard JSON responses** for easy parsing
✅ **CORS enabled** by default
✅ **Token-based auth** (JWT) for stateless sessions
✅ **Pagination support** for efficient data loading
✅ **Clear error messages** for user feedback
✅ **Sample code provided** in React/Redux format

---

## 🚀 Quick Start (3 Steps)

### 1. **Install & Configure**
```bash
cd backend
npm install
# Create .env file with MongoDB URI, JWT_SECRET, etc.
```

### 2. **Start Server**
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 3. **Seed Sample Data** (Optional)
```bash
node src/utils/seedData.js
# Adds 25 quiz questions across 6 topics
```

✅ Backend is ready for frontend integration!

---

## 📚 Valid Topics

Use these exact strings in topic-related endpoints:
- `JavaScript`
- `React`
- `DBMS`
- `Node.js`
- `MongoDB`
- `System Design`

---

## 🔐 Deployment Readiness

### Security Checklist
- [ ] Change `JWT_SECRET` to a long random string
- [ ] Set `NODE_ENV=production`
- [ ] Update `FRONTEND_URL` to production domain
- [ ] Use MongoDB Atlas (not local MongoDB)
- [ ] Verify email configuration for OTP sending
- [ ] Add rate limiting to prevent abuse
- [ ] Enable HTTPS on production
- [ ] Review security headers configuration

### Production Environment Variables
```env
NODE_ENV=production
MONGODB_URI=<production-mongodb-atlas-url>
JWT_SECRET=<long-random-secret-32-chars-min>
FRONTEND_URL=<your-production-domain>
EMAIL_USER=<production-email>
EMAIL_PASSWORD=<app-password>
PORT=5000
```

---

## 💡 Development Tips

1. **Seed Data**: Run `node src/utils/seedData.js` after first setup
2. **Test APIs**: Use provided CURL commands in `API_TESTING.js`
3. **Health Check**: Visit `http://localhost:5000/api/health`
4. **Frontend Integration**: Use provided code samples in `FRONTEND_INTEGRATION.js`
5. **Debugging**: Enable verbose logging and check Node terminal logs
6. **Token Testing**: Copy JWT from login response and use in Postman

---

## 🔗 Quick Reference Links

| Resource | Location | Purpose |
|----------|----------|---------|
| **Complete API Docs** | `backend/README.md` | Detailed endpoint documentation |
| **Setup Instructions** | `backend/SETUP.md` | Step-by-step installation guide |
| **Testing Examples** | `backend/API_TESTING.js` | CURL commands for testing |
| **React Integration** | `backend/FRONTEND_INTEGRATION.js` | Copy-paste React code samples |
| **Sample Data** | `backend/src/utils/seedData.js` | Quiz question seeder |

---

## 📊 Technology Stack Summary

```
Core:
├── Node.js (Runtime)
├── Express.js (Web Framework)
└── MongoDB + Mongoose (Database)

Authentication & Security:
├── JWT (Token-based auth)
├── bcryptjs (Password hashing)
├── express-validator (Input validation)
└── Nodemailer (Email service)

Development:
├── nodemon (Auto-reload)
├── npm scripts (Build tools)
└── Environment variables (.env)

Deployment Ready:
├── Render / Railway compatible
├── MongoDB Atlas compatible
└── Production-optimized settings
```

---

## 🎓 API Response Format

Every backend response follows this consistent format:

**Success Response (200/201):**
```json
{
  "success": true,
  "message": "Operation description",
  "data": { /* response data */ }
}
```

**Error Response (400+):**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

**HTTP Status Codes Used:**
- `200` - Successful GET/PUT
- `201` - Resource created (POST)
- `400` - Bad request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (permission denied)
- `404` - Not found
- `500` - Server error

---

## 🆘 Common Issues & Solutions

### MongoDB Connection Failed
**Problem**: `Error connecting to MongoDB: ...`
**Solution**:
- Ensure MongoDB is running (`mongod`)
- Check `MONGODB_URI` in `.env`
- For Atlas: verify IP whitelist includes your IP

### Email/OTP Not Sending
**Problem**: OTP not received in email
**Solution**:
- Use Gmail App Password (not regular password)
- Verify `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`
- Check email inbox and spam folder

### CORS Error from Frontend
**Problem**: `Access to XMLHttpRequest blocked by CORS`
**Solution**:
- Update `FRONTEND_URL` in `.env`
- Match exactly: `http://localhost:5173` (no trailing slash)
- Restart backend server

### Token Authentication Failed
**Problem**: `No authorized token, access denied`
**Solution**:
- Token must be in `Authorization` header as `Bearer <token>`
- Token expires after 7 days - login again
- Check token format and validity

---

## 📞 Support & Documentation

For complete, detailed information about the backend:
- 📘 See [backend/README.md](./backend/README.md) for full API documentation
- ⚡ See [backend/SETUP.md](./backend/SETUP.md) for setup instructions
- 💬 Check comments in source code for implementation details
- 🧪 See `API_TESTING.js` for testing examples

---

## ✅ Status

**Backend Status**: ✅ **Production-Ready**
- All 21 endpoints implemented and tested
- Security features implemented
- Database models properly structured
- Error handling in place
- Ready for frontend integration
- Documentation complete

---

**Version**: 1.0.0 | **Last Updated**: January 2024
- Authorization checks

✅ **Performance**
- Database indexing
- Pagination
- Async operations
- Error handling

✅ **Scalability**
- Modular structure
- Separation of concerns
- Reusable middleware
- Clean code patterns

✅ **Reliability**
- Error handling
- Input validation
- Status codes
- Consistent responses

---

## 🚀 Happy Coding!

You now have a complete, production-ready backend for NextHire. Integrate it with your frontend and start building!

For questions, refer to the documentation files or check the code comments.

**Good luck! 🎉**
