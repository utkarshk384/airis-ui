import React, { useEffect, useMemo, useState } from "react";

/* APIs */
import { useGetTemplates } from "@src/api";

/* Components */
import { Button, Table } from "@components";
import { AddTemplate } from "@layouts/modals";

/* Contexts */
import { withEditTemplateProvider, useEditTemplate } from "./editContext";

/* Utils */
import { COLS } from "./cols";

/* Types */
import type { GetTemplatesResponse } from "@src/api/types";

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
    ...template,
    templateName: template.templateName,
    enteredByText: template.enteredByText,
    procedureMasterText: template.procedureMasterText,
    modalityText: template.modalityText,
    isPrivate: template.isPrivate ? "Private" : "Public",
    bodyPart: template.bodyPart,
    reportTemplateTags: template.reportTemplateTags,
    enteredDateTime: template.enteredDateTime,
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

export const TemplatesTabContent: React.FC<Props> = (props) => {
  const {} = props;

  /* APIs */
  const { getTemplates } = useGetTemplates();

  /* States */
  const [rows, setRows] = useState<TransformedRowsType>([]);
  const [open, setOpen] = useState(false);

  /* Contexts */
  const { isEditTemplateOpen, setEditTemplateOpen, values } = useEditTemplate();

  /* Memos */
  const cols = useMemo(() => COLS, []);

  useEffect(() => {
    if (getTemplates.isSuccess) {
      const transformedRows = transformRows(getTemplates.data);

      setRows(transformedRows as any);
    }
  }, [getTemplates.data, getTemplates.isSuccess]);

  const transformedValues = useMemo(
    () => ({
      id: values.reportTemplateId,
      exam: values.procedureMasterId,
      bodyPart: values.bodyPart,
      modality: `${values.modalityId}`,
      radiologist: values.radiologistMCRID,
      tags: values.abnormalityTags,
      templateName: values.templateName,
      visibilty: values.isPrivate
        ? "private"
        : ("public" as "private" | "public"),
      status: "draft" as "draft" | "confirmed",
      reportTemplate: values.reportTemplate,
    }),
    [values]
  );

  return (
    <>
      <AddTemplate
        defaultValue={transformedValues}
        open={isEditTemplateOpen}
        setOpen={setEditTemplateOpen}
        isEdit
        refetchFn={getTemplates.refetch}
      />
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
    </>
  );
};

export const Templates = withEditTemplateProvider(TemplatesTabContent);
