import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Buy from './pages/Buy.jsx'
import Sell from './pages/Sell.jsx'
import Rent from './pages/Rent.jsx'
import Services from './pages/Services.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Profile from './pages/Profile.jsx'
import Booking from './pages/Booking.jsx'
import NotFound from './pages/NotFound.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

export default function App(){
  return (
    <AuthProvider>
      <div className="nav">
        <div className="container nav-inner">
          <Navbar/>
        </div>
      </div>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/buy" element={<Buy/>} />
          <Route path="/sell" element={<Sell/>} />
          <Route path="/rent" element={<Rent/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/booking/:id" element={<Booking/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          <Footer/>
        </div>
      </footer>
    </AuthProvider>
  )
}