import React from "react";
import {useState, useEffect} from "react";
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
  }, [])
  return (
    <div className="treatment-card-list">
      {error && <p><strong>Fel:</strong> {error}</p>}
      {treatments.length > 0 ? treatments.map(t => (
        <TreatmentCard key={t.id} treatment={t} />)) : <h1>Laddar...</h1>}
    </div>
  );
};

export default TreatmentCardList;
