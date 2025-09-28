//Gör Datumet till ett yyyy-MM-dd format
export const formatDate = (d: Date | null) => {

  if (!d) {
    throw new Error("formatDate kallades med null");
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const formatDateToSE = (d: Date | null) => {

  if (!d) {
    throw new Error("formatDate kallades med null");
  }

  const formatted = new Intl.DateTimeFormat("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);

  return formatted;
}