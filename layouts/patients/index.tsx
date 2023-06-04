import React, { useMemo } from "react";

/* Components */
import { COLUMNS } from "./cols";
import { Button, Table } from "@components";
import { DropdownContent } from "./filters";

import MOCK_DATA from "./MOCK_DATA.json";
import { AddTemplate } from "@layouts/templates";
import { PlusIcon } from "@heroicons/react/20/solid";

/* Types */
type Props = {
  children?: React.ReactNode;
};

export const PatientsTab: React.FC<Props> = (props) => {
  const {} = props;

  const rows = useMemo(() => MOCK_DATA, []);
  const cols = useMemo(() => COLUMNS, []);
  const [open, setOpen] = React.useState(false);

  return (
    <div className="container !bg-white rounded-lg p-4 !mb-16">
      <Button
        variant="solid"
        rightIcon={() => <PlusIcon width={24} height={24} />}
        onClick={() => setOpen(true)}
      >
        Add Template
      </Button>
      <AddTemplate open={open} setOpen={setOpen} />
      <Table
        searchPlaceholder="Search patient id, name, acc no, referral doctor..."
        cols={cols}
        searchClassName="w-7/12"
        rows={rows}
        title="Patients"
      >
        {(table) => <DropdownContent table={table} />}
      </Table>
    </div>
  );
};
