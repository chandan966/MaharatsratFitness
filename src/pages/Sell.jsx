import { useEffect, useState } from 'react'
import { getListings, saveListings } from '../utils/storage.js'
import CarGrid from '../components/CarGrid.jsx'

export default function Sell(){
  const [items, setItems] = useState(getListings())
  const [form, setForm] = useState({brand:'', model:'', year:'', fuel:'Petrol', transmission:'Manual', price:'', image:'', type:'sell'})

  useEffect(()=>{ saveListings(items) }, [items])

  const add = (e) => {
    e.preventDefault()
    const id = crypto.randomUUID()
    const car = {...form, id, year: Number(form.year), price: Number(form.price)}
    setItems([car, ...items])
    setForm({brand:'', model:'', year:'', fuel:'Petrol', transmission:'Manual', price:'', image:'', type:'sell'})
  }

  return (
    <section>
      <h2>Sell Your Car</h2>
      <form className="card" onSubmit={add}>
        <div className="form-row">
          <input className="input" placeholder="Brand" value={form.brand} onChange={e=>setForm({...form, brand:e.target.value})} required/>
          <input className="input" placeholder="Model" value={form.model} onChange={e=>setForm({...form, model:e.target.value})} required/>
        </div>
        <div className="form-row">
          <input className="input" placeholder="Year" value={form.year} onChange={e=>setForm({...form, year:e.target.value})} required/>
          <select value={form.fuel} onChange={e=>setForm({...form, fuel:e.target.value})}>
            <option>Petrol</option><option>Diesel</option><option>CNG</option>
          </select>
        </div>
        <div className="form-row">
          <select value={form.transmission} onChange={e=>setForm({...form, transmission:e.target.value})}>
            <option>Manual</option><option>Automatic</option>
          </select>
          <input className="input" placeholder="Price (₹)" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} required/>
        </div>
        <input className="input" placeholder="Image URL" value={form.image} onChange={e=>setForm({...form, image:e.target.value})} style={{marginTop:10}}/>
        <button className="btn primary" style={{marginTop:12}}>Add Listing</button>
      </form>

      <h3 style={{marginTop:20}}>Your Listings</h3>
      <CarGrid cars={items} />
    </section>
  )
}