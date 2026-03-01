import React, { useEffect } from "react";
import { TreatmentInterface } from "../../types/treatment.types";
import { useState } from "react";
import TreatmentCardList from "../TreatmentCardList/TreatmentCardList";
import "./Steps.css";
import FetchTreatments from "../../api/fetchTreatments";

type Props = {
  selectedIds: Set<string | number>; // Id:n för valda behandlingar i den temporära listan
  onAdd: (t: TreatmentInterface) => void; // Callback för att lägga till en behandling i temporär lista
  onRemove: (id: string | number) => void; // Callback för att ta bort en behandling ur temporär lista
  onNext: () => void; // Går vidare till nästa steg i bokningsflödet
};

/**
 * Step1Treatments – Första steget i bokningsflödet.
 * Hämtar alla behandlingar från API:t och visar dem i en lista,
 * med hjälp av TreatmentCardList och TreatmentCard.
 * Användaren kan välja behandlingar och gå vidare.
 */
const Step1Treatments = ({ selectedIds, onAdd, onRemove, onNext }: Props) => {
  const [treatments, setTreatments] = useState<TreatmentInterface[]>([]); // Listan med hämtade behandlingar från API:t
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hämta behandlingar från API vid första render
  useEffect(() => {
    FetchTreatments()
      .then((data) => setTreatments(data))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="step-content">
      <h1>Välj behandlingar</h1>
      <div className="inner-content">
        <TreatmentCardList
          treatments={treatments}
          selectedIds={selectedIds}
          onAdd={onAdd}
          onRemove={onRemove}
          error={error}
          isLoading={isLoading}
        >
          <div className="list-footer">
            <button
              className="btn-next"
              onClick={onNext}
              disabled={selectedIds.size === 0}
            >
              Nästa
            </button>
          </div>
        </TreatmentCardList>
      </div>
    </div>
  );
};

export default Step1Treatments;
