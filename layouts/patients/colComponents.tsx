import React, { useState } from "react";

/* Components */
import { AllergyIcon, Button, WritingIcon } from "@components";

/* Types */
import type { Patient } from "./types";
import type { CellProps } from "react-table";
import { useIsModalsOpen } from "./modalContext";

type Props = CellProps<Patient>;

export const NotesComponent: React.FC<Props> = (props) => {
  const row = props.row.original as Patient;

  const { setIsModelOpen } = useIsModalsOpen();

  return (
    <>
      <div className="flex gap-2">
        <Button
          onClick={() =>
            setIsModelOpen({ type: "OPEN_ALLERGY", payload: row.patient_id })
          }
          iconButton
          variant="icon"
          noPadding
        >
          <AllergyIcon fill="currentColor" width={20} height={20} />
        </Button>
        <Button
          onClick={() =>
            setIsModelOpen({ type: "OPEN_TN", payload: row.patient_id })
          }
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
