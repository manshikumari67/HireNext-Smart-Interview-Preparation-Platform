import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import questionsAPI from '../api/questions';
import { questions as localQuestions } from '../data/questions';

const QA = () => {
  const { topic } = useParams();

  const [topicQuestions, setTopicQuestions] = useState([]);
  const [showAnswers, setShowAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);

      try {
        // 🔥 PROPER TOPIC MAPPING
        const topicMap = {
          javascript: "JavaScript",
          react: "React",
          dbms: "Database Management System",
          html: "HTML",
          "system design": "System Design",
          "computer networks": "Computer Networks",
        };

        const formattedTopic =
          topicMap[topic?.toLowerCase()] || topic;

        // 🔥 DEBUG LOGS
        console.log("URL TOPIC:", topic);
        console.log("FORMATTED TOPIC:", formattedTopic);

        const res = await questionsAPI.getQuestionsByTopic(
          formattedTopic,
          1,
          30
        );

        console.log("API RESPONSE:", res);

        // ✅ SAFE DATA EXTRACTION
        const questions = res?.data?.data ||  res?.data || [];

        if (questions.length > 0) {
          console.log("✅ AI QUESTIONS LOADED");
          setTopicQuestions(questions);
        } else {
          console.warn("⚠️ FALLBACK TO LOCAL DATA");
          setTopicQuestions(localQuestions[topic] || []);
        }

      } catch (error) {
        console.error("❌ API ERROR:", error);
        setTopicQuestions(localQuestions[topic] || []);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [topic]);

  const toggleAnswer = (qId) => {
    setShowAnswers(prev => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  return (
    <div className="min-h-screen py-6 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">

      {/* BACK BUTTON */}
      <Link to="/" className="text-blue-600 hover:underline text-sm sm:text-base font-medium mb-4 inline-block">
        ← Back to Home
      </Link>

      {/* TITLE */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold my-6 text-center capitalize text-gray-900">
        {topic} Questions
      </h2>

      {/* LOADING */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading questions...</p>
          </div>
        </div>
      ) : topicQuestions.length === 0 ? (
        <p className="text-center text-gray-500 py-12 text-lg">
          No questions available.
        </p>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {topicQuestions.map((q, index) => {
            const id = q._id || index;

            return (
              <div
                key={id}
                className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
              >

                {/* QUESTION */}
                <h3 className="font-bold text-base sm:text-lg mb-3 text-gray-900 pr-2">
                  Q{index + 1}: {q.question}
                </h3>

                {/* TOGGLE BUTTON */}
                <button
                  onClick={() => toggleAnswer(id)}
                  className="text-blue-600 hover:text-blue-700 mb-3 flex items-center gap-2 text-sm sm:text-base font-medium transition-colors duration-200"
                >
                  {showAnswers[id] ? <FaEyeSlash /> : <FaEye />}
                  {showAnswers[id] ? "Hide Answer" : "Show Answer"}
                </button>

                {/* ANSWER */}
                {showAnswers[id] && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-blue-500 text-sm sm:text-base text-gray-700 leading-relaxed">
                    {q.answer
                      ? q.answer
                      : "No answer available yet."}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QA;