import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { BlogArticleLayout } from "../components/blog/BlogArticleLayout";
import { DynamicSections } from "../components/blog/DynamicSections";
import BasicAuth from "../components/BasicAuth";
import { useBlogAuth } from "../hooks/useAuth";
import { blogData } from "../data/blog";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { isAuthenticated, isLoading, login } = useBlogAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // slugに基づいて記事を検索
  const article = blogData.find((post) => post.slug === slug);

  // 記事が見つからない場合は404ページにリダイレクト
  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  // セクションタイトルを抽出（目次用）
  const sectionTitles =
    article.sections?.map((section) => section.title).filter(Boolean) || [];

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
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-6 py-3 bg-primary-500 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
          >
            Login
          </button>
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
    <BlogArticleLayout
      article={article}
      sectionTitles={sectionTitles}
      showTableOfContents={true}
      showRandomArticles={true}
      showCategoryList={true}
      showCta={true}
      showBackToBlog={true}
    >
      {/* 記事の動的セクションをレンダリング */}
      {article.sections && (
        <DynamicSections
          sections={article.sections}
          articleId={article.id.toString()}
        />
      )}
    </BlogArticleLayout>
  );
}
