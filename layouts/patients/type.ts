export type Patient = {
  patient_name: string;
  patient_id: string;
  acc_no: string;
  age: number;
  gender: "Male" | "Female";
  modality: string;
  examination: string;
  visit_date: string;
  referral_doctor: string;
  status: "In Progress" | "Completed" | "Not Started";
};
