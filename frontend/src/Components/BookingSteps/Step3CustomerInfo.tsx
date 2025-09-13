import React from 'react'
import "./Steps.css";

type Props = {
    onPrev: () => void;
}

const Step3CustomerInfo = ({onPrev}: Props) => {
  return (
    <div className ="step-content">
        <h1>Fyll i uppgifter</h1>

      <div className="step-btn-container">
        <button className="btn-prev" onClick={onPrev}>Tillbaka</button>
        <button className="btn-next">Boka</button>
      </div>
        
    </div>
  )
}

export default Step3CustomerInfo