import React from 'react';

const SideBar = () => {
  return (
    <aside className="sideBar">
      <ul className="sideBar__menu">
        <li className="sideBar__item">Dashboard</li>
        <li className="sideBar__item">Management CV</li>
        <li className="sideBar__item">Nouvelles annonces</li>
      </ul>
    </aside>
  );
};

export default SideBar;
