import React from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleBookingClick = () =>  {
    navigate("/booking");
  }

  const handleContactClick = () => {
    navigate("/Contact")
  }
  return (
    <div>
      <section id="salon-pic">
        <div className="start-content">
          <h1 id="hp-title">Välkommen till Hårmixarna</h1>
          <div className="hp-btns">
            <button id="book-btn" onClick={handleBookingClick}>Boka nu</button>
            <button id="contact-btn" onClick={handleContactClick}>Kontakta oss</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
