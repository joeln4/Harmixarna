import { TreatmentInterface } from "../types/treatment.types";

async function fetchTreatments (): Promise<TreatmentInterface[]> {
  const res =  await fetch("https://localhost:8000/api/treatment", {
    method: "GET",
  });
  if(!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`); 
  }

  return res.json();
}

export default fetchTreatments;