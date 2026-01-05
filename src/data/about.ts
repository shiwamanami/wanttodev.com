// Aboutページ用のデータ定義

export interface Achievement {
  text: string;
  highlight?: string;
  textAfter?: string;
}

export interface ExperienceItem {
  technology: string;
  years: string;
}

export interface TeamWorkRole {
  description: string;
}

export interface ProblemSolvingCase {
  title: string;
  description: string;
  highlight?: string;
  descriptionAfter?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: "github" | "zenn" | "qiita";
}

export interface CareerPeriod {
  period: string;
  description: string;
  achievements?: Achievement[];
}

export interface SkillGroup {
  title: string;
  skills: Array<{
    name: string;
    image: string;
    alt?: string;
    isSquare?: boolean;
  }>;
}

// 主な実績
export const achievements: Achievement[] = [
  {
    text: "Web制作案件 ",
    highlight: "20件以上",
    textAfter: "を担当（コーポレートサイト、ECサイト、LPなど）",
  },
  {
    text: "ECサイト構築・運用経験（Shopify、ecforce、Bカート、EBISUMARTなど）",
  },
  {
    text: "WordPressサイト構築・保守運用（カスタムテーマ開発、プラグイン開発含む）",
  },
  {
    text: "React/TypeScriptを使用したSPA開発経験",
  },
  {
    text: "SEO対策・Google Analytics/Ads設定によるマーケティング施策",
  },
  {
    text: "チーム開発経験（Git/GitHubを使用したバージョン管理、コードレビュー）",
  },
];

// 経験年数
export const experienceItems: ExperienceItem[] = [
  { technology: "React / TypeScript", years: "2年以上" },
  { technology: "PHP / MySQL", years: "2年以上" },
  { technology: "WordPress", years: "2年以上" },
  { technology: "Node.js", years: "1年以上" },
  { technology: "Figma", years: "2年以上" },
  { technology: "Git / GitHub", years: "2年以上" },
];

// チーム開発での役割
export const teamWorkRoles: TeamWorkRole[] = [
  {
    description: "Git/GitHubを使用したブランチ戦略の実践（feature/develop/mainブランチ運用）",
  },
  {
    description: "コードレビューによる品質向上への貢献",
  },
  {
    description: "クライアントとの要件定義・ヒアリング、進捗報告",
  },
  {
    description: "技術的な課題解決の提案と実装",
  },
];

// 問題解決事例
export const problemSolvingCases: ProblemSolvingCase[] = [
  {
    title: "パフォーマンス最適化",
    description:
      "Reactアプリケーションのレンダリング最適化により、ページ読み込み速度を",
    highlight: "30%改善",
    descriptionAfter:
      "。画像最適化、コード分割、レイジーローディングの実装により、ユーザー体験を向上。",
  },
  {
    title: "SEO対策・コンバージョン改善",
    description:
      "Google Analytics/Google Search Consoleを活用したデータ分析により、SEO施策の実施とUI/UX改善を行い、",
    highlight: "CV率の向上",
    descriptionAfter: "に貢献。",
  },
  {
    title: "運用効率化",
    description:
      "WordPressサイトのカスタム開発により、クライアントの運用負担を軽減。管理画面のカスタマイズや自動化機能の実装により、",
    highlight: "運用時間を削減",
    descriptionAfter: "。",
  },
];

// ソーシャルリンク（実際のURLに置き換えてください）
export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/your-username",
    icon: "github",
  },
  {
    name: "Zenn",
    url: "https://zenn.dev/your-username",
    icon: "zenn",
  },
  {
    name: "Qiita",
    url: "https://qiita.com/your-username",
    icon: "qiita",
  },
];

// 趣味の説明
export const hobbyDescription = `新しい技術の学習、個人開発、テックブログを読むこと、読書、カフェオレを飲みながらのコーディングが好きです。
常にユーザー体験を向上させる方法を模索しています。`;

// 経歴データ
export const careerData: CareerPeriod[] = [
  {
    period: "2023年(令和5年) – 現在",
    description: `WEB制作会社にてプログラマー兼Webデザイナーとして、
コーポレートサイト、ECサイト、LPなど多様なWeb制作案件を多数担当。
UI/UX設計からデザイン、フロントエンド開発（HTML/CSS/JavaScript/React）、
バックエンド構築（PHP・AWS・Node.js）までワンストップで実装。
WordPress構築や保守運用、SEO対策、広告計測設定などマーケティング施策も手掛け、
デザインとエンジニアリングの両軸から成果につながるサイト改善を実現。
クライアントのCV(コンバージョン)率向上や運用効率化に貢献。`,
    achievements,
  },
  {
    period: "2022年(令和4年)",
    description: `ゼロから独学でプログラミングを習得。
エンジニアリングの基盤を築いた後、ユーザー体験向上のためデザイン領域も独学で習得。
継続的な学習意欲と自己成長力で、技術とデザインの両軸で価値創造できるエンジニアとしての道を切り開く。`,
  },
];

// チーム開発の説明
export const teamWorkDescription = `チーム開発において、Git/GitHubを使用したバージョン管理や
コードレビューの経験があります。
クライアントとの要件ヒアリングから実装、納品まで一貫して担当し、
コミュニケーション能力を活かしたプロジェクト推進を実践しています。`;

// 問題解決の説明
export const problemSolvingDescription = `実務において、技術的な課題を解決し、
クライアントのビジネス目標達成に貢献してきました。`;

