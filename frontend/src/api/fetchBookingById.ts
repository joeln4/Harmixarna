import { BookingDto } from "../types/booking.types";

async function fetchBookingById(
  id: string | number,
): Promise<BookingDto> {
  const res = await fetch(`http://localhost:5296/api/booking/${id}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`); 
  }
  return res.json();
}

export default fetchBookingById;