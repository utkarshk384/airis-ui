import React, { useEffect } from "react";

/* Components */
import { Button, Select } from "@components";

/* APIs */
import { useRadiologistList } from "@src/api";

/* Hooks */
import { useDropdown } from "@components/Select/useDropdown";

type Props = {
  children?: React.ReactNode;
  onDraft: () => void;
  onSignOff: () => void;
  onSignOffPrint: () => void;
};

export const Footer: React.FC<Props> = (props) => {
  const { onDraft, onSignOff, onSignOffPrint } = props;

  return (
    <div className="grid grid-cols-2 gap-10 justify-items-end">
      <div></div>
      <div className="flex gap-4 items-start">
        <Button size="base" variant="outline" onClick={onDraft}>
          Save as Draft
        </Button>
        <Button size="base" variant="outline" onClick={onSignOffPrint}>
          Sign Off and Print
        </Button>
        <Button size="base" variant="solid" onClick={onSignOff}>
          Sign Off
        </Button>
      </div>
    </div>
  );
};
