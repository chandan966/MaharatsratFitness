import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <div className="card" style={{textAlign:'center'}}>
      <h3>404 — Page not found</h3>
      <Link to="/" className="btn primary" style={{marginTop:10}}>Back to Home</Link>
    </div>
  )
}