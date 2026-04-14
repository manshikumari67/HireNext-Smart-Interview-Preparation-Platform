import React, { useState, useEffect } from 'react';
import { FiPlay, FiClock, FiTarget, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import quizAPI from '../api/quiz';

const Quiz = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const topics = ['JavaScript', 'React', 'DBMS', 'Node.js', 'MongoDB', 'System Design'];

  useEffect(() => {
    let timer;
    if (isQuizStarted && timeLeft > 0 && !isQuizCompleted) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isQuizStarted && !isQuizCompleted) {
      handleQuizComplete();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isQuizStarted, isQuizCompleted]);

  const startQuiz = async () => {
    if (!selectedTopic) {
      toast.error('Please select a topic');
      return;
    }

    setIsLoading(true);
    try {

      const response = await quizAPI.getQuizByTopic(selectedTopic, numberOfQuestions);
      
      if (response?.data && response.data.length > 0) {
        const shuffled = [...response.data].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, numberOfQuestions);

        setQuizQuestions(selected);
        setUserAnswers(new Array(selected.length).fill(null));
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsQuizStarted(true);
        setIsQuizCompleted(false);
        setTimeLeft(numberOfQuestions * 60);
      } else {
        toast.error('No questions found for this topic');
      }
    } catch (error) {
        console.log("QUIZ ERROR:", error);
        toast.error(error || 'Failed to load quiz');
      } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast.error('Please select an answer');
      return;
    }

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      handleQuizComplete(newAnswers);
    }
  };

  const handleQuizComplete = async () => {
    if (selectedAnswer !== null && currentQuestionIndex === quizQuestions.length - 1) {
      const finalAnswers = [...userAnswers];
      finalAnswers[currentQuestionIndex] = selectedAnswer;
      setUserAnswers(finalAnswers);
    }

    setIsQuizCompleted(true);
    setIsSubmitting(true);

    try {
      const timeSpent = numberOfQuestions * 60 - timeLeft;

      const answerPayload = userAnswers.map((answer, index) => ({
        questionId: quizQuestions[index]._id,
        selectedAnswer: answer,
      }));

      const response = await quizAPI.submitQuiz(
        selectedTopic,
        answerPayload,
        timeSpent
      );

      localStorage.setItem(
        'lastQuizResults',
        JSON.stringify({
          topic: selectedTopic,
          questions: quizQuestions,
          userAnswers: userAnswers,
          completedAt: new Date().toISOString(),
          timeSpent: timeSpent,
          score: response?.result?.score,
          percentage: response?.result?.percentage,
        })
      );

      toast.success('Quiz submitted successfully!');
      navigate('/result');
    } catch (error) {
      toast.error(error?.message || 'Failed to submit quiz');
      console.error('Quiz submit error:', error);
      setIsQuizCompleted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetQuiz = () => {
    setIsQuizStarted(false);
    setIsQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuizQuestions([]);
    setUserAnswers([]);
    setTimeLeft(0);
  };

  if (!isQuizStarted) {
    return (
      <div className="max-w-4xl min-h-screen mx-auto space-y-6 sm:space-y-8 pb-8 sm:pb-10 mb-10 px-4 sm:px-6">
        <div className="text-center mt-12 animate-fadeIn">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text mb-4">
         Take a Quiz
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Challenge yourself with fun and interactive multiple-choice questions.
          <br /> Get instant feedback and track your progress as you go!
        </p>
        <div className="mt-6 flex justify-center">
          <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full shadow-sm">
            🎯 Ready to test your skills?
          </span>
        </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Topic
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Choose a topic...</option>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Questions
              </label>
              <select
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              >
                {[5, 10, 15, 20].map((num) => (
                  <option key={num} value={num}>
                    {num} Questions
                  </option>
                ))}
              </select>
            </div>

            {selectedTopic && (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Quiz Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-blue-800">
                    <FiTarget size={16} />
                    <span>{numberOfQuestions} Questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-800">
                    <FiClock size={16} />
                    <span>{numberOfQuestions} Minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-800">
                    <FiPlay size={16} />
                    <span>Multiple Choice</span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={startQuiz}
              disabled={!selectedTopic || isLoading}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 font-semibold rounded-xl transition-all ${
                isLoading || !selectedTopic
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  Loading...
                </>
              ) : (
                <>
                  <FiPlay size={20} />
                  Start Quiz
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  if (!currentQuestion) {
    return <div className="text-center py-10">Loading question...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 mt-8 sm:mt-10 px-4 sm:px-6 pb-8">
      <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <span className="px-2.5 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">
              {selectedTopic}
            </span>
            <span className="text-gray-600 text-xs sm:text-sm font-medium">
              Q{currentQuestionIndex + 1} of {quizQuestions.length}
            </span>
          </div>
          <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-red-100 text-red-800">
            <FiClock size={14} className="sm:w-[16px] sm:h-[16px]" />
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

      <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 leading-relaxed">
          {currentQuestion.question}
        </h2>
        <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
          {currentQuestion.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswer === index
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === index
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === index && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="font-medium text-gray-800">{option}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between pt-6">
          <button
            onClick={resetQuiz}
            className="px-6 py-2 text-gray-600 font-semibold hover:text-gray-900 transition"
          >
            Exit Quiz
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null || isSubmitting}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${
              selectedAnswer === null || isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : currentQuestionIndex === quizQuestions.length - 1 ? (
              <>
                Submit Quiz <FiArrowRight size={18} />
              </>
            ) : (
              <>
                Next <FiArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Quiz;
