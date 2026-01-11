import { useEffect } from "react";
import { mainData } from "../data/main";

interface SEOConfig {
  title: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

/**
 * SEO情報を包括的に管理するカスタムフック
 * @param config SEO設定オブジェクト
 */
export const useSEO = (config: SEOConfig) => {
  useEffect(() => {
    const { title, description, keywords, ogTitle, ogDescription, ogImage } =
      config;

    // タイトル設定
    document.title = `${title} | ${mainData.siteName}`;

    // メタディスクリプション設定
    if (description) {
      updateMetaTag("description", description);
    }

    // キーワード設定
    if (keywords) {
      updateMetaTag("keywords", keywords);
    }

    // OGP設定
    if (ogTitle) {
      updateMetaTag("og:title", ogTitle, "property");
    }

    if (ogDescription) {
      updateMetaTag("og:description", ogDescription, "property");
    }

    if (ogImage) {
      updateMetaTag("og:image", ogImage, "property");
    }
  }, [config]);
};

/**
 * メタタグを更新するヘルパー関数
 */
const updateMetaTag = (
  name: string,
  content: string,
  attribute: string = "name"
) => {
  let metaTag = document.querySelector(
    `meta[${attribute}="${name}"]`
  ) as HTMLMetaElement;

  if (!metaTag) {
    metaTag = document.createElement("meta");
    metaTag.setAttribute(attribute, name);
    document.head.appendChild(metaTag);
  }

  metaTag.setAttribute("content", content);
};
