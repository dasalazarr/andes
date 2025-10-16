
<idea> 

Convertir nuestra landing page de Andes en un blog escalable y optimizado para SEO, con soporte en dos idiomas (EN/ES), que permita:

Publicar artículos alrededor de running, maratón, prevención de lesiones, nutrición y comunidad.

Atraer tráfico orgánico mediante contenidos evergreen.

Reforzar la autoridad de marca Andes Runners y mejorar conversiones hacia el onboarding de WhatsApp.

</idea> 

<problem> 

Landing actual limitada

Solo muestra contenido estático en / y /es/.

Los textos viven en src/data/content.tsx y no hay CMS ni sistema de posts.

Dificultad para iterar rápido en artículos o actualizar sin code deploy.

SEO incompleto

Estructura actual no indexa artículos, solo landing.

Falta sitemap dinámico, metadatos ricos (OpenGraph, JSON-LD, schema.org).

Blog inexistente reduce la captación orgánica en Google.

Arquitectura rígida

Todo el contenido está embebido en el código (no desacoplado).

Multi-idioma manual (doble build).

No hay ruta para /blog ni /es/blog.

</problem>

<approach> 

1. Definir arquitectura del blog

Crear nuevas rutas en App.tsx:

/blog y /es/blog → listado de artículos.

/blog/:slug y /es/blog/:slug → detalle artículo.

Mantener Netlify para servir contenido estático con soporte SEO (prerender/SSR opcional vía Netlify Functions si se requiere).

2. Estrategia de contenidos

Temas core: entrenamiento maratón, prevención de lesiones, planes 5k–42k, nutrición, mentalidad runner, comunidad Andes.

Calendarizar mínimo 2 artículos por semana (EN + ES).

Implementar esquema pillar content + cluster para SEO:

Pillar: “Cómo preparar tu primera maratón”

Cluster: “Entrenamientos 20 semanas”, “Errores comunes”, “Nutrición”, “Prevención de lesiones”.

3. Gestión del contenido

Fase inicial (rápida): mantener posts en Markdown (/content/blog/en/*.md, /content/blog/es/*.md) parseados con vite-plugin-mdx o remark.

Fase 2: evaluar headless CMS (ej. Sanity, Contentful) si escala la frecuencia y el equipo crece.

Integrar a src/data/content.tsx un articles loader dinámico.

4. SEO técnico

Usar <Helmet> en cada post con title, description, lang.

Implementar sitemap.xml y robots.txt con enlaces a blog.

Generar structured data (Article schema.org).

Canonical tags entre / y /es/.

Preload de imágenes vía SmartImage.tsx (ya integrado con Netlify CDN).

Optimizar CLS/LCP (ya tenemos defer video + lazy load imágenes).

5. Integración con backend

No se requiere DB nueva (artículos estáticos).

Pero podemos loggear métricas (clicks desde blog → onboarding) en el API existente /onboarding/start.

Evitar exponer PII en logs (cumplir con 06-security).

6. Observabilidad y métricas

Nueva métrica en observabilidad:

BlogVisitors, ArticlesRead, ConversionFromBlog.

Alertas si CTR blog → onboarding < 3%.

Mantener SLOs: p95 < 2s.

7. Testing y despliegue

Tests E2E para validar:

Carga de /blog y /es/blog.

Artículo se renderiza con metadatos.

Links a onboarding funcionan.

Deploy vía Netlify (previo staging branch).

Rollback plan: revertir rutas nuevas en caso de error.

</approach> 

✅ Resultado esperado: Blog bilingüe en /blog y /es/blog, escalable, optimizado SEO, con contenido evergreen que aumente tráfico orgánico y conversiones.

Plan de trabajo (6 pasos, respetando diseño y colores actuales)

1) Rutas del blog: agregar /blog, /es/blog, /blog/:slug y /es/blog/:slug en el router; mantener LanguageDetector y navegación actual sin romper la home.
2) Contenido Markdown/MDX: repositorio en content/blog/{en,es} con frontmatter (title, description, slug, date, tags, category, cover, canonicalId); loader estático y tipos alineados.
3) SEO técnico: usar SeoManager por ruta con title/description/og, hreflang y canonical EN↔ES; JSON‑LD Article en posts; generar sitemap.xml y robots.txt.
4) UX del blog: listas con cards, detalle con TOC y progreso; CTAs hacia onboarding; imágenes responsive; reutilizar tipografías, componentes y tokens Tailwind existentes (sin nueva paleta).
5) Analítica: instrumentar page_view, article_read (tiempo/scroll), cta_click hacia onboarding con idioma/slug/canonicalId; métricas BlogVisitors, ArticlesRead, ConversionFromBlog.
6) Calidad y despliegue: E2E para /blog y /es/blog, validación de metadatos/hreflang; feature flag VITE_BLOG_ENABLED; CI que regenere sitemap; preparar evaluación a CMS cuando escale.
