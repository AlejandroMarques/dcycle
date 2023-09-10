import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import './Charts.css'
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Gráfico tipo tarta
 * @param {Object} chartData Datos que se van a mostrar en el gráfico
 * @returns {any}
 */
const PieChart = ({ chartData }) => {
  const chartOptions = {
    responsive: true,
    plugins:{
      legend: {
        labels:{
          font: {
            size:14
          }
        },
        onHover: (event) => {
          event.native.target.style.cursor = 'pointer';
        }
      },
    }
  };


  return (
    <div className="chart-style">
      { chartData.datasets[0].data.every((value) => value === 0)?
      <h1>No hay datos disponibles</h1> : 
        <Pie
        data={chartData}
        options={chartOptions}
      />
      }
    </div>
  );
};

export default PieChart;
