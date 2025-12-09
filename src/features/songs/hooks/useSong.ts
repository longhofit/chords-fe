import { useEffect, useState } from 'react'
import { fetchSong } from '../api'
import type { Song } from '../../../lib/types'

export function useSong(id?: string) {
  const [song, setSong] = useState<Song | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadSong = async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const data = await fetchSong(id)
      setSong(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load song')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSong()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return { song, loading, error, refetch: loadSong }
}
