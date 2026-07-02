import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const attempts = new Map<string, { count: number; first: number }>();

function rateLimited(username: string): boolean {
  const now = Date.now();
  const key = username.toLowerCase();
  const entry = attempts.get(key);
  if (!entry || now - entry.first > WINDOW_MS) {
    attempts.set(key, { count: 1, first: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

function clearAttempts(username: string) {
  attempts.delete(username.toLowerCase());
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        if (rateLimited(credentials.username)) return null;

        const user = await prisma.adminUser.findUnique({
          where: { username: credentials.username },
        });

        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!valid) return null;

        clearAttempts(credentials.username);
        return { id: user.id, name: user.username };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/portal-d5b593f5c0/login' },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
