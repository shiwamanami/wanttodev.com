import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { ContactForm } from "../components/ContactForm";
import BasicAuth from "../components/BasicAuth";
import { useAuth } from "../hooks/useAuth";
import { useWorksData } from "../hooks/useWorksData";
// import { ColorPalette } from "../components/ColorPalette";

export default function Works() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const { works, isLoading: dataLoading } = useWorksData();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  const allCategories = Array.from(
    new Set(works.flatMap((work) => work.category))
  ).sort();

  // 認証が必要な場合の処理
  if (isLoading || dataLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col relative">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-300">読み込み中...</p>
        </div>
      </div>
    );
  }

  // 認証されていない場合は認証モーダルを表示
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col relative">
        <div className="text-center">
          <h2>
            WORKS
            <span>制作実績</span>
          </h2>
          <p className="mb-10 md:mb-20">
            このページにアクセスするにはログインが必要です。
          </p>
          <Button onClick={() => setShowAuthModal(true)}>Login</Button>
        </div>
        {showAuthModal && (
          <BasicAuth
            onAuthSuccess={() => {
              setShowAuthModal(false);
              login();
            }}
            onAuthCancel={() => setShowAuthModal(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col relative">
      {/* <ColorPalette/> */}
      <section className="container max-w-6xl py-10 sm:py-20">
        <div className="flex justify-between items-center mb-8">
          <h2>
            WORKS
            <span>制作実績</span>
          </h2>
          <Button variant="outline" onClick={logout} className="text-sm">
            Logout
          </Button>
        </div>

        <div>
          <div className="flex flex-wrap gap-4 mb-12 md:mb-20">
            {["すべて", ...allCategories].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm px-6 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-primary-500 hover:bg-primary-600"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 md:mb-40">
            {works
              .filter(
                (work) =>
                  selectedCategory === "すべて" ||
                  work.category.includes(selectedCategory as any)
              )
              .map((work) => (
                <Link
                  key={work.id}
                  to={`/works/${work.id}`}
                  className="backdrop-blur-sm overflow-hidden transition-all duration-300 group block"
                >
                  <div className="mb-4">
                    <img
                      src={`/images/works/${work.id}/thumbnail.webp`}
                      alt={work.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {work.category.map((cat, index) => (
                          <Link
                            key={index}
                            to={`/works?category=${cat}`}
                            className="text-xs text-primary-500 border-b border-transparent hover:border-primary-500"
                          >
                            #{cat}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-lg md:text-xl mb-3 group-hover:text-primary-500 transition-colors">
                      {work.title}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>

          <div className="text-center">
            <Link to="/">
              <Button variant="outline">Back to TOP</Button>
            </Link>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
