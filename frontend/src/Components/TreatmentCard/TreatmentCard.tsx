import React from "react";
import "./TreatmentCard.css";
import {TreatmentInterface} from "../../types/Treatment.types";
import { formatDuration } from "../../lib/Time";

interface Props {
  treatment: TreatmentInterface;
  isSelected: boolean;                // Om behandlingen är vald eller inte
  onAdd: () => void;                // Callback för att lägga till behandling i temporär lista
  onRemove: () => void;             // Callback för att ta bort behandling i temporär lista
};

/**
 * TreatmentCard – Visar information om en behandling
 * och låter användaren lägga till eller ta bort den.
 */
const TreatmentCard = ({treatment, isSelected, onAdd, onRemove}: Props) => {
  return (
    <div className="treatment-card">
      <div className="tc-content">
        <p className="tc-title">{treatment.type}</p>
        <div className="tc-details">
          <span className="tc-duration">{formatDuration(treatment.duration)}</span>
          <span className="tc-price">{treatment.price}</span>
        </div>
      </div>
      
      <div className="tc-btn-cont">
        <span className={`selected-text ${isSelected ? "is-shown" : ""}`}>Tillagd ✓</span>
        <button className={isSelected ? "tc-btn-remove" : "tc-btn-add"} onClick={isSelected ? onRemove : onAdd}>
          {isSelected ? "Ta bort" : "Lägg Till"}
        </button>
      </div>
    </div>
  );
};

export default TreatmentCard;
