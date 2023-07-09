import { useEffect } from "react";
import {
  ArrowTopRightOnSquareIcon as ExternalLinkIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";

/* Components */
import { FooterComponent } from "@layouts/shared/footer";
import { Accordion, Drawer, Button, Text, RichTextEditor } from "@components";

/* Hooks */
import { useUniqueId } from "@src/hooks";
import { useNewItem } from "../shared/useNewItem";

/* APIs */
import { useTechnicalNotes } from "@src/api";

/* Types */
import type { AccordionItemType } from "@components/types";
import type { AllergyNotesItemType } from "../types";

type DrawerProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  patientId: string | number;
};

type TechnicalNotesItemProps = {
  Item: AccordionItemType;
  data: AllergyNotesItemType;
};

export const TechnicalNotesDrawer: React.FC<DrawerProps> = (props) => {
  const { open, setOpen, patientId } = props;

  /* APIs */
  const { TNQuery, setTNPatientId } = useTechnicalNotes();

  const { items, addNewItem, setItems } = useNewItem(open);

  useEffect(() => {
    if (!patientId) return;
    const id = typeof patientId === "number" ? patientId.toString() : patientId;
    setTNPatientId(id);
  }, [patientId, setTNPatientId]);

  useEffect(() => {
    if (!TNQuery.isSuccess) return;

    const items = TNQuery.data.map((item) => ({
      title: "Item",
      date: item.lastUpdatedDate,
      content: item.clinicalNotesText,
    }));
    setItems(items);
  }, [TNQuery.data, TNQuery.isSuccess, setItems]);

  /* Memos */
  const uniqueId = useUniqueId("mapped-item-");

  return (
    <Drawer size="large" open={open} onOpenChange={(val) => setOpen(val)}>
      {({ Header, Footer }) => (
        <>
          <Header title="Technical Notes" />
          <div className="p-4 gap-4 flex flex-col">
            <div className="flex w-full justify-end">
              <Button
                onClick={addNewItem}
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
                  {items.map((item, i) => (
                    <TechnicalNotesItem
                      key={uniqueId + i}
                      Item={Item}
                      data={item}
                    />
                  ))}
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

const TechnicalNotesItem: React.FC<TechnicalNotesItemProps> = ({
  Item,
  data,
}) => {
  const uniqueId = useUniqueId("new-accordion-notes-item-");

  return (
    <Item value={uniqueId}>
      <Item.Trigger>
        <div className="flex items-center justify-between w-full">
          <Text size="base">{data.title}</Text>
          <div className="flex items-center">
            <Text size="base">{data.date}</Text>
            <Button as="a" className="text-accent" variant="icon" iconButton>
              <ExternalLinkIcon fill="currentColor" width={16} />
            </Button>
          </div>
        </div>
      </Item.Trigger>
      <Item.Content>
        <RichTextEditor height="15rem" defaultValue={data.content} />
      </Item.Content>
    </Item>
  );
};
