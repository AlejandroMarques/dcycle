import React, {useState, useEffect} from 'react'
import PieChart from '../Charts/PieChart';
import RadarChart from '../Charts/RadarChart';
import './Totals.css'
import { useExercise2Context } from '../../Contexts/Exercise2Provider';
const Totals = ({data}) => {
  const { startDate, endDate, dateInRange } = useExercise2Context();
  const [hospitalizations, setHospitalizations] = useState([0, 0, 0]);
  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [tests, setTests] = useState(0);

  useEffect(() => {
    const totals = {
      onVentilator: 0,
      inIcu: 0,
      other: 0,
      
    };

    data.forEach((item) => {
      if (!dateInRange(item.date)) {
        return;
      }
      totals.inIcu += item.outcomes.hospitalized.in_icu.currently.value;
      totals.onVentilator +=
      item.outcomes.hospitalized.on_ventilator.currently.value;
      totals.other +=
      item.outcomes.hospitalized.currently.value -
      item.outcomes.hospitalized.in_icu.currently.value -
      item.outcomes.hospitalized.on_ventilator.currently.value;
      setCases(item.cases.total.value)
      setDeaths(item.outcomes.death.total.value)
      setTests(item.testing.total.value)
    });
    setHospitalizations(Object.values(totals));
  }, [startDate, endDate]);

  // Configuración de los datos de los gráficos
  const pieChartData = {
    labels: ["Respirador", "UCI", "Resto"],
    datasets: [
      {
        data: hospitalizations,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const radarData = {
    labels: ["☠️", "😷", "🚑", "🧪x20"],
      datasets: [
        {
          label: "Cantidad",
          data: [deaths, cases, hospitalizations.reduce((anterior, actual) => anterior + actual, 0), tests/20],
          backgroundColor: "#7fffd46b",
          borderColor: "aquamarine",
          borderWidth: 1
        },
      ],
  }

  return (
    <>
      <div className='chart-container'>
        <h3>Estadísticas generales COVID-19</h3>
        <RadarChart data={radarData} />
      </div>
      <div className='chart-container'>
        <h3>Tipos de hospitalizaciones</h3>
        <PieChart chartData={pieChartData}/>
      </div>
    </>
  )
}

export default Totals