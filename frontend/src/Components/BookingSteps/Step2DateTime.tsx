import React from 'react'
import "./Steps.css";
import Calendar from 'react-calendar';

type Props = {
  onNext: () => void;
  onPrev: () => void;
  onChange: (value: Date) => void;
  dateValue: Date;
}

const BookingDateTime = ({onNext, onPrev, onChange, dateValue} : Props) => {
  return (
    <div className="step-content">
      <h1>Välj datum och tid</h1>
      <Calendar onChange={(v) => onChange(v as Date)} value={dateValue} selectRange={false}/>
      <button className="btn-prev" onClick={onPrev}>Tillbaka</button>
      <button className="btn-next" onClick={onNext}>Nästa</button>
    </div>
  )
}

export default BookingDateTime