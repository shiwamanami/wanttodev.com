/**
 * ルート設定とタイトル情報を管理する設定ファイル
 */
export interface RouteConfig {
  path: string;
  title: string;
  description?: string;
}

export const routeConfigs: RouteConfig[] = [
  {
    path: "/",
    title: "My Portfolio",
    description: "WantToDev - My Portfolio",
  },
  {
    path: "/about",
    title: "私について",
    description: "開発者・デザイナーのプロフィール",
  },
  {
    path: "/works",
    title: "制作実績",
    description: "Webアプリケーション、モバイルアプリ、デザインの制作実績",
  },
  {
    path: "/works/:id",
    title: "制作実績詳細",
    description: "制作実績の詳細情報",
  },
  {
    path: "/blog",
    title: "ブログ",
    description: "技術ブログ",
  },
  {
    path: "/privacy-policy",
    title: "プライバシーポリシー",
    description: "プライバシーポリシー",
  },
];

/**
 * パスからルート設定を取得するヘルパー関数
 */
export const getRouteConfig = (pathname: string): RouteConfig | undefined => {
  return routeConfigs.find((config) => config.path === pathname);
};
