import React from "react";

/* Components */
import { Tabbar } from "./components/Tabs";
import { RichTextEditor } from "@components";
import { ReportingHeader } from "./components/header";
import { BorderedContainer } from "./components/styled";

/* Contexts */
import { TabProvider } from "./context/tabs";
import { TabContent } from "./components/tabContent";

type Props = {
  children?: React.ReactNode;
};

export const ReportingComponent: React.FC<Props> = (props) => {
  const {} = props;

  return (
    <div className="container gap-y-5 grid grid-rows-[1fr_2fr_3fr_1fr]">
      <ReportingHeader
        data={{
          age: "20/11",
          gender: "Male",
          name: "John Doe",
          id: "S767676767D",
        }}
      />
      <TabProvider>
        <BorderedContainer className="overflow-hidden">
          <Tabbar />
          <TabContent />
        </BorderedContainer>
        <BorderedContainer>
          <RichTextEditor height="20rem" />
        </BorderedContainer>
      </TabProvider>
    </div>
  );
};
