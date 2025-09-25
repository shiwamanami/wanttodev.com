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

      <section className="container max-w-5xl mx-auto px-4 mb-16 md:mb-40">
        <div className="grid md:grid-cols-2 gap-8">
          <Link to="/works">
            <div className="border border-white/40 p-10 hover:bg-gray-800/90 transition-colors duration-300">
              <div className="text-center">
                <div className="w-16 md:w-20 h-16 md:h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-8">
                  <span className="material-icons text-white text-4xl md:text-5xl">
                    work
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Works</h2>
                {/* <p className="text-gray-300 mb-6 leading-relaxed">
                これまでに制作したプロジェクトや作品を紹介しています。技術的な詳細や開発過程も詳しく解説しています。
              </p> */}
                {/* <Button className="w-full md:w-auto">作品一覧を見る</Button> */}
              </div>
            </div>
          </Link>

          <Link to="/blog">
            <div className="border border-white/40 p-10 hover:bg-gray-800/90 transition-colors duration-300">
              <div className="text-center">
                <div className="w-16 md:w-20 h-16 md:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-8">
                  <span className="material-icons text-white text-4xl md:text-5xl">
                    article
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Blog</h2>
                {/* <p className="text-gray-300 mb-6 leading-relaxed">
                技術記事や開発のコツ、最新のトレンドについて詳しく解説しています。初心者から上級者まで役立つ情報を発信しています。
              </p> */}
                {/* <Button className="w-full md:w-auto">ブログを読む</Button> */}
              </div>
            </div>
          </Link>
        </div>
      </section>

      <ContactForm />
    </div>
  );
};

export default Home;
