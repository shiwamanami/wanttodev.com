import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/Button";
import Cta from "../components/Cta";
import WorksSwiper from "../components/WorksSwiper";
import { worksData } from "../data/works";

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

        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-semibold text-primary-400 bg-primary-500/20 px-3 py-1 rounded-full">
                {work.category}
              </span>
              <span className="text-sm text-gray-400">{work.date}</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{work.title}</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {work.description}
            </p>
          </div>

          <div className="mb-12 md:mb-20">
            <WorksSwiper />
          </div>
          <div className="mb-12">
            <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-600 rounded-lg flex items-center justify-center">
                    <span className="text-4xl font-bold">W</span>
                  </div>
                  <p className="text-lg">メイン画像プレースホルダー</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">ツール・使用技術</h2>
            <div className="flex flex-wrap gap-3">
              {work.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {work.details && (
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">プロジェクト概要</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {work.details.overview}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">課題</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {work.details.challenge}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">解決策</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {work.details.solution}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">成果</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {work.details.result}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">主な機能</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {work.details.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Release 納品日</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {work.date}
                </p>
              </div>
            </div>
          )}

          <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/works">
              <Button variant="outline">Back to Works</Button>
            </Link>
            <a
              href={work.details.link}
              className="bg-primary-500 px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors text-center"
            >
              プロジェクトを見る
            </a>
          </div>
        </div>
      </section>

      <Cta />
    </div>
  );
}
