import React, { useState } from 'react';
import { ShieldCheck, Award, Users, CheckCircle, ArrowRight } from 'lucide-react';
import MultiStepPlanForm from './MultiStepPlanForm';

interface PlanRequestFormProps {
  language: 'en' | 'es';
}

const content = {
  en: {
    footer: "We will contact you in less than 24 hours to coordinate.",
    badges: [
      { text: "Secure Data", icon: ShieldCheck },
      { text: "Quality Plans", icon: Award },
      { text: "Active Community", icon: Users }
    ],
    success: {
      title: "Thank You!",
      message: "Your request has been sent. Our team will review your information and contact you shortly.",
      button: "Join our WhatsApp Community"
    }
  },
  es: {
    footer: "Nos pondremos en contacto contigo en menos de 24 horas para coordinar.",
    badges: [
      { text: "Datos Seguros", icon: ShieldCheck },
      { text: "Planes de Calidad", icon: Award },
      { text: "Comunidad Activa", icon: Users }
    ],
    success: {
      title: "¡Gracias!",
      message: "Tu solicitud ha sido enviada. Nuestro equipo revisará tu información y se pondrá en contacto contigo.",
      button: "Únete a la Comunidad de WhatsApp"
    }
  }
};

const iconColors = ["text-amber-400", "text-amber-400", "text-amber-400"];

const PlanRequestForm: React.FC<PlanRequestFormProps> = ({ language }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const t = content[language];

  const handleFormSubmit = (data: any) => {
    console.log("Form data submitted:", data);
    // Here you would typically send the data to your backend
    setIsSubmitted(true);
  };

  const SuccessMessage = () => (
    <div className="text-center py-10">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-white mb-2">{t.success.title}</h3>
      <p className="text-gray-300 mb-8">{t.success.message}</p>
      <button 
        onClick={() => window.open('https://chat.whatsapp.com/Bzhqdte40aNB5LA1ViFqDl', '_blank')}
        className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-transform transform hover:scale-105"
      >
        {t.success.button} <ArrowRight className="h-4 w-4 ml-2" />
      </button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl p-6 md:p-10 min-h-[500px] flex flex-col justify-center">
      {!isSubmitted ? (
        <>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mb-8">
            {t.badges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div key={badge.text} className="flex items-center gap-3 text-gray-300">
                  <Icon className={`h-6 w-6 ${iconColors[index]}`} />
                  <span className="text-sm font-medium tracking-wider">{badge.text}</span>
                </div>
              );
            })}
          </div>
          <MultiStepPlanForm language={language} onSubmit={handleFormSubmit} />
        </>
      ) : (
        <SuccessMessage />
      )}
    </div>
  );
};

export default PlanRequestForm;
