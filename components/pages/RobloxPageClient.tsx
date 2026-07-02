'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Code2, ExternalLink } from 'lucide-react'
import SectionHeader from '../SectionHeader'
import ScrollReveal from '../ScrollReveal'
import TechBadge from '../TechBadge'
import type { RobloxGame, RobloxScript } from '@/lib/types'

interface RobloxPageClientProps {
  games: RobloxGame[]
  scripts: RobloxScript[]
}

export default function RobloxPageClient({ games, scripts }: RobloxPageClientProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return { bg: 'rgba(0,255,136,0.1)', text: '#4ade80' }
      case 'In Development':
        return { bg: 'rgba(255,165,0,0.1)', text: '#f97316' }
      default:
        return { bg: 'rgba(255,255,255,0.05)', text: 'var(--text-muted)' }
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Admin':
        return { bg: 'rgba(99,102,241,0.2)', text: '#818cf8' }
      case 'Combat':
        return { bg: 'rgba(239,68,68,0.2)', text: '#f87171' }
      case 'UI':
        return { bg: 'rgba(168,85,247,0.2)', text: '#c084fc' }
      case 'Utility':
        return { bg: 'rgba(34,197,94,0.2)', text: '#4ade80' }
      default:
        return { bg: 'rgba(255,255,255,0.06)', text: 'var(--text-muted)' }
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)', paddingTop: 120 }}>
      <section style={{ padding: '0 32px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 3, height: 24, background: 'var(--grad-roblox)', borderRadius: 2 }} />
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}>
              Roblox Development
            </span>
          </div>

          <h1 style={{ fontSize: 56, fontWeight: 800, fontFamily: 'var(--font-display)', margin: 0, marginBottom: 12 }}>
            Roblox Projects
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', margin: 0, maxWidth: 600, lineHeight: 1.6 }}>
            Games, scripts, and VFX built in Luau
          </p>

          <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.8, delay: 0.2 }} style={{ height: 2, background: 'var(--grad-roblox)', borderRadius: 1, marginTop: 20, maxWidth: 400 }} />
        </motion.div>
      </section>

      <section style={{ padding: '0 32px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <ScrollReveal>
          <SectionHeader title="Games & Experiences" subtitle="Live Roblox titles and ongoing development" />
          <motion.div
            className="roblox-games-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 24,
            }}
          >
            {games.map((game, i) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.02)',
                  border: '0.5px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '16/9', background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                  {game.thumbnailUrl && (game.thumbnailUrl.endsWith('.mp4') || game.thumbnailUrl.endsWith('.webm')) ? (
                    <video
                      src={game.thumbnailUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : game.thumbnailUrl ? (
                    <Image src={game.thumbnailUrl} alt={game.title} fill style={{ objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'var(--grad-roblox)', opacity: 0.4 }} />
                  )}
                </div>

                <div style={{ padding: 20 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
                    <span
                      style={{
                        padding: '4px 8px',
                        background: getStatusColor(game.status).bg,
                        color: getStatusColor(game.status).text,
                        fontSize: 10,
                        fontWeight: 700,
                        borderRadius: 4,
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {game.status}
                    </span>
                    {game.playerCount && (
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {game.playerCount} players
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, marginBottom: 8, fontFamily: 'var(--font-display)' }}>
                    {game.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 13,
                      color: 'var(--text-secondary)',
                      margin: 0,
                      marginBottom: 12,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {game.description}
                  </p>

                  {game.robloxUrl && (
                    <a
                      href={game.robloxUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        padding: '10px 16px',
                        background: 'var(--grad-roblox)',
                        color: '#ffffff',
                        textDecoration: 'none',
                        borderRadius: 8,
                        fontWeight: 600,
                        fontSize: 13,
                        gap: 8,
                        cursor: 'pointer',
                      }}
                    >
                      <ExternalLink size={14} />
                      Play on Roblox
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </ScrollReveal>
      </section>

      <section style={{ padding: '0 32px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <ScrollReveal>
          <SectionHeader title="Scripts & VFX" subtitle="Utilities, combat systems, and effects" />
          <motion.div
            className="roblox-scripts-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            {scripts.map((script, i) => {
              const categoryColor = getCategoryColor(script.category || 'Other')
              return (
                <motion.div
                  key={script.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    background: 'rgba(255,255,255,0.02)',
                    border: '0.5px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {script.codePreview && (
                    <div
                      style={{
                        background: '#0a0a0a',
                        padding: 16,
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        color: '#00FF88',
                        maxHeight: 120,
                        overflow: 'hidden',
                        position: 'relative',
                        borderBottom: '0.5px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                        {script.codePreview.split('\n').slice(0, 6).join('\n')}
                      </pre>
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 32,
                          background: 'linear-gradient(to bottom, transparent, #0a0a0a)',
                        }}
                      />
                    </div>
                  )}

                  {!script.codePreview && script.imageUrl && (
                    <div style={{ position: 'relative', aspectRatio: '16/9', background: 'rgba(255,255,255,0.04)' }}>
                      {script.imageUrl.endsWith('.mp4') || script.imageUrl.endsWith('.webm') ? (
                        <video
                          src={script.imageUrl}
                          autoPlay
                          muted
                          loop
                          playsInline
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <Image src={script.imageUrl} alt={script.title} fill style={{ objectFit: 'cover' }} />
                      )}
                    </div>
                  )}

                  <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                      <span
                        style={{
                          padding: '4px 8px',
                          background: categoryColor.bg,
                          color: categoryColor.text,
                          fontSize: 10,
                          fontWeight: 700,
                          borderRadius: 4,
                          textTransform: 'uppercase',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {script.category || 'Other'}
                      </span>
                      <span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)', fontSize: 10, fontWeight: 700, borderRadius: 4, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                        Luau
                      </span>
                    </div>

                    <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0, marginBottom: 6, fontFamily: 'var(--font-display)' }}>
                      {script.title}
                    </h3>

                    <p
                      style={{
                        fontSize: 13,
                        color: 'var(--text-secondary)',
                        margin: 0,
                        marginBottom: 'auto',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {script.description}
                    </p>

                    {script.githubUrl && (
                      <a
                        href={script.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          marginTop: 12,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: 12,
                          color: 'var(--text-secondary)',
                          textDecoration: 'none',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#ffffff'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--text-secondary)'
                        }}
                      >
                        <Code2 size={14} />
                        View Source
                      </a>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </ScrollReveal>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.roblox-games-grid) {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 1024px) {
          :global(.roblox-scripts-grid) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          :global(.roblox-scripts-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
