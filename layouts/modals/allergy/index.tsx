import { useEffect, useMemo, useState } from "react";
import {
  CheckIcon,
  ArrowTopRightOnSquareIcon as ExternalLinkIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";

/* Components */
import { FooterComponent } from "@layouts/shared/footer";
import { Accordion, Drawer, Button, Text, RichTextEditor } from "@components";

/* Hooks */
import { useUniqueId } from "@src/hooks";
import { useNewItem } from "../shared/useNewItem";

/* APIs */
import { useAllergies } from "@src/api";

/* Types */
import type { AllergyNotesItemType } from "../types";
import type { AccordionItemType } from "@components/types";

type DrawerProps = {
  open: boolean;
  patientId: string | number;
  setOpen: (val: boolean) => void;
};

type AllergyItemProps = {
  Item: AccordionItemType;
  data: AllergyNotesItemType;
  setOpen: (val: boolean) => void;
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
      {({ Header }) => (
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
                    <AllergyItem
                      key={uniqueId + i}
                      setOpen={setOpen}
                      Item={Item}
                      data={item}
                    />
                  ))}
                </>
              )}
            </Accordion.Multiple>
          </div>
        </>
      )}
    </Drawer>
  );
};

const AllergyItem: React.FC<AllergyItemProps> = (props) => {
  const { Item, data, setOpen } = props;
  const uniqueId = useUniqueId("accordion-id-");

  /* APIs */
  const { allergyMutation } = useAllergies();

  /* States */
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(data.content || "");

  const titleText = useMemo(() => text.replace(/<[^>]*>/g, ""), [text]);

  return (
    <Item value={uniqueId}>
      <Item.Trigger>
        <div className="grid grid-cols-2 items-center w-full">
          <div className="justify-self-start w-full">
            <Text
              size="base"
              className="text-ellipsis text-left overflow-hidden"
            >
              {titleText}
            </Text>
          </div>
          <div className="flex items-center justify-self-end">
            <Text size="base">{data.date}</Text>
            <Button
              as="a"
              className="text-accent"
              variant="icon"
              iconButton
              onClick={(e) => {
                e.stopPropagation();
                setIsEdit(!isEdit);
              }}
            >
              {isEdit && <CheckIcon fill="currentColor" width={16} />}
              {!isEdit && <PencilSquareIcon fill="currentColor" width={16} />}
            </Button>
          </div>
        </div>
      </Item.Trigger>
      <Item.Content>
        <RichTextEditor
          readOnly={!isEdit}
          height="15rem"
          onChange={(val) => setText(val)}
          value={text}
        />
        {isEdit && (
          <div className="flex gap-4 mt-5">
            <FooterComponent
              onCancel={() => {
                setText(data.content || "");
                setIsEdit(false);
              }}
            />
          </div>
        )}
      </Item.Content>
    </Item>
  );
};
