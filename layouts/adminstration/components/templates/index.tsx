import React, { useEffect, useMemo, useState } from "react";

/* APIs */
import { useGetTemplates } from "@src/api";

/* Components */
import { Table } from "@components";

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
    reportTemplate: template.reportTemplate,
    enteredBy: template.enteredBy,
    procedureMasterId: template.procedureMasterId,
    modalityId: template.modalityId,
    isPrivate: template.isPrivate ? "Private" : "Public",
    bodyPart: template.bodyPart,
    reportTemplateTags: template.reportTemplateTags,
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

  /* Memos */
  const cols = useMemo(() => COLS, []);

  useEffect(() => {
    // if (getTemplates.isSuccess) {
    const transformedRows = transformRows(mockData as any);

    setRows(transformedRows);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTemplates.isSuccess]);

  return (
    <div>
      {
        <Table
          searchPlaceholder="Search patient id, name, acc no, referral doctor..."
          rows={rows}
          cols={cols}
        />
      }
    </div>
  );
};
