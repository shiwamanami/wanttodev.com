import React, { useState } from "react";
import { Button } from "./Button";

interface AdminAuthProps {
  onAuthSuccess: () => void;
  onAuthCancel: () => void;
}

export default function AdminAuth({
  onAuthSuccess,
  onAuthCancel,
}: AdminAuthProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Admin用の認証情報（本番環境では環境変数から取得することを推奨）
  const validCredentials = {
    username: process.env.REACT_APP_ADMIN_USERNAME || "admin",
    password: process.env.REACT_APP_ADMIN_PASSWORD || "admin123",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // 簡単な認証チェック（実際のプロダクションでは適切な認証システムを使用）
    if (
      username === validCredentials.username &&
      password === validCredentials.password
    ) {
      // 認証成功時はローカルストレージに認証状態を保存
      localStorage.setItem("admin_auth", "true");
      localStorage.setItem("admin_auth_timestamp", Date.now().toString());
      onAuthSuccess();
    } else {
      setError("ユーザー名またはパスワードが正しくありません。");
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/5 rounded-lg p-8 md:p-12 w-full max-w-lg mx-4 border border-gray-600">
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-10">
          <div>
            <label
              htmlFor="admin-username"
              className="block mb-2"
            >
              ユーザー名
            </label>
            <input
              type="text"
              id="admin-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="ユーザー名を入力"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block mb-2"
            >
              パスワード
            </label>
            <input
              type="password"
              id="admin-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="パスワードを入力"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-between gap-3 pt-4 md:pt-8">
            <Button
              type="button"
              variant="outline"
              onClick={onAuthCancel}
              disabled={isLoading}
              className="flex-1"
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "認証中..." : "ログイン"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

