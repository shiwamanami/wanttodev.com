import { useState, useEffect } from "react";
import { Works, validateWorksData, worksData } from "../data/works";
import {
  readJsonFile,
  autoUpdateJsonFile,
  realtimeUpdateJsonFile,
  readFromLocalStorage,
  saveToLocalStorage,
} from "../lib/fileUtils";

const DYNAMIC_DATA_PATH = "/works-dynamic.json";
const STORAGE_KEY = "works-data-backup"; // バックアップ用に変更

export function useWorksData() {
  const [works, setWorks] = useState<Works[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // データを読み込み
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("🔄 データ読み込み開始...");
        // まず動的データファイルを読み込む
        const fileResult = await readJsonFile(DYNAMIC_DATA_PATH);
        console.log("📁 ファイル読み込み結果:", fileResult);

        if (fileResult.success && Array.isArray(fileResult.data)) {
          console.log(
            "✅ ファイル読み込み成功、データ件数:",
            fileResult.data.length
          );
          console.log("📋 読み込まれたデータの最初の項目:", fileResult.data[0]);
          // ファイルから読み込んだデータを正規化してからバリデーション
          const normalizedData = fileResult.data.map((data: any) => ({
            ...data,
            mediaData: {
              images: data.mediaData?.images || [],
              videos: data.mediaData?.videos || [],
              wireImages: data.mediaData?.wireImages || [],
            },
          }));
          const validData = normalizedData.filter(validateWorksData);
          console.log("🔍 バリデーション後データ件数:", validData.length);
          if (validData.length > 0) {
            console.log(
              "📁 ファイルからデータを読み込みました:",
              validData.length,
              "件"
            );
            console.log(
              "📊 バリデーション済みデータの最初の項目:",
              validData[0]
            );
            setWorks(validData);
            setIsLoading(false);
            return;
          } else {
            const invalidData = fileResult.data.filter(
              (data) => !validateWorksData(data)
            );
            console.log(
              "❌ バリデーションに失敗したデータ件数:",
              invalidData.length
            );
            console.log("❌ バリデーションに失敗したデータ:", invalidData);
            // バリデーションに失敗した理由を詳しく調べる
            invalidData.forEach((data, index) => {
              console.log(`❌ データ${index + 1}のバリデーション詳細:`, {
                id: data.id,
                title: data.title,
                hasDetails: !!data.details,
                hasOverview: !!data.details?.overview,
                overviewIsArray: Array.isArray(data.details?.overview),
                hasMediaData: !!data.mediaData,
                hasImages: !!data.mediaData?.images,
                imagesIsArray: Array.isArray(data.mediaData?.images),
              });
            });
          }
        }

        console.log(
          "⚠️ ファイルが空または無効です。バックアップデータをチェックします..."
        );
        console.log("ファイル読み込み結果の詳細:", fileResult);

        // ファイルが空または無効な場合は、バックアップデータをチェック
        const backupData = readFromLocalStorage(STORAGE_KEY);
        console.log("バックアップデータ:", backupData.length, "件");
        if (backupData.length > 0) {
          console.log(
            "💾 バックアップデータから復元します:",
            backupData.length,
            "件"
          );
          const validData = backupData.filter(validateWorksData);
          console.log(
            "バックアップデータのバリデーション後:",
            validData.length,
            "件"
          );
          setWorks(validData);
          // バックアップデータをファイルに復元
          await autoUpdateJsonFile(DYNAMIC_DATA_PATH, validData);
        } else {
          console.log("📋 データがありません");
          console.log("初期データ件数:", worksData.length, "件");
          // データがない場合は空の配列を設定
          setWorks([]);
        }
      } catch (error) {
        console.error("❌ データの読み込みに失敗しました:", error);
        console.log("データがありません");
        // エラーの場合は空の配列を設定
        setWorks([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // データを保存
  const saveWorks = async (newWorks: Works[]) => {
    try {
      console.log("💾 データを保存中...", newWorks.length, "件");
      // UIを即座に更新
      setWorks(newWorks);
      console.log("✅ UIを更新しました");

      // リアルタイムファイル更新機能を使用
      console.log("📁 ファイルを更新中...");
      const fileResult = await realtimeUpdateJsonFile(
        DYNAMIC_DATA_PATH,
        newWorks
      );
      console.log("📁 ファイル更新結果:", fileResult);
      if (fileResult.success) {
        console.log("✅ データが更新されました");
        console.log("📁 src/data/works-dynamic.json が自動更新されました");
      } else {
        console.warn("⚠️ ファイルへの保存に失敗しました:", fileResult.error);
        // フォールバックとしてローカルストレージに保存
        saveToLocalStorage(STORAGE_KEY, newWorks);
        console.log("💾 データはローカルストレージにバックアップされました");
      }
    } catch (error) {
      console.error("❌ データの保存に失敗しました:", error);
      // エラー時はローカルストレージに保存
      saveToLocalStorage(STORAGE_KEY, newWorks);
      console.log("💾 データはローカルストレージにバックアップされました");
    }
  };

  // 作品を追加
  const addWork = async (work: Works) => {
    const newWorks = [...works, work];
    await saveWorks(newWorks);
  };

  // 作品を更新
  const updateWork = async (id: number, updatedWork: Works) => {
    console.log("🔄 作品を更新中...", { id, updatedWork });
    const newWorks = works.map((work) =>
      work.id === id
        ? { ...updatedWork, id, updatedAt: new Date().toISOString() }
        : work
    );
    console.log("📊 更新後の作品一覧:", newWorks.length, "件");
    await saveWorks(newWorks);
  };

  // 作品を削除
  const deleteWork = async (id: number) => {
    const newWorks = works.filter((work) => work.id !== id);
    await saveWorks(newWorks);
  };

  // 作品を取得
  const getWork = (id: number) => {
    return works.find((work) => work.id === id);
  };

  return {
    works,
    isLoading,
    addWork,
    updateWork,
    deleteWork,
    getWork,
    saveWorks,
  };
}
