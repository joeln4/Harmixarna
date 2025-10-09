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
      <section id="hp-info">
        <div className="second-content">
          <div className="sc-column" id="price-list-info">
            <h1>Hårmixarna</h1>
            <p>Hos oss kan du boka allt från klippning till Bryn & Fransar</p>
            <p>Mer text här för att göra det snyggare</p>
            <div id="price-list-btn-cont">
              <button id="price-list-btn">Gå till prislista</button>
            </div>
          </div>
          <div className="sc-column" id="image-cont">

          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
