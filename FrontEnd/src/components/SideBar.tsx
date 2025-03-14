import { useLocation } from 'react-router-dom';

const SideBar = () => {
  const location = useLocation(); // Get the current route

  // Hide the sidebar when on the home page ("/")
  if (location.pathname === '/') {
    return null;
  }

  return (
    <aside className="sideBar">
      <ul className="sideBar__menu">
        <li className="sideBar__item"><a href="/">Dashboard</a></li>
        <li className="sideBar__item"><a href="/cv-analyse">Management CV</a></li>
        <li className="sideBar__item"><a href="/offres">Nouvelles annonces</a></li>
      </ul>
    </aside>
  );
};

export default SideBar;
