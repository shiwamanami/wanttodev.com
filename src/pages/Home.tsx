import React from "react";
import { Link } from "react-router-dom";
// import { Button } from "../components/Button";
import { HeroSection } from "../components/HeroSection";
import { ContactForm } from "../components/ContactForm";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Home: React.FC = () => {
  useDocumentTitle("ホーム");

  return (
    <div className="text-center">
      <HeroSection />

      <section className="container max-w-5xl mx-auto px-4 mb-16 md:mb-80">
        <div className="grid md:grid-cols-2 gap-8 md:gap-20">
          <Link to="/works">
            <div className="border border-white/40 p-10 md:py-20 hover:bg-white/10 text-center transition-colors duration-300">
              <div className="flex items-center justify-center mx-auto mb-4 md:mb-10">
                <span className="material-icons text-4xl md:text-5xl">
                  work
                </span>
              </div>
              <h2 className="mb-0">
                WORKS
                <span>制作実績</span>
              </h2>
            </div>
          </Link>

          <Link to="/blog">
            <div className="border border-white/40 p-10 md:py-20 hover:bg-white/10 text-center transition-colors duration-300">
              <div className="flex items-center justify-center mx-auto mb-4 md:mb-10">
                <span className="material-icons text-4xl md:text-5xl">
                  article
                </span>
              </div>
              <h2 className="mb-0">
                BLOG
                <span>ブログ</span>
              </h2>
            </div>
          </Link>
        </div>
      </section>

      <ContactForm />
    </div>
  );
};

export default Home;
