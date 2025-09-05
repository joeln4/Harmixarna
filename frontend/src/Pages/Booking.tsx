import React, { useMemo } from "react"
import {useState} from "react"
import Step2DateTime from "../Components/BookingSteps/Step2DateTime";
import Step1Treatments from "../Components/BookingSteps/Step1Treatments";
import "./Booking.css"
import Step3CustomerInfo from "../Components/BookingSteps/Step3CustomerInfo";
import { TreatmentInterface } from "../types/Treatment.types";


function BookingFlow() {
  const [step, setStep] = useState<number>(0);
  const [selectedTreatments, setSelectedTreatments] = useState<TreatmentInterface[]>([])

  const selectedIds = useMemo(
    () => new Set(selectedTreatments.map(t => t.id)),
    [selectedTreatments]
  );

  const addTreatment = (t: TreatmentInterface) => {
    if(!selectedIds.has(t.id)){
      setSelectedTreatments(prev => [...prev, t]);
    }
  };

  const removeTreatment = (id: string | number) => {
    setSelectedTreatments(prev => prev.filter(t => t.id !== id));
  };

  const nextStep = () => {
    if(step === 0 || step === 1){
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if(step === 1 || step === 2) {
      setStep(step - 1)
    }
  }

    if(step === 0){
        return (
        <div className="bf-container">
            <Step1Treatments
              selectedIds={selectedIds}
              onAdd={addTreatment}
              onRemove={removeTreatment}
              onNext={nextStep}
            />
        </div>
        )
     
    }

    if(step === 1){
        return(
            <div className="bf-container">
              <Step2DateTime
                onNext={nextStep}
                onPrev={prevStep}
              />
            </div>
        )
    }

    return (
      <div className="bf-container">
        <Step3CustomerInfo
          onPrev={prevStep}
        />
      </div>
    )
  
}

export default BookingFlow