import AdminSidebar from '@/components/admin/AdminSidebar';
import type { ReactNode } from 'react';

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        background: 'var(--bg-base)',
        color: 'var(--text-primary)',
      }}
    >
      <AdminSidebar />
      <main
        style={{
          flex: 1,
          minHeight: '100vh',
          padding: '32px 32px 64px',
          marginLeft: 260,
          maxWidth: 'calc(100% - 260px)',
        }}
      >
        {children}
      </main>
      <style jsx>{`
        @media (max-width: 768px) {
          main {
            margin-left: 0 !important;
            padding-top: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
