import React, { useState, useMemo } from "react";
import "./BookingPage.css";
import Step1Treatments from "../../Components/BookingSteps/Step1Treatments";
import Step2DateTime from "../../Components/BookingSteps/Step2DateTime";
import Step3CustomerInfo, {
  FormFields,
} from "../../Components/BookingSteps/Step3CustomerInfo";
import { TreatmentInterface } from "../../types/treatment.types";
import { formatDate } from "../../lib/date";
import fetchAvailableTimes from "../../api/fetchAvailableTimes";
import { BookingRequestInfo } from "../../types/booking.types";
import bookingRequest from "../../api/bookingRequest";
import { useNavigate } from "react-router-dom";
import fetchAvailableDays from "../../api/fetchAvailableDays";
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
  const [date, setDate] = useState<Date | null>(null); // Datumet som väljs i kalendern
  const [activeStartDate, setActiveStartDate] = useState<Date>(new Date()); // Det första datumet på den laddade sidan för att få fram år och månad.
  const [availableDays, setAvailableDays] = useState<string[]>([]); //Listan med alla tillgängliga dagar för månaden, använd för att disablea
  const [times, setTimes] = useState<string[]>([]); // Alla tider som hämtas från api
  const [chosenTime, setChosenTime] = useState<string | null>(null); // Den valda tiden
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();



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
    if (step === 0) { 
      const ids = selectedTreatments.map((t) => t.id);
      handleDateChange(new Date());
      fetchMonthAvailability(activeStartDate, ids); //Laddar kalendern så den är redo när den visas
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    }
  };

  // Gå tillbaka till föregående steg (endast om man är på steg 1 eller 2)
  const prevStep = () => {
    if (step === 1) {
      setTimes([]);
      setDate(null);
      setChosenTime(null);
      setActiveStartDate(new Date());
    } else if (step === 2){
      setChosenTime(null);
    }
      setStep(step - 1);
  };

  const handleDateChange = async (date: Date) => {
    const ids = selectedTreatments.map((t) => t.id);
    
    const dateString = formatDate(date);
    console.log("Valt datumvärde:", dateString);

    setDate(date);
    setTimes([]);
    setChosenTime(null);
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetchAvailableTimes(dateString, ids); // Id på behandlingar för att räkna ut duration i backend
      console.log("resultat från backend:", res);
      console.log("id:n:", ids);
      setTimes(res);
      console.log("times:", res);
    } catch (err: any) {
      console.log("fel vid hämnting av tider:", err);
      setError(err);
      setTimes([]);
      setChosenTime(null);
    } finally {
      setIsLoading(false);
    }
  };

  //Sparar den valda tiden
  const handleTimeChange = (time: string) => {
    setChosenTime(time);
  };

  async function fetchMonthAvailability(startDate: Date, treatmentIds: number[]) {
    console.log("startDate:", startDate);
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    setIsLoading(true);
    try {
      const res = await fetchAvailableDays({ year: year, month: month, ids: treatmentIds});
      setAvailableDays(res);
      console.log("dagar:", availableDays);
      console.log("år", year);
      console.log("månad", month);
    } catch (err: any) {
      console.log("fel vid hämnting av tider:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleMonthChange = (startDate: Date) => {
    
    setActiveStartDate(startDate);
    const ids = selectedTreatments.map((t) => t.id);
    fetchMonthAvailability(startDate, ids);
  }

  //Tar in värdena från kundformuläret och försöker skapa bokning
  const handleCreateBooking = async (customerData: FormFields) => {
    setError(null);
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
      const newBooking = await bookingRequest(values);
      console.log(`Bokningen lyckades!, idt är: ${newBooking.id}`);
      navigate(`/confirmation/${newBooking.id}`);
    } catch (err: any) {
      console.log("Det gick inte att skapa bokning:", err);
      setError(err);
    }
  };

  if(error) {
    return <h1>Något gick fel! Vänligen försök igen.</h1>
  }

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
          onDateChange={handleDateChange}
          activeStartDate={activeStartDate}
          onActiveStartDateChange={handleMonthChange}
          onTime={handleTimeChange}
          dateValue={date}
          times={times}
          availableDays={availableDays}
          chosenTime={chosenTime}
          isLoading={isLoading}
        />
      </div>
    );
  }

  return (
    <div className="bf-container">
      <Step3CustomerInfo
        onPrev={prevStep}
        onSubmitCustomer={handleCreateBooking}
        treatments={selectedTreatments}
        date={date}
        time={chosenTime}
      />
    </div>
  );
}

export default BookingPage;
