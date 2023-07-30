import React from "react";

/* Layouts */
import { AppLayout } from "@layouts/layout";
import { PatientsTab } from "@layouts/patients";
import { AdminstrationTab } from "@layouts/adminstration";

/* Stores */
import { useNavigationStore } from "@stores/navigation";

type Props = {
  children?: React.ReactNode;
};

type Page = React.FC<Props> & {
  getLayout: (page: React.ReactNode) => React.ReactNode;
};

const DashboardPage: Page = (props) => {
  const {} = props;

  const route = useNavigationStore((s) => s.route);
  return (
    <>
      {route === "patients" && <PatientsTab />}
      {route === "adminstration" && <AdminstrationTab />}
    </>
  );
};

DashboardPage.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default DashboardPage;
