import { FaComments, FaClipboardList, FaAward } from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaComments className="w-8 h-8 text-blue-600" />,
      title: "Q&A Forum",
      description:
        "Discuss and share interview questions with peers to boost your preparation.",
    },
    {
      icon: <FaClipboardList className="w-8 h-8 text-green-600" />,
      title: "Quizzes",
      description:
        "Practice topic-wise MCQs and get instant feedback to improve accuracy.",
    },
    {
      icon: <FaAward className="w-8 h-8 text-yellow-600" />,
      title: "Leaderboard",
      description:
        "Compete with others and track your position on the leaderboard.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold mb-4">Our Features</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Explore the powerful tools and features that make HireNext the perfect
          platform for your interview preparation.
        </p>

        {/* Features Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-8 flex flex-col items-center text-center 
              hover:shadow-xl hover:scale-105 transform transition duration-300 ease-in-out"
            >
              {/* Icon Circle */}
              <div className="bg-gray-100 p-4 rounded-full mb-5 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
