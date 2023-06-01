import React, { useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Transition } from "react-transition-group";

/* Components */
import { DrawerFooter, DrawerHeader } from "./components";
import {
  StyledContainer,
  StyledContent,
  StyledOverlay,
  UnStyledContent,
} from "./styled";

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
  const {
    children,
    TriggerComponent,
    size = "small",
    unstyledContent = false,
    ...rest
  } = props;

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
      <Content
        unstyledCSS={props.unstyledCSS}
        unstyledClassName={props.unstyledClassName}
        unstyledContent={unstyledContent}
        size={size}
        open={rest.open}
      >
        {children}
      </Content>
    </Dialog.Root>
  );
};

const DrawerItem = () => <></>;

DrawerItem.Header = DrawerHeader;
DrawerItem.Footer = DrawerFooter;
DrawerItem.UnstyledContent = Dialog.Content;

export const Content: React.FC<SharedDrawerProps> = (props) => {
  const {
    children,
    open,
    size,
    unstyledContent,
    unstyledCSS = {},
    unstyledClassName = "",
  } = props;

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
      {unstyledContent ? (
        <UnStyledContent css={unstyledCSS as any} className={unstyledClassName}>
          <div>
            {children instanceof Function ? children(DrawerItem) : children}
          </div>
        </UnStyledContent>
      ) : (
        <StyledContent
          className="custom-scroll-bar"
          size={size}
          ref={domRef}
          forceMount
        >
          <StyledContainer>
            {children instanceof Function ? children(DrawerItem) : children}
          </StyledContainer>
        </StyledContent>
      )}
    </Transition>
  );
};
