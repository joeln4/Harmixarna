import React, { useEffect, useRef, useState } from "react";
import { BookingDto } from "../../types/booking.types";
import fetchBookingById from "../../api/fetchBookingById";
import "./ConfirmationPage.css";

const ConfirmationPage = () => {

  const [booking, setBooking] = useState<BookingDto | null>(null);
  const [id, setId] = useState<number>(1) // Vet inte om detta behövs, gjordes för test
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setError(null);
      setIsLoading(true);
      try {
        const res = await fetchBookingById(
          id,
          abortControllerRef.current?.signal
        );
        setBooking(res);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <h1>Skapar bokning...</h1>
      ) : error ? (
        <h1>Något gick fel! Vänligen försök igen.</h1>
      ) : (
        <div>
          <button onClick={() => setId(id + 1)}>Öka idt</button>
          <dl className="summary-grid">
            <dt>Bokningsnummer:</dt>
            <dd>{booking?.id}</dd>

            <dt>Datum:</dt>
            <dd>{booking?.startTime}</dd>

            <dt>Meddelande: </dt>
            <dd>{booking?.message}</dd>

            <dt>Behandlingar:</dt>
            <dd>
              <ul>
                {booking?.treatments.map((t) => (
                  <li key={t.id}>{t.type}</li>
                ))}
              </ul>
            </dd>
          </dl>
        </div>
      )}
    </div>
  );
};

export default ConfirmationPage;
