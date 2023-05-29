import { useCallback, useMemo } from "react";
import { Column } from "react-table";

/* Components */
import { NotesComponent } from "./colComponents";
import {
  AllergyIcon,
  Badge,
  Button,
  UploadIcon,
  WritingIcon,
} from "@components";

/* Types */
import type { Patient } from "./type";
import { useRouter } from "next/router";

export const COLUMNS: Column[] = [
  {
    Header: "Patient Name",
    accessor: "patient_name",
    disableFilters: true,
  },
  {
    Header: "Patient ID",
    accessor: "patient_id",
    disableFilters: true,
  },
  {
    Header: "Acc No",
    accessor: "acc_no",
    disableFilters: true,
    Cell: (props) => {
      const row = props.row.original as Patient;

      const router = useRouter();

      const handleClick = useCallback(() => {
        router.push(`/patients/${row.acc_no}`);
      }, [router, row.acc_no]);

      return (
        <Button as="a" variant="link" className="p-0" onClick={handleClick}>
          {row.acc_no}
        </Button>
      );
    },
  },
  {
    Header: "Age(years)",
    accessor: "age",
    disableGlobalFilter: true,
    disableFilters: true,
  },
  {
    Header: "Gender",
    accessor: "gender",
    disableGlobalFilter: true,
    disableFilters: true,
  },
  {
    Header: "Modality",
    accessor: "modality",
    disableGlobalFilter: true,
    disableFilters: true,
  },
  {
    Header: "Examination",
    accessor: "examination",
    disableGlobalFilter: true,
    disableFilters: true,
  },
  {
    Header: "Visit Date",
    accessor: "visit_date",
    disableGlobalFilter: true,
  },
  {
    Header: "Referral Doctor",
    accessor: "referral_doctor",
    disableFilters: true,
  },

  {
    id: "status",
    Header: "Status",
    accessor: "status",
    disableGlobalFilter: true,
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
    disableGlobalFilter: true,
    disableFilters: true,
    Cell: NotesComponent,
  },
  {
    Header: "Action",
    accessor: "action",
    disableGlobalFilter: true,
    disableFilters: true,
    Cell: () => {
      return (
        <div className="flex gap-2">
          <Button iconButton variant="icon" noPadding>
            <UploadIcon stroke="currentColor" width={20} height={20} />
          </Button>
        </div>
      );
    },
  },
];
