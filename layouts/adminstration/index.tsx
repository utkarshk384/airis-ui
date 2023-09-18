import React, { useMemo, useState } from "react";
import { UserIcon } from "@heroicons/react/20/solid";

/* Components */
import { OrganizationBranch, Templates } from "./components";
import {
  BuildingIcon,
  Button,
  GearIcon,
  Heading,
  KeyIcon,
  UsersIcon,
  WritingIcon,
} from "@components";

/* Hooks */
import { useUniqueId } from "@src/hooks";

/* Contexts */
import { useAdminstrationTab, AdminTabProvider } from "./contexts/tabContext";

type Props = {
  children?: React.ReactNode;
};

type TabProps = {
  index: number;
  heading: string;
};

const ICONS = [
  () => <BuildingIcon />,
  () => <UserIcon width={24} fill="white" />,
  () => <KeyIcon width={24} fill="white" />,
  () => <UsersIcon />,
  () => <GearIcon />,
  () => <WritingIcon fill="white" />,
];

const CONTENT = [
  () => <OrganizationBranch />,
  () => <div>Content 2</div>,
  () => <div>Content 3</div>,
  () => <div>Content 4</div>,
  () => <div>Content 5</div>,
  () => <Templates />,
];

const AdminTab: React.FC<Props> = (props) => {
  const {} = props;

  const { headings, titleText, tab } = useAdminstrationTab();

  /* Memos */
  const UniqId = useUniqueId("tab-bar-");
  const Content = useMemo(() => CONTENT[tab], [tab]);

  return (
    <div className="container h-[80vh]">
      <div className="mb-10">
        <Heading size="2xl" weight="600" className="sticky top-16">
          {titleText}
        </Heading>
      </div>
      <div className="relative flex h-full gap-4 mb-16">
        <div className="flex flex-col justify-center gap-4 p-4 rounded-lg bg-primary">
          {headings.map((heading, index) => (
            <Tab key={UniqId + index} heading={heading} index={index} />
          ))}
        </div>
        <div className="w-full p-4 bg-white rounded-lg">
          <Content />
        </div>
      </div>
    </div>
  );
};

const Tab: React.FC<TabProps> = (props) => {
  const { heading, index } = props;

  const { setTab, tab } = useAdminstrationTab();

  /* Memos */
  const Icon = useMemo(() => ICONS[index], [index]);
  return (
    <Button
      size="xl"
      className={tab === index ? "bg-accent" : ""}
      onClick={() => setTab(index)}
      iconButton
      variant="icon"
      tooltip={heading}
    >
      <Icon />
    </Button>
  );
};

export const AdminstrationTab: React.FC = () => {
  return (
    <AdminTabProvider>
      <AdminTab />
    </AdminTabProvider>
  );
};
