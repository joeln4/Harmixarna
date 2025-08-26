import React from 'react'
import "./BookingCard.css"

type Props = {}

const BookingCard = (props: Props) => {
  return <div className="booking-card">

        <ul className="bc-content">
            <li className="bc-id">1001</li>
            <li className="bc-appointment-time">2025-08-26 14:30</li>
            <li className="bc-treatments">Klippning</li>
            <li className="bc-customer">Joel@gmail.com</li>
            <li className="bc-status">Bokad</li>
        </ul>
    </div>
};

export default BookingCard