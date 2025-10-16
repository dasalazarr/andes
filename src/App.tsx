import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home";
import StartPage from "./components/StartPage";
import LanguageDetector from "./components/LanguageDetector";
import BlogList from "./features/blog/pages/BlogList";
import BlogPost from "./features/blog/pages/BlogPost";
import SiteHeader from "./components/layout/SiteHeader";
import SiteFooter from "./components/layout/SiteFooter";
import routes from "tempo-routes";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <LanguageDetector>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <SiteHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/es" element={<Home />} />
            <Route path="/start" element={<StartPage />} />
            <Route path="/es/start" element={<StartPage />} />
            {/* Blog (Phase 1: routing only) */}
            <Route path="/blog" element={<BlogList />} />
            <Route path="/es/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/es/blog/:slug" element={<BlogPost />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          <SiteFooter />
        </>
      </Suspense>
    </LanguageDetector>
  );
}

export default App;
