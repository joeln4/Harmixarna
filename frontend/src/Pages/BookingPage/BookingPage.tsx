import React, { useState, useMemo } from "react";
import "./BookingPage.css";
import Step1Treatments from "../../Components/BookingSteps/Step1Treatments";
import Step2DateTime from "../../Components/BookingSteps/Step2DateTime";
import Step3CustomerInfo, {
  FormFields,
} from "../../Components/BookingSteps/Step3CustomerInfo";
import { TreatmentInterface } from "../../types/Treatment.types";
import { formatDate } from "../../lib/date";
import fetchAvailability from "../../api/availability";
import { BookingRequestInfo } from "../../types/booking.types";
import bookingRequest from "../../api/bookingRequest";
/**
 * BookingPage – Huvudsidan för bokningsflödet.
 * Hanterar de tre stegen:
 *  1. Välj behandlingar
 *  2. Välj datum/tid
 *  3. Kundinformation
 *
 * Ansvarar för state (den temporära listan av valda behandlingar + aktuellt steg i bokningsflödet),
 * och skickar vidare props till respektive stegkomponent.
 */

function BookingPage() {
  const [step, setStep] = useState<number>(0); // Håller koll på vilket steg användaren befinner sig i (0, 1, 2)
  const [selectedTreatments, setSelectedTreatments] = useState<
    TreatmentInterface[]
  >([]); // Alla behandlingar som användaren har valt (den temporära listan)
  const [date, setDate] = useState<Date>(new Date()); // Datumet som väljs i kalendern
  const [times, setTimes] = useState<string[]>([]); // Alla tider som hämtas från api
  const [chosenTime, setChosenTime] = useState<string | null>(null); // Den valda tiden

  // Skapar en Set med valda id:n för enkel kontroll om en behandling är vald
  // useMemo: skapa Set av valda id:n bara när selectedTreatments ändras,
  // för att inte ska ny Set vid varje rendering
  const selectedIds = useMemo(
    () => new Set(selectedTreatments.map((t) => t.id)),
    [selectedTreatments]
  );

  // Lägg till behandling om den inte redan är vald
  const addTreatment = (t: TreatmentInterface) => {
    if (!selectedIds.has(t.id)) {
      setSelectedTreatments((prev) => [...prev, t]);
    }
  };

  // Ta bort behandling baserat på id
  const removeTreatment = (id: string | number) => {
    setSelectedTreatments((prev) => prev.filter((t) => t.id !== id));
  };

  // Gå vidare till nästa steg (endast om man är på steg 0 eller 1)
  const nextStep = () => {
    if (step === 0 || step === 1) {
      setStep(step + 1);
    }
  };

  // Gå tillbaka till föregående steg (endast om man är på steg 1 eller 2)
  const prevStep = () => {
    if (step === 1) {
      setTimes([]);
      setChosenTime(null);
    }

    if (step === 1 || step === 2) {
      setStep(step - 1);
    }
  };

  const handleDateChange = async (date: Date) => {
    const ids = selectedTreatments.map((t) => t.id);

    const dateString = formatDate(date);
    console.log("Valt datumvärde:", dateString);

    setDate(date);
    setTimes([]);
    setChosenTime(null);

    try {
      const result = await fetchAvailability(dateString, ids); // Id på behandlingar för att räkna ut duration i backend
      console.log("resultat från backend:", result);
      console.log("id:n:", ids);
      setTimes(result);
      console.log("times:", result);
    } catch (err) {
      console.log("fel vid hämnting av tider:", err);
      setTimes([]);
      setChosenTime(null);
    }
  };

  //Sparar den valda tiden
  const handleTimeChange = (time: string) => {
    setChosenTime(time);
  };

  //Tar in värdena från kundformuläret och försöker skapa bokning
  const handleCreateBooking = async (customerData: FormFields) => {
    //Endast kontroll för om det skulle ske någon bugg
    if (selectedTreatments.length === 0 || !chosenTime || !date) {
      console.error("Saknar data för att skapa bokning!");
      return;
    }

    const ids = selectedTreatments.map((t) => t.id);
    const dateString = formatDate(date);

    const values: BookingRequestInfo = {
      date: dateString,
      time: chosenTime,
      treatments: ids,
      message: customerData.message,
      customer: {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
      },
    };

    try {
      await bookingRequest(values);
      console.log("Bokningen lyckades!")
    } catch (err) {
      console.log("Det gick inte att skapa bokning:", err);
    }
  };

  // Rendera olika steg baserat på "step"-state (alltså 0, 1 eller 2)
  if (step === 0) {
    return (
      <div className="bf-container">
        <Step1Treatments
          selectedIds={selectedIds}
          onAdd={addTreatment}
          onRemove={removeTreatment}
          onNext={nextStep}
        />
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="bf-container">
        <Step2DateTime
          onNext={nextStep}
          onPrev={prevStep}
          onChange={handleDateChange}
          onTime={handleTimeChange}
          dateValue={date}
          times={times}
          chosenTime={chosenTime}
        />
      </div>
    );
  }

  return (
    <div className="bf-container">
      <Step3CustomerInfo
        onPrev={prevStep}
        onSubmitCustomer={handleCreateBooking}
      />
    </div>
  );
}

export default BookingPage;
