import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import Cta from "../components/Cta";
import BasicAuth from "../components/BasicAuth";
import { useAuth } from "../hooks/useAuth";
import { worksData } from "../data/works";
// import { ColorPalette } from "../components/ColorPalette";

export default function Works() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // 認証が必要な場合の処理
  if (isLoading) {
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
          <Button onClick={() => setShowAuthModal(true)}>ログイン</Button>
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
            ログアウト
          </Button>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="px-6 py-2 bg-primary-500 rounded-full font-semibold hover:bg-primary-600 transition-colors">
              すべて
            </button>
            <button className="px-6 py-2 bg-gray-700 text-gray-300 rounded-full font-semibold hover:bg-gray-600 transition-colors">
              HP / ホームページ
            </button>
            <button className="px-6 py-2 bg-gray-700 text-gray-300 rounded-full font-semibold hover:bg-gray-600 transition-colors">
              LP / ランディングページ
            </button>
            <button className="px-6 py-2 bg-gray-700 text-gray-300 rounded-full font-semibold hover:bg-gray-600 transition-colors">
              EC / エレクトリックコマース
            </button>
            <button className="px-6 py-2 bg-gray-700 text-gray-300 rounded-full font-semibold hover:bg-gray-600 transition-colors">
              グラフィックデザイン
            </button>
          </div>

          {/* 制作実績グリッド */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {worksData.map((work) => (
              <Link
                key={work.id}
                to={`/works/${work.id}`}
                className="bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700 hover:border-primary-500/50 transition-all duration-300 group block"
              >
                {/* 画像プレースホルダー */}
                <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-600 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold">W</span>
                    </div>
                    <p className="text-sm">画像プレースホルダー</p>
                  </div>
                </div>

                <div className="p-6">
                  ¥
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-primary-400 bg-primary-500/20 px-3 py-1 rounded-full">
                      {work.category}
                    </span>
                    <span className="text-sm text-gray-400">{work.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary-400 transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {work.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {work.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/works/${work.id}`} className="flex-1">
                      <Button className="w-full text-sm">詳細を見る</Button>
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/">
              <Button variant="outline">TOPへ戻る</Button>
            </Link>
          </div>
        </div>
      </section>

      <Cta />
    </div>
  );
}
