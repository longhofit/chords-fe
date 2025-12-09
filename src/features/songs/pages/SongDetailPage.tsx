import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchSong } from '../api'
import type { Song } from '../../../lib/types'

function SongDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [song, setSong] = useState<Song | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  return (
    <section className="page">
      <div className="section">
        <h1>{song.title}</h1>
        <p className="muted">
          {song.artist} · Key {song.key}
        </p>
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
    </section>
  )
}

export default SongDetailPage

