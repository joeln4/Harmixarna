import React from 'react'
import "./Steps.css";
import Calendar from 'react-calendar';

type Props = {
  onNext: () => void;
  onPrev: () => void;
}

const BookingDateTime = ({onNext, onPrev} : Props) => {
  return (
    <div className="step-content">
      <h1>Välj datum och tid</h1>
      <Calendar/>
      <button className="btn-prev" onClick={onPrev}>Tillbaka</button>
      <button className="btn-next" onClick={onNext}>Nästa</button>
    </div>
  )
}

export default BookingDateTime