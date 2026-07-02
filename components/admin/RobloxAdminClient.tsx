'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import GradientText from '@/components/GradientText';
import SectionHeader from '@/components/SectionHeader';
import FormModal from './FormModal';
import { TextField, TextArea, SelectField } from './fields';
import ImageUpload from './ImageUpload';
import ConfirmDialog from './ConfirmDialog';
import Toast, { type ToastType } from './Toast';
import type { RobloxGame, RobloxScript } from '@/lib/types';

interface RobloxAdminClientProps {
  initialGames: RobloxGame[];
  initialScripts: RobloxScript[];
}

interface GameFormState {
  title: string;
  description: string;
  thumbnailUrl: string;
  robloxUrl: string;
  status: string;
  playerCount: string;
  orderIndex: string;
}

interface ScriptFormState {
  title: string;
  category: string;
  description: string;
  codePreview: string;
  imageUrl: string;
  githubUrl: string;
  language: string;
  orderIndex: string;
}

function emptyGameForm(): GameFormState {
  return { title: '', description: '', thumbnailUrl: '', robloxUrl: '', status: 'Live', playerCount: '', orderIndex: '0' };
}

function toGameForm(game: RobloxGame): GameFormState {
  return {
    title: game.title,
    description: game.description,
    thumbnailUrl: game.thumbnailUrl ?? '',
    robloxUrl: game.robloxUrl ?? '',
    status: game.status,
    playerCount: game.playerCount ?? '',
    orderIndex: String(game.orderIndex),
  };
}

function emptyScriptForm(): ScriptFormState {
  return { title: '', category: 'Utility', description: '', codePreview: '', imageUrl: '', githubUrl: '', language: 'Luau', orderIndex: '0' };
}

function toScriptForm(script: RobloxScript): ScriptFormState {
  return {
    title: script.title,
    category: script.category,
    description: script.description,
    codePreview: script.codePreview ?? '',
    imageUrl: script.imageUrl ?? '',
    githubUrl: script.githubUrl ?? '',
    language: script.language,
    orderIndex: String(script.orderIndex),
  };
}

export default function RobloxAdminClient({ initialGames, initialScripts }: RobloxAdminClientProps) {
  const router = useRouter();

  const [editingGame, setEditingGame] = useState<RobloxGame | null>(null);
  const [showGameForm, setShowGameForm] = useState(false);
  const [gameForm, setGameForm] = useState<GameFormState>(emptyGameForm());
  const [gameSubmitting, setGameSubmitting] = useState(false);
  const [deletingGame, setDeletingGame] = useState<RobloxGame | null>(null);

  const [editingScript, setEditingScript] = useState<RobloxScript | null>(null);
  const [showScriptForm, setShowScriptForm] = useState(false);
  const [scriptForm, setScriptForm] = useState<ScriptFormState>(emptyScriptForm());
  const [scriptSubmitting, setScriptSubmitting] = useState(false);
  const [deletingScript, setDeletingScript] = useState<RobloxScript | null>(null);

  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  function updateGameField<K extends keyof GameFormState>(key: K, value: GameFormState[K]) {
    setGameForm((f) => ({ ...f, [key]: value }));
  }

  function updateScriptField<K extends keyof ScriptFormState>(key: K, value: ScriptFormState[K]) {
    setScriptForm((f) => ({ ...f, [key]: value }));
  }

  function openCreateGame() {
    setEditingGame(null);
    setGameForm(emptyGameForm());
    setShowGameForm(true);
  }

  function openEditGame(game: RobloxGame) {
    setEditingGame(game);
    setGameForm(toGameForm(game));
    setShowGameForm(true);
  }

  function openCreateScript() {
    setEditingScript(null);
    setScriptForm(emptyScriptForm());
    setShowScriptForm(true);
  }

  function openEditScript(script: RobloxScript) {
    setEditingScript(script);
    setScriptForm(toScriptForm(script));
    setShowScriptForm(true);
  }

  async function handleGameSubmit(e: FormEvent) {
    e.preventDefault();
    setGameSubmitting(true);
    try {
      const payload = {
        title: gameForm.title,
        description: gameForm.description,
        thumbnailUrl: gameForm.thumbnailUrl || undefined,
        robloxUrl: gameForm.robloxUrl || undefined,
        status: gameForm.status,
        playerCount: gameForm.playerCount || undefined,
        orderIndex: Number(gameForm.orderIndex),
      };

      const res = await fetch(editingGame ? `/api/admin/roblox/games/${editingGame.id}` : '/api/admin/roblox/games', {
        method: editingGame ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? 'Failed to save game');
      }

      setToast({ message: editingGame ? 'Game updated' : 'Game created', type: 'success' });
      setShowGameForm(false);
      router.refresh();
    } catch (err) {
      setToast({ message: (err as Error).message, type: 'error' });
    } finally {
      setGameSubmitting(false);
    }
  }

  async function handleDeleteGame() {
    if (!deletingGame) return;
    const target = deletingGame;
    setDeletingGame(null);
    try {
      const res = await fetch(`/api/admin/roblox/games/${target.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete game');
      setToast({ message: 'Game deleted', type: 'success' });
      router.refresh();
    } catch (err) {
      setToast({ message: (err as Error).message, type: 'error' });
    }
  }

  async function handleScriptSubmit(e: FormEvent) {
    e.preventDefault();
    setScriptSubmitting(true);
    try {
      const payload = {
        title: scriptForm.title,
        category: scriptForm.category,
        description: scriptForm.description,
        codePreview: scriptForm.codePreview || undefined,
        imageUrl: scriptForm.imageUrl || undefined,
        githubUrl: scriptForm.githubUrl || undefined,
        language: scriptForm.language,
        orderIndex: Number(scriptForm.orderIndex),
      };

      const res = await fetch(editingScript ? `/api/admin/roblox/scripts/${editingScript.id}` : '/api/admin/roblox/scripts', {
        method: editingScript ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? 'Failed to save script');
      }

      setToast({ message: editingScript ? 'Script updated' : 'Script created', type: 'success' });
      setShowScriptForm(false);
      router.refresh();
    } catch (err) {
      setToast({ message: (err as Error).message, type: 'error' });
    } finally {
      setScriptSubmitting(false);
    }
  }

  async function handleDeleteScript() {
    if (!deletingScript) return;
    const target = deletingScript;
    setDeletingScript(null);
    try {
      const res = await fetch(`/api/admin/roblox/scripts/${target.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete script');
      setToast({ message: 'Script deleted', type: 'success' });
      router.refresh();
    } catch (err) {
      setToast({ message: (err as Error).message, type: 'error' });
    }
  }

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <SectionHeader title="Roblox" subtitle="Games, scripts, and content for your studio." />
      <GlassCard style={{ padding: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <GradientText style={{ fontSize: 24, fontWeight: 700 }}>Roblox library</GradientText>
          <p style={{ margin: '10px 0 0', color: 'var(--text-secondary)' }}>Manage games and script snippets.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="button" onClick={openCreateGame} style={buttonStyle}>
            New game
          </button>
          <button type="button" onClick={openCreateScript} style={{ ...buttonStyle, background: 'rgba(255,255,255,0.08)', color: '#ffffff' }}>
            New script
          </button>
        </div>
      </GlassCard>

      <section style={{ display: 'grid', gap: 18 }}>
        <SectionHeader title="Games" subtitle="Live Roblox titles and ongoing development." />
        {initialGames.length === 0 ? (
          <GlassCard style={{ padding: 40, textAlign: 'center' }}>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>No games yet.</p>
          </GlassCard>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {initialGames.map((game) => (
              <motion.div key={game.id} whileHover={{ y: -2 }} style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div>
                    <h2 style={titleStyle}>{game.title}</h2>
                    <div style={{ color: 'var(--text-secondary)', marginTop: 8 }}>{game.description}</div>
                  </div>
                  <span style={tagStyle}>{game.status}</span>
                </div>
                <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button type="button" onClick={() => openEditGame(game)} style={actionChip}>
                    Edit
                  </button>
                  <button type="button" onClick={() => setDeletingGame(game)} style={{ ...actionChip, background: 'rgba(255,68,68,0.18)', color: '#ff7c7c' }}>
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section style={{ display: 'grid', gap: 18 }}>
        <SectionHeader title="Scripts" subtitle="Reusable Roblox logic and UI snippets." />
        {initialScripts.length === 0 ? (
          <GlassCard style={{ padding: 40, textAlign: 'center' }}>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>No scripts yet.</p>
          </GlassCard>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {initialScripts.map((script) => (
              <motion.div key={script.id} whileHover={{ y: -2 }} style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div>
                    <h2 style={titleStyle}>{script.title}</h2>
                    <div style={{ color: 'var(--text-secondary)', marginTop: 8 }}>{script.description}</div>
                  </div>
                  <span style={tagStyle}>{script.language}</span>
                </div>
                <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button type="button" onClick={() => openEditScript(script)} style={actionChip}>
                    Edit
                  </button>
                  <button type="button" onClick={() => setDeletingScript(script)} style={{ ...actionChip, background: 'rgba(255,68,68,0.18)', color: '#ff7c7c' }}>
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <FormModal
        open={showGameForm}
        title={editingGame ? 'Edit game' : 'New game'}
        onClose={() => setShowGameForm(false)}
        onSubmit={handleGameSubmit}
        submitting={gameSubmitting}
      >
        <TextField label="Title" required value={gameForm.title} onChange={(e) => updateGameField('title', e.target.value)} />
        <TextArea label="Description" required rows={3} value={gameForm.description} onChange={(e) => updateGameField('description', e.target.value)} />
        <SelectField
          label="Status"
          value={gameForm.status}
          onChange={(e) => updateGameField('status', e.target.value)}
          options={[
            { value: 'Live', label: 'Live' },
            { value: 'In Development', label: 'In Development' },
          ]}
        />
        <TextField label="Roblox URL" value={gameForm.robloxUrl} onChange={(e) => updateGameField('robloxUrl', e.target.value)} />
        <TextField label="Player count" value={gameForm.playerCount} onChange={(e) => updateGameField('playerCount', e.target.value)} placeholder="e.g. 1.2K" />
        <TextField label="Order index" type="number" value={gameForm.orderIndex} onChange={(e) => updateGameField('orderIndex', e.target.value)} />

        <label style={{ display: 'grid', gap: 10 }}>
          <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Thumbnail
          </span>
          {gameForm.thumbnailUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={gameForm.thumbnailUrl} alt="" style={{ width: 160, height: 90, objectFit: 'cover', borderRadius: 8, border: '0.5px solid rgba(255,255,255,0.12)' }} />
          )}
          <ImageUpload multiple={false} onUpload={(url) => updateGameField('thumbnailUrl', url)} onError={(message) => setToast({ message, type: 'error' })} />
        </label>
      </FormModal>

      <FormModal
        open={showScriptForm}
        title={editingScript ? 'Edit script' : 'New script'}
        onClose={() => setShowScriptForm(false)}
        onSubmit={handleScriptSubmit}
        submitting={scriptSubmitting}
      >
        <TextField label="Title" required value={scriptForm.title} onChange={(e) => updateScriptField('title', e.target.value)} />
        <SelectField
          label="Category"
          value={scriptForm.category}
          onChange={(e) => updateScriptField('category', e.target.value)}
          options={[
            { value: 'Admin', label: 'Admin' },
            { value: 'Combat', label: 'Combat' },
            { value: 'UI', label: 'UI' },
            { value: 'Utility', label: 'Utility' },
            { value: 'Backend', label: 'Backend' },
          ]}
        />
        <TextArea label="Description" required rows={3} value={scriptForm.description} onChange={(e) => updateScriptField('description', e.target.value)} />
        <TextArea label="Code preview" rows={5} value={scriptForm.codePreview} onChange={(e) => updateScriptField('codePreview', e.target.value)} placeholder="Paste a short Luau snippet" />
        <TextField label="GitHub URL" value={scriptForm.githubUrl} onChange={(e) => updateScriptField('githubUrl', e.target.value)} />
        <TextField label="Language" value={scriptForm.language} onChange={(e) => updateScriptField('language', e.target.value)} />
        <TextField label="Order index" type="number" value={scriptForm.orderIndex} onChange={(e) => updateScriptField('orderIndex', e.target.value)} />

        <label style={{ display: 'grid', gap: 10 }}>
          <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Media (shown when no code preview)
          </span>
          {scriptForm.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={scriptForm.imageUrl} alt="" style={{ width: 160, height: 90, objectFit: 'cover', borderRadius: 8, border: '0.5px solid rgba(255,255,255,0.12)' }} />
          )}
          <ImageUpload multiple={false} onUpload={(url) => updateScriptField('imageUrl', url)} onError={(message) => setToast({ message, type: 'error' })} />
        </label>
      </FormModal>

      <ConfirmDialog
        open={!!deletingGame}
        message={`Delete "${deletingGame?.title}"? This can't be undone.`}
        onConfirm={handleDeleteGame}
        onCancel={() => setDeletingGame(null)}
      />
      <ConfirmDialog
        open={!!deletingScript}
        message={`Delete "${deletingScript?.title}"? This can't be undone.`}
        onConfirm={handleDeleteScript}
        onCancel={() => setDeletingScript(null)}
      />
      <Toast message={toast?.message ?? null} type={toast?.type} onDone={() => setToast(null)} />
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: '14px 22px',
  borderRadius: 16,
  background: 'var(--grad-roblox)',
  color: '#000',
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
  fontWeight: 700,
  border: 'none',
};

const cardStyle: React.CSSProperties = {
  padding: 24,
  borderRadius: 20,
  background: 'var(--bg-card)',
  border: '0.5px solid var(--border-subtle)',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--font-display)',
  fontSize: 22,
};

const tagStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: 999,
  background: 'rgba(255,255,255,0.08)',
  color: '#ffffff',
  fontSize: 12,
  alignSelf: 'flex-start',
};

const actionChip: React.CSSProperties = {
  padding: '12px 18px',
  borderRadius: 14,
  background: 'rgba(255,255,255,0.08)',
  color: '#ffffff',
  cursor: 'pointer',
  fontSize: 14,
  fontFamily: 'var(--font-body)',
  border: 'none',
};
