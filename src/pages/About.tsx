import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import SkillItem from "../components/SkillItem";
import {
  frontendSkills,
  backendSkills,
  designSkills,
  otherSkills,
  cmsSkills,
  ecSkills,
  marketingSkills,
} from "../data/skills";
import { ContactForm } from "../components/ContactForm";

export default function About() {
  // 令和年 = 西暦年 - 2018
  const currentYear = new Date().getFullYear();
  const reiwaYear = currentYear - 2018;

  return (
    <div className="flex min-h-screen flex-col relative">
      <section className="container max-w-4xl py-10 sm:py-20">
        <h2>
          ABOUT
          <span>私について</span>
        </h2>

        <div className="mb-40 md:mb-60">
          <div className="flex flex-col md:flex-row gap-8 md:gap-20 mb-20 md:mb-40">
            <div className="md:w-1/6">
              <div className="w-20 md:w-24 h-20 md:h-24 mx-auto mb-6 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-bold text-gray-800">
                  M
                </span>
              </div>
            </div>
            <div className="md:w-5/6">
              <h3 className="mb-5 md:mb-8">プログラマー / WEBデザイナー</h3>
              <p>
                「見た目の美しさ」と「使いやすさ」を両立させたWeb制作をモットーに、デザインから開発までワンストップでご提供。
                <br />
                ビジネス課題を理解し、成果につながるクリエイティブをご提案いたします。
              </p>
            </div>
          </div>

          <div className="space-y-20 md:space-y-40">
            <div className="flex flex-col md:flex-row gap-8 md:gap-20">
              <h3 className="md:w-1/6 text-primary-500 text-nowrap">
                Career
                <span className="block text-sm md:text-base text-gray-300">
                  経歴
                </span>
              </h3>
              <div className="md:w-5/6 space-y-10 md:space-y-16">
                <div>
                  <h4 className="mb-3 md:mb-5">
                    2023年(令和5年) – {new Date().getFullYear()}年(令和
                    {reiwaYear}年) 現在
                  </h4>

                  <p>
                    WEB制作会社にて<strong>プログラマー兼Webデザイナー</strong>
                    として、
                    <br />
                    コーポレートサイト、ECサイト、LPなど多様なWeb制作案件を多数担当。
                    <br />
                    UI/UX設計からデザイン、フロントエンド開発（HTML/CSS/JavaScript/React）、
                    <br /> バックエンド構築（PHP・AWS・Node.js）まで
                    <strong>ワンストップで実装</strong>。<br />
                    WordPress構築や保守運用、SEO対策、広告計測設定などマーケティング施策も手掛け、
                    <br /> デザインとエンジニアリングの両軸から
                    <strong>成果につながるサイト改善</strong>を実現。
                    <br />
                    クライアントのCV(コンバージョン)率向上や運用効率化に貢献。
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 md:mb-5">2022年(令和4年)</h4>
                  <p>
                    ゼロから独学でプログラミングを習得。
                    <br />
                    エンジニアリングの基盤を築いた後、ユーザー体験向上のためデザイン領域も独学で習得。
                    <br />
                    継続的な学習意欲と自己成長力で、技術とデザインの両軸で価値創造できるエンジニアとしての道を切り開く。
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-20 text-nowrap">
              <h3 className="md:w-1/6 text-primary-500 text-nowrap">
                Skill
                <span className="block text-sm md:text-base text-gray-300">
                  スキル
                </span>
              </h3>
              <div className="md:w-5/6 space-y-14 md:space-y-28">
                <div>
                  <h4 className="mb-4 md:mb-6">
                    <span className="border-b border-primary-500/50 pb-0.5">
                      フロントエンド
                    </span>
                  </h4>
                  <div className="flex flex-wrap gap-6 md:gap-8">
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
                  <h4 className="mb-4 md:mb-6">
                    <span className="border-b border-primary-500/50 pb-0.5">
                      バックエンド
                    </span>
                  </h4>
                  <div className="flex flex-wrap gap-6 md:gap-8">
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
                  <h4 className="mb-4 md:mb-6">
                    <span className="border-b border-primary-500/50 pb-0.5">
                      デザイン
                    </span>
                  </h4>
                  <div className="flex flex-wrap gap-6 md:gap-8">
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
                  <h4 className="mb-4 md:mb-6">
                    <span className="border-b border-primary-500/50 pb-0.5">
                      CMS
                    </span>
                  </h4>
                  <div className="flex flex-wrap gap-6 md:gap-8">
                    {cmsSkills.map((skill, index) => (
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
                  <h4 className="mb-4 md:mb-6">
                    <span className="border-b border-primary-500/50 pb-0.5">
                      その他
                    </span>
                  </h4>
                  <div className="flex flex-wrap gap-6 md:gap-8">
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
                  <h4 className="mb-4 md:mb-6">
                    <span className="border-b border-primary-500/50 pb-0.5">
                      ECプラットフォーム
                    </span>
                  </h4>
                  <div className="flex flex-wrap gap-6 md:gap-8">
                    {ecSkills.map((skill, index) => (
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
                  <h4 className="mb-4 md:mb-6">
                    <span className="border-b border-primary-500/50 pb-0.5">
                      マーケティング・広告運用
                    </span>
                  </h4>
                  <div className="flex flex-wrap gap-6 md:gap-8">
                    {marketingSkills.map((skill, index) => (
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
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-20">
              <h3 className="md:w-1/6 text-primary-500 text-nowrap">
                Hobby
                <span className="block text-sm md:text-base text-gray-300">
                  趣味
                </span>
              </h3>
              <div className="md:w-5/6">
                <p>
                  新しい技術の学習、個人開発、テックブログを読むこと、読書、カフェオレを飲みながらのコーディングが好きです。
                  <br />
                  常にユーザー体験を向上させる方法を模索しています。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-20 md:mb-40">
          <Link to="/">
            <Button variant="outline">Back to TOP</Button>
          </Link>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
