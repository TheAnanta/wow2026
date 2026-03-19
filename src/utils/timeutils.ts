// utils/timeUtils.ts
/* eslint-disable prefer-const */

const parseTime = (time: string): [Date, Date] => {
  const times = time.split(" to ");
  const startTime = times[0];
  const endTime = times[1];

  const parseSingleTime = (t: string, baseDate: Date): Date => {
    const [timePart, modifier] = t.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    const date = new Date(baseDate); // Use the base date
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const baseDate = new Date(); // Use current date as base for time parsing

  const date1 = parseSingleTime(startTime, baseDate);
  const date2 = parseSingleTime(endTime, baseDate);

  // Important: If end time is before start time (e.g., midnight crossing), assume next day
  if (date2 < date1) {
    date2.setDate(date2.getDate() + 1);
  }

  return [date1, date2];
};

// This function's output (grid-column style) is not directly used in the current flex layout.
// It's included for completeness based on the original script, but you might remove it
// if not planning a grid-based timeline visualization.
const calculateTimeline = ([s, e]: [Date, Date]) => {
  // Assuming a timeline starts at 8:00 AM for the day
  const dayStartTime = new Date(
    s.getFullYear(),
    s.getMonth(),
    s.getDate(),
    8,
    0,
    0
  );

  const offset = (s.getTime() - dayStartTime.getTime()) / 60000; // Offset in minutes from 8 AM
  const duration = (e.getTime() - s.getTime()) / 60000; // Duration in minutes

  // The original formula seems designed for a CSS Grid layout with a specific column width ratio.
  // Let's calculate example grid column start/span values based on the 132 unit system
  // (assuming 132 units per hour, so 132/60 units per minute).
  // Start grid column = (offset in minutes * units per minute) + 1 (assuming 1-based grid start)
  const gridColumnStart = offset * (132 / 60) + 1;
  // Span grid columns = duration in minutes * units per minute
  const gridColumnSpan = duration * (132 / 60);

  console.log(
    `Event duration: ${duration} mins. Grid start: ${gridColumnStart}, span: ${gridColumnSpan}`
  );

  // Return these values, potentially to be used in a style object for a grid item
  return {
    gridColumnStart: gridColumnStart,
    gridColumnEnd: `span ${gridColumnSpan}`, // Tailwind/CSS grid syntax
  };
};

export { parseTime, calculateTimeline };