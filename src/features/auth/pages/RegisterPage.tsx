import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    // TODO: connect to /auth/register
  }

  return (
    <section className="page">
      <div className="section">
        <h1>Create account</h1>
        <p className="muted">Save favorites and sync across devices.</p>
      </div>
      <form className="section" onSubmit={handleSubmit}>
        <label>
          <p className="muted">Name</p>
          <input
            className="input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            required
          />
        </label>
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
          Sign up
        </button>
        <p className="muted">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </section>
  )
}

export default RegisterPage

