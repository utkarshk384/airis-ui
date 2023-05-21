export type BaseAccordionProps<T = string> = {
  children?: (Item: AccordionItemType) => React.ReactNode;
  value?: T;
  onValueChange?: (value: T) => void;
  collapsible?: boolean;
};

type HTMLAttributes = React.HTMLAttributes<HTMLDivElement>;

export type ContentProps = {
  children?: React.ReactNode;
};

export type TriggerProps = {
  children?: React.ReactNode;
} & Pick<HTMLAttributes, "className" | "style">;

export type ItemProps = {
  value: string;
  disabled?: boolean;
} & HTMLAttributes;

export type AccordionItemType = React.FC<ItemProps> & {
  Content: React.FC<ContentProps>;
  Trigger: React.FC<TriggerProps>;
};
