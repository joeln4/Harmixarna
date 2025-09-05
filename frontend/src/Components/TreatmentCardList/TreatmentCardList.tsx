import React from "react";
import TreatmentCard from "../TreatmentCard/TreatmentCard";
import "./TreatmentCardList.css"
import { TreatmentInterface } from "../../types/Treatment.types";

interface Props {
  treatments: TreatmentInterface[];
  selectedIds: Set<string | number>;
  onAdd: (t: TreatmentInterface) => void;
  onRemove: (id: string | number) => void; //varför string | number? gjorde inte det i TreatmentCard
  error?: string | null; //varför "?"
  loading: boolean;
};

const TreatmentCardList = ({treatments, selectedIds, onAdd, onRemove, error, loading } : Props) => {
  

  return (
    <div className="treatment-card-list">
      {error && <p><strong>Fel:</strong> {error}</p>}
      {loading ? <h1>Laddar...</h1> : (
        treatments.length > 0 ? treatments.map(t => (
        <TreatmentCard 
        key={t.id} 
        treatment={t} 
        selected={selectedIds.has(t.id)}
        onAdd={() => onAdd(t)}
        onRemove={() => onRemove(t.id)}
        />)) : <p>Inga behandlingar hittades</p>) }
    </div>
  );
};

export default TreatmentCardList;
