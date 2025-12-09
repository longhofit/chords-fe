# Active Context – Chord Web App Frontend

## Current Phase
- MVP build; songs feature wired to backend.

## Current Focus Area
- Songs CRUD (list, detail, create, edit, delete) with inline chord display.
- UI polish for buttons and dark theme content panels.

## Recently Completed
- [x] Routing set up (React Router)
- [x] Base layout (header, main content, footer)
- [x] API client helper (apiFetch) and songs API wrappers
- [x] Song list page with search (local state) and navigation
- [x] Song detail page with inline chord highlighting ([chord])
- [x] Create song page (inline chord format, tags, publish toggle)
- [x] Edit song page with save + delete actions
- [x] Delete song action with confirmation
- [x] Button variants (primary/secondary/danger) applied to song pages

## Next Steps (High-Level)
- Add toasts for create/edit/delete success and errors; replace window.confirm with a modal.
- Refresh list after edit/delete; improve loading skeletons/empty states.
- Add auth integration and favorites flow.
- Add minimal tests for songs CRUD + chord rendering.

## Next Steps / Plan (Short-Term)
- UX polish: add toast notifications for success/error; replace delete confirm with a modal; add skeletons/empty states.
- Data sync: refresh song list after edit/delete; ensure navigation after delete returns home.
- Auth/favorites: wire login/register/profile; add favorites page and actions.
- Quality: basic tests for songs CRUD and chord rendering; consider key dropdown suggestions.
