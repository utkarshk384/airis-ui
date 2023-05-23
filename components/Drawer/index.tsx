import React, { useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Transition } from "react-transition-group";

/* Components */
import { StyledContent, StyledOverlay } from "./styled";
import { DrawerFooter, DrawerHeader } from "./components";

/* Animations */
import { AnimationDrawer, AnimationOverlay } from "./animation";

/* Types */
import type { SharedDrawerProps } from "./types";

export type DrawerItemType = typeof DrawerItem;

type Props = {
  onOpenChange?: (open: boolean) => void;
  open: boolean;
  TriggerComponent?: React.FC;
} & SharedDrawerProps;

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

const DrawerItem = () => <></>;

DrawerItem.Header = DrawerHeader;
DrawerItem.Footer = DrawerFooter;

export const Content: React.FC<SharedDrawerProps> = (props) => {
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
      <StyledContent
        className="custom-scroll-bar"
        size={size}
        ref={domRef}
        forceMount
      >
        <div className="relative h-screen isolate">
          {children instanceof Function ? children(DrawerItem) : children}
        </div>
      </StyledContent>
    </Transition>
  );
};
