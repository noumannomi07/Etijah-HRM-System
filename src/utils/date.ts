/**
 * Formats a Date object to 'Y-m-d' format (YYYY-MM-DD)
 * @param date The Date object to format
 * @returns A string in the format 'YYYY-MM-DD'
 * @example
 * // returns "2023-05-15"
 * formatDateToYmd(new Date(2023, 4, 15))
 */
export const formatDateToYmd = (date: Date): string => {
  const year = date.getFullYear();
  // getMonth() returns 0-11, so we need to add 1
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
