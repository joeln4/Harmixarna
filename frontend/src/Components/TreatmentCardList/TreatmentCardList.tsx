import React from "react";
import TreatmentCard from "../TreatmentCard/TreatmentCard";
import "./TreatmentCardList.css"

type Props = {};

const TreatmentCardList = (props: Props) => {
  return (
    <div className="treatments">
      <TreatmentCard
        type="Klippning"
        price={590}
        duration={40}
        description="Vi anpassar din frisyr efter önskemål och behov, oavsett om du vill behålla din stil eller förnya ditt utseende."
      />
      <TreatmentCard
        type="Färgning"
        price={300}
        duration={30}
        description="Färgning av hår"
      />
      <TreatmentCard
        type="permanent"
        price={1700}
        duration={50}
        description="Permanentlockning av hår"
      />
    </div>
  );
};

export default TreatmentCardList;
