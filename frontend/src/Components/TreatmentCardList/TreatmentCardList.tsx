import React from "react";
import TreatmentCard from "../TreatmentCard/TreatmentCard";
import "./TreatmentCardList.css";
import { TreatmentInterface } from "../../types/treatment.types";
import "../../Components/BookingSteps/Step1.css"

interface Props {
  treatments: TreatmentInterface[];           // Lista av behandlingar att visa, skickas från föräldern Step1Treatments.
  selectedIds: Set<string | number>;          // Id:n för de behandlingar som är valda
  onAdd: (t: TreatmentInterface) => void;     // Callback när en behandling läggs till i temporär lista
  onRemove: (id: string | number) => void;    // Callback när en behandling tas bort från temporär lista
  error?: string | null;                      // returnerar felmeddelande om något gått snett eller null
  isLoading: boolean;                           // Om listan laddar data just nu
  children?: React.ReactNode;
};

/**
 * TreatmentCardList – Visar en lista med behandlingar.
 * Hanterar också loading-state, felmeddelanden och tom lista.
 */
const TreatmentCardList = ({treatments, selectedIds, onAdd, onRemove, error, isLoading, children} : Props) => {
  return (
    <div className="treatment-card-list">

      {/* Felmeddelande om API/data hämtning misslyckades */}
      {error && <p><strong>Fel:</strong> {error}</p>}
      
      {/* Laddningsindikator och kontroll om listan är tom, annars visa behandlingarna  */}
      {isLoading ? <h1>Laddar...</h1> : (
        treatments.length > 0 ? treatments.map(t => (
        <TreatmentCard 
        key={t.id} 
        treatment={t} 
        isSelected={selectedIds.has(t.id)} // Markerar om just denna behandling är vald
        onAdd={() => onAdd(t)}
        onRemove={() => onRemove(t.id)}
        />)) : <p>Inga behandlingar hittades</p>) }
        {children}
    </div>
  );
};

export default TreatmentCardList;
