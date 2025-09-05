import React from 'react'

type Props = {
  onNext: () => void;
  onPrev: () => void;
}

const BookingDateTime = ({onNext, onPrev} : Props) => {
  return (
    <div className="s2">
      <h1>Välj datum och tid</h1>
      <button className="btn-prev" onClick={onPrev}>Tillbaka</button>
      <button className="btn-next" onClick={onNext}>Nästa</button>
    </div>
  )
}

export default BookingDateTime