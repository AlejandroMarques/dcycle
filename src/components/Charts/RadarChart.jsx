import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import "./Charts.css";
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

/**
 * Gráfico de tipo Radar
 * @param {Object} data Datos que se van a monstrar en el gráfico
 * @param {Object} options Opciones de configuracion del gráfico
 * @returns {any}
 */
const RadarChart = ({ data }) => {
  const options = {
    plugins: {
      legend:{
        display: false
      },
    },
    scales: {
      r: {
        pointLabels: {
          font: {
            size: 16
          }
        }
      }
    }
    
  };

  return (
    <div className="chart-style">
      <Radar
        data={data}
        options={options}
      />
    </div>
  );
};

export default RadarChart;
