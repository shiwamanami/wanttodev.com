import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/Button";
import Cta from "../components/Cta";
import WorksSwiper from "../components/WorksSwiper";
import { useWorksData } from "../hooks/useWorksData";
import { formatDate } from "../lib/utils";

export default function WorksDetail() {
  const { id } = useParams<{ id: string }>();
  const { getWork } = useWorksData();
  const workId = id ? parseInt(id, 10) : 0;
  const work = getWork(workId);

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
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-400">
            <li>
              <Link to="/" className="hover:text-primary-400 transition-colors">
                Top
              </Link>
            </li>
            <li className="text-gray-600">/</li>
            <li>
              <Link
                to="/works"
                className="hover:text-primary-400 transition-colors"
              >
                Works
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
                className="text-xs md:text-sm text-primary-500 border-b border-transparent hover:border-primary-500 mb-3"
              >
                #{cat}
              </Link>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl text-start !mt-0 after:!hidden">
            {work.title}
          </h2>

          <div className="!mt-10 md:!mt-20">
            <WorksSwiper />
          </div>

          {/* PC image */}
          <div className="flex flex-row gap-2 md:gap-10">
            <div>
              <img
                src={`/images/works/${work.id}/pc01.webp`}
                className="object-cover"
                alt={work.title}
              />
            </div>
            <div>
              <img
                src={`/images/works/${work.id}/pc02.webp`}
                className="object-cover"
                alt={work.title}
              />
            </div>
            <div>
              <img
                src={`/images/works/${work.id}/pc03.webp`}
                className="object-cover"
                alt={work.title}
              />
            </div>
          </div>

          {/* mobile image */}
          <div className="flex flex-row gap-2 md:gap-10">
            <div>
              <img
                src={`/images/works/${work.id}/mobile01.webp`}
                className="object-cover"
                alt={work.title}
              />
            </div>
            <div>
              <img
                src={`/images/works/${work.id}/mobile02.webp`}
                className="object-cover"
                alt={work.title}
              />
            </div>
            <div>
              <img
                src={`/images/works/${work.id}/mobile03.webp`}
                className="object-cover"
                alt={work.title}
              />
            </div>
          </div>

          {/* wire image */}
          <div className="flex flex-row gap-2 md:gap-10">
            {work.mediaData.wireImages.map((wireImg, index) => (
              <div key={index}>
                <img
                  src={wireImg.src}
                  className="object-cover"
                  alt={wireImg.alt || `${work.title} - Wireframe ${index + 1}`}
                />
                <p>ワイヤーフレーム</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-20">
            <h3 className="md:w-1/6 text-primary-500 text-nowrap">
              Role
              <span className="block text-sm md:text-base text-gray-100">
                担当役割
              </span>
            </h3>
            <div className="md:w-5/6">
              <span className="text-gray-100">{work.role}</span>
            </div>
          </div>

          {/* <div className="flex flex-col md:flex-row gap-8 md:gap-20">
            <h3 className="md:w-1/6 text-primary-500 text-nowrap">
              Client
              <span className="block text-sm md:text-base text-gray-100">
                クライアント
              </span>
            </h3>
            <div className="md:w-5/6">
              <span className="text-gray-100">{work.client}</span>
            </div>
          </div> */}

          <div className="flex flex-col md:flex-row gap-8 md:gap-20">
            <h3 className="md:w-1/6 text-primary-500 text-nowrap">
              Industry
              <span className="block text-sm md:text-base text-gray-100">
                業種
              </span>
            </h3>
            <div className="md:w-5/6">
              <span className="text-gray-100">{work.industry}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-20">
            <h3 className="md:w-1/6 text-primary-500 text-nowrap">
              Technology
              <span className="block text-sm md:text-base text-gray-100">
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
            <div className="space-y-20 md:space-y-40">
              <div className="flex flex-col md:flex-row gap-8 md:gap-20">
                <h3 className="md:w-1/6 text-primary-500 text-nowrap">
                  Overview
                  <span className="block text-sm md:text-base text-gray-100">
                    プロジェクト概要
                  </span>
                </h3>
                <div className="md:w-5/6 space-y-2">
                  {Array.isArray(work.details.overview) ? (
                    work.details.overview.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))
                  ) : (
                    <p>{work.details.overview}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-20">
                <h3 className="md:w-1/6 text-primary-500 text-nowrap">
                  Challenge
                  <span className="block text-sm md:text-base text-gray-100">
                    課題
                  </span>
                </h3>
                <div className="md:w-5/6 space-y-2">
                  {Array.isArray(work.details.challenge) ? (
                    work.details.challenge.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))
                  ) : (
                    <p>{work.details.challenge}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-20">
                <h3 className="md:w-1/6 text-primary-500 text-nowrap">
                  Solution
                  <span className="block text-sm md:text-base text-gray-100">
                    解決策
                  </span>
                </h3>
                <div className="md:w-5/6 space-y-2">
                  {Array.isArray(work.details.solution) ? (
                    work.details.solution.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))
                  ) : (
                    <p>{work.details.solution}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-20">
                <h3 className="md:w-1/6 text-primary-500 text-nowrap">
                  Result
                  <span className="block text-sm md:text-base text-gray-100">
                    成果
                  </span>
                </h3>
                <div className="md:w-5/6 space-y-2">
                  {Array.isArray(work.details.result) ? (
                    work.details.result.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))
                  ) : (
                    <p>{work.details.result}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-20">
                <h3 className="md:w-1/6 text-primary-500 text-nowrap">
                  Features
                  <span className="block text-sm md:text-base text-gray-100">
                    主な機能
                  </span>
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Array.isArray(work.details.features) ? (
                    work.details.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-100"
                      >
                        <span className="w-1 h-1 bg-gray-100 rounded-full mr-3 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))
                  ) : (
                    <li className="flex items-center text-gray-100">
                      <span className="w-1 h-1 bg-gray-100 rounded-full mr-3 flex-shrink-0"></span>
                      {work.details.features}
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-20">
                <h3 className="md:w-1/6 text-primary-500 text-nowrap">
                  Release
                  <span className="block text-sm md:text-base text-gray-100">
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
