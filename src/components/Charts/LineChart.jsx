import React from "react";
import { Line } from "react-chartjs-2";
import "./Charts.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useExercise2Context } from '../../Contexts/Exercise2Provider';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
const LineChart = ({ data }) => {
  const { startDate, endDate, dateInRange } = useExercise2Context();
  // Extraer fechas, casos, muertes, hospitalizaciones y pruebas
  const dates = data
    .map((dayData) => {if(dateInRange((dayData.date))) return new Date(dayData.date).toLocaleString().split(",")[0]})
    .sort(({ date: a }, { date: b }) => (a < b ? -1 : a > b ? 1 : 0));
  const hospitalizations = data.map(
    (dayData) =>{if(dateInRange(dayData.date)) return dayData.outcomes.hospitalized.currently.value}
  );
  const cases = data.map(
    (dayData) => {if(dateInRange(dayData.date)) return dayData.cases.total.value/10}
  );
  const tests = data.map(
    (dayData) => {if(dateInRange(dayData.date)) return dayData.testing.total.value/100}
  );
  const deaths = data.map((dayData) => {if(dateInRange(dayData.date)) return dayData.outcomes.death.total.value});
  console.log(data)
  function convertDateFormat(inputDate) {
    const dateParts = inputDate.split('-');
    if (dateParts.length === 3) {
      const year = dateParts[0];
      const month = dateParts[1];
      const day = dateParts[2];
      return `${day}/${month}/${year}`;
    } else {
      return 'Fecha inválida';
    }
  }
  
  // Configuración de los datos del gráfico
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "🧪 Tests x100 ",
        borderColor: "rgba(0, 0, 255, 1)",
        data: tests,
      },
      {
        label: "😷 Casos Totales x10",
        borderColor: "rgba(255, 0, 0, 1)",
        data: cases,
      },
      {
        label: "🚑 Hospitalizaciones",
        borderColor: "rgba(0, 255, 0, 1)",
        data: hospitalizations,
      },
      {
        label: "☠️ Muertes Totales",
        borderColor: "rgba(0, 0, 0, 1)",
        data: deaths,
      },
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
      },
      legend: {
        labels:{
          font: {
            size:14
          },
        },
        onHover: (event) => {
          event.native.target.style.cursor = 'pointer';
        }
      },
    },
    radius:"0",
    scales: {
      x: {
        min: (startDate),
        max: (endDate),
      },
    }
  };

  return (
    <div className="chart-style" style={{ width: "80vw", margin: "0 auto" }}>
      <Line data={chartData} options={chartOptions} style={{ width: "100vw", height: "800px" }} />
    </div>
  );
};

export default LineChart;
