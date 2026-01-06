// ブログカテゴリの定数定義
export const BLOG_CATEGORIES = [
  "技術",
  "開発",
  "デザイン",
  "学習",
  "Tips",
  "その他",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

// 技術スタックの定数定義（works.tsから再利用）
export type Technology = string;

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  date: string; // YYYY-MM-DD
  category: BlogCategory[];
  tags: string[];
  excerpt: string; // 記事の抜粋
  content: string; // 記事本文（Markdown形式を想定）
  thumbnail?: string;
  technologies?: Technology[];
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// データバリデーション関数
export function validateBlogData(data: any): data is BlogPost {
  return (
    typeof data.id === "number" &&
    typeof data.title === "string" &&
    typeof data.slug === "string" &&
    typeof data.date === "string" &&
    Array.isArray(data.category) &&
    Array.isArray(data.tags) &&
    typeof data.excerpt === "string" &&
    typeof data.content === "string" &&
    typeof data.isPublished === "boolean"
  );
}

// サムネイルパスを自動生成する関数
export function generateBlogThumbnailPath(id: number): string {
  return `/images/blog/${id}/thumbnail.webp`;
}

// BlogPostオブジェクトにサムネイルパスを設定する関数
export function setBlogThumbnailPath(
  post: Omit<BlogPost, "thumbnail">
): BlogPost {
  return {
    ...post,
    thumbnail: generateBlogThumbnailPath(post.id),
  };
}

// 初期データ
export const blogData: BlogPost[] = [
  {
    id: 1,
    title: "セマンティックHTMLとARIA属性",
    slug: "html5-semantic-elements-accessibility",
    date: "2024-12-15",
    category: ["技術", "Tips"],
    tags: ["HTML5", "アクセシビリティ", "ARIA", "メモ"],
    excerpt: "セマンティック要素とARIA属性の組み合わせ方。フォームや動的コンテンツの実装パターン。",
    content: `
      <h2>セマンティック要素の階層構造</h2>
      <p>基本パターン。aria-labelledbyでセクションと見出しを紐付け。</p>
      
      <pre><code>&lt;article&gt;
  &lt;header&gt;
    &lt;h1&gt;記事タイトル&lt;/h1&gt;
    &lt;time datetime="2024-12-15"&gt;2024年12月15日&lt;/time&gt;
  &lt;/header&gt;
  &lt;section aria-labelledby="section1"&gt;
    &lt;h2 id="section1"&gt;セクション1&lt;/h2&gt;
    &lt;p&gt;コンテンツ...&lt;/p&gt;
  &lt;/section&gt;
  &lt;aside aria-label="関連情報"&gt;
    &lt;nav aria-label="関連記事"&gt;
      &lt;h3&gt;関連記事&lt;/h3&gt;
      &lt;ul&gt;
        &lt;li&gt;&lt;a href="#"&gt;記事1&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/nav&gt;
  &lt;/aside&gt;
&lt;/article&gt;</code></pre>

      <h2>ARIA属性の使い方</h2>
      <p>セマンティック要素だけでは足りない時にARIAで補完。role属性は必要最小限に。</p>

      <pre><code>&lt;nav aria-label="メインナビゲーション"&gt;
  &lt;ul role="menubar"&gt;
    &lt;li role="none"&gt;
      &lt;a href="/" role="menuitem" aria-current="page"&gt;ホーム&lt;/a&gt;
    &lt;/li&gt;
    &lt;li role="none"&gt;
      &lt;a href="/about" role="menuitem"&gt;About&lt;/a&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;

&lt;section aria-labelledby="features-heading" aria-describedby="features-desc"&gt;
  &lt;h2 id="features-heading"&gt;機能一覧&lt;/h2&gt;
  &lt;p id="features-desc"&gt;以下の機能をご利用いただけます&lt;/p&gt;
  &lt;ul role="list"&gt;
    &lt;li role="listitem"&gt;機能1&lt;/li&gt;
  &lt;/ul&gt;
&lt;/section&gt;</code></pre>

      <h2>ランドマーク要素</h2>
      <p>role属性で明示的にランドマークを指定。header/footer/main/asideにroleを付ける。</p>

      <pre><code>&lt;body&gt;
  &lt;header role="banner"&gt;
    &lt;nav aria-label="サイトナビゲーション"&gt;...&lt;/nav&gt;
  &lt;/header&gt;
  
  &lt;main role="main"&gt;
    &lt;article&gt;...&lt;/article&gt;
  &lt;/main&gt;
  
  &lt;aside role="complementary" aria-label="サイドバー"&gt;
    &lt;section aria-labelledby="related-heading"&gt;
      &lt;h2 id="related-heading"&gt;関連情報&lt;/h2&gt;
    &lt;/section&gt;
  &lt;/aside&gt;
  
  &lt;footer role="contentinfo"&gt;
    &lt;p&gt;© 2024 My Portfolio&lt;/p&gt;
  &lt;/footer&gt;
&lt;/body&gt;</code></pre>

      <h2>フォームの実装パターン</h2>
      <p>aria-describedbyでエラーとヒントを紐付け。aria-invalidで状態を管理。aria-live="polite"でエラー表示。</p>

      <pre><code>&lt;form aria-label="お問い合わせフォーム" novalidate&gt;
  &lt;fieldset&gt;
    &lt;legend&gt;お問い合わせ情報&lt;/legend&gt;
    
    &lt;div&gt;
      &lt;label for="name"&gt;お名前 &lt;span aria-label="必須"&gt;*&lt;/span&gt;&lt;/label&gt;
      &lt;input 
        type="text" 
        id="name" 
        name="name" 
        required 
        aria-required="true"
        aria-describedby="name-error name-hint"
        aria-invalid="false"
      &gt;
      &lt;span id="name-hint" class="hint"&gt;フルネームで入力してください&lt;/span&gt;
      &lt;span id="name-error" class="error" role="alert" aria-live="polite"&gt;&lt;/span&gt;
    &lt;/div&gt;
    
    &lt;div&gt;
      &lt;label for="email"&gt;メールアドレス &lt;span aria-label="必須"&gt;*&lt;/span&gt;&lt;/label&gt;
      &lt;input 
        type="email" 
        id="email" 
        name="email" 
        required 
        aria-required="true"
        aria-describedby="email-error"
        aria-invalid="false"
      &gt;
      &lt;span id="email-error" class="error" role="alert" aria-live="polite"&gt;&lt;/span&gt;
    &lt;/div&gt;
  &lt;/fieldset&gt;
  
  &lt;button type="submit"&gt;送信&lt;/button&gt;
&lt;/form&gt;</code></pre>

      <h2>ライブリージョン</h2>
      <p>動的更新にはaria-live。polite（通常）とassertive（緊急）。aria-atomicで全体/部分を指定。</p>

      <pre><code>&lt;div 
  id="notification" 
  role="status" 
  aria-live="polite" 
  aria-atomic="true"
  class="sr-only"
&gt;
  通知メッセージがここに表示されます
&lt;/div&gt;

&lt;div 
  id="error-message" 
  role="alert" 
  aria-live="assertive" 
  aria-atomic="true"
&gt;
  エラーメッセージ
&lt;/div&gt;

&lt;div 
  id="progress" 
  role="progressbar" 
  aria-valuenow="0" 
  aria-valuemin="0" 
  aria-valuemax="100"
  aria-label="読み込み進捗"
&gt;
  &lt;div style="width: 0%"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>

      <h2>メモ</h2>
      <ul>
        <li>セマンティック要素を優先、ARIAは補完的に</li>
        <li>aria-label vs aria-labelledby: labelは直接テキスト、labelledbyはID参照</li>
        <li>role属性は既存のセマンティック要素と重複しないように</li>
        <li>フォームのエラーはrole="alert" + aria-live="polite"</li>
      </ul>
    `,
    isPublished: true,
    technologies: ["HTML5", "ARIA", "WCAG"],
    createdAt: "2024-12-15T00:00:00Z",
    updatedAt: "2024-12-15T00:00:00Z",
  },
  {
    id: 2,
    title: "基本情報技術者試験の専門知識",
    slug: "fe-exam-specialized-knowledge",
    date: "2025-01-08",
    category: ["学習", "技術"],
    tags: ["基本情報技術者", "データベース", "アルゴリズム", "セキュリティ", "メモ"],
    excerpt: "基本情報技術者試験で出題される専門知識。データベース、アルゴリズム、セキュリティ、システム開発、プロジェクトマネジメントなどの重要ポイント。",
    content: `
      <h2>データベース</h2>
      <p>リレーショナルデータベースの基本概念。</p>

      <h3>正規化</h3>
      <ul>
        <li><strong>第1正規形（1NF）</strong>: 繰り返しグループを排除</li>
        <li><strong>第2正規形（2NF）</strong>: 部分関数従属を排除</li>
        <li><strong>第3正規形（3NF）</strong>: 推移的関数従属を排除</li>
        <li><strong>ボイス・コッド正規形（BCNF）</strong>: 決定子が候補キー</li>
      </ul>

      <h3>SQL</h3>
      <pre><code>-- SELECT（検索）
SELECT column1, column2 FROM table WHERE condition;

-- INSERT（挿入）
INSERT INTO table (column1, column2) VALUES (value1, value2);

-- UPDATE（更新）
UPDATE table SET column1 = value1 WHERE condition;

-- DELETE（削除）
DELETE FROM table WHERE condition;

-- JOIN（結合）
SELECT * FROM table1 INNER JOIN table2 ON table1.id = table2.id;
SELECT * FROM table1 LEFT JOIN table2 ON table1.id = table2.id;</code></pre>

      <h3>トランザクション</h3>
      <ul>
        <li><strong>ACID特性</strong>:
          <ul>
            <li>Atomicity（原子性）: すべて成功 or すべて失敗</li>
            <li>Consistency（一貫性）: データの整合性を保つ</li>
            <li>Isolation（独立性）: 他のトランザクションから分離</li>
            <li>Durability（永続性）: コミット後は永続化</li>
          </ul>
        </li>
        <li><strong>ロック</strong>: 排他制御（共有ロック、排他ロック）</li>
        <li><strong>デッドロック</strong>: 相互待ち状態（回避が必要）</li>
      </ul>

      <h2>アルゴリズムとデータ構造</h2>
      <p>基本的なアルゴリズムとデータ構造。</p>

      <h3>データ構造</h3>
      <ul>
        <li><strong>配列</strong>: 連続したメモリ領域、ランダムアクセス可能</li>
        <li><strong>連結リスト</strong>: ポインタで連結、挿入・削除が高速</li>
        <li><strong>スタック</strong>: LIFO（Last In First Out）</li>
        <li><strong>キュー</strong>: FIFO（First In First Out）</li>
        <li><strong>木構造</strong>: 階層的なデータ構造</li>
        <li><strong>ハッシュテーブル</strong>: キーから直接アクセス</li>
      </ul>

      <h3>探索アルゴリズム</h3>
      <ul>
        <li><strong>線形探索</strong>: O(n) - 順番に探索</li>
        <li><strong>二分探索</strong>: O(log n) - ソート済み配列を半分ずつ</li>
        <li><strong>ハッシュ探索</strong>: O(1) - ハッシュ値から直接アクセス</li>
      </ul>

      <h3>ソートアルゴリズム</h3>
      <ul>
        <li><strong>バブルソート</strong>: O(n²) - 隣同士を比較して交換</li>
        <li><strong>選択ソート</strong>: O(n²) - 最小値を選択して先頭へ</li>
        <li><strong>挿入ソート</strong>: O(n²) - 適切な位置に挿入</li>
        <li><strong>クイックソート</strong>: O(n log n) - ピボットで分割</li>
        <li><strong>マージソート</strong>: O(n log n) - 分割統治法</li>
        <li><strong>ヒープソート</strong>: O(n log n) - ヒープ構造を利用</li>
      </ul>

      <h2>セキュリティ</h2>
      <p>情報セキュリティの基本概念。</p>

      <h3>脅威と対策</h3>
      <ul>
        <li><strong>マルウェア</strong>: ウイルス、ワーム、トロイの木馬</li>
        <li><strong>DoS攻撃</strong>: サービス拒否攻撃</li>
        <li><strong>DDoS攻撃</strong>: 分散型DoS攻撃</li>
        <li><strong>SQLインジェクション</strong>: SQL文の注入攻撃</li>
        <li><strong>XSS（Cross-Site Scripting）</strong>: スクリプトの注入</li>
        <li><strong>CSRF（Cross-Site Request Forgery）</strong>: クロスサイトリクエストフォージェリ</li>
      </ul>

      <h3>暗号化</h3>
      <ul>
        <li><strong>共通鍵暗号方式</strong>: AES、DES（同じ鍵で暗号化・復号化）</li>
        <li><strong>公開鍵暗号方式</strong>: RSA（公開鍵と秘密鍵のペア）</li>
        <li><strong>ハッシュ関数</strong>: SHA-256、MD5（一方向関数）</li>
        <li><strong>デジタル署名</strong>: 改ざん検知、なりすまし防止</li>
      </ul>

      <h3>認証と認可</h3>
      <ul>
        <li><strong>認証（Authentication）</strong>: 本人確認（パスワード、生体認証）</li>
        <li><strong>認可（Authorization）</strong>: 権限確認（アクセス制御）</li>
        <li><strong>多要素認証（MFA）</strong>: 複数の認証要素を組み合わせ</li>
        <li><strong>OAuth</strong>: 認可フレームワーク</li>
      </ul>

      <h2>システム開発</h2>
      <p>ソフトウェア開発の手法とプロセス。</p>

      <h3>開発モデル</h3>
      <ul>
        <li><strong>ウォーターフォールモデル</strong>: 順次進行（要件定義→設計→実装→テスト）</li>
        <li><strong>スパイラルモデル</strong>: リスク分析を繰り返し</li>
        <li><strong>アジャイル開発</strong>: 反復的・漸進的開発（スクラム、XP）</li>
        <li><strong>プロトタイプモデル</strong>: 試作を繰り返し</li>
      </ul>

      <h3>設計手法</h3>
      <ul>
        <li><strong>構造化設計</strong>: トップダウン設計</li>
        <li><strong>オブジェクト指向設計</strong>: クラス、継承、カプセル化、ポリモーフィズム</li>
        <li><strong>UML</strong>: 統一モデリング言語（クラス図、シーケンス図など）</li>
      </ul>

      <h3>テスト</h3>
      <ul>
        <li><strong>単体テスト</strong>: 個々のモジュールをテスト</li>
        <li><strong>結合テスト</strong>: モジュール間の連携をテスト</li>
        <li><strong>システムテスト</strong>: システム全体をテスト</li>
        <li><strong>受け入れテスト</strong>: ユーザー要件を満たすか確認</li>
        <li><strong>ホワイトボックステスト</strong>: 内部構造に基づくテスト</li>
        <li><strong>ブラックボックステスト</strong>: 入出力に基づくテスト</li>
      </ul>

      <h2>プロジェクトマネジメント</h2>
      <p>プロジェクトの計画・実行・管理。</p>

      <h3>WBS（Work Breakdown Structure）</h3>
      <ul>
        <li>作業を階層的に分解</li>
        <li>タスクの洗い出しと見積もり</li>
      </ul>

      <h3>ガントチャート</h3>
      <ul>
        <li>スケジュールを視覚化</li>
        <li>タスクの開始・終了日を管理</li>
      </ul>

      <h3>PERT図</h3>
      <ul>
        <li>プロジェクトの依存関係を表現</li>
        <li>クリティカルパスを特定</li>
      </ul>

      <h2>システム構成</h2>
      <p>システムのアーキテクチャと構成。</p>

      <h3>クライアントサーバーシステム</h3>
      <ul>
        <li><strong>2層構成</strong>: クライアント + サーバー</li>
        <li><strong>3層構成</strong>: プレゼンテーション層 + アプリケーション層 + データ層</li>
        <li><strong>n層構成</strong>: 複数層に分割</li>
      </ul>

      <h3>クラスタリング</h3>
      <ul>
        <li><strong>アクティブ・スタンバイ</strong>: 1台が待機</li>
        <li><strong>アクティブ・アクティブ</strong>: 複数台で負荷分散</li>
      </ul>

      <h3>負荷分散</h3>
      <ul>
        <li><strong>ロードバランサー</strong>: リクエストを分散</li>
        <li><strong>ラウンドロビン</strong>: 順番に振り分け</li>
        <li><strong>最小接続数</strong>: 接続数が少ないサーバーに振り分け</li>
      </ul>

      <h2>システム監視と運用</h2>
      <p>システムの監視と運用管理。</p>

      <h3>監視項目</h3>
      <ul>
        <li><strong>CPU使用率</strong>: 処理能力の確認</li>
        <li><strong>メモリ使用率</strong>: メモリ不足の検知</li>
        <li><strong>ディスク使用率</strong>: 容量の確認</li>
        <li><strong>ネットワークトラフィック</strong>: 通信量の監視</li>
        <li><strong>レスポンスタイム</strong>: 応答時間の測定</li>
      </ul>

      <h3>ログ管理</h3>
      <ul>
        <li><strong>システムログ</strong>: OSやミドルウェアのログ</li>
        <li><strong>アプリケーションログ</strong>: アプリの動作ログ</li>
        <li><strong>アクセスログ</strong>: アクセス記録</li>
        <li><strong>エラーログ</strong>: エラー情報</li>
      </ul>

      <h2>メモ</h2>
      <ul>
        <li>データベースは正規化で冗長性を排除（1NF→2NF→3NF→BCNF）</li>
        <li>ACID特性でトランザクションの信頼性を保証</li>
        <li>アルゴリズムの計算量: O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²)</li>
        <li>セキュリティ: 機密性（Confidentiality）、完全性（Integrity）、可用性（Availability）</li>
        <li>SQLインジェクション対策: プリペアドステートメントを使用</li>
        <li>XSS対策: 入力値のエスケープ処理</li>
        <li>ウォーターフォールは計画重視、アジャイルは変化対応重視</li>
        <li>テストは単体→結合→システム→受け入れの順</li>
        <li>WBSで作業を分解、ガントチャートでスケジュール管理</li>
        <li>3層構成で保守性と拡張性を向上</li>
        <li>負荷分散で可用性とパフォーマンスを向上</li>
        <li>監視で障害を早期発見、ログで原因分析</li>
      </ul>
    `,
    isPublished: true,
    technologies: ["基本情報技術者", "データベース", "アルゴリズム", "セキュリティ"],
    createdAt: "2025-01-08T00:00:00Z",
    updatedAt: "2025-01-08T00:00:00Z",
  },
  {
    id: 3,
    title: "HTMLパフォーマンス最適化",
    slug: "html-performance-optimization-resource-hints",
    date: "2024-12-10",
    category: ["技術", "Tips"],
    tags: ["HTML", "パフォーマンス", "最適化", "メモ"],
    excerpt: "リソースヒント、画像最適化、フォント読み込みの実装パターン。",
    content: `
      <h2>リソースヒント</h2>
      <p>ブラウザにリソースの優先順位を指示。順番が重要。</p>

      <h3>DNS Prefetch</h3>
      <p>外部ドメインのDNS解決を事前に行う。Google FontsやAnalyticsなど。</p>
      <pre><code>&lt;link rel="dns-prefetch" href="https://fonts.googleapis.com"&gt;
&lt;link rel="dns-prefetch" href="https://www.google-analytics.com"&gt;</code></pre>

      <h3>Preconnect</h3>
      <p>DNS解決 + TCP接続 + TLSハンドシェイクを事前に行う。フォント読み込み前に必須。</p>

      <h3>Prefetch</h3>
      <p>次のページで使うリソースを事前に取得。低優先度でバックグラウンド実行。</p>

      <h3>Preload</h3>
      <p>現在のページで重要なリソースを優先読み込み。as属性でタイプ指定必須。</p>

      <h3>Prerender</h3>
      <p>次のページ全体を事前レンダリング。モバイルでは非推奨。</p>

      <h2>画像最適化</h2>
      <p>picture要素でWebP対応、srcsetで解像度対応。fallbackはimg要素で。</p>

      <h3>picture + srcset</h3>
      <pre><code>&lt;picture&gt;
  &lt;source 
    media="(min-width: 1200px)" 
    srcset="hero-large.webp 1x, hero-large@2x.webp 2x"
    type="image/webp"
  &gt;
  &lt;source 
    media="(min-width: 768px)" 
    srcset="hero-medium.webp 1x, hero-medium@2x.webp 2x"
    type="image/webp"
  &gt;
  &lt;source 
    srcset="hero-small.webp 1x, hero-small@2x.webp 2x"
    type="image/webp"
  &gt;
  &lt;img 
    src="hero-fallback.jpg" 
    alt="ヒーロー画像"
    loading="lazy"
    decoding="async"
    width="1920"
    height="1080"
  &gt;
&lt;/picture&gt;</code></pre>

      <h3>loading属性</h3>
      <p>lazy: ビューポートに入るまで遅延読み込み。eager: 即座に読み込み（デフォルト）。</p>
      <p>fetchpriority="high": 重要な画像を優先。width/heightでCLS防止。</p>

      <h2>フォント最適化</h2>
      <p>preconnect → preload → フォント読み込み。font-display: swapでFOIT回避。</p>

      <pre><code>&lt;link rel="preconnect" href="https://fonts.googleapis.com"&gt;
&lt;link rel="preconnect" href="https://fonts.gstatic.com" crossorigin&gt;
&lt;link 
  rel="preload" 
  href="/fonts/main.woff2" 
  as="font" 
  type="font/woff2" 
  crossorigin
&gt;
&lt;link 
  href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" 
  rel="stylesheet"
&gt;

&lt;style&gt;
  @font-face {
    font-family: 'CustomFont';
    src: url('/fonts/custom.woff2') format('woff2'),
         url('/fonts/custom.woff') format('woff');
    font-display: swap;
    font-weight: 400;
    font-style: normal;
  }
&lt;/style&gt;</code></pre>

      <h2>JavaScript最適化</h2>
      <p>defer: DOM解析後に実行。async: 非同期読み込み。type="module": ES modules。</p>

      <pre><code>&lt;!-- 重要なスクリプトは即座に読み込む --&gt;
&lt;script src="/js/critical.js" defer&gt;&lt;/script&gt;

&lt;!-- 非同期読み込み --&gt;
&lt;script src="/js/analytics.js" async&gt;&lt;/script&gt;

&lt;!-- モジュール形式 --&gt;
&lt;script type="module" src="/js/main.js"&gt;&lt;/script&gt;

&lt;!-- インラインスクリプトの最適化 --&gt;
&lt;script&gt;
  // インラインスクリプトは最小限に
  window.__INITIAL_STATE__ = { /* ... */ };
&lt;/script&gt;</code></pre>

      <h2>メタタグ</h2>
      <p>viewport必須。theme-colorでブラウザUI色指定。x-dns-prefetch-controlで制御。</p>

      <pre><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;

&lt;!-- テーマカラー --&gt;
&lt;meta name="theme-color" content="#000000"&gt;
&lt;meta name="msapplication-TileColor" content="#000000"&gt;

&lt;!-- DNS Prefetch --&gt;
&lt;meta http-equiv="x-dns-prefetch-control" content="on"&gt;</code></pre>

      <h2>Critical CSS</h2>
      <p>Above the foldのCSSを&lt;style&gt;でインライン化。残りはpreload + onloadで読み込み。</p>

      <pre><code>&lt;style&gt;
  /* Critical CSS */
  body { margin: 0; font-family: sans-serif; }
  .header { background: #000; color: #fff; }
  /* ... */
&lt;/style&gt;
&lt;link rel="preload" href="/css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'"&gt;
&lt;noscript&gt;&lt;link rel="stylesheet" href="/css/main.css"&gt;&lt;/noscript&gt;</code></pre>

      <h2>メモ</h2>
      <ul>
        <li>リソースヒントの順番: dns-prefetch → preconnect → preload</li>
        <li>画像はwidth/height必須（CLS対策）</li>
        <li>フォントはpreconnect + preload + font-display: swap</li>
        <li>Critical CSSはインライン、残りは非同期読み込み</li>
        <li>defer > async（実行順序が保証される）</li>
      </ul>
    `,
    isPublished: true,
    technologies: ["HTML5", "Performance", "Resource Hints"],
    createdAt: "2024-12-10T00:00:00Z",
    updatedAt: "2024-12-10T00:00:00Z",
  },
  {
    id: 4,
    title: "Web ComponentsとモダンAPI",
    slug: "modern-html-apis-web-components",
    date: "2024-12-05",
    category: ["技術", "開発"],
    tags: ["Web Components", "Custom Elements", "Shadow DOM", "メモ"],
    excerpt: "Custom Elements、Shadow DOM、Template要素の実装パターン。Observer APIの使い方。",
    content: `
      <h2>Template要素</h2>
      <p>HTMLテンプレートを定義。content.cloneNode(true)で複製して使用。</p>

      <pre><code>&lt;template id="card-template"&gt;
  &lt;div class="card"&gt;
    &lt;div class="card-header"&gt;
      &lt;h3 class="card-title"&gt;&lt;/h3&gt;
    &lt;/div&gt;
    &lt;div class="card-body"&gt;
      &lt;p class="card-content"&gt;&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="card-footer"&gt;
      &lt;button class="card-button"&gt;詳細を見る&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  const template = document.getElementById('card-template');
  const cardData = [
    { title: 'タイトル1', content: 'コンテンツ1' },
    { title: 'タイトル2', content: 'コンテンツ2' }
  ];

  cardData.forEach(data => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.card-title').textContent = data.title;
    clone.querySelector('.card-content').textContent = data.content;
    document.body.appendChild(clone);
  });
&lt;/script&gt;</code></pre>

      <h2>Custom Elements</h2>
      <p>独自のHTML要素を定義。ライフサイクルメソッドを実装。</p>

      <h3>基本パターン</h3>
      <p>observedAttributesで監視する属性を指定。attributeChangedCallbackで属性変更を検知。</p>
      <pre><code>&lt;script&gt;
  class CustomButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
      this.addEventListener('click', this.handleClick);
    }

    disconnectedCallback() {
      this.removeEventListener('click', this.handleClick);
    }

    static get observedAttributes() {
      return ['variant', 'disabled'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        this.render();
      }
    }

    handleClick = (e) => {
      if (this.hasAttribute('disabled')) {
        e.preventDefault();
        return;
      }
      this.dispatchEvent(new CustomEvent('custom-click', {
        detail: { timestamp: Date.now() },
        bubbles: true
      }));
    }

    render() {
      const variant = this.getAttribute('variant') || 'primary';
      const disabled = this.hasAttribute('disabled');
      
      this.shadowRoot.innerHTML = \`
        &lt;style&gt;
          :host {
            display: inline-block;
          }
          button {
            padding: 12px 24px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s;
          }
          button.primary {
            background: #007bff;
            color: white;
          }
          button.secondary {
            background: #6c757d;
            color: white;
          }
          button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        &lt;/style&gt;
        &lt;button class="\${variant}" \${disabled ? 'disabled' : ''}&gt;
          &lt;slot&gt;&lt;/slot&gt;
        &lt;/button&gt;
      \`;
    }
  }

  customElements.define('custom-button', CustomButton);
&lt;/script&gt;

&lt;custom-button variant="primary"&gt;クリック&lt;/custom-button&gt;
&lt;custom-button variant="secondary" disabled&gt;無効&lt;/custom-button&gt;</code></pre>

      <h2>Shadow DOM</h2>
      <p>スタイルとDOMのカプセル化。mode: 'open'（外部アクセス可）or 'closed'（不可）。</p>
      <p>:hostでホスト要素をスタイリング。slotでコンテンツ挿入。</p>

      <pre><code>&lt;script&gt;
  class ModalDialog extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
      this.setupEventListeners();
    }

    setupEventListeners() {
      this.shadowRoot.querySelector('.close-button')
        .addEventListener('click', () => this.close());
      
      this.shadowRoot.querySelector('.overlay')
        .addEventListener('click', (e) => {
          if (e.target === e.currentTarget) {
            this.close();
          }
        });
    }

    open() {
      this.setAttribute('open', '');
    }

    close() {
      this.removeAttribute('open');
      this.dispatchEvent(new CustomEvent('close'));
    }

    render() {
      this.shadowRoot.innerHTML = \`
        &lt;style&gt;
          :host {
            display: none;
          }
          :host([open]) {
            display: block;
          }
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
          .dialog {
            background: white;
            border-radius: 8px;
            padding: 24px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          }
          .close-button {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
          }
        &lt;/style&gt;
        &lt;div class="overlay"&gt;
          &lt;div class="dialog"&gt;
            &lt;div class="header"&gt;
              &lt;h2&gt;&lt;slot name="title"&gt;タイトル&lt;/slot&gt;&lt;/h2&gt;
              &lt;button class="close-button"&gt;×&lt;/button&gt;
            &lt;/div&gt;
            &lt;div class="content"&gt;
              &lt;slot&gt;&lt;/slot&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      \`;
    }
  }

  customElements.define('modal-dialog', ModalDialog);
&lt;/script&gt;

&lt;modal-dialog id="myModal"&gt;
  &lt;span slot="title"&gt;モーダルタイトル&lt;/span&gt;
  &lt;p&gt;モーダルのコンテンツです&lt;/p&gt;
&lt;/modal-dialog&gt;

&lt;button onclick="document.getElementById('myModal').open()"&gt;
  モーダルを開く
&lt;/button&gt;</code></pre>

      <h2>Observer API</h2>
      <p>要素の状態変化を監視。パフォーマンスに優れる。</p>

      <h3>Intersection Observer</h3>
      <p>要素の可視性を監視。lazy loadingやスクロールアニメーションに使用。</p>
      <pre><code>&lt;div class="lazy-image" data-src="image.jpg"&gt;&lt;/div&gt;

&lt;script&gt;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px'
  });

  document.querySelectorAll('.lazy-image').forEach(img => {
    observer.observe(img);
  });
&lt;/script&gt;</code></pre>

      <h3>Mutation Observer</h3>
      <p>DOMの変更を監視。childList（子要素）、attributes（属性）、subtree（子孫）を監視可能。</p>

      <h3>Resize Observer</h3>
      <p>要素のサイズ変更を監視。contentRectで幅・高さを取得。</p>

      <h2>メモ</h2>
      <ul>
        <li>Custom Elementsのライフサイクル: constructor → connectedCallback → attributeChangedCallback → disconnectedCallback</li>
        <li>Shadow DOMはスタイルのカプセル化に有効。ただし外部スタイルは適用されない</li>
        <li>Custom Eventsで親要素と通信。bubbles: trueでイベント伝播</li>
        <li>Slotで柔軟なコンテンツ挿入。name属性で名前付きスロット</li>
        <li>Intersection ObserverはrootMarginでマージン指定可能</li>
        <li>Mutation Observerは大量の変更には向かない（パフォーマンス注意）</li>
      </ul>
    `,
    isPublished: true,
    technologies: ["HTML5", "Web Components", "Custom Elements", "Shadow DOM"],
    createdAt: "2024-12-05T00:00:00Z",
    updatedAt: "2024-12-05T00:00:00Z",
  },
  {
    id: 5,
    title: "CSS GridとFlexboxの使い分け",
    slug: "css-grid-flexbox-usage",
    date: "2024-12-20",
    category: ["デザイン", "技術"],
    tags: ["CSS", "Grid", "Flexbox", "レイアウト", "メモ"],
    excerpt: "GridとFlexboxの使い分け方。1次元はFlexbox、2次元はGrid。実装パターンと注意点。",
    content: `
      <h2>基本方針</h2>
      <p>1次元レイアウト（横 or 縦）→ Flexbox。2次元レイアウト（横×縦）→ Grid。</p>

      <h2>Flexboxの使いどころ</h2>
      <ul>
        <li>ナビゲーションバー（横並び）</li>
        <li>カード内の要素配置（アイコン + テキスト）</li>
        <li>中央揃え（justify-content: center + align-items: center）</li>
        <li>要素間の均等配置（space-between, space-around）</li>
      </ul>

      <pre><code>.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}</code></pre>

      <h2>Gridの使いどころ</h2>
      <ul>
        <li>カードグリッド（複数行×複数列）</li>
        <li>複雑なレイアウト（ヘッダー、サイドバー、メイン、フッター）</li>
        <li>レスポンシブグリッド（auto-fit, minmax）</li>
        <li>要素の重なり（grid-area）</li>
      </ul>

      <pre><code>.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
}</code></pre>

      <h2>組み合わせパターン</h2>
      <p>Gridコンテナ内にFlexboxを使うのはOK。逆も可能。</p>

      <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}</code></pre>

      <h2>レスポンシブ対応</h2>
      <p>Flexbox: flex-wrapで折り返し。Grid: auto-fit/auto-fill + minmaxで自動調整。</p>

      <pre><code>/* Flexbox */
.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.flex-item {
  flex: 1 1 300px; /* min-width: 300px */
}

/* Grid */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}</code></pre>

      <h2>中央揃えの比較</h2>
      <p>Flexboxの方がシンプル。Gridはplace-items: centerでも可能。</p>

      <pre><code>/* Flexbox */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Grid */
.center {
  display: grid;
  place-items: center;
}</code></pre>

      <h2>メモ</h2>
      <ul>
        <li>Flexbox: コンテンツベース（要素のサイズに応じて調整）</li>
        <li>Grid: コンテナベース（コンテナのサイズでグリッド定義）</li>
        <li>gapプロパティは両方で使える（marginより便利）</li>
        <li>Gridのsubgridはまだブラウザ対応が限定的</li>
        <li>Flexboxのflex-basis vs Gridのminmax: 似てるけど挙動が違う</li>
        <li>Gridのgrid-template-rows: auto 1fr auto でSticky Footerが簡単</li>
        <li>Flexboxのflex: 1 は gridの1fr に相当</li>
      </ul>
    `,
    isPublished: true,
    technologies: ["CSS", "Grid", "Flexbox"],
    createdAt: "2024-12-20T00:00:00Z",
    updatedAt: "2024-12-20T00:00:00Z",
  },
  {
    id: 6,
    title: "Tailwind CSS上級テクニック",
    slug: "tailwind-css-advanced-techniques",
    date: "2024-12-25",
    category: ["技術", "Tips"],
    tags: ["Tailwind CSS", "CSS", "効率化", "メモ"],
    excerpt: "Tailwind CSSの上級テクニック。カスタムクラス、@apply、arbitrary values、レスポンシブ、ダークモードなどの実践的な使い方。",
    content: `
      <h2>カスタムクラスの作成</h2>
      <p>@applyで既存のユーティリティを組み合わせてカスタムクラスを作成。</p>

      <pre><code>/* globals.css */
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
}

.card {
  @apply bg-white rounded-lg shadow-md p-6;
}</code></pre>

      <h2>Arbitrary Values（任意の値）</h2>
      <p>角括弧で任意の値を指定。カスタム値や動的な値に便利。</p>

      <pre><code>&lt;div class="w-[500px]"&gt;固定幅&lt;/div&gt;
&lt;div class="bg-[#1da1f2]"&gt;カスタムカラー&lt;/div&gt;
&lt;div class="text-[14px]"&gt;カスタムフォントサイズ&lt;/div&gt;
&lt;div class="grid-cols-[200px_1fr_100px]"&gt;カスタムグリッド&lt;/div&gt;
&lt;div class="top-[117px]"&gt;カスタム位置&lt;/div&gt;</code></pre>

      <h2>レスポンシブブレークポイント</h2>
      <p>モバイルファースト。sm/md/lg/xl/2xlの順で上書き。</p>

      <pre><code>&lt;div class="
  text-sm
  sm:text-base
  md:text-lg
  lg:text-xl
  xl:text-2xl
"&gt;
  レスポンシブテキスト
&lt;/div&gt;

&lt;div class="
  grid grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
"&gt;
  レスポンシブグリッド
&lt;/div&gt;</code></pre>

      <h2>ダークモード</h2>
      <p>dark:プレフィックスでダークモード時のスタイルを指定。</p>

      <pre><code>&lt;div class="
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-white
"&gt;
  ダークモード対応
&lt;/div&gt;

/* tailwind.config.js */
module.exports = {
  darkMode: 'class', // 'media' or 'class'
}</code></pre>

      <h2>グループとピア</h2>
      <p>親要素の状態で子要素を制御。groupとpeerで実現。</p>

      <pre><code>&lt;!-- group: 親要素のホバーで子要素を制御 --&gt;
&lt;div class="group"&gt;
  &lt;div class="opacity-0 group-hover:opacity-100"&gt;
    ホバーで表示
  &lt;/div&gt;
&lt;/div&gt;

&lt;!-- peer: 兄弟要素の状態で制御 --&gt;
&lt;input type="checkbox" class="peer"&gt;
&lt;div class="hidden peer-checked:block"&gt;
  チェックで表示
&lt;/div&gt;</code></pre>

      <h2>カスタムユーティリティの拡張</h2>
      <p>tailwind.config.jsでカスタムクラスやプラグインを追加。</p>

      <pre><code>// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand': '#ff35ff',
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        },
      });
    },
  ],
}</code></pre>

      <h2>条件付きクラス</h2>
      <p>clsxやclassnamesライブラリで条件付きクラスを管理。</p>

      <pre><code>import clsx from 'clsx';

&lt;button className={clsx(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-500 text-white',
  !isActive && 'bg-gray-200 text-gray-700',
  disabled && 'opacity-50 cursor-not-allowed'
)}&gt;
  ボタン
&lt;/button&gt;

// または twMerge と組み合わせ
import { twMerge } from 'tailwind-merge';

const className = twMerge(
  'px-4 py-2',
  isActive ? 'bg-blue-500' : 'bg-gray-200'
);</code></pre>

      <h2>重要なショートカット</h2>
      <ul>
        <li><code>container</code>: コンテナクラス（max-width + center）</li>
        <li><code>sr-only</code>: スクリーンリーダー専用（視覚的に非表示）</li>
        <li><code>not-sr-only</code>: sr-onlyを解除</li>
        <li><code>aspect-ratio</code>: アスペクト比（aspect-square, aspect-videoなど）</li>
        <li><code>line-clamp-{n}</code>: テキストをn行で切り詰め</li>
        <li><code>backdrop-blur</code>: 背景をぼかし</li>
        <li><code>ring</code>: フォーカス時のリング（outlineの代替）</li>
      </ul>

      <h2>パフォーマンス最適化</h2>
      <p>PurgeCSSで未使用のクラスを削除。JITモードで必要なクラスのみ生成。</p>

      <pre><code>// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  // JITモード（デフォルト）
  mode: 'jit',
}</code></pre>

      <h2>カスタムプロパティとの連携</h2>
      <p>CSS変数と組み合わせて動的なスタイルを実現。</p>

      <pre><code>/* globals.css */
:root {
  --primary-color: #ff35ff;
}

/* tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
      },
    },
  },
}

/* 使用 */
&lt;div class="bg-primary"&gt;動的カラー&lt;/div&gt;</code></pre>

      <h2>アニメーション</h2>
      <p>transitionとanimateを組み合わせてスムーズなアニメーション。</p>

      <pre><code>&lt;div class="
  transition-all duration-300 ease-in-out
  hover:scale-110 hover:shadow-lg
"&gt;
  ホバーアニメーション
&lt;/div&gt;

&lt;div class="animate-spin"&gt;回転&lt;/div&gt;
&lt;div class="animate-pulse"&gt;パルス&lt;/div&gt;
&lt;div class="animate-bounce"&gt;バウンス&lt;/div&gt;</code></pre>

      <h2>メモ</h2>
      <ul>
        <li>@applyは最後の手段。可能な限りユーティリティクラスを直接使用</li>
        <li>arbitrary valuesは動的な値や一度きりの値に便利</li>
        <li>group/peerで複雑なインタラクションを実現</li>
        <li>dark:はclassモード推奨（JavaScriptで制御可能）</li>
        <li>line-clampでテキスト切り詰めが簡単（-webkit-line-clampのラッパー）</li>
        <li>ringはoutlineより柔軟（ring-offsetでオフセット可能）</li>
        <li>aspect-ratioでレスポンシブな画像比率を維持</li>
        <li>backdrop-blurでモーダルやオーバーレイの背景をぼかし</li>
        <li>containerはデフォルトでpadding付き。paddingなしはcontainer mx-auto</li>
        <li>JITモードで任意のクラス名も生成可能（例: w-[123px]）</li>
        <li>カスタムプラグインでプロジェクト固有のユーティリティを追加</li>
        <li>twMergeでクラスの競合を解決（同じプロパティの上書き）</li>
      </ul>
    `,
    isPublished: true,
    technologies: ["Tailwind CSS", "CSS"],
    createdAt: "2024-12-25T00:00:00Z",
    updatedAt: "2024-12-25T00:00:00Z",
  },
  {
    id: 7,
    title: "JavaScript基礎 - 変数とデータ型",
    slug: "javascript-basics-variables-data-types",
    date: "2024-12-28",
    category: ["学習", "技術"],
    tags: ["JavaScript", "基礎", "初心者", "メモ"],
    excerpt: "JavaScriptの変数宣言とデータ型の基本。let/const/varの違い、プリミティブ型と参照型、型変換の方法。",
    content: `
      <h2>変数宣言</h2>
      <p>let、const、varの使い分け。基本的にconstを優先、変更が必要な時だけlet。varは使わない。</p>

      <pre><code>// const: 再代入不可（推奨）
const name = 'John';
// name = 'Jane'; // エラー

// let: 再代入可能
let age = 25;
age = 26; // OK

// var: 古い書き方（使わない）
var old = 'avoid';</code></pre>

      <h2>データ型</h2>
      <p>プリミティブ型と参照型の違いを理解する。</p>

      <h3>プリミティブ型（値そのものを保持）</h3>
      <ul>
        <li><code>string</code>: 文字列（'hello', "world", \`template\`）</li>
        <li><code>number</code>: 数値（整数・小数・NaN・Infinity）</li>
        <li><code>boolean</code>: 真偽値（true, false）</li>
        <li><code>undefined</code>: 未定義</li>
        <li><code>null</code>: 空値</li>
        <li><code>symbol</code>: シンボル（一意の値）</li>
      </ul>

      <h3>参照型（メモリアドレスを保持）</h3>
      <ul>
        <li><code>object</code>: オブジェクト（配列、関数も含む）</li>
        <li><code>array</code>: 配列</li>
        <li><code>function</code>: 関数</li>
      </ul>

      <pre><code>// プリミティブ型（値のコピー）
let a = 10;
let b = a;
b = 20;
console.log(a); // 10（aは変わらない）

// 参照型（参照のコピー）
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2.push(4);
console.log(arr1); // [1, 2, 3, 4]（arr1も変わる）</code></pre>

      <h2>型チェック</h2>
      <p>typeof演算子で型を確認。ただしnullは'object'になるので注意。</p>

      <pre><code>typeof 'hello';        // 'string'
typeof 42;             // 'number'
typeof true;           // 'boolean'
typeof undefined;      // 'undefined'
typeof null;           // 'object'（バグ）
typeof [];             // 'object'
typeof {};             // 'object'
typeof function(){};   // 'function'

// 配列のチェック
Array.isArray([]);     // true
Array.isArray({});     // false</code></pre>

      <h2>型変換</h2>
      <p>明示的な型変換の方法。</p>

      <h3>文字列への変換</h3>
      <pre><code>String(123);        // '123'
(123).toString();   // '123'
123 + '';          // '123'（暗黙的変換）</code></pre>

      <h3>数値への変換</h3>
      <pre><code>Number('123');      // 123
parseInt('123px'); // 123（整数）
parseFloat('12.3'); // 12.3（小数）
+'123';            // 123（暗黙的変換）
'123' * 1;         // 123（暗黙的変換）</code></pre>

      <h3>真偽値への変換</h3>
      <pre><code>Boolean(1);         // true
Boolean(0);         // false
Boolean('');        // false
Boolean('hello');   // true
Boolean(null);      // false
Boolean(undefined); // false
!!value;            // 真偽値に変換（よく使う）</code></pre>

      <h2>テンプレートリテラル</h2>
      <p>バッククォートで文字列内に変数を埋め込む。</p>

      <pre><code>const name = 'John';
const age = 25;

// 通常の文字列連結
const message1 = 'My name is ' + name + ', I am ' + age;

// テンプレートリテラル（推奨）
const message2 = \`My name is \${name}, I am \${age}\`;

// 複数行も可能
const message3 = \`
  Hello,
  My name is \${name}
\`;</code></pre>

      <h2>メモ</h2>
      <ul>
        <li>constを優先、変更が必要な時だけlet</li>
        <li>プリミティブ型は値のコピー、参照型は参照のコピー</li>
        <li>typeof nullは'object'（JavaScriptのバグ）</li>
        <li>配列のチェックはArray.isArray()を使う</li>
        <li>型変換は明示的に行う（暗黙的変換は避ける）</li>
        <li>テンプレートリテラルで文字列連結を簡潔に</li>
        <li>undefinedとnullは別物（undefined: 未定義、null: 意図的な空値）</li>
        <li>NaNは数値ではない（Number.isNaN()でチェック）</li>
      </ul>
    `,
    isPublished: true,
    technologies: ["JavaScript"],
    createdAt: "2024-12-28T00:00:00Z",
    updatedAt: "2024-12-28T00:00:00Z",
  },
  {
    id: 8,
    title: "JavaScript基礎 - 関数と配列操作",
    slug: "javascript-basics-functions-arrays",
    date: "2024-12-28",
    category: ["学習", "技術"],
    tags: ["JavaScript", "基礎", "初心者", "メモ"],
    excerpt: "JavaScriptの関数の書き方と配列の操作方法。アロー関数、配列メソッド（map、filter、forEach）の使い方。",
    content: `
      <h2>関数の書き方</h2>
      <p>関数宣言、関数式、アロー関数の違い。</p>

      <h3>関数宣言</h3>
      <pre><code>function greet(name) {
  return \`Hello, \${name}!\`;
}

greet('John'); // 'Hello, John!'</code></pre>

      <h3>関数式</h3>
      <pre><code>const greet = function(name) {
  return \`Hello, \${name}!\`;
};</code></pre>

      <h3>アロー関数（推奨）</h3>
      <pre><code>// 基本形
const greet = (name) => {
  return \`Hello, \${name}!\`;
};

// 1行でreturnする場合、波括弧とreturnを省略可能
const greet = (name) => \`Hello, \${name}!\`;

// 引数が1つの場合、括弧も省略可能
const greet = name => \`Hello, \${name}!\`;

// 引数なし
const sayHello = () => 'Hello!';</code></pre>

      <h2>配列の基本操作</h2>
      <p>配列の作成、要素の追加・削除、アクセス方法。</p>

      <pre><code>// 配列の作成
const arr = [1, 2, 3];
const arr2 = new Array(1, 2, 3);

// 要素のアクセス
arr[0];        // 1（最初の要素）
arr[arr.length - 1]; // 3（最後の要素）

// 要素の追加
arr.push(4);        // 末尾に追加 [1, 2, 3, 4]
arr.unshift(0);     // 先頭に追加 [0, 1, 2, 3, 4]

// 要素の削除
arr.pop();          // 末尾を削除 [0, 1, 2, 3]
arr.shift();        // 先頭を削除 [1, 2, 3]

// 要素の検索
arr.indexOf(2);     // 1（インデックス）
arr.includes(2);     // true（存在確認）</code></pre>

      <h2>配列メソッド（よく使う）</h2>
      <p>配列を操作する便利なメソッド。</p>

      <h3>map: 各要素を変換</h3>
      <pre><code>const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
// [2, 4, 6]

const names = ['John', 'Jane'];
const greetings = names.map(name => \`Hello, \${name}!\`);
// ['Hello, John!', 'Hello, Jane!']</code></pre>

      <h3>filter: 条件に合う要素を抽出</h3>
      <pre><code>const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

const users = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 17 }
];
const adults = users.filter(user => user.age >= 18);
// [{ name: 'John', age: 25 }]</code></pre>

      <h3>forEach: 各要素に対して処理</h3>
      <pre><code>const numbers = [1, 2, 3];
numbers.forEach(n => {
  console.log(n);
});
// 1
// 2
// 3</code></pre>

      <h3>find: 条件に合う最初の要素を取得</h3>
      <pre><code>const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
];
const user = users.find(u => u.id === 2);
// { id: 2, name: 'Jane' }</code></pre>

      <h3>some: 条件に合う要素が1つでもあるか</h3>
      <pre><code>const numbers = [1, 2, 3];
numbers.some(n => n > 2); // true
numbers.some(n => n > 5); // false</code></pre>

      <h3>every: すべての要素が条件に合うか</h3>
      <pre><code>const numbers = [1, 2, 3];
numbers.every(n => n > 0); // true
numbers.every(n => n > 1); // false</code></pre>

      <h3>reduce: 配列を1つの値に集約</h3>
      <pre><code>const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 10

const words = ['hello', 'world'];
const sentence = words.reduce((acc, word) => acc + ' ' + word, '');
// ' hello world'</code></pre>

      <h2>スプレッド構文</h2>
      <p>配列やオブジェクトを展開する。</p>

      <pre><code>// 配列のコピー
const arr1 = [1, 2, 3];
const arr2 = [...arr1]; // [1, 2, 3]（新しい配列）

// 配列の結合
const arr3 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// 関数の引数に展開
const numbers = [1, 2, 3];
Math.max(...numbers); // 3

// オブジェクトのコピー
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1 }; // { a: 1, b: 2 }（新しいオブジェクト）</code></pre>

      <h2>分割代入</h2>
      <p>配列やオブジェクトから値を取り出す。</p>

      <pre><code>// 配列の分割代入
const [first, second, third] = [1, 2, 3];
console.log(first);  // 1
console.log(second); // 2

// 残りを取得
const [first, ...rest] = [1, 2, 3, 4];
console.log(rest); // [2, 3, 4]

// オブジェクトの分割代入
const user = { name: 'John', age: 25 };
const { name, age } = user;
console.log(name); // 'John'
console.log(age);  // 25

// 別名で取得
const { name: userName, age: userAge } = user;
console.log(userName); // 'John'</code></pre>

      <h2>メモ</h2>
      <ul>
        <li>アロー関数は簡潔で、thisの扱いも明確</li>
        <li>map: 変換して新しい配列を作成</li>
        <li>filter: 条件で抽出して新しい配列を作成</li>
        <li>forEach: 副作用（ログ出力など）に使用（新しい配列は作らない）</li>
        <li>find: 最初の1つだけ取得（複数はfilter）</li>
        <li>reduce: 集約処理（合計、最大値など）</li>
        <li>スプレッド構文で配列やオブジェクトをコピー</li>
        <li>分割代入でコードを簡潔に</li>
        <li>配列メソッドは元の配列を変更しない（破壊的メソッドに注意）</li>
        <li>push/pop/shift/unshiftは元の配列を変更する（破壊的）</li>
      </ul>
    `,
    isPublished: true,
    technologies: ["JavaScript"],
    createdAt: "2024-12-28T00:00:00Z",
    updatedAt: "2024-12-28T00:00:00Z",
  },
  {
    id: 9,
    title: "JavaScriptで作る簡単なアニメーション",
    slug: "javascript-simple-animations",
    date: "2024-12-30",
    category: ["技術", "Tips"],
    tags: ["JavaScript", "アニメーション", "CSS", "初心者", "メモ"],
    excerpt: "JavaScriptで実装できる簡単なアニメーション。フェードイン、スライド、スクロールアニメーションなどの実装方法。",
    content: `
      <h2>基本的なアプローチ</h2>
      <p>CSS transition/animationとJavaScriptを組み合わせる。CSSでアニメーション定義、JSで制御。</p>

      <h2>フェードインアニメーション</h2>
      <p>要素を徐々に表示する。</p>

      <h3>CSS + JavaScript</h3>
      <pre><code>/* CSS */
.fade-in {
  opacity: 0;
  transition: opacity 0.5s ease-in;
}

.fade-in.active {
  opacity: 1;
}

/* JavaScript */
const element = document.querySelector('.fade-in');
element.classList.add('active');</code></pre>

      <h3>JavaScriptのみ（requestAnimationFrame）</h3>
      <pre><code>function fadeIn(element, duration = 500) {
  let start = null;
  element.style.opacity = 0;
  element.style.display = 'block';

  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const opacity = Math.min(progress / duration, 1);
    
    element.style.opacity = opacity;

    if (progress < duration) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

fadeIn(document.querySelector('.element'));</code></pre>

      <h2>スライドアニメーション</h2>
      <p>要素を上下左右にスライドさせる。</p>

      <pre><code>/* CSS */
.slide-down {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.slide-down.active {
  max-height: 500px;
}

/* JavaScript */
const element = document.querySelector('.slide-down');
element.classList.add('active');</code></pre>

      <h2>スクロールアニメーション</h2>
      <p>スクロールで要素を表示する。</p>

      <pre><code>/* CSS */
.scroll-fade {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s, transform 0.6s;
}

.scroll-fade.visible {
  opacity: 1;
  transform: translateY(0);
}

/* JavaScript */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.scroll-fade').forEach(el => {
  observer.observe(el);
});</code></pre>

      <h2>ホバーアニメーション</h2>
      <p>マウスオーバーで要素を拡大・回転させる。</p>

      <pre><code>/* CSS */
.hover-scale {
  transition: transform 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.1);
}

.hover-rotate {
  transition: transform 0.3s ease;
}

.hover-rotate:hover {
  transform: rotate(5deg);
}</code></pre>

      <h2>カウントアップアニメーション</h2>
      <p>数値をカウントアップして表示する。</p>

      <pre><code>function countUp(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16); // 60fps想定

  function update() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }

  update();
}

countUp(document.querySelector('.counter'), 100);</code></pre>

      <h2>パララックス効果</h2>
      <p>スクロールに応じて要素を動かす。</p>

      <pre><code>window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.parallax');
  const speed = 0.5;
  
  parallax.style.transform = \`translateY(\${scrolled * speed}px)\`;
});</code></pre>

      <h2>タイピングアニメーション</h2>
      <p>文字を1文字ずつ表示する。</p>

      <pre><code>function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

typeWriter(document.querySelector('.typing'), 'Hello, World!');</code></pre>

      <h2>ローディングスピナー</h2>
      <p>回転するローディング表示。</p>

      <pre><code>/* CSS */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

/* JavaScript */
function showSpinner() {
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  document.body.appendChild(spinner);
}

function hideSpinner() {
  const spinner = document.querySelector('.spinner');
  if (spinner) spinner.remove();
}</code></pre>

      <h2>モーダルアニメーション</h2>
      <p>モーダルをフェードインで表示。</p>

      <pre><code>/* CSS */
.modal {
  display: none;
  opacity: 0;
  transition: opacity 0.3s;
}

.modal.active {
  display: block;
  opacity: 1;
}

.modal-content {
  transform: scale(0.8);
  transition: transform 0.3s;
}

.modal.active .modal-content {
  transform: scale(1);
}

/* JavaScript */
function openModal() {
  const modal = document.querySelector('.modal');
  modal.classList.add('active');
}

function closeModal() {
  const modal = document.querySelector('.modal');
  modal.classList.remove('active');
}</code></pre>

      <h2>requestAnimationFrameの使い方</h2>
      <p>スムーズなアニメーションのためのAPI。</p>

      <pre><code>function animate() {
  // アニメーション処理
  requestAnimationFrame(animate);
}

animate();

// 例: 要素を右に移動
let position = 0;
function moveRight() {
  position += 2;
  element.style.left = position + 'px';
  
  if (position < 500) {
    requestAnimationFrame(moveRight);
  }
}

moveRight();</code></pre>

      <h2>メモ</h2>
      <ul>
        <li>CSS transition/animationでできることはCSSで実装（パフォーマンス良い）</li>
        <li>JavaScriptは制御や動的な値に使用</li>
        <li>requestAnimationFrameでスムーズなアニメーション（60fps）</li>
        <li>setTimeout/setIntervalよりrequestAnimationFrameを優先</li>
        <li>IntersectionObserverでスクロールアニメーションが簡単</li>
        <li>transformとopacityはGPU加速される（パフォーマンス良い）</li>
        <li>width/height/left/topの変更は避ける（リフロー発生）</li>
        <li>will-changeプロパティで最適化のヒントを与える</li>
        <li>アニメーション終了時はイベントリスナーを削除（メモリリーク防止）</li>
        <li>prefers-reduced-motionでアニメーション無効化に対応</li>
      </ul>
    `,
    isPublished: true,
    technologies: ["JavaScript", "CSS"],
    createdAt: "2024-12-30T00:00:00Z",
    updatedAt: "2024-12-30T00:00:00Z",
  },
  {
    id: 10,
    title: "React基礎 - コンポーネントとProps",
    slug: "react-basics-components-props",
    date: "2025-01-02",
    category: ["学習", "技術"],
    tags: ["React", "基礎", "初心者", "メモ"],
    excerpt: "Reactの基本概念。コンポーネントの作り方、Propsの使い方、JSXの書き方。関数コンポーネントとクラスコンポーネントの違い。",
    content: `
      <h2>Reactとは</h2>
      <p>UIをコンポーネント単位で構築するライブラリ。再利用可能な部品を作って組み合わせる。</p>

      <h2>コンポーネントの基本</h2>
      <p>関数コンポーネントが主流。シンプルで書きやすい。</p>

      <h3>関数コンポーネント（推奨）</h3>
      <pre><code>function Welcome() {
  return &lt;h1&gt;Hello, World!&lt;/h1&gt;;
}

// アロー関数でもOK
const Welcome = () => {
  return &lt;h1&gt;Hello, World!&lt;/h1&gt;;
};

// 1行ならreturn省略可能
const Welcome = () => &lt;h1&gt;Hello, World!&lt;/h1&gt;;</code></pre>

      <h3>コンポーネントの使用</h3>
      <pre><code>function App() {
  return (
    &lt;div&gt;
      &lt;Welcome /&gt;
      &lt;Welcome /&gt;
    &lt;/div&gt;
  );
}</code></pre>

      <h2>JSXの基本ルール</h2>
      <p>JavaScriptの中にHTMLライクな構文を書ける。</p>

      <pre><code>// 1. 1つの要素を返す（複数はdivで囲む）
function App() {
  return (
    &lt;div&gt;
      &lt;h1&gt;Title&lt;/h1&gt;
      &lt;p&gt;Content&lt;/p&gt;
    &lt;/div&gt;
  );
}

// 2. フラグメントで囲む（div不要）
function App() {
  return (
    &lt;&gt;
      &lt;h1&gt;Title&lt;/h1&gt;
      &lt;p&gt;Content&lt;/p&gt;
    &lt;/&gt;
  );
}

// 3. クラス名はclassName
&lt;div className="container"&gt;Content&lt;/div&gt;

// 4. インラインスタイルはオブジェクト
&lt;div style={{ color: 'red', fontSize: '20px' }}&gt;Content&lt;/div&gt;

// 5. JavaScript式は{}で囲む
const name = 'John';
&lt;h1&gt;Hello, {name}!&lt;/h1&gt;

// 6. 条件分岐
{isLoggedIn ? &lt;p&gt;Welcome&lt;/p&gt; : &lt;p&gt;Please login&lt;/p&gt;}
{isLoggedIn && &lt;p&gt;Welcome&lt;/p&gt;}</code></pre>

      <h2>Props（プロパティ）</h2>
      <p>親コンポーネントから子コンポーネントにデータを渡す。</p>

      <pre><code>// 親コンポーネント
function App() {
  return &lt;Welcome name="John" age={25} /&gt;;
}

// 子コンポーネント
function Welcome(props) {
  return (
    &lt;div&gt;
      &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;
      &lt;p&gt;You are {props.age} years old.&lt;/p&gt;
    &lt;/div&gt;
  );
}

// 分割代入で簡潔に
function Welcome({ name, age }) {
  return (
    &lt;div&gt;
      &lt;h1&gt;Hello, {name}!&lt;/h1&gt;
      &lt;p&gt;You are {age} years old.&lt;/p&gt;
    &lt;/div&gt;
  );
}</code></pre>

      <h2>Propsのデフォルト値</h2>
      <p>Propsが渡されない場合のデフォルト値を設定。</p>

      <pre><code>function Welcome({ name = 'Guest', age = 0 }) {
  return &lt;h1&gt;Hello, {name}!&lt;/h1&gt;;
}

// または
Welcome.defaultProps = {
  name: 'Guest',
  age: 0
};</code></pre>

      <h2>子要素の受け取り</h2>
      <p>childrenで子要素を受け取る。</p>

      <pre><code>function Card({ children }) {
  return (
    &lt;div className="card"&gt;
      {children}
    &lt;/div&gt;
  );
}

// 使用
&lt;Card&gt;
  &lt;h2&gt;Title&lt;/h2&gt;
  &lt;p&gt;Content&lt;/p&gt;
&lt;/Card&gt;</code></pre>

      <h2>リストのレンダリング</h2>
      <p>配列をmapで変換して表示。keyプロパティは必須。</p>

      <pre><code>const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' }
];

function UserList() {
  return (
    &lt;ul&gt;
      {users.map(user => (
        &lt;li key={user.id}&gt;{user.name}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}</code></pre>

      <h2>イベントハンドリング</h2>
      <p>onClick、onChangeなどでイベントを処理。</p>

      <pre><code>function Button() {
  const handleClick = () => {
    alert('Clicked!');
  };

  return &lt;button onClick={handleClick}&gt;Click me&lt;/button&gt;;
}

// インラインでもOK
function Button() {
  return (
    &lt;button onClick={() => alert('Clicked!')}&gt;
      Click me
    &lt;/button&gt;
  );
}

// イベントオブジェクトを受け取る
function Input() {
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return &lt;input onChange={handleChange} /&gt;;
}</code></pre>

      <h2>条件付きレンダリング</h2>
      <p>条件に応じて表示を切り替える。</p>

      <pre><code>function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return &lt;h1&gt;Welcome back!&lt;/h1&gt;;
  }
  return &lt;h1&gt;Please sign in.&lt;/h1&gt;;
}

// 三項演算子
function Greeting({ isLoggedIn }) {
  return (
    &lt;div&gt;
      {isLoggedIn ? (
        &lt;h1&gt;Welcome back!&lt;/h1&gt;
      ) : (
        &lt;h1&gt;Please sign in.&lt;/h1&gt;
      )}
    &lt;/div&gt;
  );
}

// &&演算子（trueの場合のみ表示）
function Mailbox({ unreadMessages }) {
  return (
    &lt;div&gt;
      &lt;h1&gt;Hello!&lt;/h1&gt;
      {unreadMessages.length > 0 && (
        &lt;h2&gt;You have {unreadMessages.length} unread messages.&lt;/h2&gt;
      )}
    &lt;/div&gt;
  );
}</code></pre>

      <h2>メモ</h2>
      <ul>
        <li>関数コンポーネントが主流（クラスコンポーネントは古い）</li>
        <li>コンポーネント名は大文字で始める（小文字はHTMLタグと区別）</li>
        <li>Propsは読み取り専用（変更不可）</li>
        <li>keyはリストの各要素に一意の値を設定（パフォーマンスと再レンダリングのため）</li>
        <li>イベントハンドラーは関数を渡す（実行結果ではない）</li>
        <li>JSX内のJavaScript式は{}で囲む</li>
        <li>classNameでCSSクラスを指定（classは予約語）</li>
        <li>インラインスタイルはオブジェクト形式（キャメルケース）</li>
        <li>条件付きレンダリングは&&や三項演算子を活用</li>
        <li>childrenで柔軟なコンポーネント設計が可能</li>
      </ul>
    `,
    isPublished: true,
    technologies: ["React", "JavaScript"],
    createdAt: "2025-01-02T00:00:00Z",
    updatedAt: "2025-01-02T00:00:00Z",
  },
  {
    id: 11,
    title: "React基礎 - StateとHooks",
    slug: "react-basics-state-hooks",
    date: "2025-01-02",
    category: ["学習", "技術"],
    tags: ["React", "基礎", "初心者", "Hooks", "メモ"],
    excerpt: "ReactのState管理とHooks。useState、useEffect、カスタムフックの使い方。状態管理の基本パターン。",
    content: `
      <h2>State（状態）とは</h2>
      <p>コンポーネント内で変化するデータ。Stateが変わると再レンダリングされる。</p>

      <h2>useStateフック</h2>
      <p>関数コンポーネントでStateを管理する。</p>

      <pre><code>import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>

      <h3>useStateの基本</h3>
      <pre><code>// 初期値の設定
const [name, setName] = useState('John');
const [age, setAge] = useState(0);
const [items, setItems] = useState([]);
const [isActive, setIsActive] = useState(false);

// Stateの更新
setName('Jane');
setAge(25);
setItems([1, 2, 3]);
setIsActive(true);</code></pre>

      <h3>前の値を使った更新</h3>
      <pre><code>// 関数形式で前の値を使用
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  return &lt;button onClick={increment}&gt;{count}&lt;/button&gt;;
}</code></pre>

      <h2>オブジェクトのState</h2>
      <p>オブジェクトのStateを更新する時はスプレッド構文を使う。</p>

      <pre><code>function UserProfile() {
  const [user, setUser] = useState({
    name: 'John',
    age: 25,
    email: 'john@example.com'
  });

  const updateName = () => {
    setUser({
      ...user,
      name: 'Jane'
    });
  };

  return (
    &lt;div&gt;
      &lt;p&gt;Name: {user.name}&lt;/p&gt;
      &lt;button onClick={updateName}&gt;Update Name&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>

      <h2>配列のState</h2>
      <p>配列の追加・削除・更新方法。</p>

      <pre><code>function TodoList() {
  const [todos, setTodos] = useState([]);

  // 追加
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  // 削除
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 更新
  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  return (
    &lt;ul&gt;
      {todos.map(todo => (
        &lt;li key={todo.id}&gt;{todo.text}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}</code></pre>

      <h2>useEffectフック</h2>
      <p>副作用（API呼び出し、DOM操作など）を処理する。</p>

      <h3>基本的な使い方</h3>
      <pre><code>import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 毎回のレンダリング後に実行
  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

  return &lt;button onClick={() => setCount(count + 1)}&gt;{count}&lt;/button&gt;;
}</code></pre>

      <h3>依存配列で実行タイミングを制御</h3>
      <pre><code>// 初回レンダリング時のみ実行
useEffect(() => {
  console.log('Component mounted');
}, []); // 空配列

// countが変わった時だけ実行
useEffect(() => {
  console.log('Count changed:', count);
}, [count]); // countを依存配列に

// クリーンアップ関数（アンマウント時）
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);

  return () => {
    clearInterval(timer); // クリーンアップ
  };
}, []);</code></pre>

      <h2>よく使うHooks</h2>
      <p>その他の便利なHooks。</p>

      <h3>useRef: DOM要素への参照</h3>
      <pre><code>import { useRef } from 'react';

function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    &lt;&gt;
      &lt;input ref={inputRef} /&gt;
      &lt;button onClick={focusInput}&gt;Focus&lt;/button&gt;
    &lt;/&gt;
  );
}</code></pre>

      <h3>useContext: コンテキストの使用</h3>
      <pre><code>import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return &lt;button className={theme}&gt;Themed Button&lt;/button&gt;;
}</code></pre>

      <h2>カスタムフック</h2>
      <p>ロジックを再利用するためのカスタムフック。</p>

      <pre><code>// useCounter.js
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// 使用
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={increment}&gt;+&lt;/button&gt;
      &lt;button onClick={decrement}&gt;-&lt;/button&gt;
      &lt;button onClick={reset}&gt;Reset&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>

      <h2>フォームの処理</h2>
      <p>フォームのState管理。</p>

      <pre><code>function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input
        name="email"
        value={formData.email}
        onChange={handleChange}
      /&gt;
      &lt;input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      /&gt;
      &lt;button type="submit"&gt;Login&lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>

      <h2>メモ</h2>
      <ul>
        <li>useStateでStateを管理（初期値は引数で指定）</li>
        <li>Stateの更新は直接変更せず、setter関数を使う</li>
        <li>オブジェクト・配列の更新はスプレッド構文で新しいオブジェクト/配列を作成</li>
        <li>useEffectで副作用を処理（API呼び出し、イベントリスナーなど）</li>
        <li>依存配列でuseEffectの実行タイミングを制御</li>
        <li>クリーンアップ関数でメモリリークを防止</li>
        <li>useRefでDOM要素への参照を取得</li>
        <li>カスタムフックでロジックを再利用</li>
        <li>Hooksは関数コンポーネントのトップレベルで呼び出す（条件分岐の中では不可）</li>
        <li>Stateの更新は非同期（すぐに反映されない場合がある）</li>
        <li>複数のStateは別々のuseStateで管理（関連するものはオブジェクトにまとめる）</li>
      </ul>
    `,
    isPublished: true,
    technologies: ["React", "JavaScript"],
    createdAt: "2025-01-02T00:00:00Z",
    updatedAt: "2025-01-02T00:00:00Z",
  },
  {
    id: 12,
    title: "エンジニアが知っておくべきネットワーク基礎",
    slug: "network-fundamentals-for-engineers",
    date: "2025-01-05",
    category: ["技術", "学習"],
    tags: ["ネットワーク", "基礎", "HTTP", "TCP/IP", "メモ"],
    excerpt: "エンジニアが知っておくべきネットワークの基礎知識。OSI参照モデル、TCP/IP、HTTP、DNS、ポート番号などの基本概念。",
    content: `
      <h2>OSI参照モデル（7層）</h2>
      <p>ネットワーク通信を7つの層に分けて理解する。</p>

      <ul>
        <li><strong>7. アプリケーション層</strong>: HTTP、HTTPS、FTP、SMTP</li>
        <li><strong>6. プレゼンテーション層</strong>: データの変換・暗号化</li>
        <li><strong>5. セッション層</strong>: セッションの確立・維持</li>
        <li><strong>4. トランスポート層</strong>: TCP、UDP（データの信頼性保証）</li>
        <li><strong>3. ネットワーク層</strong>: IP（ルーティング）</li>
        <li><strong>2. データリンク層</strong>: イーサネット（同一ネットワーク内の通信）</li>
        <li><strong>1. 物理層</strong>: ケーブル、電波（物理的な伝送）</li>
      </ul>

      <h2>TCP/IPモデル（4層）</h2>
      <p>実用的な4層モデル。OSI参照モデルを簡略化。</p>

      <ul>
        <li><strong>アプリケーション層</strong>: HTTP、HTTPS、DNS、SMTP</li>
        <li><strong>トランスポート層</strong>: TCP、UDP</li>
        <li><strong>インターネット層</strong>: IP、ICMP</li>
        <li><strong>ネットワークインターフェース層</strong>: イーサネット、Wi-Fi</li>
      </ul>

      <h2>TCPとUDPの違い</h2>
      <p>トランスポート層の2つのプロトコル。</p>

      <h3>TCP（Transmission Control Protocol）</h3>
      <ul>
        <li>接続型（コネクション確立が必要）</li>
        <li>信頼性が高い（データの順序・到達を保証）</li>
        <li>速度は遅め</li>
        <li>用途: Web（HTTP/HTTPS）、メール（SMTP）、ファイル転送（FTP）</li>
      </ul>

      <h3>UDP（User Datagram Protocol）</h3>
      <ul>
        <li>非接続型（コネクション不要）</li>
        <li>信頼性は低い（データの到達保証なし）</li>
        <li>速度が速い</li>
        <li>用途: 動画配信、音声通話、DNS</li>
      </ul>

      <h2>HTTPとHTTPS</h2>
      <p>Web通信のプロトコル。</p>

      <h3>HTTP（HyperText Transfer Protocol）</h3>
      <ul>
        <li>ポート番号: 80</li>
        <li>暗号化なし（平文で通信）</li>
        <li>セキュリティが低い</li>
      </ul>

      <h3>HTTPS（HTTP Secure）</h3>
      <ul>
        <li>ポート番号: 443</li>
        <li>TLS/SSLで暗号化</li>
        <li>セキュリティが高い（認証・改ざん検知）</li>
        <li>現在はHTTPSが標準</li>
      </ul>

      <h2>HTTPメソッド</h2>
      <p>リクエストの種類を指定する。</p>

      <ul>
        <li><strong>GET</strong>: データの取得（読み取り専用）</li>
        <li><strong>POST</strong>: データの送信（新規作成）</li>
        <li><strong>PUT</strong>: データの更新（全体置換）</li>
        <li><strong>PATCH</strong>: データの部分更新</li>
        <li><strong>DELETE</strong>: データの削除</li>
        <li><strong>HEAD</strong>: ヘッダーのみ取得</li>
        <li><strong>OPTIONS</strong>: 許可されているメソッドを確認</li>
      </ul>

      <h2>HTTPステータスコード</h2>
      <p>レスポンスの結果を表す3桁の数字。</p>

      <h3>2xx: 成功</h3>
      <ul>
        <li><strong>200 OK</strong>: リクエスト成功</li>
        <li><strong>201 Created</strong>: リソース作成成功</li>
        <li><strong>204 No Content</strong>: 成功（レスポンスボディなし）</li>
      </ul>

      <h3>3xx: リダイレクト</h3>
      <ul>
        <li><strong>301 Moved Permanently</strong>: 恒久的な移動</li>
        <li><strong>302 Found</strong>: 一時的な移動</li>
        <li><strong>304 Not Modified</strong>: キャッシュ有効</li>
      </ul>

      <h3>4xx: クライアントエラー</h3>
      <ul>
        <li><strong>400 Bad Request</strong>: リクエストが不正</li>
        <li><strong>401 Unauthorized</strong>: 認証が必要</li>
        <li><strong>403 Forbidden</strong>: アクセス拒否</li>
        <li><strong>404 Not Found</strong>: リソースが見つからない</li>
        <li><strong>429 Too Many Requests</strong>: リクエスト過多</li>
      </ul>

      <h3>5xx: サーバーエラー</h3>
      <ul>
        <li><strong>500 Internal Server Error</strong>: サーバー内部エラー</li>
        <li><strong>502 Bad Gateway</strong>: ゲートウェイエラー</li>
        <li><strong>503 Service Unavailable</strong>: サービス利用不可</li>
        <li><strong>504 Gateway Timeout</strong>: ゲートウェイタイムアウト</li>
      </ul>

      <h2>IPアドレス</h2>
      <p>ネットワーク上の機器を識別するアドレス。</p>

      <h3>IPv4</h3>
      <ul>
        <li>32ビット（4オクテット）</li>
        <li>例: 192.168.1.1</li>
        <li>約43億個のアドレス（枯渇している）</li>
      </ul>

      <h3>IPv6</h3>
      <ul>
        <li>128ビット（16オクテット）</li>
        <li>例: 2001:0db8:85a3:0000:0000:8a2e:0370:7334</li>
        <li>ほぼ無限のアドレス</li>
      </ul>

      <h3>プライベートIPアドレス</h3>
      <ul>
        <li>10.0.0.0 ~ 10.255.255.255</li>
        <li>172.16.0.0 ~ 172.31.255.255</li>
        <li>192.168.0.0 ~ 192.168.255.255</li>
        <li>ローカルネットワーク内でのみ使用</li>
      </ul>

      <h2>ポート番号</h2>
      <p>アプリケーションを識別する番号（0〜65535）。</p>

      <h3>よく使うポート番号</h3>
      <ul>
        <li><strong>20, 21</strong>: FTP</li>
        <li><strong>22</strong>: SSH</li>
        <li><strong>25</strong>: SMTP（メール送信）</li>
        <li><strong>53</strong>: DNS</li>
        <li><strong>80</strong>: HTTP</li>
        <li><strong>443</strong>: HTTPS</li>
        <li><strong>3306</strong>: MySQL</li>
        <li><strong>5432</strong>: PostgreSQL</li>
        <li><strong>8080</strong>: HTTP（代替）</li>
      </ul>

      <h2>DNS（Domain Name System）</h2>
      <p>ドメイン名をIPアドレスに変換するシステム。</p>

      <pre><code>例: example.com → 93.184.216.34

1. ブラウザがDNSサーバーに問い合わせ
2. DNSサーバーがIPアドレスを返す
3. ブラウザがIPアドレスに接続</code></pre>

      <h2>URLの構造</h2>
      <p>Uniform Resource Locator（リソースの場所を表す）。</p>

      <pre><code>https://example.com:443/path/to/resource?query=value#fragment
│      │              │   │                  │            │
│      │              │   │                  │            └─ フラグメント
│      │              │   │                  └─ クエリパラメータ
│      │              │   └─ パス
│      │              └─ ポート番号（省略可）
│      └─ ドメイン名
└─ プロトコル</code></pre>

      <h2>CookieとSession</h2>
      <p>状態管理の仕組み。</p>

      <h3>Cookie</h3>
      <ul>
        <li>クライアント（ブラウザ）に保存</li>
        <li>HTTPヘッダーで送受信</li>
        <li>サイズ制限: 約4KB</li>
        <li>用途: セッション管理、ユーザー設定</li>
      </ul>

      <h3>Session</h3>
      <ul>
        <li>サーバー側に保存</li>
        <li>セッションIDをCookieで管理</li>
        <li>セキュリティが高い</li>
        <li>用途: ログイン状態の管理</li>
      </ul>

      <h2>CORS（Cross-Origin Resource Sharing）</h2>
      <p>異なるオリジン間でのリソース共有。</p>

      <h3>オリジン</h3>
      <ul>
        <li>プロトコル + ドメイン + ポート番号</li>
        <li>例: https://example.com:443</li>
      </ul>

      <h3>CORSエラー</h3>
      <ul>
        <li>ブラウザのセキュリティポリシー</li>
        <li>異なるオリジンからのリクエストを制限</li>
        <li>サーバー側でCORSヘッダーを設定して許可</li>
      </ul>

      <h2>メモ</h2>
      <ul>
        <li>TCPは信頼性重視、UDPは速度重視</li>
        <li>HTTPは80、HTTPSは443ポート</li>
        <li>GETは読み取り、POSTは作成、PUT/PATCHは更新、DELETEは削除</li>
        <li>ステータスコード: 2xx成功、3xxリダイレクト、4xxクライアントエラー、5xxサーバーエラー</li>
        <li>IPv4は32ビット、IPv6は128ビット</li>
        <li>プライベートIPはローカルネットワーク内のみ</li>
        <li>ポート番号でアプリケーションを識別</li>
        <li>DNSでドメイン名をIPアドレスに変換</li>
        <li>Cookieはクライアント、Sessionはサーバー側で管理</li>
        <li>CORSは異なるオリジン間の通信を制御</li>
        <li>HTTPSはTLS/SSLで暗号化（現在は標準）</li>
        <li>HTTP/2、HTTP/3でパフォーマンス向上</li>
      </ul>
    `,
    isPublished: true,
    technologies: ["ネットワーク", "HTTP", "TCP/IP"],
    createdAt: "2025-01-05T00:00:00Z",
    updatedAt: "2025-01-05T00:00:00Z",
  },
];

