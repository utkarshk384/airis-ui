import { Column } from "react-table";

export const COLUMNS: Column[] = [
  {
    Header: "Patient Name",
    accessor: "name",
  },
  {
    Header: "Patient ID",
    accessor: "id",
  },
  {
    Header: "Acc No",
    accessor: "accNo",
  },
  {
    Header: "Age(years)",
    accessor: "age",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Modality",
    accessor: "modality",
  },
  {
    Header: "Examination",
    accessor: "examination",
  },
  {
    Header: "Visit Date",
    accessor: "visitDate",
  },
  {
    Header: "Referral Doctor",
    accessor: "referralDoctor",
  },

  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Notes",
    accessor: "notes",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];
