import React, { useState, lazy, Suspense, useEffect, useRef } from "react";
import HeroSection from "./HeroSection";
import ArticleCard from "./ArticleCard";
import TrainingPlanCard from "./TrainingPlanCard";
import UnderConstructionPlanCard from "./UnderConstructionPlanCard";
import ArticleCarousel from "./ArticleCarousel";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ArrowRight, BookOpen, Calendar, Users } from "lucide-react";
import { initGA, trackArticleView, trackPlanDownload } from "../lib/analytics";

// Lazy load componentes pesados que no son necesarios en la carga inicial
const ArticleDetail = lazy(() => import("./ArticleDetail"));
const PlanRequestForm = lazy(() => import("./PlanRequestForm"));

const Home = () => {
  // Estado para controlar qué artículo está activo (null si ninguno está activo)
  const [activeArticle, setActiveArticle] = useState<number | null>(null);
  const requestPlanRef = useRef<HTMLElement>(null);
  
  // Inicializar Google Analytics al cargar la página
  useEffect(() => {
    initGA();
  }, []);

  // Función para hacer scroll al inicio de la página
  const scrollToRequestPlan = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Función para hacer scroll a la sección de comunidad
  const scrollToCommunity = () => {
    document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Función para cerrar el modal
  const closeArticleModal = () => {
    setActiveArticle(null);
  };
  
  // Función para abrir el modal y rastrear la visualización del artículo
  const openArticle = (index: number) => {
    setActiveArticle(index);
    trackArticleView(articles[index].title);
  };
  // Contenido completo de los artículos
  const articleContents = [
    // Article 1: Nutrition for Beginner Runners
    <>
      <p className="mb-6">
        Proper nutrition is essential for any runner, especially for those just starting out.
        Your body needs the right fuel to perform well in training sessions and recover adequately.
      </p>

      <h3 className="text-xl font-semibold mb-3">Key Macronutrients for Runners</h3>
      
      <h4 className="text-lg font-medium mb-2">Carbohydrates: Your Main Energy Source</h4>
      <p className="mb-4">
        Carbohydrates are your body's preferred fuel for aerobic activities like running.
        For long training sessions, prioritize complex carbohydrates such as:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Oats and whole grain cereals</li>
        <li>Brown rice and quinoa</li>
        <li>Sweet potatoes and legumes</li>
        <li>Fresh fruits</li>
      </ul>

      <h4 className="text-lg font-medium mb-2">Proteins: Muscle Repair and Building</h4>
      <p className="mb-4">
        Proteins are essential for repairing muscle tissue after workouts.
        Runners need approximately 1.2-1.4 grams per kilogram of body weight. Good sources include:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Chicken and turkey breast</li>
        <li>Fish and seafood</li>
        <li>Eggs</li>
        <li>Legumes and tofu</li>
        <li>Greek yogurt and cottage cheese</li>
      </ul>

      <h4 className="text-lg font-medium mb-2">Healthy Fats: Sustained Energy</h4>
      <p className="mb-4">
        Healthy fats provide long-lasting energy and are vital for vitamin absorption. Include:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Avocados</li>
        <li>Nuts and seeds</li>
        <li>Olive oil</li>
        <li>Fatty fish like salmon</li>
      </ul>

      <h3 className="text-xl font-semibold mb-3">Hydration: More Than Just Water</h3>
      <p className="mb-4">
        Dehydration can significantly reduce your performance. Follow these guidelines:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Drink approximately 500-600 ml of water 2-3 hours before running</li>
        <li>For runs longer than 60 minutes, consider electrolyte drinks</li>
        <li>After running, replenish fluids: approximately 500 ml for every 0.5 kg lost</li>
      </ul>

      <h3 className="text-xl font-semibold mb-3">Before and After Running</h3>
      <p className="mb-4">
        <strong>Pre-workout (1-2 hours before):</strong> Combine easily digestible carbohydrates with a small amount of protein.
        Examples: banana with peanut butter, yogurt with granola, toast with egg.
      </p>
      <p className="mb-6">
        <strong>Post-workout (within 30-45 minutes):</strong> Consume proteins and carbohydrates in a 1:3 or 1:4 ratio.
        Examples: protein shake with banana, chicken with rice, yogurt with fruits and honey.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p className="font-medium">Pro tip:</p>
        <p>Experiment with different foods during training, not on race day.
        Every runner is unique; learn to listen to your body and discover what works best for you.</p>
      </div>

      <p className="italic text-gray-600">
        Remember that this information is general. For a personalized nutrition plan,
        consult with a sports nutritionist or request our personalized plan.
      </p>
    </>,

    // Article 2: Choosing the Right Running Shoes
    <>
      <p className="mb-6">
        Choosing the right footwear is possibly the most important decision you'll make as a runner.
        The correct shoes can prevent injuries and significantly improve your performance.
      </p>

      <h3 className="text-xl font-semibold mb-3">Understand Your Foot Strike</h3>
      <p className="mb-4">
        Before buying, it's crucial to know your foot strike type:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li><strong>Pronator:</strong> Your foot rolls inward when landing. You need shoes with stability support.</li>
        <li><strong>Neutral:</strong> Balanced impact distribution. Shoes with moderate cushioning are ideal.</li>
        <li><strong>Supinator:</strong> Your foot rolls outward. Requires shoes with greater flexibility and cushioning.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-3">Key Factors to Consider</h3>
      
      <h4 className="text-lg font-medium mb-2">1. Cushioning and Drop</h4>
      <p className="mb-4">
        Cushioning varies from minimalist (ground feel) to maximum. The "drop" is the height difference
        between the heel and toe. A low drop (0-4mm) promotes a midfoot or forefoot strike, while
        a high drop (8-12mm) favors heel striking.
      </p>

      <h4 className="text-lg font-medium mb-2">2. Weight and Flexibility</h4>
      <p className="mb-4">
        For speed workouts, lighter shoes. For long distances, prioritize cushioning
        even if they're slightly heavier. Flexibility should allow natural foot movement.
      </p>

      <h4 className="text-lg font-medium mb-2">3. Fit and Size</h4>
      <p className="mb-4">
        There should be approximately one centimeter of space between your longest toe and the shoe tip.
        Try shoes at the end of the day when feet are more swollen. The shoe should feel comfortable immediately,
        with no need to "break it in".
      </p>

      <h3 className="text-xl font-semibold mb-3">When to Replace Your Shoes</h3>
      <p className="mb-4">
        Typical lifespan is 500-800 km depending on your weight, running style, and surface.
        Signs that you need to replace them:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Visible wear on the sole</li>
        <li>Compressed cushioning (feels "flat")</li>
        <li>Deformation of the upper or heel counter</li>
        <li>New aches or discomfort when running</li>
      </ul>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
        <p className="font-medium">Buyer's tip:</p>
        <p>Visit a specialized running store where they can analyze your gait.
        It's an investment worth making to prevent long-term injuries.</p>
      </div>

      <p className="italic text-gray-600">
        Consider having more than one pair of shoes and alternating them, especially if you train daily.
        This extends their lifespan and reduces the risk of injuries from repetitive movements.
      </p>
    </>,

    // Article 3: Creating Your First Marathon Training Plan
    <>
      <p className="mb-6">
        Preparing for a marathon is a transformative journey that requires careful planning.
        A well-structured training plan will increase your chances of success and reduce the risk of injuries.
      </p>

      <h3 className="text-xl font-semibold mb-3">Before You Begin</h3>
      <p className="mb-4">
        Make sure you have these bases covered before starting your marathon training:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Aerobic base: You should be able to comfortably run 5-6 miles before starting</li>
        <li>Medical check-up: Especially if you're over 40 or have pre-existing conditions</li>
        <li>Proper equipment: Appropriate shoes and technical clothing</li>
        <li>Time commitment: 4-6 hours weekly for 16-20 weeks</li>
      </ul>

      <h3 className="text-xl font-semibold mb-3">Structure of a 16-Week Plan for Beginners</h3>
      
      <h4 className="text-lg font-medium mb-2">Phase 1: Base Building (Weeks 1-4)</h4>
      <p className="mb-4">
        Focus on building endurance with easy runs, gradually increasing weekly mileage.
        Include rest days and possibly cross-training (swimming, cycling, yoga).
      </p>

      <h4 className="text-lg font-medium mb-2">Phase 2: Development (Weeks 5-10)</h4>
      <p className="mb-4">
        Introduce specific workouts:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Weekly long run:</strong> Progressively increase up to 15-18 miles</li>
        <li><strong>Tempo workouts:</strong> Sections at target marathon pace</li>
        <li><strong>Recovery runs:</strong> At conversational pace, very easy</li>
      </ul>

      <h4 className="text-lg font-medium mb-2">Phase 3: Refinement (Weeks 11-14)</h4>
      <p className="mb-4">
        Reach your peak training volume. The long run will reach 20-22 miles.
        Practice your nutrition and hydration strategy during long runs.
      </p>

      <h4 className="text-lg font-medium mb-2">Phase 4: Taper (Weeks 15-16)</h4>
      <p className="mb-4">
        Gradually reduce volume (but maintain intensity) to arrive rested on race day.
        Weekly mileage will decrease by approximately 30-50%.
      </p>

      <h3 className="text-xl font-semibold mb-3">Essential Plan Elements</h3>
      <ul className="list-disc pl-6 mb-6">
        <li><strong>Gradual progression:</strong> Don't increase distance by more than 10% per week</li>
        <li><strong>Recovery:</strong> At least 1-2 complete rest days weekly</li>
        <li><strong>Consistency:</strong> More important than occasional intense workouts</li>
        <li><strong>Flexibility:</strong> Adapt the plan based on how you feel and your commitments</li>
      </ul>

      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
        <p className="font-medium">Coach's tip:</p>
        <p>For your first marathon, the goal should be to finish it, not to achieve a specific time.
        Run the first three-quarters of the marathon with your head and only the last quarter with your heart.</p>
      </div>

      <p className="italic text-gray-600">
        Remember that every runner is unique. What works for others may not be ideal for you.
        Listen to your body and adjust your plan as needed.
      </p>
    </>,

    // Article 4: Stretching and Recovery for Runners
    <>
      <p className="mb-6">
        Recovery is just as important as training itself. Proper stretching and recovery techniques 
        help prevent injuries, reduce muscle soreness, and improve overall performance.
      </p>

      <h3 className="text-xl font-semibold mb-3">The Science of Recovery</h3>
      <p className="mb-4">
        When you run, you create microscopic tears in your muscle fibers. Recovery periods allow these 
        fibers to repair and strengthen. Without adequate recovery, you risk overtraining syndrome, 
        decreased performance, and injuries.
      </p>

      <h3 className="text-xl font-semibold mb-3">Effective Stretching Routines</h3>
      
      <h4 className="text-lg font-medium mb-2">Dynamic Stretching Before Running</h4>
      <p className="mb-4">
        Dynamic stretches involve moving parts of your body through a full range of motion. 
        Perform these before your run to prepare your muscles:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Leg swings:</strong> 10-15 swings per leg, both front-to-back and side-to-side</li>
        <li><strong>Walking lunges:</strong> 10 per leg with a gentle torso rotation</li>
        <li><strong>High knees and butt kicks:</strong> 20 meters of each</li>
        <li><strong>Arm circles:</strong> 10 forward and 10 backward</li>
      </ul>

      <h4 className="text-lg font-medium mb-2">Static Stretching After Running</h4>
      <p className="mb-4">
        Static stretches involve holding a position for 30-60 seconds. These are best performed after 
        your run when muscles are warm:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Standing quadriceps stretch:</strong> Hold your foot against your buttock</li>
        <li><strong>Hamstring stretch:</strong> Extend your leg on a raised surface and lean forward</li>
        <li><strong>Calf stretch:</strong> Place your foot against a wall with heel on the ground</li>
        <li><strong>Hip flexor stretch:</strong> Lunge forward keeping your back straight</li>
        <li><strong>IT band stretch:</strong> Cross one leg over the other and lean toward the crossed side</li>
      </ul>

      <h3 className="text-xl font-semibold mb-3">Recovery Techniques Beyond Stretching</h3>
      
      <h4 className="text-lg font-medium mb-2">1. Active Recovery</h4>
      <p className="mb-4">
        Low-intensity movement (walking, light swimming, gentle cycling) on rest days helps 
        increase blood flow to muscles without causing additional strain.
      </p>

      <h4 className="text-lg font-medium mb-2">2. Foam Rolling (Self-Myofascial Release)</h4>
      <p className="mb-4">
        Spend 1-2 minutes on each major muscle group, focusing on tight or sore areas. 
        This helps break up adhesions between muscle fibers and fascia.
      </p>

      <h4 className="text-lg font-medium mb-2">3. Compression Garments</h4>
      <p className="mb-4">
        Wearing compression socks or sleeves during or after running may help reduce muscle 
        vibration during exercise and decrease swelling post-run.
      </p>

      <h4 className="text-lg font-medium mb-2">4. Cold and Heat Therapy</h4>
      <p className="mb-4">
        Ice baths or cold compresses can reduce inflammation after hard workouts. 
        Heat therapy improves blood flow and can be effective for chronic tightness.
      </p>

      <h3 className="text-xl font-semibold mb-3">Recovery Nutrition</h3>
      <p className="mb-4">
        Refuel within 30-45 minutes post-run with a 3:1 ratio of carbs to protein. 
        Stay hydrated and consider tart cherry juice, which has natural anti-inflammatory properties.
      </p>

      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
        <p className="font-medium">Sleep tip:</p>
        <p>Quality sleep is your best recovery tool. Aim for 7-9 hours nightly. Consider taking 
        short naps (20-30 minutes) after particularly demanding workouts if possible.</p>
      </div>

      <p className="italic text-gray-600">
        Listen to your body. If you're consistently tired or noticing declining performance, 
        you may need more recovery time. Recovery is when you get stronger—don't shortchange it.
      </p>
    </>
  ];

  // Sample articles data
  const articles = [
    {
      id: 1,
      title: "Nutrition for Beginner Runners",
      excerpt:
        "Learn the fundamentals of nutrition to optimize your performance in marathons.",
      imageUrl:
        "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80",
      readMoreUrl: "#nutrition",
    },
    {
      id: 2,
      title: "Choosing the Right Running Shoes",
      excerpt:
        "Learn how to select the perfect running shoes for your foot type and running style.",
      imageUrl:
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80",
      readMoreUrl: "#shoes",
    },
    {
      id: 3,
      title: "Creating Your First Marathon Training Plan",
      excerpt: "A step-by-step guide to building a marathon training plan that works for you.",
      imageUrl:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
      readMoreUrl: "#training-plan",
    },
    {
      id: 4,
      title: "Stretching and Recovery for Runners",
      excerpt: "Learn essential techniques to recover faster and prevent injuries after your runs.",
      imageUrl:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
      readMoreUrl: "#recovery",
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
      pdfUrl: "https://drive.google.com/file/d/1Y3qoIPh_cbRZ8Xw_AbcSdEgHloZp8V4S/view?usp=sharing",
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
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
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
              document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
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
      <HeroSection 
        ctaPrimaryText="Get Free 20-Week Plan"
        onPrimaryClick={() => {
          // Track the download
          trackPlanDownload('20-Week Marathon Plan');
          // Trigger download
          window.open('/plans/20-week-marathon-plan.pdf', '_blank');
        }}
        onSecondaryClick={scrollToCommunity}
      />

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
      <section id="how-it-works" className="py-16 px-4 md:px-8 lg:px-16">
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
      <section id="articles" className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Articles for Runners
          </h2>
          <ArticleCarousel>
            {articles.map((article, index) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                excerpt={article.excerpt}
                imageUrl={article.imageUrl}
                readMoreUrl={article.readMoreUrl}
                onClick={() => openArticle(index)}
                data-testid="article-card"
              />
            ))}
          </ArticleCarousel>
        </div>
      </section>

      {/* Modal para mostrar el artículo completo */}
      {activeArticle !== null && (
        <Suspense fallback={<div className="fixed inset-0 bg-black/50 flex items-center justify-center"><p className="text-white">Cargando artículo...</p></div>}>
          <ArticleDetail
            title={articles[activeArticle].title}
            content={articleContents[activeArticle]}
            onClose={closeArticleModal}
          />
        </Suspense>
      )}

      {/* Training Plans Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Free Training Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Plan de 20 semanas - Normal */}
            <TrainingPlanCard
              key={trainingPlans[0].id}
              title={trainingPlans[0].title}
              description={trainingPlans[0].description}
              duration={trainingPlans[0].duration}
              difficulty={trainingPlans[0].difficulty}
              pdfUrl={trainingPlans[0].pdfUrl}
            />
            
            {/* Plan de 16 semanas - Under Construction */}
            <UnderConstructionPlanCard
              key={trainingPlans[1].id}
              title={trainingPlans[1].title}
              description={trainingPlans[1].description}
              duration={trainingPlans[1].duration}
              difficulty={trainingPlans[1].difficulty}
              pdfUrl={trainingPlans[1].pdfUrl}
            />
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
      <section ref={requestPlanRef} id="request-plan" className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Request Your Beta Personalized Plan
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Complete the form below and our coaches will create a plan
            specifically tailored to your needs and goals.
          </p>
          <Suspense fallback={<div className="h-[500px] flex items-center justify-center"><p>Cargando formulario...</p></div>}>
            <PlanRequestForm />
          </Suspense>
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
