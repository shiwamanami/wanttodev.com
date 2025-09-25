import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Works from "./pages/Works";
import WorksDetail from "./pages/WorksDetail";
import BlogPage from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop";

// Vanta.jsの型定義
declare global {
  interface Window {
    VANTA: {
      HALO: (options: any) => any;
    };
  }
}

const App: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);

  // Vanta.jsのHaloエフェクトを初期化
  useEffect(() => {
    if (vantaRef.current && window.VANTA) {
      const vantaEffect = window.VANTA.HALO({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        backgroundColor: 0x0a0a0a,
        color: 0xffffff,
        color2: 0xffffff,
        size: 1.5,
        amplitudeFactor: 1.0,
        xOffset: 0.0,
        yOffset: 0.0,
        zOffset: 0.0,
      });

      return () => {
        if (vantaEffect && vantaEffect.destroy) {
          vantaEffect.destroy();
        }
      };
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col relative">
        <div
          ref={vantaRef}
          className="fixed inset-0 w-full h-full z-0"
          style={{ minHeight: "100vh" }}
        />

        <div className="relative z-10 min-h-screen flex flex-col bg-transparent">
          <Header />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/works" element={<Works />} />
              <Route path="/works/:id" element={<WorksDetail />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
