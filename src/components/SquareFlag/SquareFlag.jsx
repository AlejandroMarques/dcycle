import React from 'react';
import './SquareFlag.css'; // Importa tu archivo CSS para estilizar el componente

function SquareFlag({country}) {
  return (
    <div className="square-flag">
      <div className="flag">
        <img
          src={`https://flagcdn.com/w320/${country.country_id.toLowerCase()}.png`}
          alt="Bandera"
          className="flag-image"
        />
        <div className="overlay" />
        <div className='text'>
          <div >{country.name}</div>
          <div >{country.probability}%</div>
        </div>
      </div>
    </div>
  );
}

export default SquareFlag;