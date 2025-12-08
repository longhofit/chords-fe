function FavoritesPage() {
  return (
    <section className="page">
      <div className="section">
        <h1>Favorites</h1>
        <p className="muted">
          Log in to see your saved songs. We will wire this to the backend
          favorites endpoint.
        </p>
      </div>
      <div className="card-grid">
        <article className="card">
          <div className="pill">Soon</div>
          <strong>Favorites list will render here</strong>
          <p className="muted">
            After auth is connected, we will fetch and display your saved songs.
          </p>
        </article>
      </div>
    </section>
  )
}

export default FavoritesPage

