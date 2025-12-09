import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import FavoritesPage from './features/favorites/pages/FavoritesPage'
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'
import CreateSongPage from './features/songs/pages/CreateSongPage'
import EditSongPage from './features/songs/pages/EditSongPage'
import SongDetailPage from './features/songs/pages/SongDetailPage'
import SongListPage from './features/songs/pages/SongListPage'
import './App.css'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<SongListPage />} />
        <Route path="/songs/new" element={<CreateSongPage />} />
        <Route path="/songs/:id/edit" element={<EditSongPage />} />
        <Route path="/songs/:id" element={<SongDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  )
}

export default App
