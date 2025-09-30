#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// ファイルパス
const sourceFile = path.join(
  __dirname,
  "..",
  "src",
  "data",
  "works-dynamic.json"
);
const publicFile = path.join(__dirname, "..", "public", "works-dynamic.json");

try {
  // ソースファイルを読み込み
  const data = fs.readFileSync(sourceFile, "utf8");

  // publicフォルダにコピー
  fs.writeFileSync(publicFile, data, "utf8");

  console.log("✅ データの同期が完了しました");
  console.log(`📁 ソース: ${sourceFile}`);
  console.log(`📁 コピー先: ${publicFile}`);
  console.log(`📊 データサイズ: ${data.length} 文字`);
} catch (error) {
  console.error("❌ データの同期に失敗しました:", error.message);
  process.exit(1);
}
