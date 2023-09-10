import React, { createContext, useContext, useState } from 'react';

const Exercise2 = createContext();

export const Exercise2Provider = ({ children }) => {
  const [startDate, setStartDate] = useState('2020-01-01');
  const [endDate, setEndDate] = useState('2021-03-07')

  const dateInRange = (currentDate) => {
    const partesFecha = currentDate.split("-");
    const partesFechaInicio = startDate.split("-");
    const partesFechaFin = endDate.split("-");

    const fechaObj = new Date(partesFecha[0], partesFecha[1] - 1, partesFecha[2]);
    const fechaInicioObj = new Date(partesFechaInicio[0], partesFechaInicio[1] - 1, partesFechaInicio[2]);
    const fechaFinObj = new Date(partesFechaFin[0], partesFechaFin[1] - 1, partesFechaFin[2]);

    return fechaObj >= fechaInicioObj && fechaObj <= fechaFinObj;
  };
  return (
    <Exercise2.Provider value={{startDate, setStartDate, endDate, setEndDate, dateInRange }}>
      {children}
    </Exercise2.Provider>
  );
};
export const useExercise2Context = () => useContext(Exercise2);