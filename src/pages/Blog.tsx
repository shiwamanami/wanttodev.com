import { Link, useSearchParams } from "react-router-dom";

import { Button } from "../components/Button";
import Cta from "../components/Cta";
import { BlogList } from "../components/blog/BlogList";
import { CategoryList } from "../components/blog/CategoryList";

import { blogData } from "../data/blog";

// Metadata型はNext.js用のため、React Routerプロジェクトでは削除

export default function BlogPage() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  // カテゴリでフィルタリング
  const filteredPosts = blogData.filter((post) => {
    if (!selectedCategory) return post.isVisible;
    return post.isVisible && post.category.includes(selectedCategory);
  });

  return (
    <div className="flex min-h-screen flex-col relative">
      <main className="flex-1">
        <section className="container max-w-6xl py-10 sm:py-20">
          <h2>
            BLOG
            <span>ブログ</span>
          </h2>

          {selectedCategory && (
            <div className="mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg inline-block">
                <p className="text-yellow-300 font-semibold">
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
              <Button>TOPへ戻る</Button>
            </Link>
          </div>
        </section>

        <Cta />
      </main>
    </div>
  );
}
