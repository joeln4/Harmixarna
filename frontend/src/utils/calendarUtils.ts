import fetchAvailability from "../api/FetchAvailableTimes"

export function disableDates({date}: {date: Date}) {
  
  
  return (
    date.getDay() === 0 ||
    date.getDay() === 6 ||
    date < new Date()

  )
}