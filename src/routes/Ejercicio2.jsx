import React, { useState, useEffect } from "react";
import "./Ejercicio.css";
import CovidTable from "../components/CovidTable/CovidTable";
import LineChart from "../components/Charts/LineChart";
import Button from "../components/Button/Button";
import Totals from "../components/Totals/Totals";
import DateRangePicker from "../components/DatePicker/DatePicker";
import { Exercise2Provider } from "../Contexts/Exercise2Provider";
const Ejercicio2 = () => {
  const [covidData, setCovidData] = useState([]);
  const [chartType, setChartType] = useState("line");

  useEffect(() => {
    const fetchData = async () => {
      fetch(`${process.env.REACT_APP_APIURL}/api/covid/historical`)
        .then((response) => response.json())
        .then((data) => setCovidData(data.data.reverse()));
    };

    fetchData();
  }, []);

  const handleChangeChartType = (type) => {
    setChartType(type);
  };

  const buttonStyle = {height:'42px'}

  return (
    <div className="exercise-container-2">
      <Exercise2Provider>
        <h1>Impacto del COVID-19 en Estados Unidos</h1>

        {/* Botones para cambiar el tipo de gráfico */}
        <div className="chart-buttons">
      <DateRangePicker />
          <Button
            onClick={() => handleChangeChartType("line")}
            content="Línea Temporal"
            style={buttonStyle}
          />
          <Button
            onClick={() => handleChangeChartType("totals")}
            content="Totales"
            style={buttonStyle}
          />
          <Button
            onClick={() => handleChangeChartType("table")}
            content="Tabla"
            style={buttonStyle}
          />
        </div>
        <div className="chart">
          {/* Visualización de datos */}
          {chartType === "line" && <LineChart data={covidData} />}
          {chartType === "totals" && <Totals data={covidData} />}
          {chartType === "table" && <CovidTable covidData={covidData} />}
        </div>
      </Exercise2Provider>
    </div>
  );
};

export default Ejercicio2;
