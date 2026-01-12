export const getDaysBetweenDates = (startDate?: string, endDate?: string): number => {
  if (!startDate || !endDate) {
    return 0;
  }

  const _startDate = new Date(startDate);
  const _endDate = new Date(endDate);

  // Check if dates are valid
  if (isNaN(_startDate.getTime()) || isNaN(_endDate.getTime())) {
    return 0;
  }

  // Calculate the total days between the two dates
  const diffTime = Math.abs(_endDate.getTime() - _startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};