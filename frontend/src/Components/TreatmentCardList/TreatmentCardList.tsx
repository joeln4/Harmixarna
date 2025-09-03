import React from "react";
import {useState, useEffect, useMemo} from "react";
import TreatmentCard from "../TreatmentCard/TreatmentCard";
import "./TreatmentCardList.css"
import { TreatmentInterface } from "../../types/Treatment.types";

const TreatmentCardList = () => {
  const [treatments, setTreatments] = useState<TreatmentInterface[]>([])
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5296/api/treatment")
    .then(res => res.json())
    .then(data => setTreatments(data))
    .catch(error => setError(error.message))
  }, []);

  const [selectedTreatments, setSelectedTreatments] = useState<TreatmentInterface[]>([])

  const selectedIds = useMemo(
    () => new Set(selectedTreatments.map(t => t.id)),
    [selectedTreatments]
  );

  const add = (t: TreatmentInterface) => {
    if(!selectedIds.has(t.id)){
      setSelectedTreatments(prev => [...prev, t]);
    }
  };

  const remove = (id: string | number) => {
    setSelectedTreatments(prev => prev.filter(t => t.id !== id));
  };


  return (
    <div className="treatment-card-list">
      {error && <p><strong>Fel:</strong> {error}</p>}
      {treatments.length > 0 ? treatments.map(t => (
        <TreatmentCard 
        key={t.id} 
        treatment={t} 
        selected={selectedIds.has(t.id)}
        onAdd={() => add(t)}
        onRemove={() => remove(t.id)}
        />)) : <h1>Laddar...</h1>}
    </div>
  );
};

export default TreatmentCardList;
