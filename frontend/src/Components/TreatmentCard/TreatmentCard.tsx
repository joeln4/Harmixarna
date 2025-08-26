import React from "react"
import "./TreatmentCard.css";

type Props = {}

const TreatmentCard = (props: Props) => {
  return <div className="treatment-card">

        <div className="tc-content">
            <p className="tc-title">Klippning</p>
            <div className="tc-details">
                <span className="tc-duration">40 min</span>
                <span className="tc-price">590kr</span>
            </div>
            <p className="tc-description">Vi anpassar din frisyr efter önskemål och behov, oavsett om du vill behålla din stil eller förnya ditt utseende.</p> 
        </div>

        <button className="tc-btn-add">Lägg Till</button>

        
  </div>;
  
};

export default TreatmentCard