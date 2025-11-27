import { useMemo, useState } from 'react'
import CarGrid from '../components/CarGrid.jsx'
import cars from '../data/cars.js'

export default function Rent(){
  const [price, setPrice] = useState('')
  const items = useMemo(() => cars.filter(c => c.type==='rent' && (!price || c.price <= Number(price))), [price])
  return (
    <section>
      <h2>Rent a Car</h2>
      <div className="form-row" style={{margin:'10px 0 16px 0'}}>
        <input className="input" placeholder="Max price per day (₹)" value={price} onChange={e=>setPrice(e.target.value)}/>
      </div>
      <CarGrid cars={items} />
    </section>
  )
}