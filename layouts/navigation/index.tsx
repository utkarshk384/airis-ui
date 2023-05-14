import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";

/* Stores */
import { useNavigationStore } from "@stores/navigation";

/* Components */
import { NavigationContainer } from "./styled";
import { Logo, Button, Avatar, KeyIcon, LogoutIcon, Text } from "@components";

/* Types */
import type { Routes } from "@stores/navigation";
import type { MenuType } from "@components/Dropdown";

type Props = {
  children?: React.ReactNode;
};

type NavigationItemProps = {
  text: string;
  route: Routes;
};

export const NavigationBar: React.FC<Props> = (props) => {
  const {} = props;

  /* Stores and Hooks */
  const router = useRouter();
  const route = useNavigationStore((s) => s.route);

  useEffect(() => {
    const { tab } = router.query;
    if (!tab) router.push("/", `/?tab=${route}`, { shallow: true });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer className="container">
      <div className="flex gap-4">
        <Logo alt="Rxmed Logo" width={140} height={52} />
        <NavigationItem route="patients" text="Patients" />
        <NavigationItem route="adminstration" text="Adminstration" />
      </div>
      <div className="flex flex-col gap-1 items-center justify-center">
        <Avatar hasDropdown DropdownContent={DropdownContent} />
        <Text size="sm">Dr. John</Text>
      </div>
    </NavigationContainer>
  );
};

const DropdownContent = (Dropdown: MenuType) => (
  <>
    <Dropdown.Label>Dr. John</Dropdown.Label>
    <Dropdown.Separator />
    {/* <Dropdown.Item className="flex items-center gap-4">
      <KeyIcon fill="currentColor" />
      Change Password
    </Dropdown.Item> */}
    <Dropdown.Item className="flex items-center gap-4 !text-red-500">
      <LogoutIcon stroke="currentColor" />
      Logout
    </Dropdown.Item>
  </>
);

const NavigationItem: React.FC<NavigationItemProps> = (props) => {
  const { text, route } = props;

  /* Stores and Hooks */
  const router = useRouter();
  const { setRoute, route: currentRoute } = useNavigationStore();

  const onClickHandler = useCallback(() => {
    setRoute(route);
    router.push("/", `/?tab=${route}`, { shallow: true });
  }, [route, router, setRoute]);

  return (
    <Button
      as="a"
      variant="text"
      typographyProps={{
        color: currentRoute === route ? "accent" : "black",
        size: "base",
        textCase: "capitalize",
      }}
      className={`border-b-2 !rounded-none ${
        currentRoute === route ? "border-accent" : "border-transparent"
      }`}
      onClick={onClickHandler}
    >
      {text}
    </Button>
  );
};
