export type Patient = {
  patient_name: string;
  patient_id: number;
  acc_no: string;
  age: number;
  gender: string; //"Male" | "Female"
  modality: string;
  examination: string;
  visit_date: string;
  referral_doctor: string;
  status: string; //"In Progress" | "Completed" | "Not Started";
};
