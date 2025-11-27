import { Link } from 'react-router-dom'
import CarGrid from '../components/CarGrid.jsx'
import cars from '../data/cars.js'

export default function Home(){
  const featured = cars.slice(0,6)
  return (
    <section>
      <div className="hero">
        <div>
          <span className="badge">Blue & White • Clean UI</span>
          <h1 style={{fontSize:44,margin:'10px 0'}}>CarRental — Buy, Sell & Rent Cars Easily</h1>
          <p style={{color:'#374151',fontSize:18,marginBottom:18}}>Your one‑stop marketplace for Tata, Honda, Maruti, Toyota and more. Browse verified listings, book rentals, and manage your profile in one place.</p>
          <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
            <Link to="/rent" className="btn primary">Rent a Car</Link>
            <Link to="/buy" className="btn ghost">Buy a Car</Link>
            <Link to="/sell" className="btn ghost">Sell Your Car</Link>
          </div>
        </div>
        <div className="card">
          <h3 style={{marginTop:0}}>Quick Search</h3>
          <div className="form-row">
            <input className="input" placeholder="Brand e.g., Tata, Maruti" />
            <select>
              <option>Fuel</option>
              <option>Petrol</option>
              <option>Diesel</option>
              <option>CNG</option>
            </select>
          </div>
          <div className="form-row" style={{marginTop:10}}>
            <select>
              <option>Type</option>
              <option>Buy</option>
              <option>Sell</option>
              <option>Rent</option>
            </select>
            <input className="input" placeholder="Max price (₹)" />
          </div>
          <button className="btn primary" style={{marginTop:12,width:'100%'}}>Search</button>
        </div>
      </div>

      <h2>Featured Cars</h2>
      <CarGrid cars={featured} />

      <div className="card" style={{marginTop:20}}>
        <h3 style={{marginTop:0}}>Why choose CarRental?</h3>
        <ul style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14}}>
          <li className="card"><b>Trusted Brands</b><br/>Tata, Maruti, Honda, Toyota, Hyundai and more.</li>
          <li className="card"><b>Secure Booking</b><br/>Instant confirmations and reminders.</li>
          <li className="card"><b>All-in-One</b><br/>Buy, Sell, Rent and Service at one place.</li>
        </ul>
      </div>
    </section>
  )
}