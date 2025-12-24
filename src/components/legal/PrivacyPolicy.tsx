import React from 'react';
import { useLocation } from 'react-router-dom';
import LegalPageLayout from '@/components/legal/LegalPageLayout';

const contactEmail = 'support@andesrunners.com';

const PrivacyPolicy: React.FC = () => {
  const { pathname } = useLocation();
  const isEs = pathname.startsWith('/es');

  const content = isEs
    ? {
      eyebrow: 'Privacidad',
      title: 'Política de Privacidad',
      updatedAt: 'Última actualización: 2025-12-21',
      intro:
        'En Andes protegemos tus datos y los usamos solo para darte coaching personalizado. Tus mensajes de WhatsApp se usan para inferencia en tiempo real y nunca para entrenar modelos.',
      aiUseTitle: 'Uso de Inteligencia Artificial',
      aiUseIntro:
        'Utilizamos inteligencia artificial para generar recomendaciones de entrenamiento y respuestas rápidas. La AI es una herramienta dentro del servicio de coaching.',
      providersTitle: 'Proveedores de AI',
      providers: [
        'DeepSeek: procesamiento de lenguaje natural para respuestas de coaching.',
        'OpenAI: generación de embeddings para contexto conversacional.',
      ],
      dataUseTitle: '¿Cómo usamos tus datos con AI?',
      dataUseItems: [
        'Procesamiento en tiempo real para responder a tus mensajes.',
        'Memoria contextual para recordar tus preferencias y progreso.',
        'No training de modelos con tus datos.',
        'No venta ni licencia de datos con fines comerciales.',
      ],
      retentionTitle: 'Retención de datos',
      retentionItems: [
        'Mensajes de chat: 30 días.',
        'Historial de entrenamientos: indefinido para tu progreso.',
        'Métricas agregadas: 1 año.',
      ],
      rightsTitle: 'Tus derechos',
      rightsCopy:
        'Puedes solicitar la exportación o eliminación completa de tus datos en cualquier momento escribiendo a',
    }
    : {
      eyebrow: 'Privacy',
      title: 'Privacy Policy',
      updatedAt: 'Last updated: 2025-12-21',
      intro:
        'At Andes we protect your data and use it only to deliver personalized coaching. Your WhatsApp messages are used for real-time inference and never to train models.',
      aiUseTitle: 'Use of Artificial Intelligence',
      aiUseIntro:
        'We use AI to generate training recommendations and fast responses. AI is a tool inside the coaching service.',
      providersTitle: 'AI Providers',
      providers: [
        'DeepSeek: natural language processing for coaching responses.',
        'OpenAI: embedding generation for conversational context.',
      ],
      dataUseTitle: 'How we use your data with AI',
      dataUseItems: [
        'Real-time processing to respond to your messages.',
        'Contextual memory to remember your preferences and progress.',
        'No model training with your data.',
        'No sale or licensing of data for commercial purposes.',
      ],
      retentionTitle: 'Data retention',
      retentionItems: [
        'Chat messages: 30 days.',
        'Training history: indefinite for your progress.',
        'Aggregated metrics: 1 year.',
      ],
      rightsTitle: 'Your rights',
      rightsCopy:
        'You can request a full export or deletion of your data at any time by writing to',
    };

  return (
    <LegalPageLayout
      eyebrow={content.eyebrow}
      title={content.title}
      updatedAt={content.updatedAt}
      intro={content.intro}
    >
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">{content.aiUseTitle}</h2>
        <p>{content.aiUseIntro}</p>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">{content.providersTitle}</h3>
          <ul className="list-disc list-inside space-y-1">
            {content.providers.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">{content.dataUseTitle}</h3>
          <ul className="list-disc list-inside space-y-1">
            {content.dataUseItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-white">{content.retentionTitle}</h2>
        <ul className="list-disc list-inside space-y-1">
          {content.retentionItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-white">{content.rightsTitle}</h2>
        <p>
          {content.rightsCopy}{' '}
          <a className="text-[#27e97c] underline" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default PrivacyPolicy;
