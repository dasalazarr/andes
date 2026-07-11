# Proposal: Rediseño "oscuro orgánico" — club de experiencia

## Why

El posicionamiento visual y de copy ("Finish your first marathon injury-free", dark neón técnico, foto masculina, testimonios LATAM) contradecía el pivote al club de experiencia en Pamplona (ICP mujer principiante, wellness aspiracional). Decisiones del usuario: mantener base oscura pero refinada, alcance sitio completo ES+EN, copy híbrido ("Enamórate de correr en dos semanas" + "tu primera carrera"), stock curado hasta tener fotos de eventos.

## What Changes

- **Sistema de diseño**: tokens semánticos en Tailwind (`surface`, `surface-elevated`, `brand` #34D399, `brand-deep`, `whatsapp` #25d366, `cream`); tipografía Fraunces (display) + Inter (body) — antes no se cargaba ninguna fuente; `prefers-reduced-motion` global + `useReducedMotion` en AnimatedSection y guard en el timeline GSAP del hero.
- **Regla de color**: `brand` para acentos de marca; `whatsapp` reservado a botones de conversión (verde marca ≠ verde WhatsApp).
- **Copy** (`content.tsx`, ES+EN): hero nuevo, benefits→outcomes, pillars humanizados, FAQ con "¿Tengo que ser rápida?" primero, CTA final "Tu primera carrera empieza con un mensaje", nuevo `clubContent`.
- **Estructura home**: nueva sección **Club** (`ClubSection.tsx`) tras el demo, con CTA a WhatsApp y link a `/embajadores`; hero con foto (mujeres corriendo) en vez de video de 15MB; testimonios con dots accesibles en vez de avatares-botón; KPI bar con disclaimer beta enmarcado.
- **Header**: fix del bug de anclas fuera de la home (navegación a `/#seccion` resuelta por hash en home.tsx), item "Embajadoras", fondo sólido al hacer scroll; nav muerto "Aprender/#articles" eliminado.
- **Footer**: link muerto "Calendario de Carreras" eliminado; tagline del club; link Embajadoras.
- **SEO**: titles/descriptions al nuevo posicionamiento (fuera "marathon").

## Non-goals

- Rediseño del blog y formularios (heredan tokens gradualmente).
- Cambios de política freemium o del contrato de onboarding.
- Nueva OG image (pendiente, se anota).

## Impact

- Spec `onboarding-funnel`: nuevos requirements (sección Club, regla de color de conversión).
- Los ~40 hex neón de los componentes del funnel quedaron tokenizados; quedan hex en blog/forms (fuera de alcance).
