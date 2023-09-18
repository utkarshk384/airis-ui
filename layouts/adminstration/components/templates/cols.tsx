import type { Column } from "react-table";

type CustomColumnType = Column<any> & {
  disableHiding?: boolean;
};

export const COLS: CustomColumnType[] = [
  {
    Header: "Template Name",
    accessor: "reportTemplate",
    disableFilters: true,
    disableHiding: true,
  },
  {
    Header: "Author",
    accessor: "enteredBy",
    disableFilters: true,
    disableHiding: true,
  },
  {
    Header: "Exam Name",
    accessor: "procedureMasterId",
    disableFilters: true,
  },
  {
    Header: "Modality",
    accessor: "modalityId",
    disableFilters: true,
  },
  {
    Header: "Created Date",
    accessor: "field is missing",
    disableFilters: true,
  },
  {
    Header: "Visibility",
    accessor: "isPrivate",
    disableFilters: true,
  },
  {
    Header: "Body Part",
    accessor: "bodyPart",
    disableFilters: true,
  },
  {
    Header: "Tags",
    accessor: "reportTemplateTags",
    disableFilters: true,
  },
  // {
  //   Header: "Action",
  //   accessor: "action",
  //   disableGlobalFilter: true,
  //   disableFilters: true,
  //   Cell: (props) => {
  //     const fileRef = useRef<HTMLInputElement>(null);

  //     const { UploadDocument } = useDocumentUpload();
  //     const { getCookie, COOKIE_KEYS } = useCookie();

  //     /* Handlers */
  //     const UploadeFile = () => {
  //       fileRef.current?.click();
  //     };

  //     return (
  //       <div className="relative flex gap-2">
  //         <input
  //           type="file"
  //           name="dr-form"
  //           ref={fileRef}
  //           onChange={(e) => {
  //             const file = e.target.files?.[0] as File;
  //             const now = FormatDate(new Date(), "dd-MM-yyyy HH:mm:ss");
  //             // Call API to upload.
  //             UploadDocument.mutate({
  //               file,
  //               documentUploadedDate: now,
  //               documentUploadedBy: getCookie(COOKIE_KEYS.id),
  //               patientIndexId: props.row.original.patient_id,
  //               patientVisitIndexId: props.row.original.patient_visit_id,
  //             });

  //             // References: https://stackoverflow.com/questions/72832238/how-to-upload-file-from-frontend-to-backend
  //           }}
  //           className="absolute invisible"
  //         />
  //         <Button onClick={UploadeFile} iconButton variant="icon" noPadding>
  //           <UploadIcon stroke="currentColor" width={20} height={20} />
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
];
