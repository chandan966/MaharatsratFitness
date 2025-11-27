import { useAuth } from '../context/AuthContext.jsx'
import { Link } from 'react-router-dom'

export default function Profile(){
  const { user } = useAuth()
  if(!user) return (
    <section className="card">
      <h3>Please log in</h3>
      <p>Access your bookings and listings after logging in.</p>
      <Link to="/login" className="btn primary">Log in</Link>
    </section>
  )

  return (
    <section>
      <h2>Profile</h2>
      <div className="card">
        <div style={{display:'flex',alignItems:'center',gap:16}}>
          <div style={{width:64,height:64,borderRadius:16,background:'linear-gradient(140deg,var(--brand),var(--brand-700))'}}></div>
          <div>
            <div style={{fontWeight:700}}>{user.name}</div>
            <div style={{color:'#6b7280',fontSize:14}}>{user.email}</div>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:16}}>
          <Link to="/sell" className="card">Post a car for sale →</Link>
          <Link to="/rent" className="card">Find rental cars →</Link>
        </div>
      </div>
    </section>
  )
}