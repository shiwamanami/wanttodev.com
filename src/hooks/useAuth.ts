import { useState, useEffect } from "react";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

// 共通の認証チェック関数
const checkAuth = (authKey: string) => {
  try {
    const authStatus = localStorage.getItem(authKey);
    const authTimestamp = localStorage.getItem(`${authKey}_timestamp`);

    if (authStatus === "true" && authTimestamp) {
      // 認証の有効期限をチェック（24時間）
      const now = Date.now();
      const authTime = parseInt(authTimestamp, 10);
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24時間をミリ秒で表現

      if (now - authTime < twentyFourHours) {
        return true;
      } else {
        // 認証期限切れの場合は認証情報を削除
        localStorage.removeItem(authKey);
        localStorage.removeItem(`${authKey}_timestamp`);
        return false;
      }
    }
    return false;
  } catch (error) {
    console.error("認証状態の確認中にエラーが発生しました:", error);
    return false;
  }
};

// Works用の認証フック
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
  });

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
    const isAuth = checkAuth("works_auth");
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

// Blog用の認証フック
export function useBlogAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
  });

  // 認証成功時の処理
  const login = () => {
    setAuthState({
      isAuthenticated: true,
      isLoading: false,
    });
  };

  // ログアウト処理
  const logout = () => {
    localStorage.removeItem("blog_auth");
    localStorage.removeItem("blog_auth_timestamp");
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
    });
  };

  // コンポーネントマウント時に認証状態をチェック
  useEffect(() => {
    const isAuth = checkAuth("blog_auth");
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
