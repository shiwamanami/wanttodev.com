import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import Cta from "../components/Cta";
import SkillItem from "../components/SkillItem";
import {
  frontendSkills,
  backendSkills,
  designSkills,
  otherSkills,
} from "../data/skills";

export default function About() {
  // 令和年 = 西暦年 - 2018
  const currentYear = new Date().getFullYear();
  const reiwaYear = currentYear - 2018;

  return (
    <div className="flex min-h-screen flex-col relative">
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
              <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">
                フロントエンドエンジニア/プログラマー/デザイナー
              </h3>
              <p>
                「見た目の美しさ」と「使いやすさ」を両立させたWeb制作をモットーに、デザインから開発までワンストップで提供。
                <br />
                ビジネス課題を理解し、成果につながるクリエイティブをご提案いたします。
              </p>
            </div>

            <div className="space-y-6 md:space-y-20">
              <div className="space-y-6 md:space-y-20">
                <h4 className="text-xl text-primary-500 mb-3">経歴</h4>
                <div>
                  <p className="font-bold mb-3">
                    2023年(令和5年) – {new Date().getFullYear()}年(令和
                    {reiwaYear}年) 現在
                  </p>
                  <p>
                    WEB制作会社にてWebデザイナー／フロントエンドエンジニアとして勤務
                    <br />
                    コーポレートサイト、ECサイト、LPなど多数のWeb制作案件を担当。
                    大手企業やスタートアップのWebサイトリニューアル案件に参画。
                    <br />
                    デザインからコーディング、WordPress構築、保守運用まで幅広く担当。
                    <br />
                    UI/UX設計からデザイン、フロントエンド実装（HTML/CSS/JavaScript/React）、バックエンド構築（AWS,
                    Node.js）まで一貫して対応。
                    <br />
                    SEO・広告運用を意識した集客型サイトや、リアルタイム機能を持つWebアプリの開発など、マーケティングを考慮した制作を得意とする。
                    デザインとエンジニアリングを両立したサイト改善で、クライアントのCV率向上を実現。
                  </p>
                </div>

                <div>
                  <p className="font-bold mb-3">2022年(令和4年)</p>
                  <p>
                    独学でプログラミングを習得
                    <br />
                    プログラミングスキルをベースに、デザイン領域へ興味を持ち独学でWebデザインを習得
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xl text-primary-500 mb-3">スキル</h4>
                <div className="space-y-6 md:space-y-20">
                  <div>
                    <h5 className="mb-4">フロントエンド</h5>
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
                    <h5 className="mb-4">バックエンド</h5>
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
                    Google Analytics / Google Tag Manager / Google Ads /
                    Meta広告 (Facebook, Instagram) / Yahoo!広告 / LINE広告 /
                    Adobe Analytics / Looker Studio（データポータル） -
                    広告効果測定、タグ設定、コンバージョン計測、レポーティングまで対応可能
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl text-primary-500 mb-3">趣味・興味</h4>
                <p>
                  新しい技術の学習、個人開発、テックブログを読むこと、読書、カフェオレを飲みながらのコーディングが好きです。
                  <br />
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
    </div>
  );
}
