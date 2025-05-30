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
      difficulty: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
      pdfUrl: "#plan-20-weeks",
    },
    {
      id: 2,
      title: "16-Week Plan for Experienced Runners",
      description:
        "For runners who already have experience in 10K races or half marathons.",
      duration: "16 weeks",
      difficulty: "Intermediate" as "Beginner" | "Intermediate" | "Advanced",
      pdfUrl: "#plan-16-weeks",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="py-4 px-4 md:px-8 lg:px-16 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Andes Runners Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold">Andes Runners</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('section:nth-of-type(3)')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-gray-600 hover:text-black"
          >
            Features
          </a>
          <a 
            href="#community" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-gray-600 hover:text-black"
          >
            Community
          </a>
          <a 
            href="#articles" 
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('section:nth-of-type(5)')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-gray-600 hover:text-black"
          >
            Articles
          </a>
        </nav>
        <Button 
          className="bg-black text-white hover:bg-black/90"
          onClick={() => {
            document.getElementById('request-plan')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
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
            <Button 
              size="lg" 
              className="w-full bg-black hover:bg-black/90"
              onClick={() => {
                document.getElementById('request-plan')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Request Your Beta Personalized Plan
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full"
              onClick={() => window.open('https://chat.whatsapp.com/Bzhqdte40aNB5LA1ViFqDl', '_blank')}
            >
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
      
      {/* Community Section */}
      <section id="community" className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Join Our Community
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with fellow runners, share your experiences, and receive guidance from our coaches.
          </p>
          
          <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-2xl mx-auto shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">WhatsApp Community</h3>
                <p className="text-gray-600 mb-4">
                  Our WhatsApp group is where you'll find daily motivation, training tips, and a supportive community of runners at all levels.
                </p>
                <Button 
                  className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => window.open('https://chat.whatsapp.com/Bzhqdte40aNB5LA1ViFqDl', '_blank')}
                >
                  Join WhatsApp Group
                </Button>
              </div>
            </div>
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
