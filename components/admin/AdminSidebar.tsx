'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  FolderOpen,
  Film,
  Gamepad2,
  MessageSquare,
  Settings,
  LogOut,
} from 'lucide-react';
import GradientText from '@/components/GradientText';

interface NavItem {
  label: string;
  href: string;
  Icon: React.ComponentType<{ size?: number }>;
}

const ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/admin', Icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', Icon: FolderOpen },
  { label: 'Videos', href: '/admin/videos', Icon: Film },
  { label: 'Roblox', href: '/admin/roblox', Icon: Gamepad2 },
  { label: 'Comments', href: '/admin/comments', Icon: MessageSquare },
  { label: 'Settings', href: '/admin/settings', Icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-top">
        <Link href="/admin" style={{ textDecoration: 'none' }}>
          <GradientText
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            BP Admin
          </GradientText>
        </Link>
      </div>

      <nav className="admin-sidebar-nav">
        {ITEMS.map((item) => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-link ${active ? 'active' : ''}`}
            >
              <item.Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar-bottom">
        <button
          onClick={() => void signOut({ callbackUrl: '/admin/login' })}
          className="admin-nav-link"
          style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
        >
          <LogOut size={18} />
          <span>Sign out</span>
        </button>
      </div>

      <style jsx>{`
        .admin-sidebar {
          background: #0d0d0d;
          border-right: 0.5px solid rgba(255,255,255,0.06);
          width: 260px;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          padding: 24px;
          display: flex;
          flex-direction: column;
          z-index: 50;
        }
        .admin-sidebar-top {
          padding-bottom: 24px;
          border-bottom: 0.5px solid rgba(255,255,255,0.06);
          margin-bottom: 16px;
        }
        .admin-sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        :global(.admin-nav-link) {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          color: var(--text-secondary);
          text-decoration: none;
          font-family: var(--font-body);
          font-size: 14px;
          transition: all 0.2s;
          position: relative;
        }
        :global(.admin-nav-link:hover) {
          color: #ffffff;
          background: rgba(255,255,255,0.04);
        }
        :global(.admin-nav-link.active) {
          color: #ffffff;
          background: rgba(255,255,255,0.04);
        }
        :global(.admin-nav-link.active::before) {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          bottom: 8px;
          width: 3px;
          border-radius: 2px;
          background: var(--grad-primary);
        }
        @media (max-width: 768px) {
          .admin-sidebar {
            position: fixed;
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: auto;
            flex-direction: row;
            padding: 12px 8px;
            border-right: none;
            border-top: 0.5px solid rgba(255,255,255,0.06);
            justify-content: space-around;
            align-items: center;
            z-index: 100;
          }
          .admin-sidebar-top, .admin-sidebar-bottom { display: none; }
          .admin-sidebar-nav { flex-direction: row; gap: 0; flex: 1; justify-content: space-around; }
          :global(.admin-nav-link) {
            flex-direction: column;
            gap: 4px;
            padding: 6px 8px;
            font-size: 10px;
          }
          :global(.admin-nav-link.active::before) { display: none; }
        }
      `}</style>
    </aside>
  );
}
