import React from "react";
import "./Steps.css";
import "./Step2.css"
import "./Calendar.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { formatDate } from "../../lib/date";

type Props = {
  onNext: () => void;
  onPrev: () => void;
  onDateChange: (value: Date) => void;
  activeStartDate: Date;
  onActiveStartDateChange: (value: Date) => void;
  onTime: (time: string) => void;
  dateValue: Date | null;
  times: string[];
  chosenTime: string | null; //För design av vald knapp
  availableDays: string[];
  isLoading: boolean;
};

const Step2DateTime = ({
  onNext,
  onPrev,
  onDateChange,
  activeStartDate,
  onActiveStartDateChange,
  onTime,
  dateValue,
  times,
  chosenTime,
  availableDays,
  isLoading,
}: Props) => {

  

  //Flytta till util mappen?
  const tileDisabled = ({ date }: { date: Date }) => {
    
    //Vet inte om detta behövs
    if (isLoading) {
    return (
      date.getDay() === 0 || date.getDay() === 6 
    );
  }

    //För att inte krångla med tidzoner, kanske inte nödvändigt
    const dateStart = new Date(date);
    dateStart.setHours(0,0,0,0);

    const todayStart = new Date();
    todayStart.setHours(0,0,0,0);

    return (
      date.getDay() === 0 ||
      date.getDay() === 6 ||
      dateStart < todayStart ||
      !availableDays.includes(formatDate(date))
    );
  };

  return (
    <div className="step-content">
      <h1>Välj datum och tid</h1>
      <Calendar
        className="react-calendar"
        onChange={(v) => onDateChange(v as Date)}
        activeStartDate={activeStartDate} 
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) onActiveStartDateChange(activeStartDate);
        }}
        value={dateValue}
        selectRange={false}
        tileDisabled={tileDisabled}
      />
      <div className="times-container">
        {times.length > 0 ? (
          times.map((t) => (
            <span key={t} className="time-item">
              <input type="radio" className="input-times" id={`time-${t}`} name="time" onClick={() => onTime(t)} key={t}/>
              <label htmlFor={`time-${t}`} className="lbl-times">{t}</label>
            </span>
          ))
        ) : (
          <p>Inga lediga tider.</p>
        )}
      </div>
      <div className="step-btn-container">
        <button className="btn-prev" onClick={onPrev}>
          Tillbaka
        </button>
        <button className="btn-next" onClick={onNext} disabled={!chosenTime}>
          Nästa
        </button>
      </div>
    </div>
  );
};

export default Step2DateTime;
