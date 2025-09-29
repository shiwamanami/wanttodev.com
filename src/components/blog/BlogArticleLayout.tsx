import React from "react";
import { Link } from "react-router-dom";

import { Breadcrumb } from "./Breadcrumb";
import { Button } from "../Button";
import Cta from "../Cta";
import { Tag } from "./Tag";
import { Date } from "./Date";
import { RandomArticles } from "./RandomArticles";
import { CategoryList } from "./CategoryList";
import { Blog, blogData } from "../../data/blog";

interface BlogArticleLayoutProps {
  article: Blog;
  children: React.ReactNode;
  sectionTitles?: string[];
  customSections?: React.ReactNode;
  showTableOfContents?: boolean;
  showRandomArticles?: boolean;
  showCategoryList?: boolean;
  showCta?: boolean;
  showBackToBlog?: boolean;
}

export const BlogArticleLayout = ({
  article,
  children,
  sectionTitles = [],
  customSections,
  showTableOfContents = true,
  showRandomArticles = true,
  showCategoryList = true,
  showCta = true,
  showBackToBlog = true,
}: BlogArticleLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col relative">
      <Breadcrumb
        items={[
          { label: "TOP", to: "/" },
          { label: "ブログ", to: "/blog" },
          { label: article.title },
        ]}
      />

      <div className="blog">
        <article className="md:w-3/4">
          <h1>
            {article.title.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < article.title.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>

          <div className="flex justify-between items-center">
            <p>
              {article.category.map((cat: string, index: number) => (
                <Tag key={index} label={cat} />
              ))}
            </p>
          </div>

          <Date date={article.date} />

          <div className="flex justify-center mx-auto mb-10 md:mb-16">
            <div className="relative">
              <img
                src={article.image}
                alt=""
                className="object-contain max-w-full h-auto"
                style={{ maxWidth: "1000px", maxHeight: "1000px" }}
              />
            </div>
          </div>

          {children}

          {customSections}
        </article>

        <div className="md:w-1/4">
          <div className="sticky top-20 space-y-6">
            {showTableOfContents && sectionTitles.length > 0 && (
              <div className="bg-gray-800/80 border border-gray-700 rounded-lg p-4">
                <h3 className="text-base font-bold mb-4 text-center">目 次</h3>
                <ul className="space-y-4 [&_a]:text-sm">
                  {sectionTitles.map((title, index) => (
                    <li key={index}>
                      <a
                        href={`#section${String(index + 1).padStart(2, "0")}`}
                        className="block px-3 text-gray-300 hover:text-yellow-400 hover:bg-gray-700/50 rounded transition-colors duration-200"
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ランダム記事 */}
            {showRandomArticles && (
              <RandomArticles
                articles={blogData}
                currentSlug={article.slug}
                maxArticles={3}
              />
            )}

            {/* カテゴリリスト */}
            {showCategoryList && <CategoryList articles={blogData} />}
          </div>
        </div>
      </div>

      {showCta && <Cta />}

      {showBackToBlog && (
        <div className="my-10 md:my-20">
          <Link to="/blog">
            <Button>ブログ一覧へ</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
