import Login from './views/login.tsx'
import Offres from './views/offres.tsx'
import Home from './views/home.tsx'
import CvAnalyse from './views/CvAnalyse.tsx'
import NavBar from './components/NavBar.js';
import SideBar from './components/SideBar.tsx';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
    <Router>
        <NavBar />
      <main>
        <SideBar />
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/offres" element={<Offres />} />
        <Route path='/cv-analyse' element={<CvAnalyse />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      </main>
      </Router>
    </>
  )
}

export default App