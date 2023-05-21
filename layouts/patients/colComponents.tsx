import React, { useState } from "react";

/* Components */
import { AllergyDrawer } from "./components/allergyDrawer";
import { AllergyIcon, Button, WritingIcon } from "@components";
import { TechnicalNotesDrawer } from "./components/technicalNotesDrawer";

export const NotesComponent: React.FC = (props) => {
  const [openAllergy, setOpenAllergy] = useState(false);
  const [openTechnicalNotes, setOpenTechnicalNotes] = useState(false);

  return (
    <>
      <AllergyDrawer open={openAllergy} setOpen={setOpenAllergy} />
      <TechnicalNotesDrawer
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
