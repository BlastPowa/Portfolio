'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import GradientText from './GradientText';

interface NavLink {
  label: string;
  href: string;
}

const LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'School', href: '/projects/school' },
  { label: 'Personal', href: '/projects/personal' },
  { label: 'Roblox', href: '/roblox' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(8,8,8,0.9)' : 'rgba(8,8,8,0)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '0.5px solid rgba(255,255,255,0.08)' : '0.5px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            padding: '20px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <GradientText
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 24,
              }}
            >
              BP
            </GradientText>
          </Link>

          <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    position: 'relative',
                    fontSize: 14,
                    color: active ? '#ffffff' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    fontFamily: 'var(--font-body)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#7dd3fc')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = active ? '#ffffff' : 'var(--text-secondary)')}
                >
                  {link.label}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: -6,
                        height: 2,
                        background: 'var(--grad-primary)',
                        borderRadius: 2,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <button
            className="nav-burger"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: 8,
            }}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(8,8,8,0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              zIndex: 200,
              display: 'flex',
              flexDirection: 'column',
              padding: 32,
            }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              style={{
                alignSelf: 'flex-end',
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                padding: 8,
              }}
            >
              <X size={28} />
            </button>
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 24,
                paddingLeft: 16,
              }}
            >
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 32,
                      fontWeight: 700,
                      color: '#ffffff',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.nav-links-desktop) { display: none !important; }
          :global(.nav-burger) { display: inline-flex !important; align-items: center; }
        }
      `}</style>
    </>
  );
}
