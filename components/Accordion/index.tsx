import React from "react";
import * as Expandable from "@radix-ui/react-accordion";

/* Components */
import { StyledAccordionItem } from "./styled";
import { AccordionContent, AccordionTrigger } from "./components";

/* Types */
import type {
  AccordionItemType,
  BaseAccordionProps as BaseProps,
} from "./types";

export type SingleProps = BaseProps<string>;
export type MultipleProps = BaseProps<string[]>;

const AccordionSingle: React.FC<SingleProps> = (props) => {
  const { children, ...rest } = DefaultProps<string>(props);

  return (
    <Expandable.Root type="single" {...rest}>
      {children instanceof Function ? children(Item) : children}
    </Expandable.Root>
  );
};

const AccordionMultiple: React.FC<MultipleProps> = (props) => {
  const { children, ...rest } = DefaultProps<string[]>(props);

  return (
    <Expandable.Root type="multiple" {...rest}>
      {children instanceof Function ? children(Item) : children}
    </Expandable.Root>
  );
};

const DefaultProps = <T,>(props: BaseProps<T>) => {
  const defaultProps: BaseProps<T> = {
    ...props,
    collapsible: (`${props.collapsible}` || "true") as unknown as boolean, // Typecasting to string to avoid DOM error
  };

  return defaultProps;
};

export const Accordion = () => <></>;

const Item: AccordionItemType = (props) => (
  <StyledAccordionItem {...props}></StyledAccordionItem>
);

Item.Content = AccordionContent;
Item.Trigger = AccordionTrigger;

Accordion.Single = AccordionSingle;
Accordion.Multiple = AccordionMultiple;
