import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const nav = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    if(!name || !email || !password){ setError('Please fill all fields'); return }
    signup(name, email, password)
    nav('/profile')
  }

  return (
    <section style={{maxWidth:520, margin:'20px auto'}}>
      <h2>Create account</h2>
      <form className="card" onSubmit={onSubmit}>
        {error && <div className="badge" style={{display:'inline-block',marginBottom:10}}>{error}</div>}
        <input className="input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" style={{marginTop:10}} type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" style={{marginTop:10}} type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn primary" style={{marginTop:12, width:'100%'}}>Sign up</button>
      </form>
      <div style={{textAlign:'center'}}>Already have an account? <Link to="/login">Log in</Link></div>
    </section>
  )
}