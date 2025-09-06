import React, {useEffect} from 'react'
import { TreatmentInterface } from '../../types/Treatment.types'
import {useState} from "react"
import TreatmentCardList from '../TreatmentCardList/TreatmentCardList';
import "./Steps.css";

type Props = {
    selectedIds: Set<string | number>;
    onAdd: (t: TreatmentInterface) => void;
    onRemove: (id: string | number) => void;
    onNext: () => void;
}

const Step1Treatments = ({selectedIds, onAdd, onRemove, onNext}: Props) => {
  const [treatments, setTreatments] = useState<TreatmentInterface[]>([])
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("http://localhost:5296/api/treatment")
    .then(res => res.json())
    .then(data => setTreatments(data))
    .catch(error => setError(error.message))
    .finally(() => setLoading(false));
  }, []);

  return (
    <div className="step-content">
      <h1>Välj behandlingar</h1>
      <TreatmentCardList
        treatments={treatments}
        selectedIds={selectedIds}
        onAdd={onAdd}
        onRemove={onRemove}
        error={error}
        loading={loading}
      />

      <div className="btn-next-container">
        <button className="btn-next" onClick={onNext} disabled={selectedIds.size === 0}>Nästa</button>
      </div> 
    </div>
  );
};

export default Step1Treatments