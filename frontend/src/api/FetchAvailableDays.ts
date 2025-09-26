async function FetchAvailableDays (
  date: string,
  treatmentIds: number[]
): Promise<string[]> {
  const res = await fetch("http://localhost:5296/api/booking/times", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date: date, treatmentIds: treatmentIds }),
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`); // Ändra denna?
  }
  return res.json();
}

export default FetchAvailableDays;