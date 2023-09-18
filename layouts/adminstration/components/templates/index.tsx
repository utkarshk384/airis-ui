import React, { useEffect, useMemo, useState } from "react";

/* APIs */
import { useGetTemplates } from "@src/api";

/* Components */
import { Button, Table } from "@components";

/* Utils */
import { COLS } from "./cols";

/* Types */
import type { GetTemplatesResponse } from "@src/api/types";
import { AddTemplate } from "@layouts/modals";

type Props = {
  children?: React.ReactNode;
};

type TransformedRowsType = {
  reportTemplate: string;
  enteredBy: string;
  procedureMasterId: number;
  modalityId: number;
  isPrivate: string;
  bodyPart: string;
  reportTemplateTags: string;
}[];

const transformRows = (templates: GetTemplatesResponse) => {
  return templates.map((template) => ({
    reportTemplate: template.templateName,
    enteredBy: template.enteredByText,
    procedureMasterId: template.procedureMasterText,
    modalityId: template.modalityText,
    isPrivate: template.isPrivate ? "Private" : "Public",
    bodyPart: template.bodyPart,
    reportTemplateTags: template.reportTemplateTags,
    createdDate: template.enteredDateTime,
  }));
};

const mockData = [
  {
    reportTemplate: "Report Template 1",
    enteredBy: "Dr. John Doe",
    procedureMasterId: 1,
    modalityId: 1,
    isPrivate: false,
    bodyPart: "Head",
    reportTemplateTags: "#Chest, #Leg",
  },
];

export const Templates: React.FC<Props> = (props) => {
  const {} = props;

  /* APIs */
  const { getTemplates } = useGetTemplates();

  /* States */
  const [rows, setRows] = useState<TransformedRowsType>([]);
  const [open, setOpen] = useState(false);

  /* Memos */
  const cols = useMemo(() => COLS, []);

  useEffect(() => {
    if (getTemplates.isSuccess) {
      const transformedRows = transformRows(getTemplates.data);

      setRows(transformedRows as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTemplates.isSuccess]);

  return (
    <div>
      {
        <Table
          searchPlaceholder="Search patient id, name, acc no, referral doctor..."
          rows={rows}
          cols={cols}
        >
          {() => (
            <>
              <AddTemplate
                open={open}
                setOpen={setOpen}
                refetchFn={getTemplates.refetch}
              />
              <Button
                size="sm"
                className="w-40"
                tooltip="Add new template"
                onClick={() => setOpen(true)}
              >
                Add Template
              </Button>
            </>
          )}
        </Table>
      }
    </div>
  );
};
