export default function Footer(){
  return (
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
      <div>© {new Date().getFullYear()} CarRental — Buy | Sell | Rent</div>
      <div style={{display:'flex',gap:10}}>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Support</a>
      </div>
    </div>
  )
}