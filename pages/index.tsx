import React from "react";

/* Layouts */
import { PatientsTab } from "@layouts/patients";
import { NavigationBar } from "@layouts/navigation";

/* Stores */
import { useNavigationStore } from "@stores/navigation";
import { AddTemplate } from "@layouts/templates";

type Props = {
  children?: React.ReactNode;
};

const DashboardPage: React.FC<Props> = (props) => {
  const {} = props;

  const route = useNavigationStore((s) => s.route);
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <NavigationBar />
      <div className="my-10" />
      {route === "patients" && <PatientsTab />}
      <button onClick={() => setOpen(true)}>Click</button>
      <AddTemplate open={open} setOpen={setOpen} />
    </div>
  );
};

export default DashboardPage;
