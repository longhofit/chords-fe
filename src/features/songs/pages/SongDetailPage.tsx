import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

function SongDetailPage() {
  const { id } = useParams<{ id: string }>()

  const song = useMemo(
    () => ({
      id,
      title: 'Sample Song',
      artist: 'Artist Name',
      key: 'G',
      content:
        'Verse 1: \nC  G  D\nWhen the night is falling and the road is long...',
    }),
    [id],
  )

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
          {song.content}
        </pre>
      </div>
    </section>
  )
}

export default SongDetailPage

