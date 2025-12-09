import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createSong } from '../api'
import type { CreateSongParams } from '../api'

function CreateSongPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<CreateSongParams>({
    title: '',
    artist: '',
    key: '',
    tags: [],
    content: '',
    isPublished: true,
  })

  const [tagInput, setTagInput] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Clean up the data
      const songData: CreateSongParams = {
        title: formData.title.trim(),
        artist: formData.artist.trim(),
        content: formData.content.trim(),
        isPublished: formData.isPublished,
      }

      if (formData.key?.trim()) {
        songData.key = formData.key.trim()
      }
      if (formData.tags && formData.tags.length > 0) {
        songData.tags = formData.tags
      }

      const createdSong = await createSong(songData)
      navigate(`/songs/${createdSong.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create song')
    } finally {
      setLoading(false)
    }
  }

  const addTag = () => {
    const tag = tagInput.trim()
    if (tag && !formData.tags?.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tag],
      })
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((tag) => tag !== tagToRemove) || [],
    })
  }

  return (
    <section className="page">
      <div className="section">
        <h1>Create New Song</h1>
        <p className="muted">
          Fill in the song details and add chords with lyrics. Format: Put each chord on its own line, followed by the lyrics on the next line.
        </p>

        {error && (
          <div
            style={{
              padding: '1rem',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '8px',
              marginBottom: '1rem',
            }}
          >
            <p style={{ color: '#ef4444', margin: 0 }}>
              <strong>Error:</strong> {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
          <div className="section">
            <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem' }}>
              <strong>Title *</strong>
            </label>
            <input
              id="title"
              className="input"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Song title"
            />
          </div>

          <div className="section">
            <label htmlFor="artist" style={{ display: 'block', marginBottom: '0.5rem' }}>
              <strong>Artist *</strong>
            </label>
            <input
              id="artist"
              className="input"
              type="text"
              required
              value={formData.artist}
              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              placeholder="Artist name"
            />
          </div>

          <div className="section">
            <label htmlFor="key" style={{ display: 'block', marginBottom: '0.5rem' }}>
              <strong>Key</strong>
            </label>
            <input
              id="key"
              className="input"
              type="text"
              value={formData.key || ''}
              onChange={(e) => setFormData({ ...formData, key: e.target.value })}
              placeholder="C, D, Am, etc."
            />
          </div>

          <div className="section">
            <label htmlFor="tags" style={{ display: 'block', marginBottom: '0.5rem' }}>
              <strong>Tags</strong>
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                id="tags"
                className="input"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addTag()
                  }
                }}
                placeholder="Add a tag and press Enter"
              />
              <button type="button" className="button" onClick={addTag}>
                Add
              </button>
            </div>
            {formData.tags && formData.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      fontSize: '0.875rem',
                    }}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer',
                        padding: 0,
                        fontSize: '1.2em',
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="section">
            <label htmlFor="content" style={{ display: 'block', marginBottom: '0.5rem' }}>
              <strong>Chords & Lyrics *</strong>
            </label>
            <p className="muted" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Format: Write lyrics with chords in square brackets inline. Example:
            </p>
            <pre
              style={{
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '4px',
                fontSize: '0.875rem',
                marginBottom: '0.5rem',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
              }}
            >
{`Ối sáng nay Đông [Am] về
Đèn vàng sân ga [F] nhớ
Nghe miên man hơi [Dm] thở
Phố nồng hương linh [E] lan
Phố buồn đêm linh [Am] lan!`}
            </pre>
            <textarea
              id="content"
              className="input"
              required
              rows={20}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Ối sáng nay Đông [Am] về&#10;Đèn vàng sân ga [F] nhớ&#10;Nghe miên man hơi [Dm] thở"
              style={{
                fontFamily: 'monospace',
                lineHeight: '1.8',
                resize: 'vertical',
              }}
            />
          </div>

          <div className="section">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) =>
                  setFormData({ ...formData, isPublished: e.target.checked })
                }
              />
              <span>Publish song (make it visible to others)</span>
            </label>
          </div>

          <div className="section" style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="button" disabled={loading}>
              {loading ? 'Creating...' : 'Create Song'}
            </button>
            <button
              type="button"
              className="button"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CreateSongPage

