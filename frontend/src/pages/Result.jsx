import React, { useState, useEffect } from 'react';
import { FaTrophy, FaCheckCircle, FaTimesCircle, FaRedoAlt, FaHome } from 'react-icons/fa';
import { FiTarget } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Result = () => {
  const [results, setResults] = useState(null);
  const [showExplanations, setShowExplanations] = useState(new Set());
  const [showSummary, setShowSummary] = useState(true); // NEW state

  useEffect(() => {
    const savedResults = localStorage.getItem('lastQuizResults');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
  }, []);

  // NEW: clear results function
  const clearResults = () => {
    localStorage.removeItem('lastQuizResults');
    setResults(null);
  };

  if (!results) {
    return (
      <div className="max-w-4xl h-screen mx-auto text-center py-12 sm:py-16 px-4">
        <FaTrophy className="w-12 sm:w-16 h-12 sm:h-16 text-black mx-auto mb-3 sm:mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">No Quiz Results Found</h2>
        <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">Take a quiz to see your results here.</p>
        <Link
          to="/quiz"
          className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 hover:bg-purple-800 text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base"
        >
          <FiTarget size={18} />
          Take a Quiz
        </Link>
      </div>
    );
  }

  const correctAnswers = results.score || 0;

  const totalQuestions = results.questions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (percentage) => {
    if (percentage >= 80) return 'bg-green-50 border-green-200';
    if (percentage >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const toggleExplanation = (questionIndex) => {
    const newSet = new Set(showExplanations);
    if (newSet.has(questionIndex)) {
      newSet.delete(questionIndex);
    } else {
      newSet.add(questionIndex);
    }
    setShowExplanations(newSet);
  };

  return (
    <div className="max-w-4xl h-full mt-6 sm:mt-10 mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6 pb-6 sm:pb-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Quiz Results</h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600">
          Here's how you performed on the {results.topic} quiz
        </p>
      </div>

      {/* Score Summary */}
      {showSummary && (
        <div className={`rounded-lg sm:rounded-2xl shadow-lg border p-4 sm:p-6 md:p-8 ${getScoreBg(percentage)}`}>
          <div className="text-center mb-4 sm:mb-6">
            <div className={`text-4xl sm:text-6xl font-bold mb-2 sm:mb-3 ${getScoreColor(percentage)}`}>
              {percentage}%
            </div>
            <div className="text-base sm:text-xl text-gray-700 mb-3 sm:mb-4">
              {correctAnswers} out of {totalQuestions} correct
            </div>

            {percentage >= 80 && (
              <div className="flex items-center justify-center gap-2 text-green-700 font-semibold text-sm sm:text-base">
                <FaTrophy size={20} />
                Excellent Performance!
              </div>
            )}
            {percentage >= 60 && percentage < 80 && (
              <div className="flex items-center justify-center gap-2 text-yellow-700 font-semibold text-sm sm:text-base">
                <FiTarget size={20} />
                Good Job!
              </div>
            )}
            {percentage < 60 && (
              <div className="flex items-center justify-center gap-2 text-red-700 font-semibold text-sm sm:text-base">
                <FaRedoAlt size={20} />
                Keep Practicing!
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
            <div className="bg-white bg-opacity-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
              <div className="text-lg sm:text-2xl font-bold text-gray-800">{results.topic}</div>
              <div className="text-xs sm:text-sm text-gray-600">Topic</div>
            </div>
            <div className="bg-white bg-opacity-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
              <div className="text-lg sm:text-2xl font-bold text-gray-800">{totalQuestions}</div>
              <div className="text-xs sm:text-sm text-gray-600">Questions</div>
            </div>
            <div className="bg-white bg-opacity-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
              <div className="text-lg sm:text-2xl font-bold text-gray-800">{formatTime(results.timeSpent)}</div>
              <div className="text-xs sm:text-sm text-gray-600">Time Spent</div>
            </div>
          </div>
        </div>
      )}

      {/* Question Review */}
      {!showSummary && (
        <div className="space-y-3 sm:space-y-4 ">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Question Review</h2>

          {results.questions.map((question, index) => {
            const userAnswer = results.userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            const showExplanation = showExplanations.has(index);

            return (
              <div
                key={question.id}
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-500">
                        Question {index + 1}
                      </span>
                      {isCorrect ? (
                        <FaCheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <FaTimesCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isCorrect
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {question.question}
                  </h3>

                  <div className="space-y-2 mb-4">
                    {question.options.map((option, optionIndex) => {
                      let optionClass = 'p-3 rounded-lg border ';

                      if (optionIndex === question.correctAnswer) {
                        optionClass += 'border-green-500 bg-green-50 text-green-800';
                      } else if (optionIndex === userAnswer && !isCorrect) {
                        optionClass += 'border-red-500 bg-red-50 text-red-800';
                      } else {
                        optionClass += 'border-gray-200 bg-gray-50 text-gray-700';
                      }

                      return (
                        <div key={optionIndex} className={optionClass}>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {String.fromCharCode(65 + optionIndex)}.
                            </span>
                            <span>{option}</span>
                            {optionIndex === question.correctAnswer && (
                              <FaCheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                            )}
                            {optionIndex === userAnswer && !isCorrect && (
                              <FaTimesCircle className="w-4 h-4 text-red-600 ml-auto" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => toggleExplanation(index)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                  >
                    {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      showExplanation
                        ? 'max-h-48 opacity-100 mt-4'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                      <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
                      <p className="text-blue-800">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {showSummary ? (
          <>
            <button
              onClick={() => setShowSummary(false)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200"
            >
              Review Questions
            </button>
            <Link
              to="/quiz"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200"
            >
              <FaRedoAlt size={18} />
              Retake Quiz
            </Link>
            {/* NEW: Clear Results Button */}
            <button
              onClick={clearResults}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-200"
            >
              Clear Results
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setShowSummary(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-200"
            >
              Reset Result View
            </button>
            {/* NEW: Clear Results Button */}
            <button
              onClick={clearResults}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-200"
            >
              Clear Results
            </button>
          </>
        )}
        <Link
          to="/"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-xl transition-all duration-200"
        >
          <FaHome size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Result;
