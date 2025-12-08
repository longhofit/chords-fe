export type Song = {
  id: string
  title: string
  artist: string
  key?: string
  bpm?: number
  difficulty?: 'easy' | 'medium' | 'hard'
  tags?: string[]
  content?: string
  isPublished?: boolean
  createdAt?: string
  updatedAt?: string
}

export type SongListResponse = {
  items: Song[]
  total: number
  page: number
  limit: number
}

export type User = {
  id: string
  name: string
  email: string
}

export type ApiSuccess<T> = {
  success: true
  data: T
  message?: string
}

export type ApiError = {
  success: false
  message?: string
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError

