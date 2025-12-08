import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Song } from '../../../lib/types'

const mockSongs: Song[] = [
  { id: '1', title: 'Amazing Grace', artist: 'John Newton', key: 'G' },
  { id: '2', title: 'How Great Is Our God', artist: 'Chris Tomlin', key: 'C' },
  { id: '3', title: '10,000 Reasons', artist: 'Matt Redman', key: 'D' },
]

function SongListPage() {
  const [query, setQuery] = useState('')

  const filteredSongs = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return mockSongs
    return mockSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(term) ||
        song.artist.toLowerCase().includes(term),
    )
  }, [query])

  return (
    <section className="page">
      <div className="section">
        <h1>Song Library</h1>
        <p className="muted">
          Search songs and open a chord sheet. Data will connect to the API
          soon.
        </p>
        <input
          className="input"
          placeholder="Search by song title or artist"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="section">
        <h2>Results</h2>
        <div className="card-grid">
          {filteredSongs.map((song) => (
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
          {filteredSongs.length === 0 && (
            <p className="muted">No songs found. Try another search.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default SongListPage

