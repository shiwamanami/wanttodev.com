import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useBlogAuth } from "../hooks/useAuth";

import BasicAuth from "../components/BasicAuth";
import { Button } from "../components/Button";
import Cta from "../components/Cta";
import { BlogList } from "../components/blog/BlogList";
import { CategoryList } from "../components/blog/CategoryList";

import { blogData } from "../data/blog";

export default function BlogPage() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const { isAuthenticated, isLoading, login, logout } = useBlogAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // カテゴリでフィルタリング
  const filteredPosts = blogData.filter((post) => {
    if (!selectedCategory) return post.isVisible;
    return post.isVisible && post.category.includes(selectedCategory);
  });

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
            BLOG
            <span>ブログ</span>
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
      <section className="container max-w-6xl py-10 sm:py-20">
        <div className="flex justify-between items-center mb-8">
          <h2>
            BLOG
            <span>ブログ</span>
          </h2>
          <Button variant="outline" onClick={logout} className="text-sm">
            ログアウト
          </Button>
        </div>

        {selectedCategory && (
          <div className="mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg inline-block">
              <p className="text-primary-400 font-semibold">
                カテゴリ: {selectedCategory}
                <span className="ml-2 text-gray-400">
                  ({filteredPosts.length}件)
                </span>
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <BlogList key={post.id} post={post} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400 text-lg">
                    {selectedCategory
                      ? `「${selectedCategory}」カテゴリの記事が見つかりませんでした。`
                      : "記事が見つかりませんでした。"}
                  </p>
                  <Link to="/blog" className="inline-block mt-4">
                    <Button>すべての記事を見る</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-1/4">
            <CategoryList articles={blogData} />
          </div>
        </div>

        <div className="mt-20 md:mt-28 text-center">
          <Link to="/">
            <Button>Back to TOP</Button>
          </Link>
        </div>
      </section>

      <Cta />
    </div>
  );
}
