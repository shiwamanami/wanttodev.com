import { useState, useEffect } from "react";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
  });

  // 認証状態をチェックする関数
  const checkAuth = () => {
    try {
      const authStatus = localStorage.getItem("works_auth");
      const authTimestamp = localStorage.getItem("works_auth_timestamp");

      if (authStatus === "true" && authTimestamp) {
        // 認証の有効期限をチェック（24時間）
        const now = Date.now();
        const authTime = parseInt(authTimestamp, 10);
        const twentyFourHours = 24 * 60 * 60 * 1000; // 24時間をミリ秒で表現

        if (now - authTime < twentyFourHours) {
          return true;
        } else {
          // 認証期限切れの場合は認証情報を削除
          localStorage.removeItem("works_auth");
          localStorage.removeItem("works_auth_timestamp");
          return false;
        }
      }
      return false;
    } catch (error) {
      console.error("認証状態の確認中にエラーが発生しました:", error);
      return false;
    }
  };

  // 認証成功時の処理
  const login = () => {
    setAuthState({
      isAuthenticated: true,
      isLoading: false,
    });
  };

  // ログアウト処理
  const logout = () => {
    localStorage.removeItem("works_auth");
    localStorage.removeItem("works_auth_timestamp");
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
    });
  };

  // コンポーネントマウント時に認証状態をチェック
  useEffect(() => {
    const isAuth = checkAuth();
    setAuthState({
      isAuthenticated: isAuth,
      isLoading: false,
    });
  }, []);

  return {
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    login,
    logout,
  };
}
