import { getServerSession } from 'next-auth';

export async function requireAuth() {
  const session = await getServerSession();
  return session;
}
