import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
// import logo from '../../assets/images/png1.png'
import logo from "../assets/images/png1.png";

export default function Navbar(){
  const { user, logout } = useAuth()
  return (
    <header style={{display:'flex',alignItems:'center',gap:14,width:'100%'}}>
      <Link to="png1.jpg" className="logo">
        <span className="logo-mark"></span>
        <span>Car-rental</span>
      </Link>

      <nav style={{marginLeft:'auto'}}>
        <ul>
          <li><NavLink to="/buy">Buy</NavLink></li>
          <li><NavLink to="/sell">Sell</NavLink></li>
          <li><NavLink to="/rent">Rent</NavLink></li>
          <li><NavLink to="/services">Services</NavLink></li>
        </ul>
      </nav>

      <div style={{display:'flex',gap:10,marginLeft:10}}>
        {!user && (
          <>
            <Link to="/login" className="btn ghost">Log in</Link>
            <Link to="/signup" className="btn primary">Sign up</Link>
          </>
        )}
        {user && (
          <>
            <Link to="/profile" className="btn ghost">Hi, {user.name}</Link>
            <button className="btn primary" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </header>
  )
}