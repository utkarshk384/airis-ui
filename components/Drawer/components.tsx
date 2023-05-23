import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/20/solid";

/* Components */
import { Button } from "@components/Button";
import { Heading } from "@components/Typography";
import { StyledDrawerHeader } from "./styled";

/* Types */
import type { DrawerHeaderProps, DrawerFooterProps } from "./types";

export const DrawerHeader: React.FC<DrawerHeaderProps> = (props) => {
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

export const DrawerFooter: React.FC<DrawerFooterProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <footer
      {...rest}
      className={`sticky bg-white bottom-0 w-full p-4 border-t-2 border-gray-200 flex gap-4 z-10 ${
        rest.className || ""
      }`}
    >
      {props.children}
    </footer>
  );
};
