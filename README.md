# ポートフォリオサイト

## プロジェクト概要

React と TypeScript を使用して構築された個人ポートフォリオサイトです。  
[Create React App](https://github.com/facebook/create-react-app)をベースとして開発されています。

## 技術スタック

- **フロントエンド**: React 19.1.1, TypeScript 5.9.2
- **スタイリング**: Tailwind CSS 3.4.17
- **ルーティング**: React Router DOM 7.9.1
- **UI コンポーネント**: Radix UI
- **アイコン**: Lucide React
- **ビルドツール**: Create React App
- **テスト**: Jest, React Testing Library

## 主な機能

- **レスポンシブデザイン**: モバイル・タブレット・デスクトップに対応
- **認証機能**: Works ページに BASIC 認証を実装（24 時間有効期限）
- **管理画面**: 作品データの動的追加・編集・削除機能
- **データ管理**: ファイルベースのデータ保存システム
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
REACT_APP_AUTH_USERNAME
REACT_APP_AUTH_PASSWORD

```

**注意**: `.env` ファイルは `.gitignore` に含まれているため、機密情報を安全に管理できます。

### 開発環境の起動

```bash
# 開発サーバーの起動
npm start
```

## データ管理システム

### ファイル構造

作品データは以下の 2 つのファイルで管理されています：

```
src/data/
├── works.ts              # 初期データ（静的・変更不可）
└── works-dynamic.ts      # 動的データ（管理画面で追加・編集可能）
```

### データの保存場所

| データ種別         | ファイル                    | 説明                             |
| ------------------ | --------------------------- | -------------------------------- |
| **初期データ**     | `src/data/works.ts`         | プロジェクトに含まれる静的データ |
| **新規追加データ** | `src/data/works-dynamic.ts` | 管理画面で追加された動的データ   |
| **フォールバック** | ブラウザローカルストレージ  | 一時的な保存場所                 |
| **ブログデータ**   | `src/data/blog.ts`          | 技術ブログの記事データ（静的）   |

### ファイル監視と自動同期

#### 自動監視モード（推奨）

```bash
npm run watch-works
```

- `src/data/works-dynamic.ts`の変更を監視
- 変更を検知すると自動で`public/works-dynamic.json`に同期
- 開発中は常に実行しておくことを推奨

#### 手動同期

```bash
npm run sync-works
```

- 一度だけデータを同期
- ファイル監視を停止した後や、手動で同期したい場合に使用

### 動作の流れ

#### 1. データ読み込み時

```
1. public/works-dynamic.json を読み込み
   ↓（ファイルが空または無効な場合）
2. ローカルストレージをチェック
   ↓（データがない場合）
3. works.ts の初期データを使用
```

#### 2. データ保存時

```
1. ローカルストレージに即座に保存（UI更新）
   ↓（同時実行）
2. works-dynamic.ts への保存を試行
   ↓（ブラウザ制限により手動更新が必要）
3. コンソールにJSONデータを出力
```

### 管理画面の使用方法

1. **アクセス**: `/admin` にアクセス
2. **認証**: 環境変数で設定した認証情報でログイン
3. **操作**:
   - 「新規追加」: 新しい作品を追加
   - 「編集」: 既存の作品を編集
   - 「削除」: 作品を削除

### データ移行方法

既存のローカルストレージデータをファイルに移行する場合：

1. ブラウザの開発者ツール（F12）を開く
2. コンソールタブで以下を実行：

```javascript
// 移行スクリプトを実行
fetch("/src/scripts/migrateData.js")
  .then((response) => response.text())
  .then((script) => eval(script));
```

3. ダウンロードされた `works-dynamic.json` を `src/data/` フォルダに配置し、`works-dynamic.ts` として保存

### ブログデータの管理

ブログ記事は `src/data/blog.ts` で管理されています。

#### データ構造

```typescript
{
  id: number;                    // 記事ID（連番）
  title: string;                 // 記事タイトル
  slug: string;                  // URL用スラッグ（例: "css-grid-flexbox-usage"）
  date: string;                  // 公開日（YYYY-MM-DD形式）
  category: BlogCategory[];     // カテゴリ（配列）
  tags: string[];                // タグ（配列）
  excerpt: string;               // 記事の抜粋（一覧ページで表示）
  content: string;               // 記事本文（HTML形式）
  thumbnail?: string;            // サムネイル画像パス（オプション）
  technologies?: Technology[];  // 使用技術（オプション）
  isPublished: boolean;          // 公開フラグ
  createdAt?: string;            // 作成日時（オプション）
  updatedAt?: string;            // 更新日時（オプション）
}
```

#### 記事の追加方法

1. `src/data/blog.ts` の `blogData` 配列に新しい記事オブジェクトを追加
2. `id` は既存の記事と重複しない連番を指定
3. `slug` はURLに使用されるため、英数字とハイフンのみ（例: "my-article-title"）
4. `content` はHTML形式で記述（コードブロックは `<pre><code>` タグを使用）
5. `isPublished: true` に設定すると公開される

#### コードブロックの記述方法

コードブロック内のHTMLは自動的にエスケープされますが、`<pre><code>` タグ内では `&lt;` と `&gt;` を使用してください：

```typescript
content: `
  <pre><code>&lt;div&gt;
    &lt;p&gt;コード例&lt;/p&gt;
  &lt;/div&gt;</code></pre>
`
```

#### カテゴリとタグ

- **カテゴリ**: `BLOG_CATEGORIES` で定義された値を使用（"技術", "開発", "デザイン", "学習", "Tips", "その他"）
- **タグ**: 自由に設定可能（配列形式）

### 注意事項

- **ブラウザ制限**: ブラウザ環境では直接ファイルシステムに書き込めないため、実際のファイル更新は手動で行う必要があります
- **本番環境**: 本番環境では、サーバーサイドの API を使用してファイル操作を行うことを推奨します
- **データ整合性**: データの変更時は、コンソールに表示される JSON データを `works-dynamic.ts` にコピーしてください
- **ブログデータ**: ブログ記事は静的データとして `blog.ts` に直接記述します。管理画面からの追加機能は現在未実装です

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
- ダークモード対応(今後)

## パフォーマンス最適化

- React.lazy()を使用したコンポーネントの遅延読み込み
- 画像の最適化
- バンドルサイズの最適化
- Web Vitals の監視

## 今後の改善予定

- [ ] サーバーサイド API の実装（ファイル自動保存）
- [ ] 多言語対応
- [ ] PWA 機能の追加
- [ ] パフォーマンスのさらなる最適化
- [ ] データベース連携（本格運用時）

## 必要素材

### Works ページ
  #### ① 画像（webp 形式）
  - **fullpage** : PC サイズ：w 1280(2560)px × h auto 　/　 SP サイズ：w 400(800)px × h auto）
    - 命名規則：`public/images/works/番号/fullpage/{ページ名}-{pc|sp}.png`（例：`top-pc.png`, `top-sp.png`）
  - **thumbnail(1枚)** : W 1280px × h 800px（8:5）
    - 命名規則：`public/images/works/番号/thumbnail.webp`
  - **pc（３枚）** : h 1280px × w 2800px
    - 命名規則：`public/images/works/番号/pc01.webp`, `pc02.webp`, `pc03.webp`
  - **mobile（３枚）** : XDで生成
    - 命名規則：`public/images/works/番号/mobile01.webp`, `mobile02.webp`, `mobile03.webp`
  - **wire** : W 1280px × h 720px
    - 命名規則：`public/images/works/番号/wire01.webp`, `wire02.webp`（複数枚ある場合は連番で増やす）

  ※画像１枚あたり 150KB 以下が理想（超高解像度でも 500KB 以内に抑える）

  #### ② 挙動確認用の動画
  - iMoveで拡張子をmov → mp4に変更
