import React from "react";
import SkillItem from "./AboutSkillItem";
import { Skill } from "../data/skills";

interface AboutSkillGroupProps {
  title: string;
  skills: Skill[];
}

/**
 * Aboutページで使用するスキルグループを表示するコンポーネント
 */
export function AboutSkillGroup({ title, skills }: AboutSkillGroupProps) {
  return (
    <div>
      <h4 className="mb-4 md:mb-6">
        <span className="border border-primary-500/50 bg-black/60 p-1">{title}</span>
      </h4>
      <div className="flex flex-wrap gap-4 md:gap-6">
        {skills.map((skill, index) => (
          <SkillItem
            key={`${skill.name}-${index}`}
            name={skill.name}
            image={skill.image}
            alt={skill.alt}
            isSquare={skill.isSquare}
            years={skill.years}
          />
        ))}
      </div>
    </div>
  );
}

