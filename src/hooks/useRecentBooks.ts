import { useState, useEffect } from "react";
import { recentBookISBNs } from "../data/recentBooks";

// Google Books APIのレスポンス型定義
interface GoogleBooksResponse {
  kind: string;
  totalItems: number;
  items?: Array<{
    id: string;
    volumeInfo: {
      title: string;
      subtitle?: string;
      authors?: string[];
      publisher?: string;
      publishedDate?: string;
      description?: string;
      pageCount?: number;
      categories?: string[];
      averageRating?: number;
      ratingsCount?: number;
      language?: string;
      imageLinks?: {
        smallThumbnail?: string;
        thumbnail?: string;
        small?: string;
        medium?: string;
        large?: string;
        extraLarge?: string;
      };
      industryIdentifiers?: Array<{
        type: string;
        identifier: string;
      }>;
      previewLink?: string;
      infoLink?: string;
    };
  }>;
}

// コンポーネントで使用する書籍情報の型
export interface BookInfo {
  isbn: string;
  title: string;
  subtitle?: string;
  author: string;
  publisher: string;
  pubdate: string;
  cover: string;
  summary: string;
  pageCount?: number;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  language?: string;
  previewLink?: string;
  infoLink?: string;
}

export function useRecentBooks() {
  const [books, setBooks] = useState<BookInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (recentBookISBNs.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Google Books APIを呼び出し（各ISBNを個別に取得）
        const bookPromises: Promise<BookInfo | null>[] = recentBookISBNs.map(async (isbn): Promise<BookInfo | null> => {
          try {
            const response = await fetch(
              `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
            );

            if (!response.ok) {
              throw new Error(`APIリクエストに失敗しました: ${response.statusText}`);
            }

            const data: GoogleBooksResponse = await response.json();

            if (!data.items || data.items.length === 0) {
              console.warn(`⚠️ ISBN ${isbn} の書籍情報が見つかりませんでした。`);
              return null;
            }

            const volume = data.items[0];
            const volumeInfo = volume.volumeInfo;

            // 表紙画像のURLを取得（大きいサイズを優先）
            const coverUrl =
              volumeInfo.imageLinks?.large ||
              volumeInfo.imageLinks?.medium ||
              volumeInfo.imageLinks?.thumbnail ||
              volumeInfo.imageLinks?.smallThumbnail ||
              "";

            // ISBNを取得（industryIdentifiersから）
            const isbn13 = volumeInfo.industryIdentifiers?.find(
              (id) => id.type === "ISBN_13"
            )?.identifier || isbn;

            return {
              isbn: isbn13,
              title: volumeInfo.title || "",
              subtitle: volumeInfo.subtitle,
              author: (volumeInfo.authors || []).join(", ") || "不明",
              publisher: volumeInfo.publisher || "",
              pubdate: volumeInfo.publishedDate || "",
              cover: coverUrl.replace("&edge=curl", ""), // edge=curlパラメータを削除
              summary: volumeInfo.description || "",
              pageCount: volumeInfo.pageCount,
              categories: volumeInfo.categories,
              averageRating: volumeInfo.averageRating,
              ratingsCount: volumeInfo.ratingsCount,
              language: volumeInfo.language,
              previewLink: volumeInfo.previewLink,
              infoLink: volumeInfo.infoLink,
            };
          } catch (err) {
            console.error(`❌ ISBN ${isbn} の取得に失敗しました:`, err);
            return null;
          }
        });

        const bookResults = await Promise.all(bookPromises);
        const validBooks = bookResults.filter(
          (book): book is BookInfo => book !== null
        );

        console.log("✅ 書籍データ取得成功:", validBooks.length, "件");
        setBooks(validBooks);
      } catch (err) {
        console.error("❌ 書籍データの取得に失敗しました:", err);
        setError(
          err instanceof Error ? err.message : "不明なエラーが発生しました"
        );
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, isLoading, error };
}

