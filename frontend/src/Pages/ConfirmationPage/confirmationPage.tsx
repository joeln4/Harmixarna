import React, { useEffect, useRef, useState } from "react";
import { BookingDto } from "../../types/booking.types";
import fetchBookingById from "../../api/fetchBookingById";
import { useParams } from "react-router-dom";
import "./ConfirmationPage.css";
import { formatDateToSE } from "../../lib/date";

const ConfirmationPage = () => {
  const [booking, setBooking] = useState<BookingDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const { id } = useParams<{ id: string }>();
  console.log(id);

  useEffect(() => {
    const fetchBooking = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setError(null);

      if (!id) {
        setError("Fel! Det gick inte att hämta bokningen.");
        return;
      }

      setIsLoading(true);

      try {
        const res = await fetchBookingById(
          id,
          abortControllerRef.current.signal
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
    <div className="conf-page">
      {isLoading ? (
        <h1>Skapar bokningsbekräftelse...</h1>
      ) : error ? (
        <h1>Något gick fel! Vänligen försök igen.</h1>
      ) : (
        <div className="conf-content">
          <h1 className="conf-title">Tack för din bokning!</h1>
          <p>Vänligen kontrollera uppgifterna nedan.</p>
          <div className="conf-container">
            <h2>Bokningsuppgifter</h2>
            <dl className="conf-grid">
              <dt>Bokningsnummer:</dt>
              <dd>{booking?.id}</dd>

              <dt>Datum:</dt>
              <dd>
                {booking?.startTime
                  ? formatDateToSE(new Date(booking?.startTime))
                  : ""}
              </dd>

              <dt>Behandlingar:</dt>
              <dd>
                <ul>
                  {booking?.treatments.map((t) => (
                    <li key={t.id}>{t.type}</li>
                  ))}
                </ul>
              </dd>

              <dt>Meddelande: </dt>
              <dd>{booking?.message ?? "-"}</dd>

              <dt>Pris:</dt>
              <dd>{booking?.price} kr</dd>
            </dl>
            <h2 id="customer-title">Kunduppgifter</h2>
            <dl className="conf-grid">
              <dt>Namn:</dt>
              <dd>{booking?.customer.name}</dd>

              <dt>E-post:</dt>
              <dd>
                {booking?.customer.email}
              </dd>

              <dt>Telefonnummer:</dt>
              <dd>
                  {booking?.customer.phone ?? "-"}
              </dd>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationPage;
