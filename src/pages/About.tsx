import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { ContactForm } from "../components/ContactForm";
import { RecentBooks } from "../components/RecentBooks";
import { AboutSection } from "../components/AboutSection";
import { AboutSkillGroup } from "../components/AboutSkillGroup";
import { AboutSocialLinkButton } from "../components/AboutSocialLinkButton";
import {
  frontendSkills,
  backendSkills,
  designSkills,
  otherSkills,
  cmsSkills,
  ecSkills,
  marketingSkills,
} from "../data/skills";
import {
  careerData,
  hobbyDescription,
  socialLinks,
} from "../data/about";
import { useReiwaYear } from "../hooks/useReiwaYear";

export default function About() {
  const currentYear = new Date().getFullYear();
  const reiwaYear = useReiwaYear();

  const skillGroups = [
    { title: "フロントエンド", skills: frontendSkills },
    { title: "バックエンド", skills: backendSkills },
    { title: "デザイン", skills: designSkills },
    { title: "CMS", skills: cmsSkills },
    { title: "その他", skills: otherSkills },
    { title: "ECプラットフォーム", skills: ecSkills },
    { title: "マーケティング・広告運用", skills: marketingSkills },
  ];

  return (
    <div className="flex min-h-screen flex-col relative">
      <section className="container max-w-4xl py-10 sm:py-20">
        <h2>
          ABOUT
          <span>私について</span>
        </h2>

        <div className="mb-40 md:mb-60">
          <div className="space-y-20 md:space-y-40">
            <AboutSection title="Name" titleJa="名前">
              <h3 className="text-nowrap">
                Manami Shiwa
                <span className="block text-sm md:text-base text-gray-300">
                  志波 愛
                </span>
              </h3>
            </AboutSection>

            <AboutSection title="Career" titleJa="経歴">
              <div className="space-y-10 md:space-y-16">
                {careerData.map((career, index) => (
                  <div key={index}>
                    <h4 className="mb-3 md:mb-5">
                      {career.period === "2023年(令和5年) – 現在"
                        ? `2023年(令和5年) – ${currentYear}年(令和${reiwaYear}年) 現在`
                        : career.period}
                    </h4>
                    <p
                      className="whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: career.description }}
                    />
                  </div>
                ))}
              </div>
            </AboutSection>

            <AboutSection title="Skill" titleJa="スキル" className="text-nowrap">
              <div className="space-y-14 md:space-y-20">
                {skillGroups.map((group, index) => (
                  <AboutSkillGroup
                    key={index}
                    title={group.title}
                    skills={group.skills}
                  />
                ))}
              </div>
            </AboutSection>

            <AboutSection title="Links" titleJa="リンク">
              <div>
                <div className="flex flex-wrap gap-4 md:gap-6">
                  {socialLinks.map((link, index) => (
                    <AboutSocialLinkButton
                      key={index}
                      name={link.name}
                      url={link.url}
                      iconType={link.icon}
                    />
                  ))}
                </div>
              </div>
            </AboutSection>

            <AboutSection title="Hobby" titleJa="趣味">
              <p className="whitespace-pre-line">{hobbyDescription}</p>
            </AboutSection>

            <AboutSection title="Books" titleJa="最近読んだ本">
              <RecentBooks />
            </AboutSection>
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
