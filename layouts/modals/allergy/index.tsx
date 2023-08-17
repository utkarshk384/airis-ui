import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CheckIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";

/* Components */
import { FooterComponent } from "@layouts/shared/footer";
import { Accordion, Drawer, Button, Text, RichTextEditor } from "@components";

/* Hooks */
import { useNewItem } from "../shared/useNewItem";
import { useCookie, useUniqueId } from "@src/hooks";
import { useIsModalsOpen } from "@layouts/patients/modalContext";

/* Utils  */
import { FormatDate } from "@utils/dates-fns";

/* APIs */
import { useAllergies } from "@src/api";

/* Types */
import type { AllergyType } from "@src/api/types";
import type { AllergyNotesItemType } from "../types";
import type { AccordionItemType } from "@components/types";

type DrawerProps = {};

type AllergyItemProps = {
  Item: AccordionItemType;
  data: AllergyItemType;
  openAccordion: (id: string) => void;
  accordionOpen: string[];
};

type AllergyItemType = AllergyNotesItemType & {
  metadata: Pick<
    AllergyType,
    "createdBy" | "patientAllergyId" | "patientIndexId" | "createdDate"
  >;
};

export const AllergyDrawer: React.FC<DrawerProps> = (props) => {
  /* APIs */
  const { allergyQuery, setAllergyPatientId } = useAllergies();

  /* Hooks */
  const { COOKIE_KEYS, getCookie } = useCookie();
  const { isModelsOpen, setIsModelOpen } = useIsModalsOpen();
  const { items, setItems, count } = useNewItem<AllergyItemType>(
    isModelsOpen.isAllergyOpen
  );

  /* States */
  const [accordionOpen, setAccordionOpen] = useState<string[]>([]);

  /* Effects */
  useEffect(() => {
    if (!isModelsOpen.patientId) return;
    const id =
      typeof isModelsOpen.patientId === "number"
        ? isModelsOpen.patientId.toString()
        : isModelsOpen.patientId;
    setAllergyPatientId(id);
  }, [isModelsOpen.patientId, setAllergyPatientId]);

  useEffect(() => {
    if (!allergyQuery.isSuccess || !isModelsOpen.isAllergyOpen) return;

    const items: AllergyItemType[] = allergyQuery.data.map((item) => ({
      date: item.lastUpdatedDate,
      content: item.allergyText,
      isEdit: false,
      metadata: {
        createdBy: item.createdBy,
        patientAllergyId: item.patientAllergyId,
        patientIndexId: item.patientIndexId,
        createdDate: item.createdDate,
      },
    }));
    setItems(items);
  }, [
    allergyQuery.data,
    allergyQuery.isSuccess,
    isModelsOpen.isAllergyOpen,
    setItems,
  ]);

  /* Memos and Callbacks */
  const uniqueId = useUniqueId("mapped-item-");
  const setOpen = useCallback(
    (val: boolean) => {
      setIsModelOpen({
        type: val ? "OPEN_ALLERGY" : "CLOSE",
        payload: isModelsOpen.patientId,
      });
    },
    [isModelsOpen.patientId, setIsModelOpen]
  );

  const addNewItem = useCallback(() => {
    const newItems = [...items];

    const newItem: AllergyItemType = {
      date: FormatDate(new Date()),
      content: `Untitled text ${count.current++}`,
      isEdit: true,
      metadata: {
        createdBy: getCookie(COOKIE_KEYS.id),
        patientIndexId: isModelsOpen.patientId,
        createdDate: FormatDate(new Date(), "dd-MM-yyyy HH:mm:ss"),
      } as AllergyItemType["metadata"],
    };

    newItems.unshift(newItem);
    setItems(newItems);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, items, setItems]);

  const openAccordion = useCallback(
    (id: string) => {
      const item = accordionOpen.find((item) => item === id);
      if (!item) setAccordionOpen([...accordionOpen, id]);
      else setAccordionOpen(accordionOpen.filter((item) => item !== id));
    },
    [accordionOpen]
  );

  return (
    <Drawer
      size="large"
      open={isModelsOpen.isAllergyOpen}
      onOpenChange={setOpen}
    >
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
            <Accordion.Multiple value={accordionOpen}>
              {(Item) => (
                <>
                  {items.map((item, i) => (
                    <AllergyItem
                      accordionOpen={accordionOpen}
                      openAccordion={openAccordion}
                      key={uniqueId + i}
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
  const { Item, data: Data, openAccordion, accordionOpen } = props;

  const data = useMemo(() => Data as Required<AllergyItemType>, [Data]);

  const uniqueId = useUniqueId("accordion-id-");

  /* APIs */
  const { allergyMutation } = useAllergies();

  /* States */
  const [isEdit, setIsEdit] = useState(data.isEdit || false);
  const [text, setText] = useState(data.content || "");

  /* Effects */
  useEffect(() => {
    if (!isEdit) return;
    !accordionOpen.includes(uniqueId) && openAccordion(uniqueId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  /* Memos & Callbacks */
  const titleText = useMemo(() => {
    const newText = text.replace(/<[^>]*>/g, "");
    const maxLength = 40;
    return newText.length > maxLength
      ? newText.slice(0, maxLength) + "..."
      : newText;
  }, [text]);

  const saveItem = useCallback(async () => {
    allergyMutation.mutate({
      allergyText: text,
      lastUpdatedBy: 1,
      recStatus: 1,
      ...data.metadata,
    });
    allergyMutation.isSuccess && setIsEdit(false);
  }, [allergyMutation, data.metadata, text]);

  return (
    <Item value={uniqueId}>
      <Item.Trigger onClick={() => openAccordion(uniqueId)}>
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
        <div className="flex gap-4 flex-col">
          <RichTextEditor
            borderColor={allergyMutation.isError ? "#EF4444" : undefined}
            readOnly={!isEdit}
            height="15rem"
            onChange={(val) => setText(val)}
            value={text}
          />
          {allergyMutation.isError && (
            <Text color="red" size="sm">
              {allergyMutation.error as any}
            </Text>
          )}
        </div>
        {isEdit && (
          <div className="flex gap-4 mt-5">
            <FooterComponent
              onCancel={() => {
                setText(data.content || "");
                setIsEdit(false);
              }}
              onConfirm={saveItem}
            />
          </div>
        )}
      </Item.Content>
    </Item>
  );
};
