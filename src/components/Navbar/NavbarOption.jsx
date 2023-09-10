import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

/**
 * Componente para generar cada link de la Navbar
 * @param {Function} onClick Función que se ejecuta al hacer click
 * @param {Function} setTitle Función para cambiar el título
 * @param {String} title Nombre de la página
 * @param {String} path URL de la página
 * @returns {JSX} Componente
 */
const NavbarOption = ({ onClick, setTitle, title, path }) => {
  const handleTitleValue = () => {
    setTitle(title);
  };
  return (
      <NavLink
        id={window.location.pathname === path ? "active" : ""}
        to={path}
        onClick={() => {
          handleTitleValue();
          if (onClick) {
            onClick();
          }
        }}
      >
        <div id="title">{title}</div>
      </NavLink>
  );
};

export default NavbarOption;