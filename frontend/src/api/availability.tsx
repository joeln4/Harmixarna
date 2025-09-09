import { formatDate } from '../lib/date';

//Metod som skickar datumet som klickats på till api och returnerar tillgängliga tider.
async function fetchAvailability(date: Date): Promise<string[]> {

    const res = await fetch("http://localhost:5296/api/booking/times", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({date: formatDate(date)}),
    });
    if(!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`); // Ändra denna?
    };
    return res.json();
};

export default fetchAvailability