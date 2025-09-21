import React, { useEffect, useState } from 'react'
import { BookingDto } from '../../types/booking.types';


const confirmationPage = () => {
  const [booking, setBooking] = useState<BookingDto | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      
    }

  })
  


  return (
    <div>confirmationPage</div>
  )
}

export default confirmationPage