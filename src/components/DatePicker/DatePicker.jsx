import React from 'react';
import './DatePicker.css';
import  {useExercise2Context} from '../../Contexts/Exercise2Provider'

const DateRangePicker = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useExercise2Context();

  const handleStartDateChange = (event) => {
    const selectedDate = event.target.value;
    setStartDate(selectedDate);
  };

  const handleEndDateChange = (event) => {
    const selectedDate = event.target.value;
    setEndDate(selectedDate);
  };

  return (
    <div className="date-range-picker">
      <div className="date-picker">
        <label>Fecha de Inicio:</label>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </div>
      <div className="date-picker">
        <label>Fecha de Fin:</label>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
