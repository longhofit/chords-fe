import { apiFetch } from '../../lib/api'
import type { Song, SongListResponse } from '../../lib/types'

export type ListSongsParams = {
  page?: number
  limit?: number
  search?: string
  key?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  tags?: string[]
  isPublished?: boolean
  sortBy?: 'createdAt' | 'title' | 'artist' | 'bpm' | 'difficulty'
  sortOrder?: 'asc' | 'desc'
}

export type CreateSongParams = {
  title: string
  artist: string
  key?: string
  tags?: string[]
  content: string
  isPublished?: boolean
}

export async function fetchSongs(params: ListSongsParams = {}) {
  const searchParams = new URLSearchParams()
  if (params.page) searchParams.set('page', String(params.page))
  if (params.limit) searchParams.set('limit', String(params.limit))
  if (params.search) searchParams.set('search', params.search)
  if (params.key) searchParams.set('key', params.key)
  if (params.difficulty) searchParams.set('difficulty', params.difficulty)
  if (params.tags?.length) searchParams.set('tags', params.tags.join(','))
  if (typeof params.isPublished === 'boolean')
    searchParams.set('isPublished', String(params.isPublished))
  if (params.sortBy) searchParams.set('sortBy', params.sortBy)
  if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder)

  const queryString = searchParams.toString()
  const path = `/songs${queryString ? `?${queryString}` : ''}`
  return apiFetch<SongListResponse>(path)
}

export async function fetchSong(id: string) {
  return apiFetch<Song>(`/songs/${id}`)
}

export async function createSong(params: CreateSongParams) {
  return apiFetch<Song>('/songs', {
    method: 'POST',
    body: JSON.stringify(params),
  })
}
