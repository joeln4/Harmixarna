import React from "react"
import {useState} from "react"
import TreatmentCardList from "../Components/TreatmentCardList/TreatmentCardList";


function BookingFlow() {
    const [step, setStep] = useState<number>(0);

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
        <div>
            <h1>Välj Behandlingar</h1>
            <TreatmentCardList/>
        </div>
        )
     
    }

    return (
        <h1>Tjo</h1>
    )
  
}

export default BookingFlow