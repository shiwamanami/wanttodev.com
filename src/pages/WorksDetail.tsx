import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/Button";
import Cta from "../components/Cta";
import WorksSwiper from "../components/WorksSwiper";
import { LazyImage } from "../components/LazyImage";
import { useWorksData } from "../hooks/useWorksData";
import { formatDate } from "../lib/utils";
import { Technology, WorkCategory } from "../data/works";

// ワイヤーフレーム画像を自動生成する関数
const generateWireImages = (workId: number, workTitle: string) => {
  const wireImages = [];
  let index = 1;

  // 最大10個まで検索（wire01.webp から wire10.webp まで）
  while (index <= 10) {
    const wireNumber = index.toString().padStart(2, "0");
    const imagePath = `/images/works/${workId}/wire${wireNumber}.webp`;

    wireImages.push({
      type: "image" as const,
      src: imagePath,
      alt: `${workTitle} - Wireframe ${index}`,
    });

    index++;
  }

  return wireImages;
};

// PC画像を生成する関数
const generatePcImages = (workId: number, workTitle: string) => {
  const pcImages = [];
  let index = 1;

  // 最大3個まで検索（pc01.webp から pc03.webp まで）
  while (index <= 3) {
    const pcNumber = index.toString().padStart(2, "0");
    const imagePath = `/images/works/${workId}/pc${pcNumber}.webp`;

    pcImages.push({
      type: "image" as const,
      src: imagePath,
      alt: `${workTitle} - PC ${index}`,
    });

    index++;
  }

  return pcImages;
};

// モバイル画像を生成する関数
const generateMobileImages = (workId: number, workTitle: string) => {
  const mobileImages = [];
  let index = 1;

  // 最大3個まで検索（mobile01.webp から mobile03.webp まで）
  while (index <= 3) {
    const mobileNumber = index.toString().padStart(2, "0");
    const imagePath = `/images/works/${workId}/mobile${mobileNumber}.webp`;

    mobileImages.push({
      type: "image" as const,
      src: imagePath,
      alt: `${workTitle} - Mobile ${index}`,
    });

    index++;
  }

  return mobileImages;
};

// 画像の存在を確認する関数（最適化版）
const checkImageExists = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
};

// 画像の存在を並列で確認する関数
const checkImagesExist = async (imagePaths: string[]): Promise<string[]> => {
  const promises = imagePaths.map(async (path) => {
    const exists = await checkImageExists(path);
    return exists ? path : null;
  });
  
  const results = await Promise.all(promises);
  return results.filter((path): path is string => path !== null);
};

export default function WorksDetail() {
  const { id } = useParams<{ id: string }>();
  const { getWork } = useWorksData();
  const workId = id ? parseInt(id, 10) : 0;
  const work = getWork(workId);
  const [wireImages, setWireImages] = useState<
    Array<{ type: "image"; src: string; alt: string }>
  >([]);
  const [pcImages, setPcImages] = useState<
    Array<{ type: "image"; src: string; alt: string }>
  >([]);
  const [mobileImages, setMobileImages] = useState<
    Array<{ type: "image"; src: string; alt: string }>
  >([]);

  // 画像の存在確認（最適化版）
  useEffect(() => {
    if (work) {
      const generatedWireImages = generateWireImages(work.id, work.title);
      const generatedPcImages = generatePcImages(work.id, work.title);
      const generatedMobileImages = generateMobileImages(work.id, work.title);

      // 並列で画像の存在を確認
      const checkImages = async () => {
        const [wirePaths, pcPaths, mobilePaths] = await Promise.all([
          checkImagesExist(generatedWireImages.map(img => img.src)),
          checkImagesExist(generatedPcImages.map(img => img.src)),
          checkImagesExist(generatedMobileImages.map(img => img.src))
        ]);

        setWireImages(
          wirePaths.map((path, index) => ({
            type: "image" as const,
            src: path,
            alt: `${work.title} - Wireframe ${index + 1}`,
          }))
        );

        setPcImages(
          pcPaths.map((path, index) => ({
            type: "image" as const,
            src: path,
            alt: `${work.title} - PC ${index + 1}`,
          }))
        );

        setMobileImages(
          mobilePaths.map((path, index) => ({
            type: "image" as const,
            src: path,
            alt: `${work.title} - Mobile ${index + 1}`,
          }))
        );
      };

      checkImages();
    } else {
      setWireImages([]);
      setPcImages([]);
      setMobileImages([]);
    }
  }, [work]);

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
            {work.category.map((cat: WorkCategory, index: number) => (
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
          {pcImages.length > 0 && (
            <div className="flex flex-row gap-2 md:gap-10">
              {pcImages.map((pcImg, index) => (
                <div key={index} className="flex-1">
                  <LazyImage
                    src={pcImg.src}
                    alt={pcImg.alt}
                    className="w-full"
                    objectFit="contain"
                  />
                </div>
              ))}
            </div>
          )}

          {/* mobile image */}
          {mobileImages.length > 0 && (
            <div className="flex flex-row gap-2 md:gap-10">
              {mobileImages.map((mobileImg, index) => (
                <div key={index} className="flex-1">
                  <LazyImage
                    src={mobileImg.src}
                    alt={mobileImg.alt}
                    className="w-full"
                    objectFit="contain"
                  />
                </div>
              ))}
            </div>
          )}

          {/* wire image */}
          {wireImages.length > 0 && (
            <div className="flex flex-row gap-2 md:gap-10">
              {wireImages.map((wireImg, index) => (
                <div key={index} className="flex-1">
                  <LazyImage
                    src={wireImg.src}
                    alt={wireImg.alt}
                    className="w-full"
                    objectFit="contain"
                  />
                  <p className="mt-2 text-sm text-gray-400">ワイヤーフレーム</p>
                </div>
              ))}
            </div>
          )}

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
              {work.technologies.map((tech: Technology, index: number) => (
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
                    work.details.overview.map((paragraph: string, index: number) => (
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
                    work.details.challenge.map((paragraph: string, index: number) => (
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
                    work.details.solution.map((paragraph: string, index: number) => (
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
                    work.details.result.map((paragraph: string, index: number) => (
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
                    work.details.features.map((feature: string, index: number) => (
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
