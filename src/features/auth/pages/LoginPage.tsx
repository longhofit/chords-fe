import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    // TODO: connect to /auth/login
  }

  return (
    <section className="page">
      <div className="section">
        <h1>Login</h1>
        <p className="muted">Access your favorites across devices.</p>
      </div>
      <form className="section" onSubmit={handleSubmit}>
        <label>
          <p className="muted">Email</p>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>
        <label>
          <p className="muted">Password</p>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            required
          />
        </label>
        <button className="button" type="submit">
          Continue
        </button>
        <p className="muted">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </section>
  )
}

export default LoginPage

