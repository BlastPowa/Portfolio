import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import SoundInit from '@/components/SoundInit';

export const metadata: Metadata = {
  title: 'Paul Adelabu Portfolio',
  description: 'Developer. Creator. Builder.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SoundInit />
          {children}
        </Providers>
      </body>
    </html>
  );
}
