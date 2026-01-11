# ポートフォリオサイト

## 技術スタック

- **フロントエンド**: React 19.1.1, TypeScript 5.9.2
- **スタイリング**: Tailwind CSS 3.4.17
- **ルーティング**: React Router DOM 7.9.1
- **UI コンポーネント**: Radix UI
- **アイコン**: Lucide React
- **ビルドツール**: Create React App
- **テスト**: Jest, React Testing Library

## セットアップ手順

### 前提条件

- Node.js 16.0.0 以上
- npm または yarn

```bash
# 依存関係のインストール
npm install
```

### 開発環境の起動

```bash
# 開発サーバーの起動
npm start
```

## デプロイ

### デプロイ先

- **Netlify**: [https://wanttodev.com](https://wanttodev.com)

### デプロイ方法

```bash
# 本番用ビルドを作成
npm run build

# Netlify CLIを使用する場合
netlify deploy --prod
```

## データ管理システム

### ファイル構造

作品データは以下の 2 つのファイルで管理：

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
| **ブログデータ**   | `src/data/blog.ts`          | 技術ブログの記事データ（静的）今後改修予定   |

### ファイル監視と自動同期

#### 自動監視モード

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

## 利用可能なスクリプト

| コマンド        | 説明                                     |
| --------------- | ---------------------------------------- |
| `npm start`     | 開発サーバーを起動（ホットリロード対応） |
| `npm test`      | テストスイートを実行                     |
| `npm run build` | 本番用ビルドを作成                       |
| `npm run eject` | Create React App の設定をカスタマイズ    |

## 今後の改善予定

- [ ] ブログを動的に
- [ ] サーバーサイド API の実装（ファイル自動保存）
- [ ] 多言語対応
- [ ] PWA 機能の追加
- [ ] パフォーマンスのさらなる最適化
- [ ] DB連携

## 必要素材

### Works ページ
  #### ① 画像（webp 形式）
  - **fullpage** : PC サイズ：w 1280(2560)px × h auto 　/　 SP サイズ：w 400(800)px × h auto）
    - 命名規則：`public/images/works/番号/fullpage/{ページ名}-{pc|sp}.png`（例：`top-pc.png`, `top-sp.png`）
  - **thumbnail** : W 1280px × h 800px（8:5）
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
