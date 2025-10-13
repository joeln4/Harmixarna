import React from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

const HomePage = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  const handleContactClick = () => {
    navigate("/Contact");
  };
  return (
    <div>
      <section id="salon-pic">
        <div className="start-content">
          <h1 id="hp-title">Välkommen till Hårmixarna</h1>
          <div className="hp-btns">
            <button id="book-btn" onClick={handleBookingClick}>
              Boka nu
            </button>
            <button id="contact-btn" onClick={handleContactClick}>
              Kontakta oss
            </button>
          </div>
        </div>
      </section>
      <section id="hp-info">
        <div className="second-content">
          <div className="sc-column" id="price-list-cont">
            <div id="price-list-info">
              <h1>Hårmixarna</h1>
              <p>
                Upplev professionell hårvård i en avslappnad miljö, med
                produkter av högsta kvalitet.
              </p>
              <p>Hos oss kan du boka allt från klippning till Bryn & Fransar</p>
              <div id="price-list-btn-cont">
                <button id="treatments-btn" onClick={handleBookingClick}>
                  Gå till behandlingar
                </button>
              </div>
            </div>
          </div>
          <div className="sc-column" id="second-image-cont">
            <img src="/images/Salong3.jpg" alt="logo" />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
