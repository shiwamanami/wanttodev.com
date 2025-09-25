import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/Button";
import Cta from "../components/Cta";

// 仮の制作実績データ（Works.tsxと同じデータ）
const worksData = [
  {
    id: 1,
    title: "ECサイト構築プロジェクト",
    description:
      "React + TypeScript + Node.js を使用したフルスタックECサイトの開発",
    image: "/images/works/ec-site.jpg",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe"],
    category: "Webアプリケーション",
    date: "2024.08.09",
    link: "#",
    details: {
      overview:
        "大手ECサイトのリニューアルプロジェクトにて、フロントエンドからバックエンドまで一貫して開発を担当。パフォーマンスの向上とユーザビリティの改善を実現しました。",
      challenge:
        "既存システムからの移行において、データの整合性を保ちながら段階的なリリースを実現する必要がありました。",
      solution:
        "マイクロサービスアーキテクチャを採用し、段階的な移行戦略を実施。また、A/Bテストを活用してユーザー体験を最適化しました。",
      result:
        "ページ読み込み速度を40%向上させ、コンバージョン率を15%改善。ユーザー満足度も大幅に向上しました。",
      features: [
        "レスポンシブデザイン対応",
        "決済システム統合（Stripe）",
        "在庫管理システム",
        "ユーザー認証・認可",
        "管理画面の構築",
        "SEO最適化",
      ],
      images: [
        "/images/works/ec-site-1.jpg",
        "/images/works/ec-site-2.jpg",
        "/images/works/ec-site-3.jpg",
      ],
      date: "2024.08.09",
    },
  },
  {
    id: 2,
    title: "モバイルアプリ開発",
    description:
      "React Native を使用したクロスプラットフォームモバイルアプリの開発",
    image: "/images/works/mobile-app.jpg",
    technologies: ["React Native", "TypeScript", "Firebase", "Redux"],
    category: "モバイルアプリ",
    date: "2024.08.09",
    link: "#",
    details: {
      overview:
        "スタートアップ企業のメインアプリケーションとして、iOS・Android両対応のモバイルアプリを開発。",
      challenge:
        "限られたリソースで高品質なアプリを短期間でリリースする必要がありました。",
      solution:
        "React Nativeを採用し、コードの再利用性を最大化。また、Firebaseを活用してバックエンド機能を効率的に実装しました。",
      result:
        "開発期間を50%短縮し、App Store・Google Play両方で4.5以上の評価を獲得。",
      features: [
        "プッシュ通知機能",
        "オフライン対応",
        "リアルタイム同期",
        "ソーシャルログイン",
        "位置情報機能",
        "カメラ・ギャラリー連携",
      ],
      images: [
        "/images/works/mobile-app-1.jpg",
        "/images/works/mobile-app-2.jpg",
        "/images/works/mobile-app-3.jpg",
      ],
      date: "2024.08.09",
    },
  },
  {
    id: 3,
    title: "企業向けダッシュボード",
    description: "データ可視化とレポート機能を備えた管理画面の開発",
    image: "/images/works/dashboard.jpg",
    technologies: ["Vue.js", "D3.js", "Python", "FastAPI", "MongoDB"],
    category: "Webアプリケーション",
    date: "2023",
    link: "#",
    details: {
      overview:
        "企業のKPI管理とデータ分析を効率化するためのダッシュボードシステムを構築。",
      challenge:
        "大量のデータをリアルタイムで可視化し、直感的な操作を提供する必要がありました。",
      solution:
        "D3.jsを活用したカスタムチャートと、Vue.jsのリアクティブなUIで解決。",
      result:
        "データ分析時間を70%短縮し、意思決定のスピードを大幅に向上させました。",
      features: [
        "リアルタイムデータ表示",
        "カスタムダッシュボード作成",
        "データエクスポート機能",
        "アラート・通知システム",
        "ユーザー権限管理",
        "API連携機能",
      ],
      images: [
        "/images/works/dashboard-1.jpg",
        "/images/works/dashboard-2.jpg",
        "/images/works/dashboard-3.jpg",
      ],
      date: "2023.12.15",
    },
  },
  {
    id: 4,
    title: "ポートフォリオサイト",
    description: "Next.js を使用した静的サイト生成によるポートフォリオサイト",
    image: "/images/works/portfolio.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    category: "Webサイト",
    date: "2023",
    link: "#",
    details: {
      overview:
        "個人のポートフォリオサイトとして、SEO最適化とパフォーマンスを重視した静的サイトを構築。",
      challenge:
        "検索エンジンでの上位表示と、高速なページ読み込みを両立させる必要がありました。",
      solution:
        "Next.jsの静的サイト生成機能を活用し、Tailwind CSSでモダンなデザインを実現。",
      result: "Lighthouseスコアで100点を達成し、検索順位も大幅に向上しました。",
      features: [
        "レスポンシブデザイン",
        "ダークモード対応",
        "ブログ機能",
        "コンタクトフォーム",
        "アニメーション効果",
        "SEO最適化",
      ],
      images: [
        "/images/works/portfolio-1.jpg",
        "/images/works/portfolio-2.jpg",
        "/images/works/portfolio-3.jpg",
      ],
      date: "2023.10.20",
    },
  },
  {
    id: 5,
    title: "API開発プロジェクト",
    description:
      "RESTful API と GraphQL を組み合わせたバックエンドシステムの構築",
    image: "/images/works/api.jpg",
    technologies: ["Node.js", "GraphQL", "PostgreSQL", "Docker", "AWS"],
    category: "バックエンド",
    date: "2023",
    link: "#",
    details: {
      overview:
        "複数のフロントエンドアプリケーションから利用される共通APIシステムの構築。",
      challenge:
        "異なるクライアントの要件に対応しつつ、スケーラブルなAPIを設計する必要がありました。",
      solution:
        "RESTful APIとGraphQLを組み合わせ、クライアントのニーズに応じて最適なインターフェースを提供。",
      result: "API応答時間を60%短縮し、開発効率も大幅に向上させました。",
      features: [
        "RESTful API",
        "GraphQLエンドポイント",
        "認証・認可システム",
        "レート制限機能",
        "APIドキュメント自動生成",
        "モニタリング・ログ機能",
      ],
      images: [
        "/images/works/api-1.jpg",
        "/images/works/api-2.jpg",
        "/images/works/api-3.jpg",
      ],
      date: "2023.09.30",
    },
  },
  {
    id: 6,
    title: "UI/UXデザイン",
    description: "Figma を使用したモダンなUI/UXデザインの制作",
    image: "/images/works/ui-design.jpg",
    technologies: ["Figma", "Adobe XD", "Photoshop", "Illustrator"],
    category: "デザイン",
    date: "2023",
    link: "#",
    details: {
      overview:
        "複数のクライアント向けに、ユーザー中心設計に基づいたUI/UXデザインを提供。",
      challenge:
        "ブランドの個性を活かしつつ、使いやすさを重視したデザインを実現する必要がありました。",
      solution:
        "ユーザーリサーチとプロトタイピングを重ね、データに基づいたデザイン決定を実施。",
      result:
        "ユーザビリティテストで高評価を獲得し、クライアントの満足度も向上しました。",
      features: [
        "ワイヤーフレーム設計",
        "プロトタイプ作成",
        "デザインシステム構築",
        "ユーザビリティテスト",
        "ブランドガイドライン策定",
        "開発者向け仕様書作成",
      ],
      images: [
        "/images/works/ui-design-1.jpg",
        "/images/works/ui-design-2.jpg",
        "/images/works/ui-design-3.jpg",
      ],
      date: "2023.08.15",
    },
  },
];

export default function WorksDetail() {
  const { id } = useParams<{ id: string }>();
  const workId = id ? parseInt(id, 10) : 0;
  const work = worksData.find((w) => w.id === workId);

  if (!work) {
    return (
      <div className="flex min-h-screen flex-col relative">
        <main className="flex-1">
          <section className="container max-w-6xl py-10 sm:py-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">
                作品が見つかりません
              </h1>
              <p className="text-gray-300 mb-8">
                指定された作品は存在しません。
              </p>
              <Link to="/works">
                <Button variant="outline">制作実績一覧に戻る</Button>
              </Link>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col relative">
      <main className="flex-1">
        <section className="container max-w-6xl py-10 sm:py-20">
          {/* パンくずリスト */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
              <li>
                <Link
                  to="/"
                  className="hover:text-yellow-300 transition-colors"
                >
                  ホーム
                </Link>
              </li>
              <li className="text-gray-600">/</li>
              <li>
                <Link
                  to="/works"
                  className="hover:text-yellow-300 transition-colors"
                >
                  制作実績
                </Link>
              </li>
              <li className="text-gray-600">/</li>
              <li className="text-white">{work.title}</li>
            </ol>
          </nav>

          {/* 作品詳細 */}
          <div className="max-w-4xl mx-auto">
            {/* ヘッダー */}
            <div className="mb-12">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-semibold text-yellow-300 bg-yellow-300/20 px-3 py-1 rounded-full">
                  {work.category}
                </span>
                <span className="text-sm text-gray-400">{work.date}</span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                {work.title}
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                {work.description}
              </p>
            </div>

            {/* メイン画像 */}
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

            {/* 技術スタック */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">
                ツール・使用技術
              </h2>
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
                  <h2 className="text-2xl font-bold text-white mb-6">
                    プロジェクト概要
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {work.details.overview}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">課題</h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {work.details.challenge}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">解決策</h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {work.details.solution}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">成果</h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {work.details.result}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    主な機能
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {work.details.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-300"
                      >
                        <span className="w-2 h-2 bg-yellow-300 rounded-full mr-3 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Release 納品日
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {work.details.date}
                  </p>
                </div>
              </div>
            )}

            {/* アクションボタン */}
            <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/works">
                <Button variant="outline">制作実績一覧に戻る</Button>
              </Link>
              <a
                href={work.link}
                className="bg-yellow-300 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-center"
              >
                プロジェクトを見る
              </a>
            </div>
          </div>
        </section>

        <Cta />
      </main>
    </div>
  );
}
