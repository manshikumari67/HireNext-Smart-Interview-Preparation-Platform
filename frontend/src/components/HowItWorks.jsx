import { FaUserPlus, FaListUl, FaTrophy, FaArrowRight } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="w-12 h-12 text-blue-600" />,
      title: "Sign Up",
      description: "Create your free account and join the HireNext community.",
    },
    {
      icon: <FaListUl className="w-12 h-12 text-green-600" />,
      title: "Choose Topic",
      description: "Select interview topics you want to practice and master.",
    },
    {
      icon: <FaTrophy className="w-12 h-12 text-yellow-600" />,
      title: "Practice & Compete",
      description: "Solve questions, track progress, and compete with others.",
    },
  ];

  return (
    <section className="py-16 bg-white" id="how-it-works">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Getting started with HireNext is easy. Follow these simple steps and start your preparation today.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              {/* Step Card */}
              <div className="bg-gray-50 shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300 w-60">
                {step.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </div>

              {/* Arrow (Only between steps) */}
              {index < steps.length - 1 && (
                <FaArrowRight className="hidden md:block mx-6 text-gray-400 text-3xl" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
