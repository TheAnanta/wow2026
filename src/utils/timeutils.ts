/**
 * Parses time string like "08:30 AM to 10:00 AM" or "08:30 AM" and returns Date objects.
 * For "08:30 AM", endTime is same as startTime.
 */
export function parseTime(timeStr: string): [Date, Date] {
  const parsePart = (part: string) => {
    const [time, modifier] = part.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const parts = timeStr.split(' to ');
  const start = parsePart(parts[0].trim());
  const end = parts.length > 1 ? parsePart(parts[1].trim()) : start;
  
  return [start, end];
}
