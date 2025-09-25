import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { HeroSection } from "../components/HeroSection";
import Cta from "../components/Cta";
import { ContactForm } from "../components/ContactForm";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Home: React.FC = () => {
  useDocumentTitle("ホーム");

  return (
    <div className="text-center">
      <HeroSection />

      <section className="container max-w-5xl mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800/80 border border-gray-700 rounded-lg p-8 hover:bg-gray-800/90 transition-colors duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-white text-4xl">work</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Works</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                これまでに制作したプロジェクトや作品を紹介しています。技術的な詳細や開発過程も詳しく解説しています。
              </p>
              <Link to="/works">
                <Button className="w-full md:w-auto">作品一覧を見る</Button>
              </Link>
            </div>
          </div>

          {/* Blog セクション */}
          <div className="bg-gray-800/80 border border-gray-700 rounded-lg p-8 hover:bg-gray-800/90 transition-colors duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-white text-4xl">
                  article
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Blog</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                技術記事や開発のコツ、最新のトレンドについて詳しく解説しています。初心者から上級者まで役立つ情報を発信しています。
              </p>
              <Link to="/blog">
                <Button className="w-full md:w-auto">ブログを読む</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Link to="/privacy-policy">
        <Button>プライバシーポリシーを確認</Button>
      </Link>

      <Cta />
      <ContactForm />
    </div>
  );
};

export default Home;
