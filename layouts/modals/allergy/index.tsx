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

/* Types */
import type { AllergyNotesItemType } from "../types";
import type { AccordionItemType } from "@components/types";
import { useAllergies } from "@src/api";
import { useEffect } from "react";

type DrawerProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  patientId: string | number;
};

type AllergyItemProps = {
  Item: AccordionItemType;
  data: AllergyNotesItemType;
};

export const AllergyDrawer: React.FC<DrawerProps> = (props) => {
  const { open, setOpen, patientId } = props;

  /* APIs */
  const { allergyQuery, setAllergyPatientId } = useAllergies();

  const { items, addNewItem, setItems } = useNewItem(open);

  /* Effects */
  useEffect(() => {
    if (!patientId) return;
    const id = typeof patientId === "number" ? patientId.toString() : patientId;
    setAllergyPatientId(id);
  }, [patientId, setAllergyPatientId]);

  useEffect(() => {
    if (!allergyQuery.isSuccess) return;

    const items = allergyQuery.data.map((item) => ({
      title: "Item",
      date: item.lastUpdatedDate,
      content: item.allergyText,
    }));
    setItems(items);
  }, [allergyQuery.data, allergyQuery.isSuccess, setItems]);

  /* Memos */
  const uniqueId = useUniqueId("mapped-item-");

  return (
    <Drawer size="large" open={open} onOpenChange={(val) => setOpen(val)}>
      {({ Header, Footer }) => (
        <>
          <Header title="Allergy" />
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
                    <AllergyItem key={uniqueId + i} Item={Item} data={item} />
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

const AllergyItem: React.FC<AllergyItemProps> = ({ Item, data }) => {
  const uniqueId = useUniqueId("accordion-id-");

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
