import React from "react";
import {useState, useEffect} from "react";
import TreatmentCard from "../TreatmentCard/TreatmentCard";
import "./TreatmentCardList.css"

type Props = {};

interface Treatment {
    id: number;
    type: string;
    price: number;
    description: string;
    duration: string;
  }

function TreatmentCardList () {
  const [treatments, setTreatments] = useState<Treatment[]>([])
  const [error, setError] = useState({})

  useEffect(() => {
    fetch("http://localhost:5296/api/treatment")
    .then(res => res.json())
    .then(data => setTreatments(data))
    .catch(error => setError(error))
  }, [])
  return (
    <div className="TreatmentCardList">
      {treatments.length > 0 ? treatments.map((treatment:Treatment) => (
        <TreatmentCard key={treatment.id} treatment={treatment} />)) : "Loading..."}
    </div>
  );
}


export default TreatmentCardList;
