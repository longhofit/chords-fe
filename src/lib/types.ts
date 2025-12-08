export type Song = {
  id: string
  title: string
  artist: string
  key?: string
  tags?: string[]
}

export type SongDetail = Song & {
  lyrics?: string
  chords?: string
  content?: string
}

export type User = {
  id: string
  name: string
  email: string
}

