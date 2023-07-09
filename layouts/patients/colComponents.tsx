import React, { useState } from "react";

/* Components */
import { AllergyIcon, Button, WritingIcon } from "@components";
import { TechnicalNotesDrawer, AllergyDrawer } from "@layouts/modals";

/* Types */
import type { Patient } from "./types";
import type { CellProps } from "react-table";

type Props = CellProps<Patient>;

export const NotesComponent: React.FC<Props> = (props) => {
  const row = props.row.original as Patient;

  const [openAllergy, setOpenAllergy] = useState(false);
  const [openTechnicalNotes, setOpenTechnicalNotes] = useState(false);

  return (
    <>
      <AllergyDrawer
        patientId={row.patient_id}
        open={openAllergy}
        setOpen={setOpenAllergy}
      />
      <TechnicalNotesDrawer
        patientId={row.patient_id}
        open={openTechnicalNotes}
        setOpen={setOpenTechnicalNotes}
      />
      <div className="flex gap-2">
        <Button
          onClick={() => setOpenAllergy(true)}
          iconButton
          variant="icon"
          noPadding
        >
          <AllergyIcon fill="currentColor" width={20} height={20} />
        </Button>
        <Button
          onClick={() => setOpenTechnicalNotes(true)}
          iconButton
          variant="icon"
          noPadding
        >
          <WritingIcon fill="currentColor" width={20} height={20} />
        </Button>
      </div>
    </>
  );
};
