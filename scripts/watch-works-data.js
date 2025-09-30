#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");

// ファイルパス
const sourceFile = path.join(
  __dirname,
  "..",
  "src",
  "data",
  "works-dynamic.json"
);
const publicFile = path.join(__dirname, "..", "public", "works-dynamic.json");

console.log("🔍 ファイル監視を開始します...");
console.log(`📁 監視対象: ${sourceFile}`);

// ファイル監視を開始
const watcher = chokidar.watch(sourceFile, {
  persistent: true,
  ignoreInitial: false,
});

watcher.on("change", (filePath) => {
  console.log(`📝 ファイルが変更されました: ${filePath}`);

  try {
    // ファイルを読み込み
    const data = fs.readFileSync(sourceFile, "utf8");

    // JSONの妥当性をチェック
    JSON.parse(data);

    // publicフォルダにコピー
    fs.writeFileSync(publicFile, data, "utf8");

    console.log("✅ 自動同期が完了しました");
    console.log(`📁 コピー先: ${publicFile}`);
    console.log(`📊 データサイズ: ${data.length} 文字`);
    console.log("---");
  } catch (error) {
    console.error("❌ 自動同期に失敗しました:", error.message);
    console.log("---");
  }
});

watcher.on("error", (error) => {
  console.error("❌ ファイル監視エラー:", error);
});

// プロセス終了時の処理
process.on("SIGINT", () => {
  console.log("\n🛑 ファイル監視を停止します...");
  watcher.close();
  process.exit(0);
});

console.log("✅ ファイル監視が開始されました。Ctrl+Cで停止できます。");
