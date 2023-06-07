import React, { useEffect } from "react";

/* Components */
import { Button, Select } from "@components";

/* APIs */
import { useRadiologistList } from "@src/api";

/* Hooks */
import { useDropdown } from "@components/Select/useDropdown";

type Props = {
  children?: React.ReactNode;
};

export const Footer: React.FC<Props> = (props) => {
  const {} = props;

  const { getRadiologistList } = useRadiologistList();
  const [dropdownData, setDropdownData] = useDropdown();

  useEffect(() => {
    if (getRadiologistList.isSuccess)
      setDropdownData(getRadiologistList.data, [
        "radiologistSignatureName",
        "radiologistId",
      ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRadiologistList.isSuccess]);

  return (
    <div className="grid grid-cols-2 gap-10 justify-items-end">
      <div>
        <Select
          name="radiologist"
          label="Consultant Radiologist:"
          options={dropdownData}
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
