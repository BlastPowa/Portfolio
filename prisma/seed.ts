import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';

config({ path: '.env.local' });
config({ path: '.env' });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? '' });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in the environment (see .env.local) — no credentials are hardcoded in this file.');
  }

  const hash = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.deleteMany({ where: { username: { not: adminUsername } } });

  await prisma.adminUser.upsert({
    where: { username: adminUsername },
    update: { passwordHash: hash },
    create: { username: adminUsername, passwordHash: hash },
  });

  await prisma.project.upsert({
    where: { slug: 'campus-quest' },
    update: { year: 2026 },
    create: {
      title: 'Campus Quest',
      slug: 'campus-quest',
      category: 'school',
      description: 'An indoor navigation and gamification app for TUD built with React Native and MazeMap API.',
      techStack: '["React Native","MazeMap API","Node.js","PostgreSQL"]',
      year: 2026,
      semester: 'Semester 2',
      featured: true,
      orderIndex: 1,
    },
  });

  await prisma.project.upsert({
    where: { slug: 'drift' },
    update: {
      year: 2026,
      description: 'AI-powered productivity tool that passively tracks browser tab activity and generates re-entry briefs.',
      techStack: '["Next.js","TypeScript","Chrome Extension","Prisma","SQLite"]',
    },
    create: {
      title: 'Drift',
      slug: 'drift',
      category: 'personal',
      description: 'AI-powered productivity tool that passively tracks browser tab activity and generates re-entry briefs.',
      techStack: '["Next.js","TypeScript","Chrome Extension","Prisma","SQLite"]',
      year: 2026,
      featured: true,
      orderIndex: 1,
    },
  });

  await prisma.setting.upsert({
    where: { key: 'bio' },
    update: {},
    create: { key: 'bio', value: 'Developer. Creator. Builder. I make things that work and things that feel good.' },
  });

  await prisma.setting.upsert({
    where: { key: 'contact_email' },
    update: {},
    create: { key: 'contact_email', value: 'contact@blastpowa.dev' },
  });

  await prisma.setting.upsert({
    where: { key: 'github_url' },
    update: {},
    create: { key: 'github_url', value: 'https://github.com/BlastPowa' },
  });

  await prisma.setting.upsert({
    where: { key: 'youtube_url' },
    update: {},
    create: { key: 'youtube_url', value: '' },
  });

  await prisma.setting.upsert({
    where: { key: 'instagram_url' },
    update: {},
    create: { key: 'instagram_url', value: '' },
  });

  console.log('Seed complete');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
