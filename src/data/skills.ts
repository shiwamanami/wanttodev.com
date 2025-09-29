export interface Skill {
  name: string;
  image: string;
  alt?: string;
  isSquare?: boolean;
}

export const frontendSkills: Skill[] = [
  { name: "HTML5", image: "html5.svg" },
  { name: "CSS", image: "css.svg" },
  { name: "Tailwind CSS", image: "tailwindcss-dark.svg", isSquare: false },
  { name: "Sass", image: "sass.png" },
  { name: "Bootstrap", image: "bootstrap.svg" },
  { name: "JavaScript", image: "javascript-badge.svg" },
  { name: "React", image: "react.svg" },
  { name: "TypeScript", image: "typescript-blue.svg", isSquare: false },
  { name: "Next.js", image: "nextjs-dark.svg", isSquare: false },
  { name: "Astro", image: "astro-dark.svg", isSquare: false },
  // { name: "Vue.js", image: "" },
];

export const backendSkills: Skill[] = [
  { name: "Node.js", image: "nodejs-dark.svg" },
  { name: "PHP", image: "php.svg" },
  { name: "Laravel", image: "laravel.svg", isSquare: false },
  { name: "MySQL", image: "mysql.png", isSquare: false },
  //   { name: "PostgreSQL", image: "" },
  //   { name: "MongoDB", image: "" },
];

export const designSkills: Skill[] = [
  { name: "Figma", image: "figma.svg", isSquare: false },
  { name: "Adobe XD", image: "" },
  { name: "Adobe Photoshop", image: "" },
  { name: "Adobe Illustrator", image: "" },
];

export const otherSkills: Skill[] = [
  { name: "GitHub", image: "github-dark.png" },
  { name: "microCMS", image: "microCMS_dark.svg", isSquare: false },
  { name: "Netlify", image: "netlify-dark.svg", isSquare: false },
  { name: "Vercel", image: "vercel-dark.svg", isSquare: false },
  //   { name: "Docker", image: "" },
  //   { name: "AWS", image: "" },
  //   { name: "CI/CD", image: "" },
];

export const cmsSkills: Skill[] = [
  { name: "WordPress", image: "WordPress-dark.png", isSquare: false },
];

export const ecSkills: Skill[] = [
  { name: "Shopify", image: "", isSquare: false },
  { name: "ecforce", image: "", isSquare: false },
  { name: "Bカート", image: "", isSquare: false },
  { name: "EBISUMART", image: "", isSquare: false },
  { name: "W2", image: "", isSquare: false },
  { name: "たまごリピート", image: "", isSquare: false },
];

export const marketingSkills: Skill[] = [
  { name: "Google Analytics", image: "", isSquare: false },
  { name: "Google Tag Manager", image: "", isSquare: false },
  { name: "Google Ads", image: "", isSquare: false },
  { name: "広告効果測定", image: "", isSquare: false },
  { name: "タグ設定", image: "", isSquare: false },
  { name: "コンバージョン計測", image: "", isSquare: false },
  { name: "レポーティング", image: "", isSquare: false },
];
