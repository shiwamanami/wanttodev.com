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
wanttodev.com/
├── public/                    # 静的ファイル
│   ├── images/               # 画像ファイル
│   │   ├── blog/            # ブログ用画像
│   │   ├── logo/            # ロゴ・アイコン画像
│   │   └── works/           # 作品画像
│   ├── videos/              # 動画ファイル
│   ├── index.html           # HTMLテンプレート
│   └── ...                  # その他の静的ファイル
├── src/                      # ソースコード
│   ├── components/          # 再利用可能なReactコンポーネント
│   │   ├── blog/           # ブログ機能関連コンポーネント
│   │   │   ├── templates/  # ブログ記事テンプレート
│   │   │   │   ├── CaseStudyTemplate.tsx
│   │   │   │   ├── ComparisonTemplate.tsx
│   │   │   │   ├── GuideTemplate.tsx
│   │   │   │   ├── TechnicalTemplate.tsx
│   │   │   │   └── TemplateFactory.tsx
│   │   │   ├── BlogArticleLayout.tsx
│   │   │   ├── BlogHeader.tsx
│   │   │   ├── BlogList.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── CategoryList.tsx
│   │   │   ├── Date.tsx
│   │   │   ├── DynamicSections.tsx
│   │   │   ├── RandomArticles.tsx
│   │   │   ├── RelatedPost.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── TableOfContents.tsx
│   │   │   └── Tag.tsx
│   │   ├── BasicAuth.tsx    # 認証コンポーネント
│   │   ├── Button.tsx       # ボタンコンポーネント
│   │   ├── ColorPalette.tsx # カラーパレット
│   │   ├── ContactForm.tsx  # お問い合わせフォーム
│   │   ├── Cta.tsx          # CTAコンポーネント
│   │   ├── FadeInStagger.tsx # アニメーション
│   │   ├── FaqAccordion.tsx # FAQアコーディオン
│   │   ├── Footer.tsx       # フッター
│   │   ├── Header.tsx       # ヘッダー
│   │   ├── HeroSection.tsx  # ヒーローセクション
│   │   ├── ScrollToTop.tsx  # スクロールトップ
│   │   ├── SkillItem.tsx    # スキルアイテム
│   │   ├── VideoScrollAnimation.tsx # 動画スクロール
│   │   └── WorksSwiper.tsx  # 作品スワイパー
│   ├── pages/               # ページコンポーネント
│   │   ├── About.tsx        # 自己紹介ページ
│   │   ├── Admin.tsx        # 管理画面
│   │   ├── Blog.tsx         # ブログ一覧ページ
│   │   ├── BlogDetail.tsx   # ブログ詳細ページ
│   │   ├── Home.tsx         # トップページ
│   │   ├── PrivacyPolicy.tsx # プライバシーポリシー
│   │   ├── Works.tsx        # 作品紹介ページ
│   │   └── WorksDetail.tsx  # 作品詳細ページ
│   ├── data/                # データファイル
│   │   ├── blog.ts          # ブログ記事データ（静的）
│   │   ├── faq.ts           # FAQデータ（静的）
│   │   ├── main.ts          # メインデータ（静的）
│   │   ├── skills.ts        # スキルデータ（静的）
│   │   ├── works.ts         # 作品データ（静的・初期データ）
│   │   └── works-dynamic.json # 作品データ（動的・新規追加分）
│   ├── hooks/               # カスタムReactフック
│   │   ├── useAuth.ts       # 認証フック
│   │   ├── useDocumentTitle.ts # ドキュメントタイトル
│   │   ├── useSEO.ts        # SEOフック
│   │   └── useWorksData.ts  # 作品データ管理フック
│   ├── lib/                 # ユーティリティ関数
│   │   ├── fileUtils.ts     # ファイル操作ユーティリティ
│   │   └── utils.ts         # 汎用ユーティリティ
│   ├── scripts/             # データ移行スクリプト
│   │   └── migrateData.js   # ローカルストレージ→JSON移行用
│   ├── styles/              # スタイルファイル
│   │   ├── globals.css      # グローバルスタイル
│   │   └── tailwind.css     # Tailwind CSS
│   ├── config/              # 設定ファイル
│   │   └── routes.ts        # ルート設定
│   ├── App.tsx              # メインアプリケーション
│   ├── index.tsx            # エントリーポイント
│   ├── logo.svg             # ロゴファイル
│   └── ...                  # その他の設定ファイル
├── build/                   # ビルド出力ディレクトリ
├── node_modules/            # 依存関係
├── package.json             # プロジェクト設定
├── tailwind.config.js       # Tailwind設定
├── tsconfig.json            # TypeScript設定
└── README.md                # プロジェクト説明書
```

## 主な機能

- **レスポンシブデザイン**: モバイル・タブレット・デスクトップに対応
- **ブログ機能**: 動的なブログ記事表示とカテゴリ分類
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

## データ管理システム

### ファイル構造

作品データは以下の 2 つのファイルで管理されています：

```
src/data/
├── works.ts              # 初期データ（静的・変更不可）
└── works-dynamic.json    # 動的データ（管理画面で追加・編集可能）
```

### データの保存場所

| データ種別         | ファイル                      | 説明                             |
| ------------------ | ----------------------------- | -------------------------------- |
| **初期データ**     | `src/data/works.ts`           | プロジェクトに含まれる静的データ |
| **新規追加データ** | `src/data/works-dynamic.json` | 管理画面で追加された動的データ   |
| **フォールバック** | ブラウザローカルストレージ    | 一時的な保存場所                 |

### ファイル監視と自動同期

#### 自動監視モード（推奨）

```bash
npm run watch-works
```

- `src/data/works-dynamic.json`の変更を監視
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
2. works-dynamic.json への保存を試行
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

3. ダウンロードされた `works-dynamic.json` を `src/data/` フォルダに配置

### 注意事項

- **ブラウザ制限**: ブラウザ環境では直接ファイルシステムに書き込めないため、実際のファイル更新は手動で行う必要があります
- **本番環境**: 本番環境では、サーバーサイドの API を使用してファイル操作を行うことを推奨します
- **データ整合性**: データの変更時は、コンソールに表示される JSON データを `works-dynamic.json` にコピーしてください

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
- [ ] ブログ記事の CMS 連携
- [ ] 多言語対応
- [ ] PWA 機能の追加
- [ ] パフォーマンスのさらなる最適化
- [ ] データベース連携（本格運用時）

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 画像

- Works ページ
  fullpage キャプチャ：　 PC サイズ W:1280px / SP サイズ W:800px
  pc: h 1280px × w 2800px
  Thumbnail（16:9）：　 W:1280px × h:720px
  ※画像 1 枚あたり 150KB 以下が理想。超高解像度でも 500KB 以内に抑える。
