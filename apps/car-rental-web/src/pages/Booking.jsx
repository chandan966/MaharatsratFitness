import { useParams, useNavigate } from 'react-router-dom'
import cars from '../data/cars.js'
import { useState } from 'react'

export default function Booking(){
  const { id } = useParams()
  const nav = useNavigate()
  const car = cars.find(c => c.id === id)
  const [form, setForm] = useState({ name:'', phone:'', start:'', end:'', pickup:'', notes:'' })

  const submit = (e) => {
    e.preventDefault()
    alert(`Booking confirmed for ${car.brand} ${car.model}!`)
    nav('/profile')
  }

  if(!car) return <div className="card">Car not found.</div>

  return (
    <section>
      <h2>Booking — {car.brand} {car.model}</h2>
      <div className="grid">
        <div className="card">
          <img src={car.image} alt={car.model} style={{width:'100%',borderRadius:12}}/>
          <div style={{marginTop:10,color:'#6b7280'}}>{car.year} • {car.fuel} • {car.transmission}</div>
          <div style={{marginTop:6}}><span className="badge">{car.type==='rent' ? `₹${car.price}/day` : `₹${car.price.toLocaleString()}`}</span></div>
        </div>
        <form className="card" onSubmit={submit}>
          <div className="form-row">
            <input className="input" placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/>
            <input className="input" placeholder="Phone number" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} required/>
          </div>
          <div className="form-row" style={{marginTop:10}}>
            <input className="input" type="date" value={form.start} onChange={e=>setForm({...form, start:e.target.value})} required/>
            <input className="input" type="date" value={form.end} onChange={e=>setForm({...form, end:e.target.value})} required/>
          </div>
          <input className="input" style={{marginTop:10}} placeholder="Pickup location" value={form.pickup} onChange={e=>setForm({...form, pickup:e.target.value})} required/>
          <textarea className="input" style={{marginTop:10,height:96}} placeholder="Notes (optional)" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})}/>
          <button className="btn primary" style={{marginTop:12}}>Confirm Booking</button>
        </form>
      </div>
    </section>
  )
}