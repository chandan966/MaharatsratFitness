import { useMemo, useState } from 'react'
import CarGrid from '../components/CarGrid.jsx'
import cars from '../data/cars.js'

export default function Buy(){
  const [q, setQ] = useState('')
  const items = useMemo(() => cars.filter(c => c.type==='buy' && (c.brand+c.model).toLowerCase().includes(q.toLowerCase())), [q])
  return (
    <section>
      <h2>Buy Cars</h2>
      <input className="input" placeholder="Search brand or model..." value={q} onChange={e=>setQ(e.target.value)} style={{margin:'10px 0 16px 0'}}/>
      <CarGrid cars={items} />
    </section>
  )
}