import React from "react";
import HeroSection from "./HeroSection";
import ArticleCard from "./ArticleCard";
import PlanRequestForm from "./PlanRequestForm";
import TrainingPlanCard from "./TrainingPlanCard";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ArrowRight, BookOpen, Calendar, Users } from "lucide-react";

const Home = () => {
  // Sample articles data
  const articles = [
    {
      id: 1,
      title: "Nutrition for Beginner Runners",
      excerpt:
        "Learn the fundamentals of nutrition to optimize your performance in marathons.",
      imageUrl:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
      readMoreUrl: "#nutrition",
    },
    {
      id: 2,
      title: "How to Prevent Common Injuries",
      excerpt:
        "Effective strategies to avoid injuries during your marathon training.",
      imageUrl:
        "https://images.unsplash.com/photo-1556316384-12c35d30afa4?w=800&q=80",
      readMoreUrl: "#injuries",
    },
    {
      id: 3,
      title: "Essential Equipment for Marathons",
      excerpt: "Complete guide on the equipment you need to train properly.",
      imageUrl:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
      readMoreUrl: "#equipment",
    },
  ];

  // Sample training plans data
  const trainingPlans = [
    {
      id: 1,
      title: "20-Week Plan for Your First Marathon",
      description:
        "Complete plan for beginners looking to finish their first marathon with confidence.",
      duration: "20 weeks",
      difficulty: "Beginner",
      pdfUrl: "#plan-20-weeks",
    },
    {
      id: 2,
      title: "16-Week Plan for Experienced Runners",
      description:
        "For runners who already have experience in 10K races or half marathons.",
      duration: "16 weeks",
      difficulty: "Intermediate",
      pdfUrl: "#plan-16-weeks",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="py-4 px-4 md:px-8 lg:px-16 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center">
          <span className="text-xl font-bold">Andes Runners</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-600 hover:text-black">
            Features
          </a>
          <a href="#community" className="text-gray-600 hover:text-black">
            Community
          </a>
          <a href="#resources" className="text-gray-600 hover:text-black">
            Resources
          </a>
        </nav>
        <Button className="bg-black text-white hover:bg-black/90">
          Get Started
        </Button>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4">
          <div className="border border-gray-200 p-6 rounded-lg text-center">
            <div className="text-2xl font-bold mb-1">100+</div>
            <div className="text-gray-600">Runners</div>
          </div>
          <div className="border border-gray-200 p-6 rounded-lg text-center">
            <div className="text-2xl font-bold mb-1">5+</div>
            <div className="text-gray-600">Cities</div>
          </div>
          <div className="border border-gray-200 p-6 rounded-lg text-center">
            <div className="text-2xl font-bold mb-1">10+</div>
            <div className="text-gray-600">Plans Delivered Weekly</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Andes combines cutting-edge technology with expert coaching to
            provide a comprehensive marathon training experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-200 p-6 rounded-lg">
              <div className="flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                AI-Powered Personalization
              </h3>
              <p className="text-gray-600 text-center">
                Our AI analyzes your fitness level, goals, and progress to
                create a training plan tailored specifically for you.
              </p>
            </div>
            <div className="border border-gray-200 p-6 rounded-lg">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                Adaptive Training Plans
              </h3>
              <p className="text-gray-600 text-center">
                Your plan adjusts dynamically based on your performance and
                feedback, ensuring optimal progress and minimizing injury risk.
              </p>
            </div>
            <div className="border border-gray-200 p-6 rounded-lg">
              <div className="flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                Community Support
              </h3>
              <p className="text-gray-600 text-center">
                Connect with fellow runners, share your journey, and receive
                encouragement from our experienced coaches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Start Today Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Start Today</h2>
          <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
            <Button size="lg" className="w-full bg-black hover:bg-black/90">
              Request Your Beta Personalized Plan
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              Join Our Community
            </Button>
          </div>
          <p className="mt-8 text-gray-600">
            Explore our free resources, including articles and standard training
            plans, to get started on your marathon journey.
          </p>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Articles for Runners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                excerpt={article.excerpt}
                imageUrl={article.imageUrl}
                readMoreUrl={article.readMoreUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Training Plans Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Free Training Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trainingPlans.map((plan) => (
              <TrainingPlanCard
                key={plan.id}
                title={plan.title}
                description={plan.description}
                duration={plan.duration}
                difficulty={plan.difficulty}
                pdfUrl={plan.pdfUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Plan Request Form Section */}
      <section id="request-plan" className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Request Your Beta Personalized Plan
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Complete the form below and our coaches will create a plan
            specifically tailored to your needs and goals.
          </p>
          <PlanRequestForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 lg:px-16 bg-gray-100 text-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Andes Runners</h3>
              <p className="text-gray-600">Your marathon journey starts here</p>
            </div>
            <div className="flex space-x-8">
              <a href="#contact" className="text-gray-600 hover:text-black">
                Contact Us
              </a>
              <a href="#privacy" className="text-gray-600 hover:text-black">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-600 hover:text-black">
                Terms of Service
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Andes Runners. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
