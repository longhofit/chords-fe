# Tech Context – Chord Web App Frontend

## Tech Stack
- Framework: React
- Language: TypeScript
- Build Tool / Framework: Vite or Next.js (choose one and keep consistent)
- Routing:
  - If Vite: React Router
  - If Next.js: built-in file-based routing
- Data Fetching:
  - HTTP client: fetch or axios
  - Optional: TanStack Query/React Query for server state
- Styling:
  - Tailwind CSS (preferred) or a simple CSS module system
- State Management:
  - Start with local component state + React Query for server data
  - Introduce global state only when needed (e.g., for auth user info)

## Integration with Backend
- Auth endpoints:
  - POST /auth/register
  - POST /auth/login
  - GET /auth/profile (or /users/me)
- Songs endpoints:
  - GET /songs (with pagination and filters)
  - GET /songs/:id
- Favorites endpoints:
  - POST /favorites/:songId
  - DELETE /favorites/:songId
  - GET /favorites

## Technical Constraints
- Use TypeScript with meaningful types for API responses and UI props.
- Do not hardcode secrets in the frontend; use environment variables for base URLs if needed (but remember all FE env values are public).
- Handle auth token carefully:
  - Store in httpOnly cookie (preferred) or localStorage (MVP acceptable, but be aware of XSS risks).
- Handle errors and loading states explicitly in the UI.
