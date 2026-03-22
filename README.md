# Andes Web

Landing de adquisición para Andes.

El objetivo principal es convertir visitas web en conversaciones iniciadas por WhatsApp.

## Alcance del sistema

- `andes/` es la web pública y la capa de adquisición/conversión.
- `v3/` es el backend principal y la plataforma operativa.
- WhatsApp es el canal principal donde vive la experiencia del usuario.

## Relación con el backend

- Esta web llama `POST /onboarding/start` del backend para generar el `whatsappLink`.
- La lógica de negocio, la IA, los webhooks y las integraciones viven en `../../v3/`.
- Documentación técnica operativa: `../../v3/docs/README.md`.

## Documentación clave

1. Visión 360 de la solución base:  
   `docs/landing-base-solution-360.md`
2. Estrategia de contenido:  
   `docs/content-strategy.md`
3. Roadmap de desarrollo:  
   `docs/DEVELOPMENT_ROADMAP.md`
4. Backend y arquitectura operativa:
   `../../v3/docs/README.md`

## Stack técnico

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Vitest + React Testing Library

## Comandos principales

```bash
npm run dev
npm run type-check
npm test
npm run build
```

## Arquitectura funcional (resumen)

1. `src/components/home.tsx`  
   Orquesta el funnel completo de la landing.

2. `src/data/content.tsx`  
   Fuente de verdad de copy y estructura ES/EN.

3. `src/lib/onboarding.ts`  
   Flujo unificado para CTAs que llaman `POST /onboarding/start`.

4. `src/components/HeroSection.tsx`  
   Propuesta de valor, límite Lite y CTAs primarios.

5. `src/components/PricingSection.tsx`  
   Claridad Free vs Premium y comparativa de valor.

## Contrato de onboarding

Endpoint:

`POST https://v3-production-2670.up.railway.app/onboarding/start`

Body:

```json
{
  "intent": "free | premium",
  "language": "es | en"
}
```

Respuesta esperada:

```json
{
  "success": true,
  "whatsappLink": "https://wa.me/..."
}
```

## Notas operativas

- Priorizar siempre mobile first.
- No modificar `dist/`.
- Mantener consistencia de mensajes críticos en Hero, Pricing y FAQ.
- Para cambios de copy, editar primero `src/data/content.tsx`.

