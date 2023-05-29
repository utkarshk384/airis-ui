import React, { useState } from "react";

/* Layouts */
import { AppLayout } from "@layouts/layout";
import { PatientsTab } from "@layouts/patients";

/* Stores */
import { useNavigationStore } from "@stores/navigation";
import { AddTemplate } from "@layouts/templates";

type Props = {
  children?: React.ReactNode;
};

type Page = React.FC<Props> & {
  getLayout: (page: React.ReactNode) => React.ReactNode;
};

const DashboardPage: Page = (props) => {
  const {} = props;

  const route = useNavigationStore((s) => s.route);
  const [open, setOpen] = useState(false);

  return (
    <>
      {route === "patients" && <PatientsTab />}
      <button onClick={() => setOpen(true)}>Click</button>
      <AddTemplate open={open} setOpen={setOpen} />
    </>
  );
};

DashboardPage.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default DashboardPage;
