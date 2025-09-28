import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import Cta from "../components/Cta";
import SkillItem from "../components/SkillItem";
import { frontendSkills, backendSkills, designSkills, otherSkills } from "../data/skills";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <main className="flex-1">
        <section className="container max-w-6xl py-10 sm:py-20">
          <h2>
            ABOUT
            <span>私について</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-transparent backdrop-blur-sm p-8 md:p-20 mb-12 md:mb-20 border border-white/40">
              <div className="text-center mb-8 md:mb-20">
                <div className="w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-4xl md:text-5xl font-bold text-gray-800">
                    M
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary-500 mb-4">
                  開発者・デザイナー
                </h3>
                <p>
                「見た目の美しさ」と「使いやすさ」を両立させたWeb制作をモットーに、デザインから開発までワンストップで提供。
                ビジネス課題を理解し、成果につながるクリエイティブを提案します。
                </p>
              </div>

              <div className="space-y-6 md:space-y-20">
                <div>
                  <h4 className="text-xl text-primary-500 mb-3">
                    経歴
                  </h4>
                  <ul className="space-y-2 ml-4">
                    <li>• フロントエンド開発（React, TypeScript, Next.js）</li>
                    <li>• バックエンド開発（Node.js, Python, Go）</li>
                    <li>• UI/UXデザイン（Figma, Adobe Creative Suite）</li>
                    <li>• モバイルアプリ開発（React Native, Flutter）</li>
                  </ul>
                  <div>
                    <p>
                  2020年 – 現在
                    </p>
                    <p>
フリーランスWEBデザイナー／プログラマーとして活動<br/>
コーポレートサイト、ECサイト、LPなど多数のWeb制作案件を担当。<br/>
UI/UX設計からデザイン、フロントエンド実装（HTML/CSS/JavaScript/React）、バックエンド構築（AWS, Node.js）まで一貫して対応。<br/>
SEO・広告運用を意識した集客型サイトや、リアルタイム機能を持つWebアプリの開発など、マーケティングを考慮した制作を得意とする。
                    </p>
                  </div>

<div>
<p>2018年 – 2020年</p>
<p>
制作会社にてWebデザイナー／フロントエンドエンジニアとして勤務<br/>
大手企業やスタートアップのWebサイトリニューアル案件に参画。<br/>
デザインからコーディング、WordPress構築、保守運用まで幅広く担当。<br/>
デザインとエンジニアリングを両立したサイト改善で、クライアントのCV率向上を実現。
</p>
</div>

<div>
<p>2015年 – 2018年</p>
<p>
IT企業にてシステムエンジニアとして勤務<br/>
自社サービスの開発・保守を担当。<br/>
JavaScriptを中心にWebアプリケーションの設計・実装を経験し、開発効率化やUI改善を推進。<br/>
プログラミングスキルをベースに、デザイン領域へ興味を持ち独学でWebデザインを習得
</p>
</div>

                </div>

                <div>
                  <h4 className="text-xl text-primary-500 mb-3">
                    スキル
                  </h4>
                  <div className="space-y-6 md:space-y-20">
                    <div>
                      <h5 className="mb-4">
                        フロントエンド
                      </h5>
                      <div className="grid md:grid-cols-6 gap-5 space-y-3">
                        {frontendSkills.map((skill, index) => (
                          <SkillItem
                            key={index}
                            name={skill.name}
                            image={skill.image}
                            alt={skill.alt}
                            isSquare={skill.isSquare}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="mb-4">
                        バックエンド
                      </h5>
                      <div className="grid md:grid-cols-6 gap-5 space-y-3">
                        {backendSkills.map((skill, index) => (
                          <SkillItem
                            key={index}
                            name={skill.name}
                            image={skill.image}
                            alt={skill.alt}
                            isSquare={skill.isSquare}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="mb-4">デザイン</h5>
                      <div className="grid md:grid-cols-6 gap-5 space-y-3">
                        {designSkills.map((skill, index) => (
                          <SkillItem
                            key={index}
                            name={skill.name}
                            image={skill.image}
                            alt={skill.alt}
                            isSquare={skill.isSquare}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="mb-4">その他</h5>
                      <div className="grid md:grid-cols-6 gap-5 space-y-3">
                        {otherSkills.map((skill, index) => (
                          <SkillItem
                            key={index}
                            name={skill.name}
                            image={skill.image}
                            alt={skill.alt}
                            isSquare={skill.isSquare}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="mb-4">マーケティング・広告運用</h5>
                      Google Analytics / Google Tag Manager / Google Ads / Meta広告 (Facebook, Instagram) / Yahoo!広告 /
LINE広告 / Adobe Analytics / Looker Studio（データポータル）
- 広告効果測定、タグ設定、コンバージョン計測、レポーティングまで対応可能

                    </div>
                  </div>
                </div>


                <div>
                  <h4 className="text-xl text-primary-500 mb-3">
                    趣味・興味
                  </h4>
                  <p>
                    新しい技術の学習、個人開発、テックブログを読むこと、読書、カフェオレを飲みながらのコーディングが好きです。
                    常にユーザー体験を向上させる方法を模索しています。
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
