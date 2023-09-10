import React, { useState } from 'react';
import './CovidTable.css';
import { useExercise2Context } from '../../Contexts/Exercise2Provider';

const CovidTable = ({ covidData }) => {
  const { dateInRange } = useExercise2Context();
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  function formatNumberWithDots(number) {
    if (!number) number = 0;
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
    }
  };

  const sortedData = () => {
    if (sortColumn) {
      return [...covidData].sort((a, b) => {
        const valueA = getNestedValue(a, sortColumn);
        const valueB = getNestedValue(b, sortColumn);
  
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          // Si ambos valores son números, comparar numéricamente
          return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
        } else {
          // Si uno o ambos valores son cadenas, comparar alfabéticamente
          return sortOrder === 'asc' ? String(valueA).localeCompare(String(valueB)) : String(valueB).localeCompare(String(valueA));
        }
      });
    }
    return covidData;
  };

  // Función para obtener el valor de una columna anidada
  const getNestedValue = (obj, path) => {
    const keys = path.split('.');
    return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ''), obj);
  };
  const renderSortArrow = (column) => {
    if (column === sortColumn) {
      return sortOrder === 'asc' ? '↑' : '↓';
    }
    return null;
  };

  return (
    <div style={{ margin: '0 auto', width: '75%' }}>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('date')}>
              Fecha {renderSortArrow('date')}
            </th>
            <th onClick={() => handleSort('states')}>
              Estados {renderSortArrow('states')}
            </th>
            <th onClick={() => handleSort('cases.total.value')}>
              Casos Totales {renderSortArrow('cases.total.value')}
            </th>
            <th onClick={() => handleSort('testing.total.value')}>
              Tests Totales {renderSortArrow('testing.total.value')}
            </th>
            <th onClick={() => handleSort('outcomes.hospitalized.currently.value')}>
              Hospitalizados {renderSortArrow('outcomes.hospitalized.currently.value')}
            </th>
            <th onClick={() => handleSort('outcomes.death.total.value')}>
              Muertes Totales {renderSortArrow('outcomes.death.total.value')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData().map((dayData, index) => {
            if (!dateInRange(dayData.date)) return null;
            return (
              <tr key={index}>
                <td data-cell='Fecha'>{dayData.date}</td>
                <td data-cell='Estados'>{dayData.states}</td>
                <td data-cell='Casos Totales'>😷 {formatNumberWithDots(dayData.cases.total.value)}</td>
                <td data-cell='Test Totales'>🧪 {formatNumberWithDots(dayData.testing.total.value)}</td>
                <td data-cell='Hospitalizaciones'>🚑 {formatNumberWithDots(dayData.outcomes.hospitalized.currently.value)}</td>
                <td data-cell='Muertes'>☠️ {formatNumberWithDots(dayData.outcomes.death.total.value)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CovidTable;
