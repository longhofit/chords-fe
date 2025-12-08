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
        <pre className="kbd" style={{ whiteSpace: 'pre-wrap' }}>
          {song.content ?? 'No chord sheet yet.'}
        </pre>
      </div>
    </section>
  )
}

export default SongDetailPage

