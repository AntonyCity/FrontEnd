import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo-banner.svg'


const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("sessionData"); // Remove the session data
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navBar">
      <div className="navBar__logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="navBar__actions">
        <button className="navBar__logout" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
