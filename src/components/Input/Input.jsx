import React from "react";
import "./Input.css";
/** Input Component
 * @param {String} name nombre del Input
 * @param {String} type Tipo del Input (text, password, email, color...), por defecto es 'text'
 * @param {String} placeholder Texto de ejemplo, por defecto es 'Texto'
 * @param {Function} onChange Función que se realiza al cambiar el valor del Input
 * @param {String} value Valor del Input, por defecto es ''
 * @param {Boolean} activeLabel Mostrar la etiqueta, por defecto es true
 * @param {String} label Texto de la etiqueta, por defecto es 'Texto'
 * @return {JSX} Devuelve el componente Input
 **/
const Input = ({
  name,
  type = "text",
  placeholder = "Texto",
  onChange,
  value = "",
  activeLabel = true,
  label = "Texto",
}) => {
  return (
    <div className="input-container">
      {activeLabel === true && <label className="input-label">{label}</label>}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className={`input-${type}`}
        value={value}
      />
    </div>
  );
};

export default Input;
