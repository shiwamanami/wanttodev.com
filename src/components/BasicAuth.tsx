import React, { useState } from "react";
import { Button } from "./Button";

interface BasicAuthProps {
  onAuthSuccess: () => void;
  onAuthCancel: () => void;
}

export default function BasicAuth({
  onAuthSuccess,
  onAuthCancel,
}: BasicAuthProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 認証情報（本番環境では環境変数から取得することを推奨）
  const validCredentials = {
    username: process.env.REACT_APP_AUTH_USERNAME || "admin",
    password: process.env.REACT_APP_AUTH_PASSWORD || "password123",
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
      localStorage.setItem("works_auth", "true");
      localStorage.setItem("works_auth_timestamp", Date.now().toString());
      onAuthSuccess();
    } else {
      setError("ユーザー名またはパスワードが正しくありません。");
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md mx-4 border border-gray-700">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">認証が必要です</h2>
          <p className="text-gray-300">
            制作実績ページにアクセスするには認証が必要です。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              ユーザー名
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
              placeholder="ユーザー名を入力"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              パスワード
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
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

          <div className="flex gap-3 pt-4">
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

        {/* <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
          <p className="text-xs text-gray-400 text-center">
            デモ用認証情報:
            <br />
            ユーザー名:{" "}
            <span className="text-yellow-300">{validCredentials.username}</span>
            <br />
            パスワード:{" "}
            <span className="text-yellow-300">{validCredentials.password}</span>
          </p>
        </div> */}
      </div>
    </div>
  );
}
