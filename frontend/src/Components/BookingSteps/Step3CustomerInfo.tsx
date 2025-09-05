import React from 'react'

type Props = {
    onPrev: () => void;
}

const Step3CustomerInfo = ({onPrev}: Props) => {
  return (
    <div className ="s3">
        <h1>Fyll i uppgifter</h1>
        <button className="btn-prev" onClick={onPrev}>Tillbaka</button>
        <button>Boka</button>
    </div>
  )
}

export default Step3CustomerInfo