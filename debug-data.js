// データの不整合を調査するためのデバッグスクリプト
console.log("=== データ不整合調査 ===");

// 1. ローカルストレージの内容を確認
const localData = localStorage.getItem("works-data-backup");
if (localData) {
  try {
    const parsed = JSON.parse(localData);
    console.log("💾 ローカルストレージのデータ:");
    console.log("データ件数:", parsed.length);
    parsed.forEach((item, index) => {
      console.log(`${index + 1}. ID: ${item.id}, タイトル: ${item.title}`);
    });
  } catch (error) {
    console.error("ローカルストレージのデータが無効です:", error);
  }
} else {
  console.log("💾 ローカルストレージにデータがありません");
}

// 2. ファイル読み込みを試行
fetch("./src/data/works-dynamic.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("📁 ファイルから読み込んだデータ:");
    console.log("データ件数:", data.length);
    data.forEach((item, index) => {
      console.log(`${index + 1}. ID: ${item.id}, タイトル: ${item.title}`);
    });
  })
  .catch((error) => {
    console.error("❌ ファイル読み込みエラー:", error);
  });

// 3. 現在のworksDataの状態を確認
console.log("🔍 現在のworksDataの状態を確認中...");
