export type Works = {
  id: number;
  title: string;
  date: string;
  technologies: string[];
  category: string[];
  details: {
    overview: string;
    challenge: string;
    solution: string;
    result: string;
    features: string[];
    link: string;
  };
  mediaData: {
    image: string[];
    video: string[];
  };
  isVisible: boolean;
};

export const worksData: Works[] = [
  {
    id: 1,
    title: "中古外車の販売・レンタルサイト",
    date: "2023.09",
    technologies: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    category: [
      // "コーポレートサイト",
      "サービスサイト",
      // "ブランドサイト",
      // "採用サイト",
      // "ECサイト",
      // "メディアサイト",
      // "ランディングページ",
      // "WordPress",
      // "Shopify",
      // "Webアプリケーション",
      "自社CMS導入",
    ],
    details: {
      overview: `日本在住の外国人居住者や訪日観光客の方々を対象にした中古外車販売・レンタル紹介サイトを制作いたしました。
      多言語対応を実装し、車両検索・価格比較・オンライン予約までワンストップで完結できるプラットフォームとして構築しております。
      ユーザーの皆さまが日本にいながら母国語で安心して車両を選べる環境を提供することを目的といたしました。`,
      challenge: `・外国人向けの中古車情報サイトは日本語のみのものが多く、言語の壁が存在しておりました。
・複数店舗の在庫情報が分散しており、価格や条件を比較しづらい状況でした。
・短期滞在者が気軽に外車をレンタルできる予約システムが不十分でした。`,
      solution: `英語・中国語・韓国語に対応した多言語機能を実装し、グローバル基準のUI/UXを設計いたしました。
メーカー、価格帯、走行距離、レンタル可否など、細かい条件で絞り込みができる車両検索フィルタ機能を開発いたしました。
レンタル希望者がオンラインで即時に予約できるリアルタイム予約システムをバックエンドに構築いたしました。
SEO対策とモバイルファーストデザインを取り入れ、訪日観光客の方々がスマートフォンからでも快適にご利用いただけるようにいたしました。`,
      result: `ページ読み込み速度を40%向上させ、コンバージョン率を15%改善。ユーザー満足度も大幅に向上しました。`,
      features: [
        "多言語切り替え機能（英語・日本語）",
        "自社CMS導入",
        "管理画面の構築",
        "レスポンシブデザイン対応",
        "SEO最適化",
      ],
      link: "#",
    },
    mediaData: {
      image: [
        "/images/works/1/01.webp",
        "/images/works/1/02.webp",
        "/images/works/1/03.webp",
        "/images/works/1/04.webp",
      ],
      video: ["/images/works/1/video01.mp4", "/images/works/1/video02.mp4"],
    },
    isVisible: true,
  },
];
