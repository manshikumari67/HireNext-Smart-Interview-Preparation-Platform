import React, { useState, useEffect } from 'react';
import {
  getDiscussionQuestions,
  createDiscussionQuestion,
  deleteDiscussionQuestion,
  updateDiscussionQuestion,
  addDiscussionAnswer
} from '../api/discussionAPi';

import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';

const AskQuestion = () => {
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newAnswers, setNewAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [showConfirm, setShowConfirm] = useState(null);

  let user = null;

  try {
    const stored = localStorage.getItem("user");
    const parsed = stored ? JSON.parse(stored) : null;

    if (parsed && (parsed._id || parsed.id)) {
      user = {
        _id: parsed._id || parsed.id,
        name: parsed.name
      };
    }
  } catch {
    user = null;
  }

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const res = await getDiscussionQuestions();
      const data = res?.data?.data || [];
      setQuestions(data);
    } catch (err) {
      console.error(err);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question) {
      toast.error("Please enter a question");
      return;
    }

    try {
      await createDiscussionQuestion(question);
      toast.success("Question posted!");
      setQuestion("");
      loadQuestions();
    } catch (err) {
      toast.error("Failed to post");
    }
  };

  const confirmDelete = (id) => {
    setShowConfirm(id);
  };

  const handleDelete = async () => {
    try {
      await deleteDiscussionQuestion(showConfirm);
      setQuestions(prev => prev.filter(q => q._id !== showConfirm));
      setShowConfirm(null);
      toast.success("Deleted successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (q) => {
    setEditingId(q._id);
    setEditText(q.question);
  };

  const handleEditSave = async (id) => {
    try {
      await updateDiscussionQuestion(id, editText);

      setQuestions(prev =>
        prev.map(q =>
          q._id === id ? { ...q, question: editText } : q
        )
      );

      setEditingId(null);
      toast.success("Updated!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnswerSubmit = async (qId) => {
    if (!newAnswers[qId]) return;

    try {
      await addDiscussionAnswer({
        questionId: qId,
        answer: newAnswers[qId],
      });

      setNewAnswers(prev => ({ ...prev, [qId]: "" }));
      loadQuestions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto space-y-6 sm:space-y-8">

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">
        💬 Discussion Forum
      </h2>

      {/* QUESTION FORM */}
      <form className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl shadow-lg mb-8 sm:mb-10 border" onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question..."
          className="w-full border border-gray-300 p-3 sm:p-4 mb-3 sm:mb-4 rounded-lg focus:border-blue-500 focus:outline-none text-sm sm:text-base resize-none min-h-[100px]"
        />

        <button className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base">
          Post Question
        </button>
      </form>

      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6">💬 Discussion</h3>

      {loading && <p>Loading...</p>}

      {questions.map((q) => {

        const authorId =
          typeof q.author === "object"
            ? q.author?._id
            : q.author;

        const isOwner =
          user &&
          user._id &&
          authorId &&
          String(user._id) === String(authorId);

        return (
          <div key={q._id} className="bg-white p-6 mb-6 rounded-2xl shadow-lg border">

            {/* QUESTION */}
            <div className="flex justify-between items-start mb-3">
              {editingId === q._id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border p-2 rounded w-full"
                />
              ) : (
                <h3 className="text-lg font-semibold">{q.question}</h3>
              )}

              <p className="text-sm text-gray-500 ml-4">
                👤 {q.author?.name || "User"}
              </p>
            </div>

            {/* ANSWERS */}
            {(q.answers || []).map((ans, i) => (
              <div key={i} className="bg-gray-50 p-3 rounded-xl mt-3">
                <p>{ans.answer}</p>
                <p className="text-xs text-gray-500">
                  👤 {ans.author?.name}
                </p>
              </div>
            ))}

            {/* ANSWER + ICONS */}
            <div className="flex justify-between items-end mt-4">

              {/* LEFT */}
              <div className="w-full mr-4">
                <textarea
                  placeholder="Write your answer..."
                  value={newAnswers[q._id] || ""}
                  onChange={(e) =>
                    setNewAnswers(prev => ({
                      ...prev,
                      [q._id]: e.target.value
                    }))
                  }
                  className="w-full border p-2 rounded"
                />

                <button
                  onClick={() => handleAnswerSubmit(q._id)}
                  className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Post Answer
                </button>
              </div>

              {/* RIGHT ICONS */}
              {isOwner && (
                <div className="flex gap-5 items-center mb-2">

                  {editingId === q._id ? (
                    <button
                      onClick={() => handleEditSave(q._id)}
                      className="text-green-600 font-semibold"
                    >
                      Save
                    </button>
                  ) : (
                    <FaEdit
                      size={22}
                      className="cursor-pointer text-black hover:scale-110 transition"
                      onClick={() => startEdit(q)}
                    />
                  )}

                  <FaTrash
                    size={22}
                    className="cursor-pointer text-black hover:text-red-500 transition"
                    onClick={() => confirmDelete(q._id)}
                  />

                </div>
              )}

            </div>

          </div>
        );
      })}

      {/* 🔥 TRANSPARENT MODAL FIX */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl text-center shadow-xl">
            <h3 className="mb-4">
              Do you want to delete this question permanently?
            </h3>

            <div className="flex gap-4 justify-center">
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                Yes
              </button>

              <button onClick={() => setShowConfirm(null)} className="bg-gray-300 px-4 py-2 rounded">
                No
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AskQuestion;