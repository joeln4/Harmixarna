import React from 'react'
import "./BookingCard.css"

type Props = {}

const BookingCard = (props: Props) => {
  return <div className="booking-card">
        <div className="bc-content">
            <div className="bc-id">1001</div>
            <div className="bc-appointment-time">2025-08-26 14:30</div>
            <div className="bc-treatments">Klippning</div>
            <div className="bc-customer">Joel@gmail.com</div>
            <div className="bc-status">Bokad</div>
        </div>       
    </div>
};

export default BookingCard