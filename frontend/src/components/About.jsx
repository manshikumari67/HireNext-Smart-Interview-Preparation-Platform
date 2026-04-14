import React from 'react'
import { FaBrain, FaUsers, FaRocket } from "react-icons/fa";

const About = () => {
  return (
   <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* About HireNext Section */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          About <span className="text-purple-600">HireNext</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <FaBrain className="text-purple-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Smart Q&A Forum
            </h3>
            <p className="text-gray-600">
              Browse topic-based questions and answers shared by the community
              to improve your problem-solving skills and technical knowledge.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <FaUsers className="text-purple-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Community Learning
            </h3>
            <p className="text-gray-600">
              Connect with like-minded learners, share your experiences, and
              grow together through discussions and peer feedback.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <FaRocket className="text-purple-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Quiz & Practice
            </h3>
            <p className="text-gray-600">
              Test your skills with topic-wise quizzes and track your progress
              to prepare confidently for your next big opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Why HireNext is Helpful */}
      <section className="bg-purple-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why <span className="text-purple-600">HireNext</span>?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            HireNext is more than just a preparation tool — it’s a complete
            ecosystem for interview success. Whether you’re a fresher stepping
            into the corporate world or a professional aiming for your dream
            role, our platform equips you with resources, practice tools, and
            community support to ace every interview round.
          </p>
        </div>
      </section>
    </div>
  )
}

export default About
