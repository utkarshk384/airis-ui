import React, { useRef } from "react";
import { Transition } from "react-transition-group";
import { XMarkIcon } from "@heroicons/react/20/solid";
import * as DialogPrimitive from "@radix-ui/react-dialog";

/* Components */
import { Button } from "@components/Button";
import { Heading } from "@components/Typography";
import { StyledContent, StyledOverlay, StyledDialogHeader } from "./styled";

/* Animations */
import { GSAPAnimation } from "./animation";

/* Types */
import type { DialogHeaderProps } from "./types";

export type DialogItemType = typeof DialogItem;

type SharedProps = {
  open: boolean;
  children: (DialogItem: DialogItemType) => React.ReactNode;
};

type Props = {
  onOpenChange?: (open: boolean) => void;
  open: boolean;
  TriggerComponent?: React.FC;
} & SharedProps;

export const Dialog: React.FC<Props> = (props) => {
  const { children, TriggerComponent, ...rest } = props;
  return (
    <DialogPrimitive.Root {...rest}>
      {TriggerComponent && (
        <DialogPrimitive.Trigger>
          <TriggerComponent />
        </DialogPrimitive.Trigger>
      )}
      <StyledOverlay />
      <Content open={rest.open}>{children}</Content>
    </DialogPrimitive.Root>
  );
};

const Content: React.FC<SharedProps> = ({ children, open }) => {
  const domRef = useRef<HTMLDivElement>(null);
  return (
    <Transition
      in={open}
      unmountOnExit
      mountOnEnter
      nodeRef={domRef}
      timeout={500}
      addEndListener={(done) => {
        GSAPAnimation(domRef.current!, open).then(() => done());
      }}
    >
      <StyledContent ref={domRef} forceMount>
        {children instanceof Function ? children(DialogItem) : children}
      </StyledContent>
    </Transition>
  );
};

const DialogHeader: React.FC<DialogHeaderProps> = (props) => {
  const { title } = props;
  return (
    <StyledDialogHeader>
      <Heading color="white" weight="600" as="h3">
        {title}
      </Heading>
      <Button as={DialogPrimitive.Close} variant="solid" iconButton>
        <XMarkIcon width={24} stroke="currentColor" />
      </Button>
    </StyledDialogHeader>
  );
};

const DialogItem = () => <></>;
DialogItem.Header = DialogHeader;
