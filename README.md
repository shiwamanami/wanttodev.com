# wanttodev.com - ポートフォリオサイト

React と TypeScript を使用して構築された個人ポートフォリオサイトです。  
[Create React App](https://github.com/facebook/create-react-app)をベースとして開発されています。

## プロジェクト概要

このプロジェクトは、私の技術スキルと実績を紹介するためのポートフォリオサイトです。  
モダンな Web 技術を活用し、レスポンシブデザインとユーザビリティを重視した設計となっています。

## 技術スタック

- **フロントエンド**: React 19.1.1, TypeScript 5.9.2
- **スタイリング**: Tailwind CSS 3.4.17
- **ルーティング**: React Router DOM 7.9.1
- **UI コンポーネント**: Radix UI
- **アイコン**: Lucide React
- **ビルドツール**: Create React App
- **テスト**: Jest, React Testing Library

## プロジェクト構成

```
src/
├── components/          # 再利用可能なReactコンポーネント
│   ├── blog/           # ブログ機能関連コンポーネント
│   │   ├── templates/  # ブログ記事テンプレート
│   │   └── ...         # その他のブログコンポーネント
│   ├── Header.tsx      # ヘッダーコンポーネント
│   ├── Footer.tsx      # フッターコンポーネント
│   └── ...             # その他の共通コンポーネント
├── pages/              # ページコンポーネント
│   ├── Home.tsx        # トップページ
│   ├── About.tsx       # 自己紹介ページ
│   ├── Works.tsx       # 作品紹介ページ
│   ├── Blog.tsx        # ブログ一覧ページ
│   └── BlogDetail.tsx  # ブログ詳細ページ
├── data/               # 静的データファイル
│   ├── blog.ts         # ブログ記事データ
│   ├── faq.ts          # FAQデータ
│   └── main.ts         # メインデータ
├── hooks/              # カスタムReactフック
├── lib/                # ユーティリティ関数
└── styles/             # スタイルファイル
```

## 主な機能

- **レスポンシブデザイン**: モバイル・タブレット・デスクトップに対応
- **ブログ機能**: 動的なブログ記事表示とカテゴリ分類
- **認証機能**: Works ページに BASIC 認証を実装（24 時間有効期限）
- **SEO 最適化**: メタタグと構造化データの実装
- **アクセシビリティ**: WAI-ARIA 準拠の実装
- **パフォーマンス最適化**: コード分割と遅延読み込み

## セットアップ手順

### 前提条件

- Node.js 16.0.0 以上
- npm または yarn

### インストール

```bash
# リポジトリのクローン
git clone [リポジトリURL]
cd wanttodev.com

# 依存関係のインストール
npm install
```

### 環境変数の設定

プロジェクトルートに `.env` ファイルを作成し、以下の環境変数を設定してください：

```bash
# 認証設定（Worksページ用）
REACT_APP_AUTH_USERNAME=user01
REACT_APP_AUTH_PASSWORD=Dp7QCkKR

# その他の設定
# REACT_APP_API_URL=https://api.example.com
# REACT_APP_DEBUG=true
```

**注意**: `.env` ファイルは `.gitignore` に含まれているため、機密情報を安全に管理できます。

### 開発環境の起動

```bash
# 開発サーバーの起動
npm start
```

ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスしてサイトを確認できます。

## 利用可能なスクリプト

| コマンド        | 説明                                     |
| --------------- | ---------------------------------------- |
| `npm start`     | 開発サーバーを起動（ホットリロード対応） |
| `npm test`      | テストスイートを実行                     |
| `npm run build` | 本番用ビルドを作成                       |
| `npm run eject` | Create React App の設定をカスタマイズ    |

## 開発における特徴

### TypeScript の活用

- 型安全性の確保
- 開発時のエラー検出
- コードの可読性向上

### コンポーネント設計

- 再利用可能なコンポーネントの作成
- Props の型定義
- カスタムフックの活用

### スタイリング

- Tailwind CSS によるユーティリティファーストアプローチ
- レスポンシブデザインの実装
- ダークモード対応

## パフォーマンス最適化

- React.lazy()を使用したコンポーネントの遅延読み込み
- 画像の最適化
- バンドルサイズの最適化
- Web Vitals の監視

## 今後の改善予定

- [ ] ブログ記事の CMS 連携
- [ ] 多言語対応
- [ ] PWA 機能の追加
- [ ] パフォーマンスのさらなる最適化

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 実績ページ

画面キャプチャサイズ　　 W:1280px
画像 1 枚あたり 150KB 以下が理想。超高解像度でも 500KB 以内に抑える。
