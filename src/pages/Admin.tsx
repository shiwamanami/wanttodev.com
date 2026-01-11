import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import AdminAuth from "../components/AdminAuth";
import ImageUpload from "../components/ImageUpload";
import {
  Works,
  WORK_CATEGORIES,
  TECHNOLOGIES,
  validateWorksData,
} from "../data/works";
import { useAdminAuth } from "../hooks/useAuth";
import { useWorksData } from "../hooks/useWorksData";

export default function Admin() {
  const { isAuthenticated, isLoading, login, logout } = useAdminAuth();
  const {
    works,
    isLoading: dataLoading,
    addWork,
    updateWork,
    deleteWork,
    rescanWorksFolders,
  } = useWorksData();
  const [editingWork, setEditingWork] = useState<Works | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<Partial<Works>>({
    title: "",
    date: "",
    role: "",
    client: "",
    industry: "",
    technologies: [],
    category: [],
    details: {
      overview: [],
      challenge: [],
      solution: [],
      result: [],
      features: [],
      link: "",
    },
    mediaData: {
      images: [],
      videos: [],
    },
    isVisible: true,
  });

  // 認証されていない場合にスクロールを無効化
  useEffect(() => {
    if (!isAuthenticated && !isLoading && !dataLoading) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isAuthenticated, isLoading, dataLoading]);

  // フォームが表示されたときに自動スクロール
  useEffect(() => {
    if (showForm && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [showForm]);

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
      <div className="flex items-center justify-center h-full flex-col relative overflow-hidden">
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
          <AdminAuth
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

  const handleArrayFieldAdd = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details!,
        [field]: [
          ...((prev.details?.[
            field as keyof typeof prev.details
          ] as string[]) || []),
          "",
        ],
      },
    }));
  };

  const handleArrayFieldRemove = (field: string, index: number) => {
    setFormData((prev) => {
      const currentArray =
        (prev.details?.[field as keyof typeof prev.details] as string[]) || [];
      const newArray = currentArray.filter((_, i) => i !== index);
      return {
        ...prev,
        details: {
          ...prev.details!,
          [field]: newArray,
        },
      };
    });
  };

  const handleArrayFieldItemChange = (
    field: string,
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const currentArray =
        (prev.details?.[field as keyof typeof prev.details] as string[]) || [];
      const newArray = [...currentArray];
      newArray[index] = value;
      return {
        ...prev,
        details: {
          ...prev.details!,
          [field]: newArray,
        },
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📝 フォーム送信開始...", { editingWork, formData });

    // 必須フィールドのチェック
    if (
      !formData.title ||
      !formData.date ||
      !formData.details?.overview?.length
    ) {
      alert("必須フィールドを入力してください");
      return;
    }

    const workId = editingWork?.id || Date.now();
    const newWork: Works = {
      id: workId,
      title: formData.title || "",
      date: formData.date || "",
      role: formData.role || "",
      client: formData.client || "",
      industry: formData.industry || "",
      technologies: formData.technologies || [],
      category: formData.category || [],
      thumbnail: `/images/works/${workId}/thumbnail.webp`, // 自動生成
      details: {
        overview: formData.details?.overview || [],
        challenge: formData.details?.challenge || [],
        solution: formData.details?.solution || [],
        result: formData.details?.result || [],
        features: formData.details?.features || [],
        link: formData.details?.link || "",
      },
      mediaData: {
        images: formData.mediaData?.images || [],
        videos: formData.mediaData?.videos || [],
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
      console.log("🔄 既存作品を更新中...", editingWork.id);
      await updateWork(editingWork.id, newWork);
    } else {
      console.log("➕ 新規作品を追加中...");
      await addWork(newWork);
    }

    console.log("✅ 保存完了");
    setShowForm(false);
    setEditingWork(null);
    setFormData({
      title: "",
      date: "",
      role: "",
      client: "",
      industry: "",
      technologies: [],
      category: [],
      thumbnail: "",
      details: {
        overview: [],
        challenge: [],
        solution: [],
        result: [],
        features: [],
        link: "",
      },
      mediaData: {
        images: [],
        videos: [],
      },
      isVisible: true,
    });
  };

  const handleEdit = (work: Works) => {
    console.log("📝 編集ボタンがクリックされました:", work);
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
      role: "",
      client: "",
      industry: "",
      technologies: [],
      category: [],
      thumbnail: "",
      details: {
        overview: [],
        challenge: [],
        solution: [],
        result: [],
        features: [],
        link: "",
      },
      mediaData: {
        images: [],
        videos: [],
      },
      isVisible: true,
    });
  };

  return (
    <div className="flex min-h-screen flex-col relative">
      <section className="container max-w-6xl py-10 sm:py-20">
        <h2>
          ADMIN
          <span>管理画面</span>
        </h2>

        <div className="flex flex-wrap gap-2 mb-10 md:mb-20">
          <Button
            onClick={() => {
              setEditingWork(null);
              setFormData({
                title: "",
                date: "",
                role: "",
                client: "",
                industry: "",
                technologies: [],
                category: [],
                details: {
                  overview: [],
                  challenge: [],
                  solution: [],
                  result: [],
                  features: [],
                  link: "",
                },
                mediaData: {
                  images: [],
                  videos: [],
                },
                isVisible: true,
              });
              setShowForm(true);
            }}
          >
            新規追加
          </Button>
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
            onClick={async () => {
              await rescanWorksFolders();
            }}
          >
            画像フォルダを再スキャン
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
                // TypeScriptファイルからデータを強制読み込み
                const { worksDynamicData } = await import(
                  "../data/works-dynamic"
                );
                console.log(
                  "📁 TypeScriptファイルから読み込んだデータ:",
                  worksDynamicData.length,
                  "件"
                );
                // ローカルストレージをクリアしてファイルデータを設定
                localStorage.removeItem("works-data-backup");
                localStorage.setItem(
                  "works-data-backup",
                  JSON.stringify(worksDynamicData)
                );
                console.log(
                  "✅ TypeScriptファイルデータでローカルストレージを更新しました"
                );
                window.location.reload();
              } catch (error) {
                console.error("❌ エラーが発生しました:", error);
              }
            }}
          >
            TypeScriptファイルから同期
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

        {showForm && (
          <div ref={formRef} className="bg-gray-800 p-6 rounded-lg mb-8">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">役割</label>
                  <input
                    type="text"
                    value={formData.role || ""}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="フルスタック開発"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    クライアント
                  </label>
                  <input
                    type="text"
                    value={formData.client || ""}
                    onChange={(e) =>
                      handleInputChange("client", e.target.value)
                    }
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="株式会社サンプル"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">業種</label>
                <input
                  type="text"
                  value={formData.industry || ""}
                  onChange={(e) =>
                    handleInputChange("industry", e.target.value)
                  }
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="IT・Web"
                  required
                />
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
                <div className="space-y-2">
                  {(formData.details?.overview || []).map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <textarea
                        value={item}
                        onChange={(e) =>
                          handleArrayFieldItemChange(
                            "overview",
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={2}
                        placeholder={`概要 ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleArrayFieldRemove("overview", index)
                        }
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        削除
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleArrayFieldAdd("overview")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    項目を追加
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">課題</label>
                <div className="space-y-2">
                  {(formData.details?.challenge || []).map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <textarea
                        value={item}
                        onChange={(e) =>
                          handleArrayFieldItemChange(
                            "challenge",
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={2}
                        placeholder={`課題 ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleArrayFieldRemove("challenge", index)
                        }
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        削除
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleArrayFieldAdd("challenge")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    項目を追加
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">解決策</label>
                <div className="space-y-2">
                  {(formData.details?.solution || []).map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <textarea
                        value={item}
                        onChange={(e) =>
                          handleArrayFieldItemChange(
                            "solution",
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={2}
                        placeholder={`解決策 ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleArrayFieldRemove("solution", index)
                        }
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        削除
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleArrayFieldAdd("solution")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    項目を追加
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">成果</label>
                <div className="space-y-2">
                  {(formData.details?.result || []).map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <textarea
                        value={item}
                        onChange={(e) =>
                          handleArrayFieldItemChange(
                            "result",
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={2}
                        placeholder={`成果 ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => handleArrayFieldRemove("result", index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        削除
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleArrayFieldAdd("result")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    項目を追加
                  </button>
                </div>
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

              {/* サムネイル画像は自動生成されるため、入力フィールドを削除 */}

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
                  <div className="w-32 aspect-[8/5] overflow-hidden bg-gray-700">
                    <img
                      src={`/images/works/${work.id}/thumbnail.webp`}
                      alt={`${work.title} - サムネイル`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* 作品情報 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{work.title}</h3>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        work.isVisible
                          ? "bg-green-600 text-white"
                          : "bg-gray-600 text-gray-300"
                      }`}
                    >
                      {work.isVisible ? "表示中" : "非表示"}
                    </span>
                  </div>
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

        <div className="text-center mt-8">
          <Link to="/works">
            <Button variant="outline">Back to Works</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
