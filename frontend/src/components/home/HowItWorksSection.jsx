import { FiBookOpen, FiCpu, FiHome, FiUsers } from "react-icons/fi";

const steps = [
    {
        icon: FiBookOpen,
        title: "Take a free mini-course",
        description: "Start with our Parent Clarity Course to understand your situation better."
    },
    {
        icon: FiCpu,
        title: "Understand your child's brain",
        description: "Learn about neurodevelopmental differences in simple, practical terms."
    },
    {
        icon: FiHome,
        title: "Follow structured protocols",
        description: "Implement evidence-based home strategies step-by-step."
    },
    {
        icon: FiUsers,
        title: "Get ongoing support",
        description: "Join our parent community and access expert guidance when you need it."
    }
];

const HowItWorksSection = () => {
    return (
        <section className="py-20 bg-gray-100">
            <div className="w-[90%] mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-12 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        How This Works
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        A clear, structured path from confusion to clarity
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative bg-white p-6 rounded-xl shadow-card hover:shadow-card-hover transition"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Step number */}
                            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
                                {index + 1}
                            </div>

                            {/* Icon */}
                            <div className="w-14 h-14 rounded-lg bg-indigo-100 flex items-center justify-center mb-4 mt-2">
                                <step.icon className="w-7 h-7 text-indigo-600" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default HowItWorksSection;
