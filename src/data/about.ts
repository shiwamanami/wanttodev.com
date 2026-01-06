// Aboutページ用のデータ定義

export interface Achievement {
  text: string;
  highlight?: string;
  textAfter?: string;
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
}

// 経歴
export const careerData: CareerPeriod[] = [
  {
    period: "2023年(令和5年) – 現在",
    description: `プログラマー兼デザイナー兼ディレクターとして、単なる制作に留まらず、UI/UX設計からフロントエンド（HTML/CSS/JS）、バックエンド（PHP/Node.js）までワンストップで実装する開発力を磨く。
    
    <strong>・Web制作:</strong>
    ディレクションからデザイン、実装、運用、マーケティングまで一貫して、コーポレートサイト、EC、LPなど多岐にわたるWeb制作を完遂。
    
    <strong>・開発・運用:</strong>
    クライアントに合わせたカートシステムに最適化したEC構築・保守運用や、WordPressのカスタム実装等を一貫して担当。
    
    <strong>・マーケティング:</strong>
    広告計測設定やSEO対策を支援し、デザインとエンジニアリングの両軸からクライアントのCV率向上に貢献。
    
    <strong>・広告運用:</strong>
    Google Adsの運用を担当し、クリエイティブの最適化やキャンペーンの効果測定、施策の立案を行う。
    
    <strong>・業務効率化（DX）:</strong>
    既存の制作フローを根本から見直し、属人化していた手動プロセスをスクリプト等でシステム化し、ヒューマンエラーの排除と一貫した品質管理の両立を実現。
    繰り返し作業を削減し、組織全体の運用効率を大幅に向上させる。`,
  },
  {
    period: "2022年(令和4年)",
    description: `新卒でホテルのパティシエとして勤務。
    現場での経験を積む傍ら、エンジニアへの転身を目指して独学を開始。
    業務終了後や休日をすべて学習に充て、現在の技術基盤を構築。`,
  },
];

// ソーシャルリンク
export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/shiwamanami",
    icon: "github",
  },
  // {
  //   name: "Zenn",
  //   url: "https://zenn.dev/your-username",
  //   icon: "zenn",
  // },
  // {
  //   name: "Qiita",
  //   url: "https://qiita.com/your-username",
  //   icon: "qiita",
  // },
];

// 趣味
export const hobbyDescription = `・コーディング
・読書
・散歩

最新技術のキャッチアップやコーディングが日課です。
そして読書（ジャンル不問でなんでも読みますが、特にミステリー）を愛しています。
日々の学びをコーディングに落とし込み、ユーザー体験を向上させる実装を模索することに喜びを感じます。`;

