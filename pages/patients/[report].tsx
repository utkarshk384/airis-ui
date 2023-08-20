import React from "react";

/* Layouts */
import { AppLayout } from "@layouts/layout";
import { ReportingComponent } from "@layouts/reporting";

/* Contexts */
import { TableModelProvider } from "@layouts/patients/modalContext";

type Props = {
  children?: React.ReactNode;
};

type Page = React.FC<Props> & {
  getLayout: (page: React.ReactNode) => React.ReactNode;
};

const ReportingPage: Page = (props) => {
  const {} = props;
  return (
    <TableModelProvider>
      <ReportingComponent />
    </TableModelProvider>
  );
};

ReportingPage.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default ReportingPage;
