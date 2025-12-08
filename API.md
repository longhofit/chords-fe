## API Overview

Base URL: `http://localhost:${PORT ?? 3000}`

Response format (global):
```json
{
  "success": true,
  "data": {},
  "message": "optional"
}
```
Errors:
```json
{
  "success": false,
  "message": "error message"
}
```

---

## Songs

### Create Song
- **POST** `/songs`
- Body:
```json
{
  "title": "string",
  "artist": "string",
  "key": "string",
  "bpm": 72,
  "difficulty": "easy" | "medium" | "hard",
  "tags": ["worship", "hymn"],
  "content": "[C]Amazing [F]grace...",
  "isPublished": true
}
```
- 201 → `data` = created song

### List Songs (search/pagination)
- **GET** `/songs`
- Query params:
  - `page` (default 1)
  - `limit` (default 10, max 100)
  - `search` (text search on title/artist)
  - `key`
  - `difficulty` (`easy|medium|hard`)
  - `tags` (comma-separated, requires all)
  - `isPublished` (`true|false`)
  - `sortBy` (`createdAt|title|artist|bpm|difficulty`; default `createdAt`)
  - `sortOrder` (`asc|desc`; default `desc`)
- 200 → `data`:
```json
{
  "items": [/* songs */],
  "total": 42,
  "page": 1,
  "limit": 10
}
```

### Get Song
- **GET** `/songs/:id`
- 200 → song; 404 if not found

### Update Song
- **PATCH** `/songs/:id`
- Body: any subset of create fields
- 200 → updated song; 404 if not found

### Delete Song
- **DELETE** `/songs/:id`
- 200 → deleted song; 404 if not found

---

## Notes
- Authentication not yet applied; endpoints are public in current state.
- Standard validation: whitelist + forbid unknown fields; types are coerced (e.g., page/limit to numbers).
- `content` is a free-form string (lyrics with embedded chords); no enforced markup yet.

