import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import StartPage from "./components/StartPage";
import LanguageDetector from "./components/LanguageDetector";
import routes from "tempo-routes";

function App() {
  return (
    <LanguageDetector>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/es" element={<Home />} />
            <Route path="/start" element={<StartPage />} />
            <Route path="/es/start" element={<StartPage />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </LanguageDetector>
  );
}

export default App;
