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
import { useExercise2Context } from "../../Contexts/Exercise2Provider";
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

  const dates = data.filter((dayData) => dateInRange(dayData.date)).map((dayData) => new Date(dayData.date).toLocaleString().split(",")[0]);
  const hospitalizations = data.filter((dayData) => dateInRange(dayData.date)).map((dayData) => dayData.outcomes.hospitalized.currently.value);
  const cases = data.filter((dayData) => dateInRange(dayData.date)).map((dayData) => dayData.cases.total.value);
  const tests = data.filter((dayData) => dateInRange(dayData.date)).map((dayData) => dayData.testing.total.value);
  const deaths = data.filter((dayData) => dateInRange(dayData.date)).map((dayData) => dayData.outcomes.death.total.value);
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
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
      },
      legend: {
        labels: {
          font: {
            size: 14,
          },
        },
        onHover: (event) => {
          event.native.target.style.cursor = "pointer";
        },
      },
    },
    radius: "0",
  };
  return (
    <div
      className="chart-style"
      style={{ width: "80vw", margin: "0 auto" }}>
      <Line
        data={chartData}
        options={chartOptions}
        style={{ width: "100vw", height: "800px" }}
      />
    </div>
  );
};

export default LineChart;
