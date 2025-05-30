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
      title: "Nutrición para Corredores Principiantes",
      excerpt:
        "Aprende los fundamentos de la nutrición para optimizar tu rendimiento en maratones.",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
      url: "#nutricion",
    },
    {
      id: 2,
      title: "Cómo Prevenir Lesiones Comunes",
      excerpt:
        "Estrategias efectivas para evitar lesiones durante tu entrenamiento de maratón.",
      image:
        "https://images.unsplash.com/photo-1556316384-12c35d30afa4?w=800&q=80",
      url: "#lesiones",
    },
    {
      id: 3,
      title: "Equipamiento Esencial para Maratones",
      excerpt:
        "Guía completa sobre el equipamiento que necesitas para entrenar adecuadamente.",
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
      url: "#equipamiento",
    },
    {
      id: 4,
      title: "La Importancia del Descanso",
      excerpt:
        "Por qué el descanso es tan crucial como el entrenamiento para los corredores.",
      image:
        "https://images.unsplash.com/photo-1520206183501-b80df61043c2?w=800&q=80",
      url: "#descanso",
    },
    {
      id: 5,
      title: "Mantén tu Motivación Alta",
      excerpt:
        "Consejos prácticos para mantener la motivación durante meses de entrenamiento.",
      image:
        "https://images.unsplash.com/photo-1502904550040-7534597429ae?w=800&q=80",
      url: "#motivacion",
    },
  ];

  // Sample training plans data
  const trainingPlans = [
    {
      id: 1,
      title: "Plan de 20 Semanas para tu Primera Maratón",
      description:
        "Plan completo para principiantes que buscan completar su primera maratón con confianza.",
      duration: "20 semanas",
      difficulty: "Principiante",
      pdfUrl: "#plan-20-semanas",
    },
    {
      id: 2,
      title: "Plan de 16 Semanas para Corredores con Experiencia",
      description:
        "Para corredores que ya tienen experiencia en carreras de 10K o media maratón.",
      duration: "16 semanas",
      difficulty: "Intermedio",
      pdfUrl: "#plan-16-semanas",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Value Proposition Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            ¿Por qué Andes Runners?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Planes Personalizados
              </h3>
              <p className="text-gray-600">
                Planes de entrenamiento adaptados a tu nivel, objetivos y
                disponibilidad, creados por entrenadores con experiencia en
                maratones.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comunidad de Apoyo</h3>
              <p className="text-gray-600">
                Únete a una comunidad de corredores latinoamericanos que
                comparten tus mismos objetivos y desafíos.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Contenido Relevante
              </h3>
              <p className="text-gray-600">
                Artículos y recursos adaptados culturalmente para corredores
                latinoamericanos, abordando desafíos específicos de nuestra
                región.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Cómo Funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Solicita tu Plan</h3>
              <p className="text-gray-600">
                Completa un breve formulario con tu experiencia, objetivos y
                disponibilidad.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Recibe tu Plan Personalizado
              </h3>
              <p className="text-gray-600">
                Nuestros entrenadores crearán un plan adaptado específicamente a
                tus necesidades.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrena con Apoyo</h3>
              <p className="text-gray-600">
                Sigue tu plan y conecta con nuestra comunidad para resolver
                dudas y mantenerte motivado.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Solicita tu Plan Personalizado Beta
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Artículos para Corredores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                excerpt={article.excerpt}
                image={article.image}
                url={article.url}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Training Plans Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Planes de Entrenamiento Gratuitos
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
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Únete a Nuestra Comunidad
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Conecta con otros corredores, comparte tus experiencias, haz
              preguntas y mantente motivado en tu camino hacia la maratón.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Unirse al Grupo de WhatsApp
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Plan Request Form Section */}
      <section id="request-plan" className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Solicita tu Plan Personalizado Beta
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Completa el siguiente formulario y nuestros entrenadores crearán un
            plan adaptado específicamente a tus necesidades y objetivos.
          </p>
          <PlanRequestForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 lg:px-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Andes Runners</h3>
              <p className="text-gray-400">
                Tu camino hacia la maratón comienza aquí
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="mailto:info@andesrunners.com"
                className="text-gray-400 hover:text-white"
              >
                info@andesrunners.com
              </a>
              <Separator orientation="vertical" className="h-6 bg-gray-700" />
              <a href="#privacy" className="text-gray-400 hover:text-white">
                Política de Privacidad
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Andes Runners. Todos los derechos
            reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
