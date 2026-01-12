export type BaseExpensesType = {
  employee_id: number;
  date: string;
  projectmange_id: number;
  code: string;
  content: string;
  expense_mangment_id: number;
  amount: number;
  has_tax: number;
  tax: number;
  type: string;
}

export type ExpensesCompenstationType = BaseExpensesType & {
  type: 'expenses'
  has_mile: 0;
};

export type MileageCompensationType = BaseExpensesType & {
  type: 'mileage'
  has_mile: 1
  miles: number;
  mile_type: "distance";
  mile_price: number;
};

export type MileageDistanceCompensationType = MileageCompensationType

export type MileageDistanceCounterCompensationType = BaseExpensesType & {
  miles: number;
  km_from: number;
  km_to: number;
  mile_price: number;
  mile_type: "odometer";
};

export type MileageMapCompensationType = BaseExpensesType & {
  mile_type: "map";
  start_lat: number;
  start_lng: number;
  end_lat: number;
  end_lng: number;
  distance: number;
};

export type MileageCompensationTypes = MileageDistanceCompensationType | MileageDistanceCounterCompensationType | MileageMapCompensationType;