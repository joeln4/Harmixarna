import { BookingRequestInfo } from '../types/booking.types';

async function bookingRequest (values: BookingRequestInfo)  {

  const res = await fetch("http://localhost:5296/api/booking/", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(values),
  });
  if(!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`); // Ändra denna?
  };
  return res.json();
};

export default bookingRequest