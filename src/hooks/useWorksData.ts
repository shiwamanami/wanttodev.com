import { useState, useEffect } from "react";
import { Works, validateWorksData, worksData } from "../data/works";
import {
  readJsonFile,
  writeJsonFile,
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
        // まず動的データファイルを読み込む
        const fileResult = await readJsonFile(DYNAMIC_DATA_PATH);

        if (fileResult.success && Array.isArray(fileResult.data)) {
          // ファイルから読み込んだデータをバリデーション
          const validData = fileResult.data.filter(validateWorksData);
          if (validData.length > 0) {
            console.log(
              "📁 ファイルからデータを読み込みました:",
              validData.length,
              "件"
            );
            setWorks(validData);
            setIsLoading(false);
            return;
          }
        }

        console.log(
          "⚠️ ファイルが空または無効です。バックアップデータをチェックします..."
        );

        // ファイルが空または無効な場合は、バックアップデータをチェック
        const backupData = readFromLocalStorage(STORAGE_KEY);
        if (backupData.length > 0) {
          console.log(
            "💾 バックアップデータから復元します:",
            backupData.length,
            "件"
          );
          const validData = backupData.filter(validateWorksData);
          setWorks(validData);
          // バックアップデータをファイルに復元
          await autoUpdateJsonFile(DYNAMIC_DATA_PATH, validData);
        } else {
          console.log("📋 初期データを使用します");
          // どちらもない場合は初期データを使用
          setWorks(worksData);
        }
      } catch (error) {
        console.error("❌ データの読み込みに失敗しました:", error);
        // エラーの場合は初期データを使用
        setWorks(worksData);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // データを保存
  const saveWorks = async (newWorks: Works[]) => {
    try {
      // UIを即座に更新
      setWorks(newWorks);

      // リアルタイムファイル更新機能を使用
      const fileResult = await realtimeUpdateJsonFile(
        DYNAMIC_DATA_PATH,
        newWorks
      );
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
    const newWorks = works.map((work) =>
      work.id === id
        ? { ...updatedWork, id, updatedAt: new Date().toISOString() }
        : work
    );
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
