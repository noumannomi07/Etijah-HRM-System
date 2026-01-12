export type LetterRequestFormData = {
  letter_mangment_id: number;
  employee_id: number;
  note?: string;
  directed_to?: string;
  file?: File;
}
