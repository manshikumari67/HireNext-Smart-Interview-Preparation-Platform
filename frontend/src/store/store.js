import { configureStore, createSlice } from '@reduxjs/toolkit';

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    currentQuestion: 0,
    score: 0,
    answers: [],
    isActive: false,
    timeLeft: 300,
    topic: '',
    questions: [],
    results: [],
  },
  reducers: {
    startQuiz: (state, action) => {
      state.isActive = true;
      state.topic = action.payload.topic;
      state.questions = action.payload.questions;
      state.timeLeft = action.payload.timeLimit || 300;
      state.currentQuestion = 0;
      state.score = 0;
      state.answers = [];
    },
    answerQuestion: (state, action) => {
      state.answers[state.currentQuestion] = action.payload;
      if (action.payload.isCorrect) {
        state.score += 1;
      }
    },
    nextQuestion: (state) => {
      if (state.currentQuestion < state.questions.length - 1) {
        state.currentQuestion += 1;
      }
    },
    decrementTime: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      } else {
        state.isActive = false;
      }
    },
    finishQuiz: (state) => {
      state.isActive = false;
      state.results.push({
        topic: state.topic,
        score: state.score,
        total: state.questions.length,
        timestamp: new Date().toISOString(),
      });
    },
    resetQuiz: (state) => {
      state.currentQuestion = 0;
      state.score = 0;
      state.answers = [];
      state.isActive = false;
      state.timeLeft = 300;
      state.topic = '';
      state.questions = [];
    },
  },
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!localStorage.getItem("token"),

    user: (() => {
      try {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    })(),

    token: localStorage.getItem("token") || null,
  },

  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    savedQuestions: [],
    progress: {},
    streak: 0,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    saveQuestion: (state, action) => {
      if (!state.savedQuestions.includes(action.payload)) {
        state.savedQuestions.push(action.payload);
      }
    },
    unsaveQuestion: (state, action) => {
      state.savedQuestions = state.savedQuestions.filter(q => q !== action.payload);
    },
    updateProgress: (state, action) => {
      state.progress = { ...state.progress, ...action.payload };
    },
    incrementStreak: (state) => {
      state.streak += 1;
    },
    resetStreak: (state) => {
      state.streak = 0;
    },
  },
});

export const { startQuiz, answerQuestion, nextQuestion, decrementTime, finishQuiz, resetQuiz } = quizSlice.actions;
export const { login, logout, setUser } = authSlice.actions;
export const { setProfile, saveQuestion, unsaveQuestion, updateProgress, incrementStreak, resetStreak } = userSlice.actions;

export const store = configureStore({
  reducer: {
    quiz: quizSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
});
