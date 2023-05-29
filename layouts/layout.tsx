import React from "react";
import { NavigationBar } from "./navigation";

type Props = {
  children?: React.ReactNode;
};

export const AppLayout: React.FC<Props> = (props) => {
  return (
    <div>
      <NavigationBar />
      <div className="my-10" />
      {props.children}
    </div>
  );
};
