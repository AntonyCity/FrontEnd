import Login from './views/login.tsx'
import Offres from './views/offres.tsx'
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
      </div>
      </nav>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/offres" element={<Offres />} />
        <Route path="/" element={<Home />} />
      </Routes>
      </Router>
    </>
  )
}

export default App