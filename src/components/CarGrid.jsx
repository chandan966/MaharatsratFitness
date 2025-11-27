import CarCard from './CarCard.jsx'

export default function CarGrid({cars}){
  return (
    <div className="grid">
      {cars.map(c => <CarCard key={c.id} car={c} />)}
    </div>
  )
}