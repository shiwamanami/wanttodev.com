// import { mainData } from "./main";

export type BlogLayout =
  | "default"
  | "comparison"
  | "guide"
  | "case-study"
  | "technical";

export type SectionConfig = {
  id: string;
  title: string;
  type: "text" | "image" | "video" | "table" | "list" | "custom";
  content?: any;
  props?: Record<string, any>;
};

export type Blog = {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string[];
  slug: string;
  isVisible: boolean;
  layout?: BlogLayout;
  sectionTitles?: string[];
  sections?: SectionConfig[];
  customComponents?: string[];
  showTableOfContents?: boolean;
  showRandomArticles?: boolean;
  showCategoryList?: boolean;
  showCta?: boolean;
  showBackToBlog?: boolean;
};

export const blogData: Blog[] = [
  {
    id: 1,
    slug: "nextjs-react-difference",
    title: "Next.jsとReactの違いとは？\n初心者でもわかる徹底比較ガイド",
    description:
      "Next.jsとReactの違いを初心者向けに詳しく解説。フレームワークとライブラリの違い、SSR・SSGの仕組み、パフォーマンス比較、選び方のポイントまで、開発者が知っておくべき知識を網羅的にご紹介します。",
    image: "/images/blog/nextjs-react-difference/fv.webp",
    date: "2025-01-15",
    category: ["ガイド", "Next.js", "React", "Web開発"],
    isVisible: true,
    layout: "guide",
    sectionTitles: [
      "はじめに",
      "Reactとは？",
      "Next.jsとは？",
      "ReactとNext.jsの基本的な違い",
      "機能比較：何ができるのか",
      "パフォーマンスの違い",
      "学習コストと開発効率",
      "SEO・検索エンジン最適化の違い",
      "デプロイと運用の違い",
      "どちらを選ぶべき？選び方のポイント",
      "まとめ",
    ],
    sections: [
      {
        id: "section01",
        title: "はじめに",
        type: "text",
        content: `
          <p>Web開発を始めようと思ったとき、<strong>React</strong>と<strong>Next.js</strong>という名前をよく目にしませんか？どちらもJavaScriptでWebアプリケーションを構築するための技術ですが、その違いがよくわからないという方も多いのではないでしょうか。</p>
          
          <p>この記事では、ReactとNext.jsの違いを初心者の方にもわかりやすく解説します。フレームワークとライブラリの違いから、実際の開発での使い分けまで、開発者が知っておくべき知識を網羅的にご紹介します。</p>
          
          <p>最後まで読んでいただければ、プロジェクトに最適な技術選択ができるようになります。ぜひ参考にしてください。</p>
        `,
      },
      {
        id: "section02",
        title: "Reactとは？",
        type: "text",
        content: `
          <h3>Reactの基本概念</h3>
          <p><strong>React</strong>は、Facebook（現Meta）が開発した<strong>JavaScriptライブラリ</strong>です。ユーザーインターフェース（UI）を構築するためのコンポーネントベースのライブラリとして、世界中の開発者に愛用されています。</p>
          
          <h3>Reactの主な特徴</h3>
          <ul>
            <li><strong>コンポーネントベース</strong>：再利用可能なUIパーツを作成</li>
            <li><strong>仮想DOM</strong>：パフォーマンスの最適化</li>
            <li><strong>JSX</strong>：JavaScript内でHTMLライクな記述が可能</li>
            <li><strong>単方向データフロー</strong>：データの流れが予測しやすい</li>
            <li><strong>豊富なエコシステム</strong>：多数のサードパーティライブラリ</li>
          </ul>
          
          <h3>Reactコンポーネントの例</h3>
          <p>以下は、Reactでコンポーネントを作成する基本的な例です：</p>
          
          <pre><code class="language-javascript">// React関数コンポーネントの例
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;h2&gt;カウンター: {count}&lt;/h2&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
        増やす
      &lt;/button&gt;
      &lt;button onClick={() =&gt; setCount(count - 1)}&gt;
        減らす
      &lt;/button&gt;
    &lt;/div&gt;
  );
}

export default Counter;</code></pre>
          
          <h3>Reactの役割</h3>
          <p>Reactは<strong>ライブラリ</strong>なので、UIの構築に特化しています。ルーティング、状態管理、API通信などの機能は、別途ライブラリを追加する必要があります。</p>
          
          <div style="background-color: #f8f9fa; padding: 16px; border-left: 4px solid #007bff; margin: 16px 0;">
            <p><strong>💡 ポイント</strong><br>
            Reactは「UIを構築するためのツール」であり、完全なWebアプリケーションを作るためには他のライブラリとの組み合わせが必要です。</p>
          </div>
        `,
      },
      {
        id: "section03",
        title: "Next.jsとは？",
        type: "text",
        content: `
          <h3>Next.jsの基本概念</h3>
          <p><strong>Next.js</strong>は、Vercelが開発した<strong>Reactベースのフレームワーク</strong>です。Reactアプリケーションをより簡単に、より高機能に構築するためのフルスタックフレームワークとして位置づけられています。</p>
          
          <h3>Next.jsの主な特徴</h3>
          <ul>
            <li><strong>サーバーサイドレンダリング（SSR）</strong>：サーバーでHTMLを生成</li>
            <li><strong>静的サイト生成（SSG）</strong>：ビルド時にHTMLを生成</li>
            <li><strong>ファイルベースルーティング</strong>：フォルダ構造でルートを定義</li>
            <li><strong>API Routes</strong>：バックエンドAPIを同じプロジェクト内で作成</li>
            <li><strong>自動最適化</strong>：画像、フォント、バンドルの自動最適化</li>
            <li><strong>TypeScriptサポート</strong>：最初からTypeScriptに対応</li>
          </ul>
          
          <h3>Next.jsページコンポーネントの例</h3>
          <p>以下は、Next.jsでページを作成する基本的な例です：</p>
          
          <pre><code class="language-javascript">// pages/about.js - Next.jsページコンポーネント
import Head from 'next/head';

export default function About() {
  return (
    &lt;&gt;
      &lt;Head&gt;
        &lt;title&gt;About - My Next.js App&lt;/title&gt;
        &lt;meta name="description" content="About page" /&gt;
      &lt;/Head&gt;
      &lt;div&gt;
        &lt;h1&gt;About Page&lt;/h1&gt;
        &lt;p&gt;これはNext.jsで作成されたページです。&lt;/p&gt;
      &lt;/div&gt;
    &lt;/&gt;
  );
}

// 静的生成（SSG）の例
export async function getStaticProps() {
  return {
    props: {
      data: 'Hello from getStaticProps'
    }
  };
}</code></pre>
          
          <h3>Next.js API Routesの例</h3>
          <p>Next.jsでは、同じプロジェクト内でAPIエンドポイントを作成できます：</p>
          
          <pre><code class="language-javascript">// pages/api/users.js - Next.js API Route
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ 
      users: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
      ]
    });
  } else if (req.method === 'POST') {
    const { name } = req.body;
    res.status(201).json({ 
      message: 'User created successfully',
      user: { id: Date.now(), name }
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(\`Method \${req.method} Not Allowed\`);
  }
}</code></pre>
          
          <h3>Next.jsの役割</h3>
          <p>Next.jsは<strong>フレームワーク</strong>なので、Webアプリケーション開発に必要な機能が一通り揃っています。Reactの上に構築されているため、Reactの機能もすべて使用できます。</p>
          
          <div style="background-color: #f8f9fa; padding: 16px; border-left: 4px solid #28a745; margin: 16px 0;">
            <p><strong>💡 ポイント</strong><br>
            Next.jsは「Reactアプリケーションを構築するためのフルスタックフレームワーク」で、開発に必要な機能が最初から統合されています。</p>
          </div>
        `,
      },
      {
        id: "section04",
        title: "ReactとNext.jsの基本的な違い",
        type: "text",
        content: `
          <h3>ライブラリ vs フレームワーク</h3>
          <p>最も大きな違いは、<strong>Reactがライブラリ</strong>で<strong>Next.jsがフレームワーク</strong>であることです。</p>
          
          <h4>React（ライブラリ）の特徴</h4>
          <ul>
            <li>UI構築に特化</li>
            <li>必要な機能を選択して追加</li>
            <li>柔軟性が高い</li>
            <li>学習コストが比較的低い</li>
          </ul>
          
          <h4>Next.js（フレームワーク）の特徴</h4>
          <ul>
            <li>Webアプリケーション開発に必要な機能が統合</li>
            <li>決められた構造に従って開発</li>
            <li>開発効率が高い</li>
            <li>最初から最適化されている</li>
          </ul>
          
          <h3>開発の流れの違い</h3>
          <p><strong>Reactでの開発</strong>では、ルーティング、状態管理、ビルド設定などを自分で設定する必要があります。一方、<strong>Next.jsでの開発</strong>では、これらの機能が最初から提供されているため、すぐに開発を始められます。</p>
          
          <h3>ファイル構造の違い</h3>
          <p>Reactでは自由なファイル構造を選択できますが、Next.jsでは<strong>pages</strong>フォルダや<strong>app</strong>フォルダ（App Router）など、決められた構造に従う必要があります。</p>
          
          <h4>Reactのファイル構造例</h4>
          <pre><code class="language-bash">src/
├── components/
│   ├── Header.js
│   ├── Footer.js
│   └── Button.js
├── pages/
│   ├── Home.js
│   └── About.js
├── App.js
└── index.js</code></pre>
          
          <h4>Next.jsのファイル構造例</h4>
          <pre><code class="language-bash">pages/
├── api/
│   └── users.js
├── about.js
├── contact.js
├── index.js
└── _app.js

# または App Router使用時
app/
├── api/
│   └── users/
│       └── route.js
├── about/
│   └── page.js
├── contact/
│   └── page.js
├── page.js
└── layout.js</code></pre>
        `,
      },
      {
        id: "section05",
        title: "機能比較：何ができるのか",
        type: "table",
        props: {
          rows: [
            ["機能", "React", "Next.js"],
            ["UI構築", "✅ 基本機能", "✅ Reactの機能を継承"],
            [
              "ルーティング",
              "❌ 別途ライブラリ必要",
              "✅ ファイルベースルーティング",
            ],
            [
              "SSR（サーバーサイドレンダリング）",
              "❌ 別途設定必要",
              "✅ 標準搭載",
            ],
            ["SSG（静的サイト生成）", "❌ 別途設定必要", "✅ 標準搭載"],
            ["API Routes", "❌ 別途バックエンド必要", "✅ 標準搭載"],
            ["画像最適化", "❌ 別途ライブラリ必要", "✅ 自動最適化"],
            ["フォント最適化", "❌ 別途設定必要", "✅ 自動最適化"],
            ["バンドル最適化", "❌ 別途設定必要", "✅ 自動最適化"],
            ["TypeScriptサポート", "❌ 別途設定必要", "✅ 標準搭載"],
            ["デプロイ", "❌ 別途設定必要", "✅ Vercelで簡単デプロイ"],
          ],
        },
        content: `
          <p>上記の表からもわかるように、Next.jsはReactの機能に加えて、Webアプリケーション開発に必要な機能が標準で搭載されています。</p>
        `,
      },
      {
        id: "section06",
        title: "パフォーマンスの違い",
        type: "text",
        content: `
          <h3>初期表示速度の違い</h3>
          <p><strong>React（SPA）</strong>では、最初にJavaScriptファイルをダウンロードしてから画面を描画するため、初期表示に時間がかかります。一方、<strong>Next.js（SSR/SSG）</strong>では、サーバーで事前にHTMLを生成するため、初期表示が高速です。</p>
          
          <h3>SEO（検索エンジン最適化）の違い</h3>
          <ul>
            <li><strong>React（SPA）</strong>：検索エンジンがコンテンツを正しく認識できない場合がある</li>
            <li><strong>Next.js（SSR/SSG）</strong>：サーバーで生成されたHTMLが検索エンジンに正しく認識される</li>
          </ul>
          
          <h3>Core Web Vitalsの違い</h3>
          <p>Googleが重要視するCore Web Vitals（LCP、FID、CLS）の観点から見ると：</p>
          
          <ul>
            <li><strong>LCP（Largest Contentful Paint）</strong>：Next.jsの方が優位</li>
            <li><strong>FID（First Input Delay）</strong>：Next.jsの方が優位</li>
            <li><strong>CLS（Cumulative Layout Shift）</strong>：Next.jsの方が優位</li>
          </ul>
          
          <h3>バンドルサイズの違い</h3>
          <p>Next.jsでは、<strong>自動コード分割</strong>により、必要なJavaScriptのみを読み込むため、バンドルサイズが最適化されます。Reactでは、手動でコード分割を実装する必要があります。</p>
        `,
      },
      {
        id: "section07",
        title: "学習コストと開発効率",
        type: "text",
        content: `
          <h3>学習コストの比較</h3>
          <p><strong>React</strong>は基本的な概念を理解すれば始められますが、実際のアプリケーション開発には多くの追加ライブラリの学習が必要です。一方、<strong>Next.js</strong>は最初から多くの機能が統合されているため、学習すべきことが多いですが、一度覚えれば効率的に開発できます。</p>
          
          <h3>開発効率の違い</h3>
          <ul>
            <li><strong>React</strong>：設定に時間がかかるが、柔軟性が高い</li>
            <li><strong>Next.js</strong>：設定が不要で、すぐに開発開始可能</li>
          </ul>
          
          <h3>チーム開発での違い</h3>
          <p><strong>React</strong>では、チームメンバーが異なるライブラリを選択する可能性があり、統一性を保つのが困難です。一方、<strong>Next.js</strong>では、フレームワークが統一されているため、チーム全体で同じ開発スタイルを維持できます。</p>
          
          <h3>エコシステムの違い</h3>
          <ul>
            <li><strong>React</strong>：豊富なサードパーティライブラリ、選択肢が多い</li>
            <li><strong>Next.js</strong>：統合された機能、一貫性がある</li>
          </ul>
        `,
      },
      {
        id: "section08",
        title: "SEO・検索エンジン最適化の違い",
        type: "text",
        content: `
          <h3>React（SPA）のSEO課題</h3>
          <p>Reactで構築されたSPA（Single Page Application）では、以下のSEO課題があります：</p>
          
          <ul>
            <li><strong>JavaScript依存</strong>：検索エンジンがJavaScriptを実行できない場合、コンテンツが認識されない</li>
            <li><strong>メタタグの動的更新</strong>：ページごとのメタタグ設定が複雑</li>
            <li><strong>ソーシャルメディア対応</strong>：OGタグの動的設定が困難</li>
          </ul>
          
          <h3>Next.js（SSR/SSG）のSEO優位性</h3>
          <p>Next.jsでは、以下のSEO優位性があります：</p>
          
          <ul>
            <li><strong>サーバーサイドレンダリング</strong>：検索エンジンがHTMLを直接認識</li>
            <li><strong>メタタグの簡単設定</strong>：Next.jsのHeadコンポーネントで簡単に設定</li>
            <li><strong>構造化データ対応</strong>：JSON-LDの簡単な実装</li>
            <li><strong>サイトマップ自動生成</strong>：sitemap.xmlの自動生成</li>
          </ul>
          
          <h3>実際のSEO効果</h3>
          <p>Next.jsを使用することで、検索エンジンでの表示順位向上や、ソーシャルメディアでの適切なプレビュー表示が期待できます。特に、コンテンツマーケティングやブログサイトでは、Next.jsのSEO優位性が顕著に現れます。</p>
        `,
      },
      {
        id: "section09",
        title: "デプロイと運用の違い",
        type: "text",
        content: `
          <h3>Reactのデプロイ</h3>
          <p>Reactアプリケーションのデプロイには、以下の手順が必要です：</p>
          
          <ul>
            <li><strong>ビルド設定</strong>：WebpackやViteなどの設定</li>
            <li><strong>静的ファイルのホスティング</strong>：Netlify、Vercel、AWS S3など</li>
            <li><strong>CDN設定</strong>：パフォーマンス向上のためのCDN設定</li>
            <li><strong>環境変数の管理</strong>：ビルド時とランタイムでの環境変数設定</li>
          </ul>
          
          <h3>Next.jsのデプロイ</h3>
          <p>Next.jsでは、特にVercelでのデプロイが非常に簡単です：</p>
          
          <ul>
            <li><strong>ワンクリックデプロイ</strong>：GitHubと連携して自動デプロイ</li>
            <li><strong>自動最適化</strong>：画像、フォント、バンドルの自動最適化</li>
            <li><strong>エッジ関数</strong>：サーバーレス関数の簡単な実装</li>
            <li><strong>プレビューデプロイ</strong>：プルリクエストごとのプレビュー環境</li>
          </ul>
          
          <h3>運用面での違い</h3>
          <ul>
            <li><strong>React</strong>：運用設定を自分で管理する必要がある</li>
            <li><strong>Next.js</strong>：フレームワークが最適化を自動で行う</li>
          </ul>
        `,
      },
      {
        id: "section10",
        title: "どちらを選ぶべき？選び方のポイント",
        type: "text",
        content: `
          <h3>Reactを選ぶべき場合</h3>
          <ul>
            <li><strong>学習目的</strong>：Reactの基本概念を理解したい</li>
            <li><strong>柔軟性重視</strong>：独自の設定やライブラリ選択をしたい</li>
            <li><strong>既存プロジェクト</strong>：既存のReactプロジェクトの拡張</li>
            <li><strong>特殊な要件</strong>：Next.jsでは対応できない特殊な要件がある</li>
            <li><strong>小規模プロジェクト</strong>：シンプルなSPAアプリケーション</li>
          </ul>
          
          <h3>Next.jsを選ぶべき場合</h3>
          <ul>
            <li><strong>本格的なWebアプリケーション</strong>：SEOやパフォーマンスが重要</li>
            <li><strong>開発効率重視</strong>：設定時間を短縮したい</li>
            <li><strong>チーム開発</strong>：統一された開発環境を構築したい</li>
            <li><strong>コンテンツサイト</strong>：ブログやコーポレートサイト</li>
            <li><strong>ECサイト</strong>：ショッピングサイトやマーケットプレイス</li>
          </ul>
          
          <h3>プロジェクト規模による選択</h3>
          <table>
            <tr>
              <th>プロジェクト規模</th>
              <th>推奨技術</th>
              <th>理由</th>
            </tr>
            <tr>
              <td>小規模（個人・学習）</td>
              <td>React</td>
              <td>シンプルで学習しやすい</td>
            </tr>
            <tr>
              <td>中規模（スタートアップ）</td>
              <td>Next.js</td>
              <td>開発効率とSEOが重要</td>
            </tr>
            <tr>
              <td>大規模（企業）</td>
              <td>Next.js</td>
              <td>チーム開発と保守性が重要</td>
            </tr>
          </table>
        `,
      },
      {
        id: "section11",
        title: "まとめ",
        type: "text",
        content: `
          <p>ReactとNext.jsの違いについて、詳しく解説してきました。両者は<strong>ライブラリとフレームワーク</strong>という根本的な違いがあり、それぞれに適した用途があります。</p>
          
          <h3>重要なポイント</h3>
          <ul>
            <li><strong>React</strong>：UI構築に特化したライブラリ、柔軟性が高い</li>
            <li><strong>Next.js</strong>：Reactベースのフルスタックフレームワーク、開発効率が高い</li>
            <li><strong>SEO</strong>：Next.jsの方が検索エンジン最適化に優れている</li>
            <li><strong>パフォーマンス</strong>：Next.jsの方が初期表示速度が速い</li>
            <li><strong>学習コスト</strong>：Reactは基本概念、Next.jsは統合機能の学習が必要</li>
          </ul>
          
          <h3>選択の指針</h3>
          <p>プロジェクトの要件、チームの経験、開発期間などを総合的に考慮して選択することが重要です。初心者の方は、まずReactで基本を学んでからNext.jsに進むことをお勧めします。</p>
          
          <p>どちらを選んでも、JavaScriptエコシステムの豊富なリソースを活用して、素晴らしいWebアプリケーションを構築できます。この記事が、あなたの技術選択の参考になれば幸いです。</p>
        `,
      },
    ],
    showTableOfContents: true,
    showRandomArticles: true,
    showCategoryList: true,
    showCta: true,
    showBackToBlog: true,
  },
];
