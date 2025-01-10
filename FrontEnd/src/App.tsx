import Login from './views/login.tsx'
import Offres from './views/offres.tsx'
import User from './views/user.tsx'
import Home from './views/home.tsx'
import logo from './assets/images/logo-banner.png'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {

  return (
    <>
    <Router>
      <nav>
        <Link to="/">
        <img src={logo} alt="" />
      </Link>
      <div>
        <Link  to="/login">Login </Link>
        <Link  to="/offres">offres </Link>
        <Link  to="/user">user </Link>
      </div>
      </nav>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/offres" element={<Offres />} />
        <Route path="/" element={<Home />} />
      </Routes>
      </Router>
    </>
  )
}

export default App