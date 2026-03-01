import { TreatmentInterface } from "../types-temp/treatment.temp.types";

async function fetchTreatments (): Promise<TreatmentInterface[]> {
  const res =  await fetch("http://localhost:5296/api/treatment", {
    method: "GET",
  });
  if(!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`); 
  }

  return res.json();
}

export default fetchTreatments;