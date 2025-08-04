import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import StartPage from "./components/StartPage";
import LanguageDetector from "./components/LanguageDetector";
import { HeroSkeleton } from "./components/ui/optimized-loading";
import routes from "tempo-routes";

function App() {
  // Load TikTok Pixel asynchronously after initial render to avoid blocking
  useEffect(() => {
    // Delay TikTok pixel loading to avoid blocking initial render
    const loadTikTokPixel = () => {
      if (typeof window !== 'undefined' && !window.ttq) {
        // TikTok Pixel Code - Non-blocking version
        (function (w: any, d: any, t: any) {
          w.TiktokAnalyticsObject = t;
          var ttq = w[t] = w[t] || [];
          ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];
          ttq.setAndDefer = function (t: any, e: any) {
            t[e] = function () {
              t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
            };
          };
          for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
          ttq.instance = function (t: any) {
            for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
            return e;
          };
          ttq.load = function (e: any, n: any) {
            var r = "https://analytics.tiktok.com/i18n/pixel/events.js", o = n && n.partner;
            ttq._i = ttq._i || {};
            ttq._i[e] = [];
            ttq._i[e]._u = r;
            ttq._t = ttq._t || {};
            ttq._t[e] = +new Date();
            ttq._o = ttq._o || {};
            ttq._o[e] = n || {};

            // Load script with requestIdleCallback for better performance
            const loadScript = () => {
              var script = document.createElement("script");
              script.type = "text/javascript";
              script.async = true;
              script.src = r + "?sdkid=" + e + "&lib=" + t;
              var firstScript = document.getElementsByTagName("script")[0];
              firstScript.parentNode?.insertBefore(script, firstScript);
            };

            if ('requestIdleCallback' in window) {
              (window as any).requestIdleCallback(loadScript);
            } else {
              setTimeout(loadScript, 100);
            }
          };

          ttq.load('D28C8CJC77U5781IOT7G');
          ttq.page();
        })(window, document, 'ttq');
      }
    };

    // Load TikTok pixel after a short delay to avoid blocking initial render
    const timer = setTimeout(loadTikTokPixel, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageDetector>
      <Suspense fallback={<HeroSkeleton />}>
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
