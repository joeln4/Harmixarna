//Gör Datumet till ett yyyy-MM-dd format
export const formatDate = (d: Date | null) => {
  if (!d) {
    throw new Error("formatDate kallades med null");
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


//För att visa datumet på svenska
export const formatDateToSE = (d: Date | null) => {
  if (!d) {
    throw new Error("formatDate kallades med null");
  }

  const formatted = new Intl.DateTimeFormat("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);

  return formatted;
};

//Från yyyy-MM-dd till lokalt datum
export const parseYMD = (s: string): Date => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const isInvalidDay = (dateString: string) => {
  
  const date = parseYMD(dateString);
  date.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date.getDay() === 0 || date.getDay() === 6 || date < today;
};

// Om en funktion för att hitta nästa lediga datum ska implementeras
export const earliestAvailableDate = (availableDays: string[]) => {
  
  const date = availableDays.filter((d) => !isInvalidDay(d)).sort()[0]
  
  return parseYMD(date);
};

//Kollar om datumet ska vara avaktiverat i kalendern, baserat på om det är helgdag, paserat datum och fullbokat
export const isTileDisabled = (date: string, availableDays: string[], isLoading: boolean) => {
    
    if (isLoading) {
    return (
      isInvalidDay(date)
    );
  }
    return (
      !availableDays.includes(date) || isInvalidDay(date)
    );
  };
