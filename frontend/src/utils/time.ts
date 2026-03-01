export const formatDuration = (s: string): string => {
  const [hourString, minuteString] = s.split(":");
  const hours = parseInt(hourString, 10);
  const minutes = parseInt(minuteString, 10);

  if(hours === 0 && minutes === 0) return "0min";
  if(hours === 0) return `${minutes} min`;
  if(minutes === 0) return `${hours} h`;

  return `${hours} h ${minutes} min`
}