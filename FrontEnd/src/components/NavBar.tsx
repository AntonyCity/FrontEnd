import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo-banner.svg';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const handleLogout = () => {
    sessionStorage.removeItem('sessionData');
    navigate('/');
  };

  return (
    <nav className="navBar">
      <div className="navBar__logo">
        <Link to="/home">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="navBar__actions">
        {/* Hide the logout button when on the home page ("/") */}
        {location.pathname !== '/' && (
          <button className="navBar__logout" onClick={handleLogout}>
            Déconnexion
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
