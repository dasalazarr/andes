import React from 'react';
import { useLocation } from 'react-router-dom';
import LegalPageLayout from '@/components/legal/LegalPageLayout';

interface WhatsAppItem {
  text: string;
  link?: string;
}

const TermsOfService: React.FC = () => {
  const { pathname } = useLocation();
  const isEs = pathname.startsWith('/es');

  const content = isEs
    ? {
      eyebrow: 'Términos',
      title: 'Términos de Servicio - Coaching vía WhatsApp',
      updatedAt: 'Última actualización: 2025-12-21',
      intro:
        'Estos términos aplican al servicio de coaching de running de Andes entregado por WhatsApp. El producto es el coaching deportivo personalizado, no la tecnología AI.',
      natureTitle: 'Naturaleza del servicio',
      natureCopy:
        'Andes es un servicio de coaching deportivo. La inteligencia artificial se usa como método de entrega y apoyo.',
      whatsappTitle: 'Comunicación vía WhatsApp',
      whatsappItems: [
        { text: 'Recibir mensajes de coaching y recordatorios.' },
        { text: 'Que tus mensajes sean procesados por sistemas de AI para generar respuestas.' },
        {
          text: 'Los términos de WhatsApp Business:',
          link: 'https://www.whatsapp.com/legal/business-terms/',
        },
      ] as WhatsAppItem[],
      limitsTitle: 'Limitaciones',
      limitsItems: [
        'Las recomendaciones son orientativas y no reemplazan consejo médico.',
        'Las sugerencias deben ajustarse a tu condición física personal.',
        'Consulta con un profesional de salud antes de iniciar un programa.',
      ],
      providersTitle: 'Proveedores de tecnología',
      providersCopy:
        'Utilizamos proveedores tecnológicos que actúan como procesadores de datos bajo nuestras instrucciones. Esto incluye servicios de AI, bases de datos y almacenamiento en la nube.',
    }
    : {
      eyebrow: 'Terms',
      title: 'Terms of Service - WhatsApp Coaching',
      updatedAt: 'Last updated: 2025-12-21',
      intro:
        'These terms apply to the Andes running coaching service delivered through WhatsApp. The product is personalized sports coaching, not the AI itself.',
      natureTitle: 'Nature of the service',
      natureCopy:
        'Andes is a sports coaching service. Artificial intelligence is used as a delivery and support tool.',
      whatsappTitle: 'Communication via WhatsApp',
      whatsappItems: [
        { text: 'Receive coaching messages and reminders.' },
        { text: 'Your messages are processed by AI systems to generate responses.' },
        {
          text: 'The WhatsApp Business terms:',
          link: 'https://www.whatsapp.com/legal/business-terms/',
        },
      ] as WhatsAppItem[],
      limitsTitle: 'Limitations',
      limitsItems: [
        'Recommendations are informational and not medical advice.',
        'Training suggestions should match your personal condition.',
        'Consult a health professional before starting a program.',
      ],
      providersTitle: 'Technology providers',
      providersCopy:
        'We use technology providers that act as data processors under our instructions. This includes AI services, databases, and cloud storage.',
    };

  return (
    <LegalPageLayout
      eyebrow={content.eyebrow}
      title={content.title}
      updatedAt={content.updatedAt}
      intro={content.intro}
    >
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">{content.natureTitle}</h2>
        <p>{content.natureCopy}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-white">{content.whatsappTitle}</h2>
        <ul className="list-disc list-inside space-y-1">
          {content.whatsappItems.map((item) => (
            <li key={item.text}>
              {item.text}{' '}
              {item.link ? (
                <a
                  className="text-[#27e97c] underline"
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.link}
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-white">{content.limitsTitle}</h2>
        <ul className="list-disc list-inside space-y-1">
          {content.limitsItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">{content.providersTitle}</h2>
        <p>{content.providersCopy}</p>
      </section>
    </LegalPageLayout>
  );
};

export default TermsOfService;
