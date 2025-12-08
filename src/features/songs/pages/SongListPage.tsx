import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchSongs } from '../api'
import type { Song } from '../../../lib/types'

function SongListPage() {
  const [query, setQuery] = useState('')
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let canceled = false
    setLoading(true)
    setError(null)

    fetchSongs({
      search: query.trim() || undefined,
      limit: 20,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      isPublished: true,
    })
      .then((data) => {
        if (canceled) return
        setSongs(data.items)
      })
      .catch((err) => {
        if (canceled) return
        setError(err instanceof Error ? err.message : 'Failed to load songs')
      })
      .finally(() => {
        if (canceled) return
        setLoading(false)
      })

    return () => {
      canceled = true
    }
  }, [query])

  const summary = useMemo(() => {
    if (loading) return 'Loading songs...'
    if (error) return 'Could not load songs.'
    return songs.length ? `${songs.length} songs` : 'No songs found'
  }, [loading, error, songs.length])

  return (
    <section className="page">
      <div className="section">
        <h1>Song Library</h1>
        <p className="muted">
          Search songs and open a chord sheet. Data will connect to the API
          soon.
        </p>
        <div className="section">
          <input
            className="input"
            placeholder="Search by song title or artist"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <p className="muted">{summary}</p>
          {error && (
            <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', marginTop: '1rem' }}>
              <p style={{ color: '#ef4444', margin: 0 }}><strong>Error:</strong> {error}</p>
            </div>
          )}
        </div>
      </div>

      <div className="section">
        <h2>Results</h2>
        <div className="card-grid">
          {loading && <p className="muted">Loading songs...</p>}
          {!loading &&
            !error &&
            songs.map((song) => (
            <article key={song.id} className="card">
              <div className="pill">{song.key ?? 'Key?'}</div>
              <div>
                <strong>{song.title}</strong>
                <p className="muted">{song.artist}</p>
              </div>
              <Link className="button" to={`/songs/${song.id}`}>
                View chords
              </Link>
            </article>
          ))}
          {!loading && !error && songs.length === 0 && (
            <p className="muted">No songs found. Try another search.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default SongListPage

