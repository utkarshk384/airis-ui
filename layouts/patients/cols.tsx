import { Column } from "react-table";
import { useRouter } from "next/router";
import { useCallback, useMemo, useRef } from "react";

/* Components */
import { NotesComponent } from "./colComponents";
import {
  AllergyIcon,
  Badge,
  Button,
  Text,
  UploadIcon,
  WritingIcon,
} from "@components";

/* Utils */
import { parseISO, FormatDate } from "@utils/dates-fns";

/* Types */
import type { Patient } from "./types";
import { useDocumentUpload } from "@src/api";
import { useCookie } from "@src/hooks";

type CustomColumnType = Column<any> & {
  disableHiding?: boolean;
};

export const COLUMNS: CustomColumnType[] = [
  {
    Header: "Patient Name",
    accessor: "patient_name",
    disableFilters: true,
    disableHiding: true,
  },
  {
    Header: "Patient ID",
    accessor: "patient_id",
    disableFilters: true,
    disableHiding: true,
  },
  {
    Header: "Acc No",
    accessor: "acc_no",
    disableFilters: true,
    disableHiding: true,
    Cell: (props) => {
      const row = props.row.original as Patient;

      const router = useRouter();

      const parsedDate = useMemo(
        () => parseISO(row.visit_date),
        [row.visit_date]
      );

      const handleClick = useCallback(() => {
        router.push(
          `/patients/${row.patient_id}?ref=${FormatDate(
            parsedDate,
            "dd-MM-yyyy"
          )}`
        );
      }, [parsedDate, router, row.patient_id]);

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
    Header: "Visit Time",
    id: "visit_time",
    accessor: "visit_date",
    disableGlobalFilter: true,
    filter: (rows, _, filterValues) => {
      const date = FormatDate(filterValues, "dd-MM-yyyy");

      return rows.filter((row) => {
        const parsedDate = parseISO(row.values.visit_time);
        const formattedDate = FormatDate(parsedDate, "dd-MM-yyyy");

        return formattedDate === date;
      });
    },
    Cell: (props) => {
      const row = props.row.original as Patient;

      const parsedDate = useMemo(
        () => parseISO(row.visit_date),
        [row.visit_date]
      );
      const formattedDate = useMemo(
        () => FormatDate(parsedDate, "HH:mm"),
        [parsedDate]
      );

      return <Text size="sm">{formattedDate}</Text>;
    },
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
    Cell: (props) => {
      const fileRef = useRef<HTMLInputElement>(null);

      const { UploadDocument } = useDocumentUpload();
      const { getCookie, COOKIE_KEYS } = useCookie();

      /* Handlers */
      const UploadeFile = () => {
        fileRef.current?.click();
      };

      return (
        <div className="relative flex gap-2">
          <input
            type="file"
            name="dr-form"
            ref={fileRef}
            onChange={(e) => {
              const file = e.target.files?.[0] as File;
              const now = FormatDate(new Date(), "dd-MM-yyyy HH:mm:ss");
              // Call API to upload.
              UploadDocument.mutate({
                file,
                documentUploadedDate: now,
                documentUploadedBy: getCookie(COOKIE_KEYS.id),
                patientIndexId: props.row.original.patient_id,
                patientVisitIndexId: props.row.original.patient_visit_id,
              });

              // References: https://stackoverflow.com/questions/72832238/how-to-upload-file-from-frontend-to-backend
            }}
            className="absolute invisible"
          />
          <Button onClick={UploadeFile} iconButton variant="icon" noPadding>
            <UploadIcon stroke="currentColor" width={20} height={20} />
          </Button>
        </div>
      );
    },
  },
];
