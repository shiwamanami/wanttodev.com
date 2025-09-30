// ローカルストレージから works-dynamic.json へのデータ移行スクリプト
// このスクリプトをブラウザのコンソールで実行してください

function migrateDataToFile() {
  try {
    // ローカルストレージからデータを取得
    const storedData = localStorage.getItem("works-data");

    if (!storedData) {
      console.log("ローカルストレージにデータが見つかりません");
      return;
    }

    const data = JSON.parse(storedData);
    console.log("移行するデータ:", data);

    // JSONファイル用の形式に変換
    const jsonString = JSON.stringify(data, null, 2);

    // ファイルに保存するためのBlobを作成
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // ダウンロードリンクを作成
    const a = document.createElement("a");
    a.href = url;
    a.download = "works-dynamic.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log("works-dynamic.json ファイルがダウンロードされました");
    console.log("このファイルを src/data/ フォルダに配置してください");
  } catch (error) {
    console.error("データの移行に失敗しました:", error);
  }
}

// 関数を実行
migrateDataToFile();
