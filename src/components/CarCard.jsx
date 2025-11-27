import { Link } from 'react-router-dom'

export default function CarCard({car}){
  return (
    <div className="card">
      <div style={{borderRadius:14,overflow:'hidden',aspectRatio:'16/10',background:'#eef2ff',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <img src={car.image} alt={car.model} style={{maxWidth:'90%'}} />
      </div>
      <h3 style={{margin:'12px 0 6px 0'}}>{car.brand} {car.model}</h3>
      <div style={{color:'#6b7280',fontSize:14,marginBottom:10}}>
        {car.year} • {car.fuel} • {car.transmission}
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div><span className="badge">{car.type === 'rent' ? '₹'+car.price+'/day' : '₹'+car.price.toLocaleString()}</span></div>
        <Link to={`/booking/${car.id}`} className="btn primary">{car.type === 'rent' ? 'Rent now' : 'Book'}</Link>
      </div>
    </div>
  )
}