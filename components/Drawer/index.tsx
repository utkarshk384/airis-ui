import React, { useRef } from "react";
import { Transition } from "react-transition-group";
import { XMarkIcon } from "@heroicons/react/20/solid";
import * as Dialog from "@radix-ui/react-dialog";

/* Components */
import { Button } from "@components/Button";
import { Heading } from "@components/Typography";
import { StyledContent, StyledOverlay, StyledDrawerHeader } from "./styled";

/* Animations */
import { AnimationDrawer, AnimationOverlay } from "./animation";

/* Types */
import type {
  DrawerHeaderProps,
  DrawerFooterProps,
  DrawerSizes,
} from "./types";

export type DrawerItemType = typeof DrawerItem;

type SharedProps = {
  open: boolean;
  size?: DrawerSizes;
  children: (DrawerItem: DrawerItemType) => React.ReactNode;
};

type Props = {
  onOpenChange?: (open: boolean) => void;
  open: boolean;
  TriggerComponent?: React.FC;
} & SharedProps;

export const Drawer: React.FC<Props> = (props) => {
  const { children, TriggerComponent, size = "small", ...rest } = props;

  const overlayRef = useRef<HTMLDivElement>(null);
  return (
    <Dialog.Root {...rest}>
      {TriggerComponent && (
        <Dialog.Trigger>
          <TriggerComponent />
        </Dialog.Trigger>
      )}
      <Transition
        in={rest.open}
        unmountOnExit
        mountOnEnter
        nodeRef={overlayRef}
        timeout={500}
        addEndListener={(done) => {
          AnimationOverlay(overlayRef.current!, rest.open).then(() => done());
        }}
      >
        <StyledOverlay forceMount ref={overlayRef} />
      </Transition>
      <Content size={size} open={rest.open}>
        {children}
      </Content>
    </Dialog.Root>
  );
};

const Content: React.FC<SharedProps> = (props) => {
  const { children, open, size } = props;

  const domRef = useRef<HTMLDivElement>(null);
  return (
    <Transition
      in={open}
      unmountOnExit
      mountOnEnter
      nodeRef={domRef}
      timeout={500}
      addEndListener={(done) => {
        AnimationDrawer(domRef.current!, open).then(() => done());
      }}
    >
      <StyledContent size={size} ref={domRef} forceMount>
        <div className="relative h-screen">
          {children instanceof Function ? children(DrawerItem) : children}
        </div>
      </StyledContent>
    </Transition>
  );
};

const DrawerHeader: React.FC<DrawerHeaderProps> = (props) => {
  const { title } = props;
  return (
    <StyledDrawerHeader>
      <Heading color="white" size="xl" weight="400" as="h3">
        {title}
      </Heading>
      <Button as={Dialog.Close} variant="solid" iconButton>
        <XMarkIcon width={24} stroke="currentColor" />
      </Button>
    </StyledDrawerHeader>
  );
};

const DrawerFooter: React.FC<DrawerFooterProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <footer
      {...rest}
      className={`absolute bottom-0 w-full p-4 border-t-2 border-gray-200 flex gap-4 ${
        rest.className || ""
      }`}
    >
      {props.children}
    </footer>
  );
};

const DrawerItem = () => <></>;
DrawerItem.Header = DrawerHeader;
DrawerItem.Footer = DrawerFooter;
