import {
  ArrowTopRightOnSquareIcon as ExternalLinkIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";

/* Components */
import { FooterComponent } from "@layouts/shared/footer";
import { Accordion, Drawer, Button, Text, RichTextEditor } from "@components";

/* Types */
import { AccordionItemType } from "@components/Accordion/types";

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
            <FooterComponent onCancel={() => setOpen(false)} />
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
        <div className="flex items-center justify-between w-full">
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
        <RichTextEditor height="15rem" />
      </Item.Content>
    </Item>
  );
};
