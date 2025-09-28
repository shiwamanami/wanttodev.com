export interface Skill {
  name: string;
  image: string;
  alt?: string;
  isSquare?: boolean;
}

export const frontendSkills: Skill[] = [
  { name: "React", image: "react.svg" },
  { name: "Vue.js", image: "" },
  { name: "TypeScript", image: "typescript-blue.svg", isSquare: false  },
  { name: "Tailwind CSS", image: "tailwindcss-light.svg", isSquare: false },
  { name: "Next.js", image: "nextjs-light.svg", isSquare: false },
  { name: "HTML5", image: "html5.svg" },
  { name: "CSS", image: "css.svg" },
  { name: "Sass", image: "sass.png" },
  { name: "Bootstrap", image: "bootstrap.svg" },
  { name: "JavaScript", image: "javascript.svg" },
];

export const backendSkills: Skill[] = [
  { name: "Node.js", image: "" },
  { name: "PHP", image: "php.svg" , isSquare: false },
  { name: "Laravel", image: "laravel.svg", isSquare: false  },
  { name: "MySQL", image: "mysql.png" },
  //   { name: "PostgreSQL", image: "" },
  //   { name: "MongoDB", image: "" },
];

export const designSkills: Skill[] = [
  { name: "Figma", image: "figma.svg" },
  { name: "Adobe XD", image: "" },
  { name: "Adobe Photoshop", image: "" },
  { name: "Adobe Illustrator", image: "" },
];

export const otherSkills: Skill[] = [
//   { name: "Docker", image: "" },
//   { name: "AWS", image: "" },
  { name: "Git", image: "" },
//   { name: "CI/CD", image: "" },
  { name: "microCMS", image: "microCMS_light.svg", isSquare: false },
  { name: "Netlify", image: "netlify-light.svg", isSquare: false },
  { name: "Vercel", image: "vercel-dark.svg", isSquare: false },
  { name: "Astro", image: "astro-light.svg", isSquare: false  },
];
