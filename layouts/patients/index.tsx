import React, { useMemo } from "react";

/* Components */
import { Heading, Text } from "@components";
import { Column } from "react-table";
import { Table } from "@components/Table";

import MOCK_DATA from "./MOCK_DATA.json";

/* Types */
type Props = {
  children?: React.ReactNode;
};

type Patient = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  age: number;
};

const MOCK_COLS: Column[] = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    Cell: (props) => {
      const { row } = props;
      const original = row.original as any;

      return <Text>{original.first_name + original.last_name}</Text>;
    },
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Date of Birth",
    accessor: "date_of_birth",
  },
  {
    Header: "Age",
    accessor: "age",
  },
];

export const PatientsTab: React.FC<Props> = (props) => {
  const {} = props;

  const rows = useMemo(() => MOCK_DATA.data, []);
  const cols = useMemo(() => MOCK_COLS, []);

  return (
    <div className="container">
      <Table
        searchPlaceholder="Search patient id, name, Acc no"
        cols={cols}
        rows={rows}
        title="Patients"
      />
    </div>
  );
};
