import {
  ArrowTopRightOnSquareIcon as ExternalLinkIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";

/* Components */
import { Accordion, Drawer, Button, Text } from "@components";
import { AccordionItemType } from "@components/Accordion/types";
import { useMemo } from "react";
import { FooterComponent } from "./shared";

type DrawerProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

type TechnicalNotesItemProps = {
  Item: AccordionItemType;
};

export const TechnicalNotesDrawer: React.FC<DrawerProps> = (props) => {
  const { open, setOpen } = props;

  return (
    <Drawer size="large" open={open} onOpenChange={(val) => setOpen(val)}>
      {({ Header, Footer }) => (
        <>
          <Header title="Technical Notes" />
          <div className="p-4 gap-4 flex flex-col">
            <div className="flex w-full justify-end">
              <Button
                size="lg"
                variant="solid"
                leftIcon={() => <PlusIcon width={24} />}
              >
                Add
              </Button>
            </div>
            <Accordion.Multiple>
              {(Item) => (
                <>
                  <TechnicalNotesItem Item={Item} />
                </>
              )}
            </Accordion.Multiple>
          </div>
          <Footer>
            <FooterComponent />
          </Footer>
        </>
      )}
    </Drawer>
  );
};

const TechnicalNotesItem: React.FC<TechnicalNotesItemProps> = ({ Item }) => {
  return (
    <Item value="tes-1">
      <Item.Trigger>
        <div className="flex justify-between w-full">
          <Text size="base">Item One</Text>
          <div className="flex items-center">
            <Text size="base">02-02-2023 09:30</Text>
            <Button className="text-accent" variant="icon" iconButton>
              <ExternalLinkIcon fill="currentColor" width={16} />
            </Button>
          </div>
        </div>
      </Item.Trigger>
      <Item.Content>
        Test content. Test contentTest contentTest contentTest contentTest
        contentTest contentTest contentTest content
      </Item.Content>
    </Item>
  );
};
