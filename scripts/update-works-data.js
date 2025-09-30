#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// コマンドライン引数からJSONデータを取得
const jsonData = process.argv[2];

if (!jsonData) {
  console.error("❌ JSONデータが提供されていません");
  process.exit(1);
}

try {
  // JSONデータをパース
  const data = JSON.parse(jsonData);

  // ファイルパス
  const filePath = path.join(
    __dirname,
    "..",
    "src",
    "data",
    "works-dynamic.json"
  );

  // ファイルに書き込み
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

  console.log("✅ src/data/works-dynamic.json が更新されました");
  console.log(`📁 ファイルパス: ${filePath}`);
  console.log(`📊 データ件数: ${data.length}件`);
} catch (error) {
  console.error("❌ ファイル更新エラー:", error.message);
  process.exit(1);
}
