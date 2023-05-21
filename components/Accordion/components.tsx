import { useState, useRef, useEffect } from "react";
import { Transition } from "react-transition-group";

/* Components */
import {
  ChevronRotate,
  StyledAccordionContent,
  StyledAccordionTrigger,
} from "./styled";

/* Animation */
import { GSAPAnimation } from "./animation";

/* Types */
import { ContentProps, TriggerProps } from "./types";
import { Button } from "@components/Button";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

export const AccordionTrigger: React.FC<TriggerProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <StyledAccordionTrigger
      {...rest}
      className={`${ChevronRotate()} ${rest.className || ""}`}
    >
      <Button
        as="a"
        id="chevron"
        className="justify-self-end"
        iconButton
        variant="icon"
      >
        <ChevronRightIcon width={24} />
      </Button>
      {children}
    </StyledAccordionTrigger>
  );
};

export const AccordionContent: React.FC<ContentProps> = (props) => {
  const { children } = props;

  return <StyledAccordionContent>{children}</StyledAccordionContent>;
};
