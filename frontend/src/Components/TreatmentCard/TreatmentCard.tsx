import React from "react";
import "./TreatmentCard.css";
import {TreatmentInterface} from "../../types/Treatment.types";

interface Props {
  treatment: TreatmentInterface;
  selected: boolean;
  onAdd: () => void;
  onRemove: () => void;
};


const TreatmentCard = ({treatment, selected, onAdd, onRemove}: Props) => {
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
      
      <div className="tc-btn-cont">
        <span className="selected-text">{selected ? "Tillagd" : ""}</span>
        <button className={selected ? "tc-btn-remove" : "tc-btn-add"} onClick={selected ? onRemove : onAdd}>
          {selected ? "Ta bort" : "Lägg Till"}
        </button>
      </div>
    </div>
  );
};

export default TreatmentCard;
