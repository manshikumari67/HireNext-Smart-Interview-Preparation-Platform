import axios from "./axios";

// ================= GET ALL QUESTIONS =================
export const getDiscussionQuestions = () => {
  return axios.get("/discussion");
};

// ================= CREATE QUESTION =================
export const createDiscussionQuestion = (question) => {
  return axios.post("/discussion", { question });
};

// ================= DELETE =================
export const deleteDiscussionQuestion = (id) => {
  return axios.delete(`/discussion/${id}`);
};

// ================= UPDATE =================
export const updateDiscussionQuestion = (id, question) => {
  return axios.put(`/discussion/${id}`, { question });
};

// ================= ADD ANSWER =================
export const addDiscussionAnswer = (data) => {
  return axios.post("/discussion/answer", data);
};