import type { Column } from "react-table";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";

/* Components */
import { Button, Toast } from "@components";

/* Contexts */
import { useEditTemplate } from "./editContext";
import { useDeleteTemplate, useTemplates } from "@src/api";
import { useMemo } from "react";

/* Types */

type CustomColumnType = Column<any> & {
  disableHiding?: boolean;
};

export const COLS: CustomColumnType[] = [
  {
    Header: "Template Name",
    accessor: "templateName",
    disableFilters: true,
    disableHiding: true,
  },
  {
    Header: "Author",
    accessor: "enteredByText",
    disableFilters: true,
    disableHiding: true,
  },
  {
    Header: "Exam Name",
    accessor: "procedureMasterText",
    disableFilters: true,
  },
  {
    Header: "Modality",
    accessor: "modalityText",
    disableFilters: true,
  },
  {
    Header: "Created Date",
    accessor: "enteredDateTime",
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
  {
    Header: "Action",
    disableGlobalFilter: true,
    disableFilters: true,
    Cell: (props) => {
      /* Contexts */
      const { setEditTemplateOpen, setValues } = useEditTemplate();

      /* APIs */
      const { deleteTemplate } = useDeleteTemplate();

      /* Memos */
      const toastId = useMemo(() => "delete-template", []);

      /* Handlers */
      const onEdit = () => {
        setValues(props.row.original);
        setEditTemplateOpen(true);
      };

      const onDelete = () => {
        deleteTemplate.mutate(props.row.original.id, {
          onSuccess: () => {
            Toast.success("Template deleted successfully", { id: toastId });
          },
          onError: () => {
            Toast.error("Failed to delete template", { id: toastId });
          },
        });
      };

      return (
        <div className="relative flex gap-2">
          <Button onClick={onEdit} iconButton variant="icon" noPadding>
            <PencilSquareIcon stroke="currentColor" width={20} height={20} />
          </Button>
          <Button
            color="red"
            onClick={onDelete}
            iconButton
            variant="icon"
            noPadding
          >
            <TrashIcon stroke="currentColor" width={20} height={20} />
          </Button>
        </div>
      );
    },
  },
];
