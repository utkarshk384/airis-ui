import React from "react";
import { ListItem } from "./shared";

type Props = {
  children?: React.ReactNode;
};

export const TabContent: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <div className="flex flex-col gap-2">
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
    </div>
  );
};
