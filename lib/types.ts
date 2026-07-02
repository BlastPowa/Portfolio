export interface ProjectImage {
  id: string;
  projectId: string;
  url: string;
  alt: string;
  orderIndex: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  longDescription?: string | null;
  techStack: string;
  githubUrl?: string | null;
  liveUrl?: string | null;
  year: number;
  semester?: string | null;
  featured: boolean;
  orderIndex: number;
  images: ProjectImage[];
  createdAt: string;
  updatedAt: string;
}

export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  thumbnailUrl?: string | null;
  description?: string | null;
  playlist?: string | null;
  featured: boolean;
  orderIndex: number;
  createdAt: string;
}

export interface RobloxGame {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string | null;
  robloxUrl?: string | null;
  status: string;
  playerCount?: string | null;
  orderIndex: number;
}

export interface RobloxScript {
  id: string;
  title: string;
  category: string;
  description: string;
  codePreview?: string | null;
  imageUrl?: string | null;
  githubUrl?: string | null;
  language: string;
  orderIndex: number;
}

export type Settings = Record<string, string>;

export function gradientForCategory(category: string): string {
  switch (category) {
    case 'school':
      return 'var(--grad-school)';
    case 'personal':
      return 'var(--grad-personal)';
    case 'roblox':
      return 'var(--grad-roblox)';
    default:
      return 'var(--grad-primary)';
  }
}

export function parseTechStack(stack: string): string[] {
  try {
    const arr = JSON.parse(stack);
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}
