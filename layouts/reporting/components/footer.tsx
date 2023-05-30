import { Button, Select } from "@components";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

export const Footer: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <div className="grid grid-cols-2 gap-10 justify-items-end">
      <div>
        <Select
          name="radiologist"
          label="Consultant Radiologist:"
          options={[]}
        />
      </div>
      <div className="flex gap-4 items-start">
        <Button size="base" variant="outline">
          Save as Draft
        </Button>
        <Button size="base" variant="outline">
          Sign Off and Print
        </Button>
        <Button size="base" variant="solid">
          Sign Off
        </Button>
      </div>
    </div>
  );
};
