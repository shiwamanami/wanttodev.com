// ファイル操作のためのユーティリティ関数
// 注意: ブラウザ環境では直接ファイルシステムにアクセスできないため、
// この実装は開発環境でのみ動作します

export interface FileOperationResult {
  success: boolean;
  data?: any;
  error?: string;
}

// ファイルを読み込む（実際の実装では、サーバーサイドのAPIが必要）
export async function readJsonFile(
  filePath: string
): Promise<FileOperationResult> {
  try {
    // 開発環境では、fetchを使用してファイルを読み込む
    console.log("📁 ファイルを読み込み中:", filePath);
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(
        `ファイルの読み込みに失敗しました: ${response.statusText}`
      );
    }
    const data = await response.json();
    console.log("✅ ファイル読み込み成功:", data.length, "件のデータ");
    return { success: true, data };
  } catch (error) {
    console.error("❌ ファイル読み込みエラー:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "不明なエラーが発生しました",
    };
  }
}

// ファイルに書き込む（プロジェクト内ファイルを直接更新）
export async function writeJsonFile(
  filePath: string,
  data: any
): Promise<FileOperationResult> {
  try {
    const jsonString = JSON.stringify(data, null, 2);

    // ローカルストレージにバックアップ保存
    localStorage.setItem("works-data-backup", jsonString);

    // プロジェクト内ファイルの直接更新を試行
    try {
      // 開発環境でのファイル更新（Node.js環境が必要）
      if (
        typeof window !== "undefined" &&
        window.location.hostname === "localhost"
      ) {
        // 開発サーバー経由でファイルを更新
        const response = await fetch("/api/update-works-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonString,
        });

        if (response.ok) {
          console.log(
            "✅ src/data/works-dynamic.json と public/works-dynamic.json が自動更新されました"
          );
          return { success: true, data };
        }
      }
    } catch (apiError) {
      console.log("API経由での更新に失敗、フォールバック処理を実行");
    }

    // フォールバック: コンソールにデータを表示して手動更新を促す
    console.log("=== データが更新されました ===");
    console.log(
      "以下のJSONデータを src/data/works-dynamic.json と public/works-dynamic.json にコピーしてください:"
    );
    console.log("=====================================");
    console.log(jsonString);
    console.log("=====================================");

    // クリップボードにコピー（可能な場合）
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(jsonString);
        console.log("📋 データがクリップボードにコピーされました");
      } catch (clipboardError) {
        console.log("クリップボードへのコピーに失敗しました");
      }
    }

    return { success: true, data };
  } catch (error) {
    console.error("ファイル書き込みエラー:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "不明なエラーが発生しました",
    };
  }
}

// 自動ファイル更新機能（プロジェクト内ファイルを直接更新）
export async function autoUpdateJsonFile(
  filePath: string,
  data: any
): Promise<FileOperationResult> {
  try {
    const jsonString = JSON.stringify(data, null, 2);

    // ローカルストレージに保存
    localStorage.setItem("works-data-backup", jsonString);

    // プロジェクト内ファイルの直接更新を試行
    try {
      // 開発環境でのファイル更新（Node.js環境が必要）
      if (
        typeof window !== "undefined" &&
        window.location.hostname === "localhost"
      ) {
        // 開発サーバー経由でファイルを更新
        const response = await fetch("/api/update-works-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonString,
        });

        if (response.ok) {
          console.log(
            "✅ src/data/works-dynamic.json と public/works-dynamic.json が自動更新されました"
          );
          return { success: true, data };
        }
      }
    } catch (apiError) {
      console.log("API経由での更新に失敗、フォールバック処理を実行");
    }

    // フォールバック: コンソールにデータを表示して手動更新を促す
    console.log("=== データが更新されました ===");
    console.log(
      "以下のJSONデータを src/data/works-dynamic.json と public/works-dynamic.json にコピーしてください:"
    );
    console.log("=====================================");
    console.log(jsonString);
    console.log("=====================================");

    // クリップボードにコピー（可能な場合）
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(jsonString);
        console.log("📋 データがクリップボードにコピーされました");
      } catch (clipboardError) {
        console.log("クリップボードへのコピーに失敗しました");
      }
    }

    return { success: true, data };
  } catch (error) {
    console.error("自動ファイル更新エラー:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "不明なエラーが発生しました",
    };
  }
}

// リアルタイムファイル更新機能（開発環境用）
export async function realtimeUpdateJsonFile(
  filePath: string,
  data: any
): Promise<FileOperationResult> {
  try {
    const jsonString = JSON.stringify(data, null, 2);

    // ローカルストレージに保存
    localStorage.setItem("works-data-backup", jsonString);

    // 開発環境でのリアルタイム更新
    if (
      typeof window !== "undefined" &&
      window.location.hostname === "localhost"
    ) {
      try {
        // Node.jsスクリプト経由でのファイル更新を試行
        const response = await fetch("/api/update-works-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: jsonString }),
        });

        if (response.ok) {
          console.log(
            "✅ src/data/works-dynamic.json と public/works-dynamic.json がリアルタイム更新されました"
          );
          return { success: true, data };
        }
      } catch (apiError) {
        console.log("API経由での更新に失敗、フォールバック処理を実行");
      }
    }

    // 最終フォールバック: コンソール表示 + クリップボードコピー
    console.log("=== データが更新されました ===");
    console.log(
      "以下のJSONデータを src/data/works-dynamic.json と public/works-dynamic.json にコピーしてください:"
    );
    console.log("=====================================");
    console.log(jsonString);
    console.log("=====================================");

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(jsonString);
        console.log("📋 データがクリップボードにコピーされました");
      } catch (clipboardError) {
        console.log("クリップボードへのコピーに失敗しました");
      }
    }

    return { success: true, data };
  } catch (error) {
    console.error("リアルタイムファイル更新エラー:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "不明なエラーが発生しました",
    };
  }
}

// ローカルストレージからデータを読み込む（フォールバック用）
export function readFromLocalStorage(key: string): any[] {
  try {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return Array.isArray(parsedData) ? parsedData : [];
    }
    return [];
  } catch (error) {
    console.error("ローカルストレージ読み込みエラー:", error);
    return [];
  }
}

// ローカルストレージにデータを保存する（フォールバック用）
export function saveToLocalStorage(key: string, data: any[]): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("ローカルストレージ保存エラー:", error);
    return false;
  }
}
