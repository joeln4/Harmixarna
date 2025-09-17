import React from 'react'
import "./Steps.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

type Props = {
  onNext: () => void;
  onPrev: () => void;
  onChange: (value: Date) => void;
  onTime: (time: string) => void;
  dateValue: Date;
  times: string[];
  chosenTime: string | null; //För design av vald knapp
}

const Step2DateTime = ({onNext, onPrev, onChange, onTime, dateValue, times, chosenTime} : Props) => {
  return (
    <div className="step-content">
      <h1>Välj datum och tid</h1>
      <Calendar onChange={(v) => onChange(v as Date)} value={dateValue} selectRange={false}/>
      <div className="times-div">
        {times.length > 0 ? times.map(t => (
          <button onClick={() =>onTime(t)}key={t}>{t}</button>
        )) : <p>Inga lediga tider.</p>}   
      </div>
      <div className="step-btn-container">
        <button className="btn-prev" onClick={onPrev}>Tillbaka</button>
        <button className="btn-next" onClick={onNext} disabled={!chosenTime}>Nästa</button>
      </div>
    </div>
  )
}

export default Step2DateTime