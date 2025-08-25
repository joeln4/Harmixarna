import React from "react"
import "./TreatmentCard.css";

type Props = {}

const TreatmentCard = (props: Props) => {
  return <div className="treatmentCard">

        <div className="content">
            <p className="title">Klippning</p>
            <div className="details">
                <span className="duration">40 min</span>
                <span className="price">590kr</span>
            </div>
            <p className="description">Vi anpassar din frisyr efter önskemål och behov, oavsett om du vill behålla din stil eller förnya ditt utseende.</p> 
        </div>

        <button className="btn-add">Lägg Till</button>

        
  </div>;
  
};

export default TreatmentCard