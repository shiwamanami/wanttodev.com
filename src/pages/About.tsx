import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import Cta from "../components/Cta";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <main className="flex-1">
        <section className="container max-w-6xl py-24 sm:py-28 md:py-40">
          <h2>
            ABOUT
            <span>私について</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/80 backdrop-blur-sm p-8 md:p-12 rounded-lg mb-12 border border-gray-700">
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-800">M</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-4">
                  開発者・デザイナー
                </h3>
                <p className="text-lg text-gray-100">
                  Webアプリケーション開発とUI/UXデザインを専門としています
                </p>
              </div>

              <div className="space-y-6 text-gray-100">
                <div>
                  <h4 className="text-xl font-semibold text-yellow-300 mb-3">
                    経歴
                  </h4>
                  <ul className="space-y-2 ml-4">
                    <li>• フロントエンド開発（React, TypeScript, Next.js）</li>
                    <li>• バックエンド開発（Node.js, Python, Go）</li>
                    <li>• UI/UXデザイン（Figma, Adobe Creative Suite）</li>
                    <li>• モバイルアプリ開発（React Native, Flutter）</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-yellow-300 mb-3">
                    スキル
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-white mb-2">
                        フロントエンド
                      </h5>
                      <p className="text-sm text-gray-200">
                        React, Vue.js, TypeScript, Tailwind CSS, Next.js
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-white mb-2">
                        バックエンド
                      </h5>
                      <p className="text-sm text-gray-200">
                        Node.js, Python, Go, PostgreSQL, MongoDB
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-white mb-2">デザイン</h5>
                      <p className="text-sm text-gray-200">
                        Figma, Adobe XD, Photoshop, Illustrator
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-white mb-2">その他</h5>
                      <p className="text-sm text-gray-200">
                        Docker, AWS, Git, CI/CD
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-yellow-300 mb-3">
                    趣味・興味
                  </h4>
                  <p>
                    新しい技術の学習、オープンソースプロジェクトへの貢献、
                    写真撮影、読書、コーヒーを飲みながらのコーディングが好きです。
                    常にユーザー体験を向上させる方法を模索しています。
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-yellow-300 mb-3">
                    連絡先
                  </h4>
                  <p>
                    お仕事のご相談や技術的な質問がございましたら、
                    お気軽にお問い合わせください。
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link to="/">
                <Button variant="outline">TOPへ戻る</Button>
              </Link>
            </div>
          </div>
        </section>

        <Cta />
      </main>
    </div>
  );
}
