import React, { useState } from "react";
import './Button.css'
/**
 * 
 * @param {Boolean} disabled Indica si el botón está activo o no
 * @param {Function} onClick Función que se llama en cada click
 * @param {Object} style Estilos inline para modificar la apariencia del botón
 * @param {*} content Contenido del botón, puede ser un texto, imagen, html...
 * @returns 
 */
const Button = ({disabled=false, onClick, style, content}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={style}
      className="my-button"
    >
      {content}
    </button>
  );
};
export default Button;