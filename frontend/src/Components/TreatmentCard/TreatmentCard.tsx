import React from "react";
import "./TreatmentCard.css";
import {TreatmentInterface} from "../../types/Treatment.types";

interface Props {
  treatment: TreatmentInterface;
}

const TreatmentCard = ({treatment}: Props) => {
  return (
    <div className="treatment-card">
      <div className="tc-content">
        <p className="tc-title">{treatment.type}</p>
        <div className="tc-details">
          <span className="tc-duration">{treatment.duration}</span>
          <span className="tc-price">{treatment.price}</span>
        </div>
        <p className="tc-description">{treatment.description}</p>
      </div>

      <button className="tc-btn-add">Lägg Till</button>
    </div>
  );
};

export default TreatmentCard;
