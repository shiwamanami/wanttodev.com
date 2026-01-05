export interface Skill {
  name: string;
  image: string;
  alt?: string;
  isSquare?: boolean;
  years?: number | string; // 経験年数（数値の場合は「○年」、文字列の場合はそのまま表示）
}

export const frontendSkills: Skill[] = [
  { name: "HTML5", image: "html5.svg", years: 4 },
  { name: "CSS", image: "css.svg", years: 4 },
  { name: "Tailwind CSS", image: "tailwindcss-dark.svg", isSquare: false, years: 3 },
  { name: "Sass", image: "sass.png", years: 4 },
  { name: "Bootstrap", image: "bootstrap.svg", years: 4 },
  { name: "JavaScript", image: "javascript-badge.svg", years: 4 },
  { name: "React", image: "react.svg", years: 0.5 },
  { name: "TypeScript", image: "typescript-blue.svg", isSquare: false, years: "少しだけ" },
  { name: "Next.js", image: "nextjs-dark.svg", isSquare: false, years: "少しだけ" },
  { name: "Astro", image: "astro-dark.svg", isSquare: false, years: "少しだけ" },
];

export const backendSkills: Skill[] = [
  { name: "Node.js", image: "nodejs-dark.svg", years: 3 },
  { name: "PHP", image: "php.svg", years: 4 },
  { name: "MySQL", image: "mysql.png", isSquare: false, years: 4 },
];

export const designSkills: Skill[] = [
  { name: "Figma", image: "figma.svg", isSquare: false, years: 3 },
  { name: "Photoshop", image: "photoshop.svg", isSquare: false, years: 4 },
  { name: "Illustrator", image: "illustrator.svg", isSquare: false, years: 4 },
  { name: "Adobe XD", image: "adobe-xd.svg", isSquare: false, years: 4 },
];

export const cmsSkills: Skill[] = [
  { name: "WordPress", image: "WordPress-dark.png", isSquare: false, years: 4 },
];

export const otherSkills: Skill[] = [
  { name: "GitHub", image: "github-dark.png", years: 4 },
  { name: "microCMS", image: "microCMS_dark.svg", isSquare: false, years: 2 },
  { name: "Netlify", image: "netlify-dark.svg", isSquare: false, years: 2 },
  { name: "Vercel", image: "vercel-dark.svg", isSquare: false, years: 2 },
];

export const ecSkills: Skill[] = [
  { name: "Stripe", image: "", isSquare: false, years: 2 },
  { name: "ecforce", image: "", isSquare: false, years: 2 },
  { name: "EBISUMART", image: "", isSquare: false, years: 2 },
  { name: "Shopify", image: "", isSquare: false, years: 1 },
  { name: "Bカート", image: "", isSquare: false, years: 1 },
];

export const marketingSkills: Skill[] = [
  { name: "Google Analytics", image: "Google-Analytics.png", isSquare: false, years: 2 },
  {
    name: "Google Search Console",
    image: "Google-search-console.svg",
    isSquare: false,
    years: 2,
  },
  { name: "Google Ads", image: "Google-Ads.png", isSquare: false, years: 2 },
  { name: "Looker Studio", image: "", isSquare: false, years: 1 },
];
