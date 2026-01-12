export function convertObjectValuesToString<T extends object>(obj: T): { [K in keyof T]: string | T[K] } {
  const result: any = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      // Check if the value is an object and not null
      if (value && typeof value === 'object') {
        // If it's a File, return it unchanged
        if (value instanceof File) {
          result[key] = value;
        } else {
          // Recursively convert nested objects
          result[key] = convertObjectValuesToString(value);
        }
      } else {
        // Convert value to string
        result[key] = String(value);
      }
    }
  }

  return result;
}