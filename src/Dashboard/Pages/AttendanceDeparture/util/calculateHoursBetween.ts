export const calculateHoursBetween = (timeFrom?: string | undefined, timeTo?: string | undefined): number => {
  if (!timeFrom || !timeTo) return 0;

  // Parse the time strings, handling 24-hour format
  let fromHours = 0, fromMinutes = 0, toHours = 0, toMinutes = 0;

  // Handle 24-hour format
  const [hours_from, minutes_from] = timeFrom.split(':').map(Number);
  fromHours = hours_from || 0;
  fromMinutes = minutes_from || 0;

  // Handle 24-hour format
  const [hours_to, minutes_to] = timeTo.split(':').map(Number);
  toHours = hours_to || 0;
  toMinutes = minutes_to || 0;

  if (isNaN(fromHours) || isNaN(fromMinutes) || isNaN(toHours) || isNaN(toMinutes)) {
    return 0;
  }

  // Convert to minutes
  const fromTotalMinutes = fromHours * 60 + fromMinutes;
  const toTotalMinutes = toHours * 60 + toMinutes;

  // Calculate the difference in minutes, handling wrapping around the clock correctly
  let diffMinutes = 0;

  // If the end time is earlier than the start time, we need to handle special cases
  if (toHours < fromHours || (toHours === fromHours && toMinutes < fromMinutes)) {
    // For example: 10:10 to 3:10 should be 5 hours (assuming it's 10:10 AM to 3:10 PM)
    diffMinutes = (12 - fromHours) * 60 - fromMinutes + toHours * 60 + toMinutes;
  } else {
    // Normal case where end time is later than start time
    diffMinutes = toTotalMinutes - fromTotalMinutes;
  }

  return parseFloat((diffMinutes / 60).toFixed(2));
};
