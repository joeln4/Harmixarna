async function FetchAvailableDays(data: {
  year: number;
  month: number;
  ids: number[];
}): Promise<string[]> {
  const params = new URLSearchParams();

  params.set("year", String(data.year));
  params.set("month", String(data.month));
  data.ids.forEach((id) => params.append("ids", String(id)));

  const res = await fetch(`http://localhost:5296/api/booking/dates?${params.toString()}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`); 
  }

  return res.json();
}

//Ska returna lista med yyyy-MM-dd

export default FetchAvailableDays;
