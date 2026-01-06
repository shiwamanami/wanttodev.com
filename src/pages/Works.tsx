import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { ContactForm } from "../components/ContactForm";
import { LazyImage } from "../components/LazyImage";
import BasicAuth from "../components/BasicAuth";
import { useAuth } from "../hooks/useAuth";
import { useWorksData } from "../hooks/useWorksData";
import { WorkCategory } from "../data/works";

export default function Works() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const { works, isLoading: dataLoading } = useWorksData();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<WorkCategory | "すべて">("すべて");

  const allCategories = Array.from(
    new Set(works.filter((work) => work.isVisible).flatMap((work) => work.category))
  ).sort();

  // 認証が必要な場合の処理
  if (isLoading || dataLoading) {
    return (
      <div className="flex items-center justify-center h-full flex-col relative">
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
      <div className="flex items-center justify-center h-full flex-col relative">
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
          <div className="flex flex-wrap gap-2 md:gap-3 mb-16 md:mb-20">
            {(["すべて", ...allCategories] as (WorkCategory | "すべて")[]).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-xs md:text-sm px-3 md:px-5 py-1 md:py-1.5 rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-primary-500 hover:bg-primary-600"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {works.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-4">データが読み込まれていません</p>
              <p className="text-sm text-gray-500">
                コンソールでエラーログを確認してください
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-10 mb-28 md:mb-40">
              {works
                .filter(
                  (work) =>
                    work.isVisible &&
                    (selectedCategory === "すべて" ||
                      work.category.includes(selectedCategory as WorkCategory))
                )
                .map((work) => (
                  <Link
                    key={work.id}
                    to={`/works/${work.id}`}
                    className="backdrop-blur-sm overflow-hidden transition-all duration-300 group block"
                  >
                    <div className="mb-4 aspect-[8/5] overflow-hidden">
                      <LazyImage
                        src={`/images/works/${work.id}/thumbnail.webp`}
                        alt={work.title}
                        className="w-full h-full"
                      />
                    </div>

                    <div>
                      <div className="mb-1">
                        <div className="flex flex-wrap gap-2">
                          {work.category.map((cat, index) => (
                            <span
                              key={index}
                              className="text-xs md:text-sm text-primary-500 border-b border-transparent hover:border-primary-500 cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedCategory(cat);
                              }}
                            >
                              #{cat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="text-lg md:text-xl group-hover:text-primary-500 transition-colors">
                        {work.title}
                      </h3>
                    </div>
                  </Link>
                ))}
            </div>
          )}

          <div className="text-center mb-16 md:mb-20">
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
