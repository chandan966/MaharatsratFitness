import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const nav = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Please enter email & password')
      return
    }

    try {
      await login(email, password)
      nav('/profile')
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  return (
    <section style={{ maxWidth: 520, margin: '20px auto' }}>
      <h2>Log in</h2>
      <form className="card" onSubmit={onSubmit}>
        {error && (
          <div className="badge" style={{ display: 'inline-block', marginBottom: 10 }}>
            {error}
          </div>
        )}
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError('') }}
        />
        <input
          className="input"
          style={{ marginTop: 10 }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError('') }}
        />
        <button
          type="submit"
          className="btn primary"
          style={{ marginTop: 12, width: '100%' }}
        >
          Log in
        </button>
      </form>
      <div style={{ textAlign: 'center' }}>
        No account? <Link to="/signup">Sign up</Link>
      </div>
    </section>
  )
}