import React from "react";
import "./Steps.css";
import "./Step2.css";
import "./Calendar.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isTileDisabled, formatDate } from "../../lib/date";

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
  const tileDisabled = ({ date }: { date: Date }) =>
    isTileDisabled(formatDate(date), availableDays, isLoading);

  return (
    <div className="step-content">
      <h1>Välj datum och tid</h1>
      <div className="datetime-content">
        <Calendar
          className="react-calendar"
          tileClassName={({ date, view }) => {
            if (
              view === "month" &&
              availableDays.includes(date.toISOString().split("T")[0])
            ) {
              return "available-day";
            }
            return null;
          }}
          onChange={(v) => onDateChange(v as Date)}
          activeStartDate={activeStartDate}
          onActiveStartDateChange={({ activeStartDate }) => {
            if (activeStartDate) onActiveStartDateChange(activeStartDate);
          }}
          value={dateValue}
          selectRange={false}
          tileDisabled={tileDisabled}
        />
        {isLoading ? (
          <div>Laddar lediga tider...</div>
        ) : times.length > 0 ? (
          <div className="times-container">
            {times.map((t) => (
              <span key={t} className="time-item">
                <input
                  type="radio"
                  className="input-times"
                  id={`time-${t}`}
                  name="time"
                  onClick={() => onTime(t)}
                />
                <label htmlFor={`time-${t}`} className="lbl-times">
                  {t}
                </label>
              </span>
            ))}
          </div>
        ) : (
          <div>Inga lediga tider idag.</div>
        )}
        <div className="step-btn-container">
          <button className="btn-prev" onClick={onPrev}>
            Tillbaka
          </button>
          <button className="btn-next" onClick={onNext} disabled={!chosenTime}>
            Nästa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2DateTime;
