import React from "react";

/* Layouts */
import { PatientsTab } from "@layouts/patients";
import { NavigationBar } from "@layouts/navigation";

/* Stores */
import { useNavigationStore } from "@stores/navigation";

type Props = {
  children?: React.ReactNode;
};

const DashboardPage: React.FC<Props> = (props) => {
  const {} = props;

  const route = useNavigationStore((s) => s.route);

  return (
    <div>
      <NavigationBar />
      <div className="my-10" />
      {route === "patients" && <PatientsTab />}
    </div>
  );
};

export default DashboardPage;
