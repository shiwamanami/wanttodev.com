// カテゴリの定数定義
export const WORK_CATEGORIES = [
  "コーポレートサイト",
  "サービスサイト",
  "ブランドサイト",
  "採用サイト",
  "ECサイト",
  "メディアサイト",
  "ランディングページ",
  "WordPress",
  "Shopify",
  "Webアプリケーション",
  "自社CMS導入",
] as const;

export type WorkCategory = (typeof WORK_CATEGORIES)[number];

// 技術スタックの定数定義
export const TECHNOLOGIES = [
  "PHP",
  "MySQL",
  "JavaScript",
  "HTML",
  "CSS",
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Laravel",
  "WordPress",
  "Shopify",
  "Tailwind CSS",
  "Sass",
  "Figma",
  "Adobe XD",
  "Git",
  "GitHub",
  "Netlify",
  "Vercel",
] as const;

export type Technology = (typeof TECHNOLOGIES)[number];

// メディアタイプの定義
export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  thumbnail?: string;
}

export interface Works {
  id: number;
  title: string;
  date: string; // YYYY.MM 形式
  role: string;
  client: string;
  industry: string;
  technologies: Technology[];
  category: WorkCategory[];
  thumbnail?: string;
  details: {
    overview: string[];
    challenge: string[];
    solution: string[];
    result: string[];
    features: string[];
    link: string;
  };
  mediaData: {
    images: MediaItem[];
    videos: MediaItem[];
    wireImages: MediaItem[];
  };
  isVisible: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// データバリデーション関数
export function validateWorksData(data: any): data is Works {
  return (
    typeof data.id === "number" &&
    typeof data.title === "string" &&
    typeof data.date === "string" &&
    typeof data.role === "string" &&
    typeof data.client === "string" &&
    typeof data.industry === "string" &&
    Array.isArray(data.technologies) &&
    Array.isArray(data.category) &&
    // thumbnailは自動生成されるため、バリデーションから除外
    typeof data.details === "object" &&
    Array.isArray(data.details.overview) &&
    Array.isArray(data.details.challenge) &&
    Array.isArray(data.details.solution) &&
    Array.isArray(data.details.result) &&
    Array.isArray(data.details.features) &&
    typeof data.details.link === "string" &&
    typeof data.mediaData === "object" &&
    Array.isArray(data.mediaData.images) &&
    (Array.isArray(data.mediaData.videos) ||
      data.mediaData.videos === undefined) &&
    (Array.isArray(data.mediaData.wireImages) ||
      data.mediaData.wireImages === undefined) &&
    typeof data.isVisible === "boolean"
  );
}

// サムネイルパスを自動生成する関数
export function generateThumbnailPath(id: number): string {
  return `/images/works/${id}/thumbnail.webp`;
}

// Worksオブジェクトにサムネイルパスを設定する関数
export function setThumbnailPath(work: Omit<Works, "thumbnail">): Works {
  return {
    ...work,
    thumbnail: generateThumbnailPath(work.id),
  };
}

// 初期データ（空の配列 - 動的データのみを使用）
export const worksData: Works[] = [];
