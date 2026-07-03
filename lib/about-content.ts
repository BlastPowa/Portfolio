export interface TimelineEntry {
  year: string;
  title: string;
  detail: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  url?: string;
  detail?: string;
}

export interface CvProject {
  title: string;
  tag: string;
  year: string;
  detail: string;
  githubUrl?: string;
}

export const DEFAULT_TIMELINE: TimelineEntry[] = [
  { year: '2026', title: 'Campus Quest', detail: 'Final-year project for indoor navigation and gamified campus wayfinding at TU Dublin.' },
  { year: '2026', title: 'Drift', detail: 'Released an AI tab tracker Chrome extension with re-entry briefs.' },
  { year: '2027', title: 'Graduation', detail: 'Completing TU Dublin BSc (Hons) Computing and launching the portfolio.' },
];

export const DEFAULT_SKILLS: SkillGroup[] = [
  { category: 'Languages', items: ['Python', 'Java', 'JavaScript', 'PHP', 'C#', 'HTML / CSS', 'HLSL', 'ShaderLab', 'Lua'] },
  { category: 'Web & Backend', items: ['Django', 'Symfony', 'Node.js', 'REST APIs', 'Server-Side Development', 'GUI Programming'] },
  { category: 'Databases', items: ['MongoDB', 'Supabase', 'MySQL', 'SQLite'] },
  { category: 'Cloud & Deploy', items: ['AWS S3', 'Railway', 'PythonAnywhere', 'Vercel'] },
  { category: 'Game Dev', items: ['Unity (C#)', 'Roblox / Lua', 'HLSL / ShaderLab', 'Blender'] },
  { category: 'AI & LLMs', items: ['ChatGPT / OpenAI', 'Gemini', 'Copilot', 'Codex', 'Prompt Engineering'] },
  { category: 'Design & Media', items: ['Figma', 'Canva', 'Photoshop', 'PIXLR', 'Premiere Pro', 'DaVinci Resolve', 'CapCut', 'Filmora'] },
  { category: 'Networking', items: ['WAN', 'LAN Switching', 'Wireless', 'IP Troubleshooting'] },
  { category: 'Hardware & OS', items: ['Device Diagnostics', 'OS Management', 'Arduino / Embedded Systems'] },
];

export const DEFAULT_CERTIFICATIONS: Certification[] = [
  { title: 'PHP & Symfony Web Development', issuer: 'SymfonyCasts', url: 'https://symfonycasts.com/certificates/844C932DEC49' },
  { title: 'Symfony API & Advanced Features', issuer: 'SymfonyCasts', url: 'https://symfonycasts.com/certificates/A3381F809C47' },
  { title: 'Symfony Security', issuer: 'SymfonyCasts', url: 'https://symfonycasts.com/certificates/D3ED4C19EC43' },
  { title: 'Game Tester — Where Winds Meet', issuer: 'Independent', detail: 'Played and evaluated an early build, logging bugs and gameplay feedback.' },
];

export const DEFAULT_CV_PROJECTS: CvProject[] = [
  { title: 'Campus Navigation Web App (Campus Quest)', tag: 'College Module', year: '2026', detail: 'Indoor navigation and gamification app for TU Dublin Blanchardstown.' },
  { title: 'Drift', tag: 'Personal', year: '2026', detail: 'AI-powered browser tab tracker with re-entry briefs.' },
  { title: 'Recruiting Web App with Auto CV Fill', tag: 'College Module', year: '2026', detail: 'Recruiting platform for hospitality venues with automatic CV parsing.', githubUrl: 'https://github.com/BlastPowa/WebFrameworkProject' },
  { title: 'E-Commerce Shopping Site', tag: 'College Module', year: '2025', detail: 'Online shop with product listings, cart, checkout, and order tracking.' },
  { title: 'Pandemic Virus Simulator', tag: 'College Module', year: '2025', detail: 'Multi-threaded simulation of virus spread across a global population.' },
  { title: 'Huffman Coding Binary Tree', tag: 'College Module', year: '2025', detail: 'Reference-based binary tree assigning Huffman bit codes per character.' },
  { title: 'Fast Food Ordering Website', tag: 'College Module', year: '2025', detail: 'Dynamic food ordering site with live menu, cart, and CRUD order handling.' },
  { title: 'Arduino Maze-Navigating Robot', tag: 'Personal', year: '2023–2024', detail: 'Programmed a robot to navigate a physical maze using rear-mounted sensors.' },
];

export function parseJsonSetting<T>(value: string | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}
