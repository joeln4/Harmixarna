import { TreatmentInterface } from "../types/Treatment.types";

export function TotalTreatmentPrice (treatments: TreatmentInterface[]) {
  return treatments.reduce((sum, t) => sum + t.price, 0);
}