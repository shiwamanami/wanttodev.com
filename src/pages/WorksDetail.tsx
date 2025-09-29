import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/Button";
import Cta from "../components/Cta";
import WorksSwiper from "../components/WorksSwiper";
import { worksData } from "../data/works";
import { formatDate } from "../lib/utils";

export default function WorksDetail() {
  const { id } = useParams<{ id: string }>();
  const workId = id ? parseInt(id, 10) : 0;
  const work = worksData.find((w) => w.id === workId);

  if (!work) {
    return (
      <div className="flex min-h-screen flex-col relative">
        <section className="container max-w-6xl py-10 sm:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">作品が見つかりません</h1>
            <p className="text-gray-300 mb-8">指定された作品は存在しません。</p>
            <Link to="/works">
              <Button variant="outline">制作実績一覧に戻る</Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col relative">
      <section className="container max-w-6xl py-10 sm:py-20">
        {/* パンくずリスト */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-400">
            <li>
              <Link to="/" className="hover:text-primary-400 transition-colors">
                ホーム
              </Link>
            </li>
            <li className="text-gray-600">/</li>
            <li>
              <Link
                to="/works"
                className="hover:text-primary-400 transition-colors"
              >
                制作実績
              </Link>
            </li>
            <li className="text-gray-600">/</li>
            <li>{work.title}</li>
          </ol>
        </nav>

        <div className="space-y-20 md:space-y-40">
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

          <h2 className="text-2xl md:text-3xl text-start !mt-0 after:!hidden">
            {work.title}
          </h2>

          <div>
            <WorksSwiper />
          </div>

          <div>
            <img
              src={`/images/works/${work.id}/mobile.webp`}
              alt={work.title}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-20">
            <h3 className="md:w-1/6 text-primary-500 text-nowrap">
              Technology
              <span className="block text-sm md:text-base text-gray-300">
                ツール・使用技術
              </span>
            </h3>
            <div className="md:w-5/6 flex flex-wrap gap-3">
              {work.technologies.map((tech, index) => (
                <span key={index}>{tech}</span>
              ))}
            </div>
          </div>

          {work.details && (
            <div className="space-y-12 md:space-y-20">
              <div className="flex flex-col md:flex-row gap-8 md:gap-20">
                <h3 className="md:w-1/6 text-primary-500 text-nowrap">
                  Overview
                  <span className="block text-sm md:text-base text-gray-300">
                    プロジェクト概要
                  </span>
                </h3>
                <p className="md:w-5/6 whitespace-pre-line">
                  {work.details.overview}
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-20">
                <h3 className="md:w-1/6 text-primary-500 text-nowrap">
                  Challenge
                  <span className="block text-sm md:text-base text-gray-300">
                    課題
                  </span>
                </h3>
                <p className="md:w-5/6 whitespace-pre-line">
                  {work.details.challenge}
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-20">
                <h3 className="md:w-1/6 text-primary-500 text-nowrap">
                  Solution
                  <span className="block text-sm md:text-base text-gray-300">
                    解決策
                  </span>
                </h3>
                <p className="md:w-5/6 whitespace-pre-line">
                  {work.details.solution}
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-20">
                <h3 className="md:w-1/6 text-primary-500 text-nowrap">
                  Result
                  <span className="block text-sm md:text-base text-gray-300">
                    成果
                  </span>
                </h3>
                <p className="md:w-5/6 whitespace-pre-line">
                  {work.details.result}
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-20">
                <h3 className="md:w-1/6 text-primary-500 text-nowrap">
                  Features
                  <span className="block text-sm md:text-base text-gray-300">
                    主な機能
                  </span>
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {work.details.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <span className="w-1 h-1 bg-gray-100 rounded-full mr-3 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-20">
                <h3 className="md:w-1/6 text-primary-500 text-nowrap">
                  Release
                  <span className="block text-sm md:text-base text-gray-300">
                    納品日
                  </span>
                </h3>
                <p className="md:w-5/6 whitespace-pre-line">
                  {formatDate(work.date)}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <Link to="/works">
              <Button variant="outline">Back to Works</Button>
            </Link>
          </div>
        </div>
      </section>

      <Cta />
    </div>
  );
}
