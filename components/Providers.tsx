'use client';

import { SessionProvider } from 'next-auth/react';
import CustomCursor from '@/components/CustomCursor';
import type { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <CustomCursor />
    </SessionProvider>
  );
}
