import { useMemo, useState } from "react";
import { Column } from "react-table";

/* Components */
import {
  AllergyIcon,
  Badge,
  Button,
  UploadIcon,
  WritingIcon,
  Dialog,
} from "@components";

/* Types */
import type { Patient } from "./type";

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
    Cell: () => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <AllergyDialog open={open} setOpen={setOpen} />
          <div className="flex gap-2">
            <Button
              onClick={() => setOpen(true)}
              iconButton
              variant="icon"
              noPadding
            >
              <AllergyIcon fill="currentColor" width={20} height={20} />
            </Button>
            <Button iconButton variant="icon" noPadding>
              <WritingIcon fill="currentColor" width={20} height={20} />
            </Button>
          </div>
        </>
      );
    },
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

const AllergyDialog: React.FC<{
  open: boolean;
  setOpen: (val: boolean) => void;
}> = (props) => {
  const { open, setOpen } = props;

  return (
    <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
      {(Item) => (
        <>
          <Item.Header title="Hello" />
        </>
      )}
    </Dialog>
  );
};
