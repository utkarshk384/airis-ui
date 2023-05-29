import React from "react";

/* Layouts */
import { AppLayout } from "@layouts/layout";
import { ReportingComponent } from "@layouts/reporting";

type Props = {
  children?: React.ReactNode;
};

type Page = React.FC<Props> & {
  getLayout: (page: React.ReactNode) => React.ReactNode;
};

const ReportingPage: Page = (props) => {
  const {} = props;
  return <ReportingComponent />;
};

ReportingPage.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default ReportingPage;
