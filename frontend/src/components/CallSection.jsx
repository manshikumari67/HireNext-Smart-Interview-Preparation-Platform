import React from 'react'

const CallSection = () => {
  return (
    <div>
      <section className="py-16 bg-gradient-to-r from-blue-300 to-purple-600 text-white">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start your journey to ace technical interviews today!
        </h2>
        <p className="text-lg text-gray-200 max-w-2xl mb-8">
          Join HireNext and prepare with curated questions, quizzes, and a vibrant
          community to sharpen your skills and succeed in interviews.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/signup"
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Join Now
          </a>
          
        </div>
      </div>
    </section>
    </div>
  )
}

export default CallSection
