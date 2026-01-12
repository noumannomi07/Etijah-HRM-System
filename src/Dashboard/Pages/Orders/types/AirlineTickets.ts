export interface AirlineTicketFormData {
  employee_id: number;
  request_type: string; // ticket, ticket_refund, refund
  price: string;
  date: string;
  has_tax: boolean;
  tax: string;
  reference_number: string;
  content: string;
  file?: File;
  flight_type?: string;
  from?: string;
  to?: string;
  leave_date?: string;
  return_date?: string;
  notes?: string;
  phone?: string;
  email?: string;
  people?: Array<{
    type: string;
    first_name: string;
    last_name: string;
    gender: string;
    passport_number: string;
    date_of_birth: string;
  }>;
}
