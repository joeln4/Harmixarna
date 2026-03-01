import { TreatmentInterface } from "../types-temp/treatment.temp.types";

export function TotalTreatmentPrice (treatments: TreatmentInterface[]) {
  return treatments.reduce((sum, t) => sum + t.price, 0);
}