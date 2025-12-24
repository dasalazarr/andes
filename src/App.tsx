import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home";
import LanguageDetector from "./components/LanguageDetector";
import BlogList from "./features/blog/pages/BlogList";
import BlogPost from "./features/blog/pages/BlogPost";
import SiteHeader from "./components/layout/SiteHeader";
import SiteFooter from "./components/layout/SiteFooter";
import routes from "tempo-routes";
import PrivacyPolicy from "@/components/legal/PrivacyPolicy";
import TermsOfService from "@/components/legal/TermsOfService";

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
            <Route path="/es" element={<Home />} />
            {/* Blog (Phase 1: routing only) */}
            <Route path="/blog" element={<BlogList />} />
            <Route path="/es/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/es/blog/:slug" element={<BlogPost />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/es/privacy" element={<PrivacyPolicy />} />
            <Route path="/es/terms" element={<TermsOfService />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          <SiteFooter />
        </>
      </Suspense>
    </LanguageDetector>
  );
}

export default App;
