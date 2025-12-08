# System Patterns – Chord Web App Frontend

## High-Level Architecture
- Feature-oriented folder structure:
  - /features/auth
  - /features/songs
  - /features/favorites
  - /components (shared UI)
  - /lib (helpers)
- Each feature contains:
  - UI components (screens, feature components)
  - hooks for data fetching (e.g., useSongs, useSongDetail, useFavorites)
  - types/interfaces for that feature

## Main Pages (MVP)
- `/` – Home / Song list with search & filters
- `/login` – Login page
- `/register` – Registration page
- `/songs/:id` – Song detail with chord view
- `/favorites` – User favorites (auth protected)

## Data Flow Pattern
- UI event (click/search) → calls hook or handler → API request → update local/server state → re-render.
- Auth:
  - On login success, store token and fetch profile.
  - Guard certain routes (e.g., Favorites) to require login.

## Components & Design Patterns
- Reusable UI components:
  - SongCard
  - SongList
  - SearchBar
  - Layout (header, footer)
  - Button, Input, etc.
- Keep components presentational when possible; move data logic into hooks (e.g., `useSongs`, `useAuth`).
- Separate types:
  - `Song` entity
  - `SongDTO` if needed to map from API to app model

## Important Frontend Decisions
- Use a standard layout (header + main + footer).
- Keep pagination UI simple (next/previous, page size).
- Preserve URL state for search and filters (e.g., query params) so users can share URLs.
