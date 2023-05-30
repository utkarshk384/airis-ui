import React from "react";
import { ListItem } from "./shared";
import {
  AllergyIcon,
  Button,
  DrFormIcon,
  Select,
  WritingIcon,
} from "@components";
import { PlusIcon } from "@heroicons/react/20/solid";

type Props = {
  children?: React.ReactNode;
};

export const TabContent: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between px-4">
        <ListItem color="black" title="Acc Number" value="3213123132" />
        <ListItem color="black" title="Examination Name" value="EXAM2020" />
        <ListItem
          color="black"
          title="Examination Date"
          value="02-02-2023 09:30"
        />
        <ListItem color="black" title="Referral Doctor" value="Dr. Kumar" />
      </div>
      <div className="grid grid-cols-[1fr_1fr] px-4">
        <div className="flex gap-4">
          <Select
            label="Template:"
            containerClassName="!w-2/3"
            labelClassName="!justify-self-start"
            name="template"
            placeholder="Select Template..."
            options={[]}
          />
          <Button
            variant="solid"
            size="base"
            rightIcon={() => <PlusIcon width={24} height={24} />}
          >
            Add Template
          </Button>
        </div>
        <div className="flex gap-4 justify-self-end">
          <Button
            tooltip="Technical Notes"
            variant="outline"
            iconButton
            size="base"
          >
            <WritingIcon fill="currentColor" />
          </Button>
          <Button tooltip="Allergies" variant="outline" iconButton size="base">
            <AllergyIcon fill="currentColor" />
          </Button>
          <Button
            tooltip="Doctor's Form"
            variant="outline"
            iconButton
            size="base"
          >
            <DrFormIcon fill="currentColor" />
          </Button>
        </div>
      </div>
    </div>
  );
};
