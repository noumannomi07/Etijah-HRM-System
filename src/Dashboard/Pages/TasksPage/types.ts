export interface TaskFormData {
    title: string;
    content: string;
    start_date: string;  // Format: YYYY-MM-DD
    end_date: string;    // Format: YYYY-MM-DD
    priority: { value: string; label: string } | string; // Can be object for form or string for API
    employees: number[]; // Array of employee IDs
    start_time: string;  // Format: HH:MM
    end_time: string;    // Format: HH:MM
  }