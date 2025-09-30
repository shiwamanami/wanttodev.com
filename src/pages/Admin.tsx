import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import BasicAuth from "../components/BasicAuth";
import ImageUpload from "../components/ImageUpload";
import {
  Works,
  WORK_CATEGORIES,
  TECHNOLOGIES,
  validateWorksData,
} from "../data/works";
import { useAuth } from "../hooks/useAuth";
import { useWorksData } from "../hooks/useWorksData";

export default function Admin() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const {
    works,
    isLoading: dataLoading,
    addWork,
    updateWork,
    deleteWork,
  } = useWorksData();
  const [editingWork, setEditingWork] = useState<Works | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Works>>({
    title: "",
    date: "",
    technologies: [],
    category: [],
    thumbnail: "",
    details: {
      overview: "",
      challenge: "",
      solution: "",
      result: "",
      features: [],
      link: "",
    },
    mediaData: {
      images: [],
      videos: [],
      wireImages: [],
    },
    isVisible: true,
  });

  // 認証が必要な場合の処理
  if (isLoading || dataLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col relative">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-300">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col relative">
        <div className="text-center">
          <h2>
            ADMIN
            <span>管理画面</span>
          </h2>
          <p className="mb-10">
            このページにアクセスするにはログインが必要です。
          </p>
          <Button onClick={() => setShowAuthModal(true)}>Login</Button>
        </div>
        {showAuthModal && (
          <BasicAuth
            onAuthSuccess={() => {
              setShowAuthModal(false);
              login();
            }}
            onAuthCancel={() => setShowAuthModal(false)}
          />
        )}
      </div>
    );
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDetailsChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details!,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 必須フィールドのチェック
    if (!formData.title || !formData.date || !formData.details?.overview) {
      alert("必須フィールドを入力してください");
      return;
    }

    const newWork: Works = {
      id: editingWork?.id || Date.now(),
      title: formData.title || "",
      date: formData.date || "",
      technologies: formData.technologies || [],
      category: formData.category || [],
      thumbnail: formData.thumbnail || "",
      details: {
        overview: formData.details?.overview || "",
        challenge: formData.details?.challenge || "",
        solution: formData.details?.solution || "",
        result: formData.details?.result || "",
        features: formData.details?.features || [],
        link: formData.details?.link || "",
      },
      mediaData: {
        images: formData.mediaData?.images || [],
        videos: formData.mediaData?.videos || [],
        wireImages: formData.mediaData?.wireImages || [],
      },
      isVisible: formData.isVisible ?? true,
      createdAt: editingWork?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (!validateWorksData(newWork)) {
      alert("データの形式が正しくありません");
      return;
    }

    if (editingWork) {
      await updateWork(editingWork.id, newWork);
    } else {
      await addWork(newWork);
    }

    setShowForm(false);
    setEditingWork(null);
    setFormData({
      title: "",
      date: "",
      technologies: [],
      category: [],
      thumbnail: "",
      details: {
        overview: "",
        challenge: "",
        solution: "",
        result: "",
        features: [],
        link: "",
      },
      mediaData: {
        images: [],
        videos: [],
        wireImages: [],
      },
      isVisible: true,
    });
  };

  const handleEdit = (work: Works) => {
    setEditingWork(work);
    setFormData(work);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("この作品を削除しますか？")) {
      await deleteWork(id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingWork(null);
    setFormData({
      title: "",
      date: "",
      technologies: [],
      category: [],
      thumbnail: "",
      details: {
        overview: "",
        challenge: "",
        solution: "",
        result: "",
        features: [],
        link: "",
      },
      mediaData: {
        images: [],
        videos: [],
        wireImages: [],
      },
      isVisible: true,
    });
  };

  return (
    <div className="flex min-h-screen flex-col relative">
      <section className="container max-w-6xl py-10 sm:py-20">
        <div className="flex justify-between items-center mb-8">
          <h2>
            ADMIN
            <span>管理画面</span>
          </h2>
          <div className="flex gap-4">
            <Button onClick={() => setShowForm(true)}>新規追加</Button>
            <Button
              variant="outline"
              onClick={async () => {
                const { realtimeUpdateJsonFile } = await import(
                  "../lib/fileUtils"
                );
                await realtimeUpdateJsonFile("/works-dynamic.json", works);
              }}
            >
              ファイルをリアルタイム更新
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                window.location.reload();
              }}
            >
              データを再読み込み
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem("works-data-backup");
                console.log(
                  "🗑️ ローカルストレージのバックアップをクリアしました"
                );
                window.location.reload();
              }}
            >
              キャッシュをクリア
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                try {
                  // ファイルからデータを強制読み込み
                  const response = await fetch("/works-dynamic.json");
                  if (response.ok) {
                    const fileData = await response.json();
                    console.log(
                      "📁 ファイルから読み込んだデータ:",
                      fileData.length,
                      "件"
                    );
                    // ローカルストレージをクリアしてファイルデータを設定
                    localStorage.removeItem("works-data-backup");
                    localStorage.setItem(
                      "works-data-backup",
                      JSON.stringify(fileData)
                    );
                    console.log(
                      "✅ ファイルデータでローカルストレージを更新しました"
                    );
                    window.location.reload();
                  } else {
                    console.error("❌ ファイルの読み込みに失敗しました");
                  }
                } catch (error) {
                  console.error("❌ エラーが発生しました:", error);
                }
              }}
            >
              ファイルから同期
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                // 手動でデータ同期を実行するための指示を表示
                console.log("=== データ同期の手順 ===");
                console.log("1. ターミナルで以下のコマンドを実行してください:");
                console.log("   npm run sync-works");
                console.log("2. または、以下のコマンドでファイル監視を開始:");
                console.log("   npm run watch-works");
                console.log("3. その後、このページをリロードしてください");
                console.log("========================");
                alert(
                  "コンソールを確認して、データ同期の手順を確認してください。"
                );
              }}
            >
              データ同期
            </Button>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>

        {showForm && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-6">
              {editingWork ? "作品を編集" : "新規作品を追加"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    タイトル
                  </label>
                  <input
                    type="text"
                    value={formData.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    日付 (YYYY.MM)
                  </label>
                  <input
                    type="text"
                    value={formData.date || ""}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="2023.09"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  カテゴリ
                </label>
                <div className="flex flex-wrap gap-2">
                  {WORK_CATEGORIES.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.category?.includes(category) || false}
                        onChange={(e) => {
                          const newCategories = e.target.checked
                            ? [...(formData.category || []), category]
                            : (formData.category || []).filter(
                                (c) => c !== category
                              );
                          handleInputChange("category", newCategories);
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  技術スタック
                </label>
                <div className="flex flex-wrap gap-2">
                  {TECHNOLOGIES.map((tech) => (
                    <label key={tech} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.technologies?.includes(tech) || false}
                        onChange={(e) => {
                          const newTechs = e.target.checked
                            ? [...(formData.technologies || []), tech]
                            : (formData.technologies || []).filter(
                                (t) => t !== tech
                              );
                          handleInputChange("technologies", newTechs);
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm">{tech}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">概要</label>
                <textarea
                  value={formData.details?.overview || ""}
                  onChange={(e) =>
                    handleDetailsChange("overview", e.target.value)
                  }
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">課題</label>
                <textarea
                  value={formData.details?.challenge || ""}
                  onChange={(e) =>
                    handleDetailsChange("challenge", e.target.value)
                  }
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">解決策</label>
                <textarea
                  value={formData.details?.solution || ""}
                  onChange={(e) =>
                    handleDetailsChange("solution", e.target.value)
                  }
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">成果</label>
                <textarea
                  value={formData.details?.result || ""}
                  onChange={(e) =>
                    handleDetailsChange("result", e.target.value)
                  }
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  機能（1行に1つずつ入力）
                </label>
                <textarea
                  value={formData.details?.features?.join("\n") || ""}
                  onChange={(e) =>
                    handleDetailsChange(
                      "features",
                      e.target.value.split("\n").filter((f) => f.trim())
                    )
                  }
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">リンク</label>
                <input
                  type="url"
                  value={formData.details?.link || ""}
                  onChange={(e) => handleDetailsChange("link", e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  サムネイル画像
                </label>
                <input
                  type="text"
                  value={formData.thumbnail || ""}
                  onChange={(e) =>
                    handleInputChange("thumbnail", e.target.value)
                  }
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="/images/works/1/thumbnail.webp"
                />
                <p className="text-xs text-gray-400 mt-1">
                  サムネイル画像のパスを入力してください
                </p>
              </div>

              {/* 画像アップロード */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-200">
                  メディアデータ
                </h4>

                <ImageUpload
                  label="メイン画像"
                  value={formData.mediaData?.images || []}
                  onChange={(images) =>
                    handleInputChange("mediaData", {
                      ...formData.mediaData,
                      images,
                    })
                  }
                />

                <ImageUpload
                  label="動画（サムネイル画像）"
                  value={formData.mediaData?.videos || []}
                  onChange={(videos) =>
                    handleInputChange("mediaData", {
                      ...formData.mediaData,
                      videos,
                    })
                  }
                />

                <ImageUpload
                  label="ワイヤーフレーム画像"
                  value={formData.mediaData?.wireImages || []}
                  onChange={(wireImages) =>
                    handleInputChange("mediaData", {
                      ...formData.mediaData,
                      wireImages,
                    })
                  }
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isVisible"
                  checked={formData.isVisible || false}
                  onChange={(e) =>
                    handleInputChange("isVisible", e.target.checked)
                  }
                  className="mr-2"
                />
                <label htmlFor="isVisible" className="text-sm">
                  公開する
                </label>
              </div>

              <div className="flex gap-4">
                <Button type="submit">{editingWork ? "更新" : "追加"}</Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  キャンセル
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {works.map((work) => (
            <div key={work.id} className="bg-gray-800 p-6 rounded-lg">
              <div className="flex gap-6">
                {/* サムネイル画像 */}
                <div className="flex-shrink-0">
                  {work.thumbnail ? (
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-700">
                      <img
                        src={work.thumbnail}
                        alt={`${work.title} - サムネイル`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-lg bg-gray-700 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* 作品情報 */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold mb-2">{work.title}</h3>
                  <p className="text-gray-400 mb-2">{work.date}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {work.category.map((cat, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-500 text-xs rounded"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {work.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-600 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* アクションボタン */}
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleEdit(work)}>
                    編集
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(work.id)}
                  >
                    削除
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ファイル更新のヘルプ */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-8">
          <h4 className="text-lg font-semibold text-blue-300 mb-2">
            📁 データ保存について
          </h4>
          <div className="text-sm text-blue-200 space-y-2">
            <p>
              <strong>データの保存場所:</strong>{" "}
              <code className="bg-gray-700 px-2 py-1 rounded">
                src/data/works-dynamic.json
              </code>
            </p>
            <p>データを変更すると、以下の手順でファイルが自動更新されます：</p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>
                プロジェクト内の <code>src/data/works-dynamic.json</code>{" "}
                が自動更新されます
              </li>
              <li>コンソールにJSONデータが表示されます（バックアップ用）</li>
              <li>データがクリップボードにコピーされます（可能な場合）</li>
            </ol>
            <p className="text-blue-300">
              💡
              手動でファイルを更新したい場合は「ファイルをリアルタイム更新」ボタンを使用してください
            </p>
            <p className="text-yellow-300 text-xs">
              ⚠️
              ブラウザの制限により、完全な自動更新ができない場合はコンソールに表示されたデータを手動でコピーしてください
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/works">
            <Button variant="outline">作品一覧に戻る</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
