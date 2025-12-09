import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteSong, fetchSong } from '../api'
import { useToast } from '../../../components/ToastProvider'
import { ConfirmModal } from '../../../components/ConfirmModal'
import type { Song } from '../../../lib/types'

function SongDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { showSuccess, showError } = useToast()
  const [song, setSong] = useState<Song | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    if (!id) return
    let canceled = false
    setLoading(true)
    setError(null)

    fetchSong(id)
      .then((data) => {
        if (canceled) return
        setSong(data)
      })
      .catch((err) => {
        if (canceled) return
        setError(err instanceof Error ? err.message : 'Failed to load song')
      })
      .finally(() => {
        if (canceled) return
        setLoading(false)
      })

    return () => {
      canceled = true
    }
  }, [id])

  if (loading) {
    return (
      <section className="page">
        <p className="muted">Loading song...</p>
      </section>
    )
  }

  if (error || !song) {
    return (
      <section className="page">
        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
          <p style={{ color: '#ef4444', margin: 0 }}>
            <strong>Error:</strong> {error || 'Song not found'}
          </p>
        </div>
      </section>
    )
  }

  // Format content to highlight chords in square brackets
  const formatContent = (content: string) => {
    if (!content) return 'No chord sheet yet.'

    // Split by lines to preserve line breaks
    const lines = content.split('\n')

    return lines.map((line, lineIndex) => {
      // Match chords in square brackets like [Am], [F], [Dm], etc.
      const parts = line.split(/(\[[^\]]+\])/g)

      return (
        <div key={lineIndex} style={{ marginBottom: '0.5rem', lineHeight: '1.8' }}>
          {parts.map((part, partIndex) => {
            if (part.startsWith('[') && part.endsWith(']')) {
              // This is a chord - display in red
              return (
                <span
                  key={partIndex}
                  style={{
                    color: '#ef4444',
                    fontWeight: 'bold',
                  }}
                >
                  {part}
                </span>
              )
            }
            // Regular text
            return <span key={partIndex}>{part}</span>
          })}
        </div>
      )
    })
  }

  const handleDelete = async () => {
    if (!id) return
    setDeleting(true)
    setError(null)
    try {
      await deleteSong(id)
      showSuccess('Song deleted')
      navigate('/')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete song'
      setError(message)
      showError(message)
    } finally {
      setDeleting(false)
      setConfirmOpen(false)
    }
  }

  return (
    <section className="page">
      <div className="section" style={{ gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ margin: 0 }}>{song.title}</h1>
            <p className="muted" style={{ margin: 0 }}>
              {song.artist} {song.key ? `· Key ${song.key}` : ''}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to={`/songs/${song.id}/edit`} className="button button-secondary" style={{ textDecoration: 'none' }}>
              Edit
            </Link>
            <button
              type="button"
              className="button button-danger"
              onClick={() => setConfirmOpen(true)}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
      <div className="section">
        <h2>Chords & Lyrics</h2>
        <div
          style={{
            padding: '1.5rem',
            background: 'rgba(226, 232, 240, 0.02)',
            border: '1px solid rgba(226, 232, 240, 0.06)',
            borderRadius: '12px',
            color: '#e2e8f0',
            fontSize: '1.1rem',
            lineHeight: '1.8',
            whiteSpace: 'pre-wrap',
          }}
        >
          {formatContent(song.content ?? '')}
        </div>
      </div>
      <ConfirmModal
        open={confirmOpen}
        title="Delete song?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => !deleting && setConfirmOpen(false)}
      />
    </section>
  )
}

export default SongDetailPage

