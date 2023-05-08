import { Column } from "react-table";

/* Components */
import {
  AllergyIcon,
  Badge,
  Button,
  UploadIcon,
  WritingIcon,
} from "@components";

/* Types */
import type { Patient } from "./type";
import { useMemo } from "react";

export const COLUMNS: Column[] = [
  {
    Header: "Patient Name",
    accessor: "patient_name",
  },
  {
    Header: "Patient ID",
    accessor: "patient_id",
  },
  {
    Header: "Acc No",
    accessor: "acc_no",
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
    accessor: "visit_date",
  },
  {
    Header: "Referral Doctor",
    accessor: "referral_doctor",
  },

  {
    Header: "Status",
    accessor: "status",
    Cell: (props) => {
      const row = props.row.original as Patient;

      const colors = useMemo(() => {
        if (row.status === "Completed") return "green";
        if (row.status === "In Progress") return "orange";
        return "red";
      }, [row.status]);

      return <Badge text={row.status} color={colors} size="xs" />;
    },
  },
  {
    Header: "Notes",
    accessor: "notes",
    Cell: () => {
      return (
        <div className="flex gap-2">
          <Button iconButton variant="text" noPadding>
            <AllergyIcon width={20} height={20} />
          </Button>
          <Button iconButton variant="text" noPadding>
            <WritingIcon width={20} height={20} />
          </Button>
        </div>
      );
    },
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: () => {
      return (
        <div className="flex gap-2">
          <Button iconButton variant="text" noPadding>
            <UploadIcon width={20} height={20} />
          </Button>
        </div>
      );
    },
  },
];
