import React from "react";
import "./TreatmentCard.css";

type Props = {
  type: string;
  price: number;
  duration: number;
  description: string;
};

const TreatmentCard = ({ type, price, duration, description }: Props) => {
  return (
    <div className="treatment-card">
      <div className="tc-content">
        <p className="tc-title">{type}</p>
        <div className="tc-details">
          <span className="tc-duration">{duration}</span>
          <span className="tc-price">{price}</span>
        </div>
        <p className="tc-description">{description}</p>
      </div>

      <button className="tc-btn-add">Lägg Till</button>
    </div>
  );
};

export default TreatmentCard;
