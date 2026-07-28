import React from "react";
import { useLocation, Link } from "react-router-dom";

/** Minimal, on-brand 404 catch-all. Bilingual by path prefix (repo convention). */
const NotFound: React.FC = () => {
  const { pathname } = useLocation();
  const isEs = pathname.startsWith("/es");
  const homePath = isEs ? "/es" : "/";
  const t = isEs
    ? {
        title: "Esta ruta no existe",
        body: "La página que buscas no está aquí. Volvamos al inicio.",
        cta: "Ir al inicio",
      }
    : {
        title: "This route doesn't exist",
        body: "The page you're looking for isn't here. Let's head back home.",
        cta: "Go home",
      };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 text-center text-white">
      <p className="font-display text-6xl font-semibold text-brand">404</p>
      <h1 className="mt-4 text-2xl font-semibold">{t.title}</h1>
      <p className="mt-2 max-w-md text-white/70">{t.body}</p>
      <Link
        to={homePath}
        className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-brand px-8 py-3 text-sm font-semibold text-surface transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        {t.cta}
      </Link>
    </main>
  );
};

export default NotFound;
