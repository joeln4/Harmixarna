import { TreatmentInterface } from "../types/treatment.types";

async function FetchTreatments (): Promise<TreatmentInterface[]> {
  const res =  await fetch("http://localhost:5296/api/treatment", {
    method: "GET",
  });
  if(!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`); 
  }

  return res.json();
}

export default FetchTreatments;