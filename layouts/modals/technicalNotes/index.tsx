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
import { useTechnicalNotes } from "@src/api";

/* Types */
import type { AllergyNotesItemType } from "../types";
import type { TechnicalNotesType } from "@src/api/types";
import type { AccordionItemType } from "@components/types";

type DrawerProps = {};

type TechnicalNotesItemProps = {
  Item: AccordionItemType;
  data: TNItemType;
  openAccordion: (id: string) => void;
  accordionOpen: string[];
};

type TNItemType = AllergyNotesItemType & {
  metadata: Pick<
    TechnicalNotesType,
    | "createdBy"
    | "patientClinicalNotesId"
    | "patientIndexId"
    | "createdDate"
    | "notesDate"
    | "notesStatus"
  >;
};

export const TechnicalNotesDrawer: React.FC<DrawerProps> = (props) => {
  /* APIs */
  const { TNQuery, setTNPatientId } = useTechnicalNotes();

  /* Hooks */
  const { COOKIE_KEYS, getCookie } = useCookie();
  const { isModelsOpen, setIsModelOpen } = useIsModalsOpen();
  const { items, setItems, count } = useNewItem<TNItemType>(
    isModelsOpen.isTNOpen
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
    setTNPatientId(id);
  }, [isModelsOpen.patientId, setTNPatientId]);

  useEffect(() => {
    if (!TNQuery.isSuccess || !isModelsOpen.isTNOpen) return;

    const items: TNItemType[] = TNQuery.data.map((item) => ({
      date: item.lastUpdatedDate,
      content: item.clinicalNotesText,
      isEdit: false,
      metadata: {
        createdBy: item.createdBy,
        createdDate: item.createdDate,
        notesDate: item.notesDate,
        notesStatus: item.notesStatus,
        patientClinicalNotesId: item.patientClinicalNotesId,
        patientIndexId: item.patientIndexId,
      },
    }));
    setItems(items);
  }, [TNQuery.data, TNQuery.isSuccess, isModelsOpen.isTNOpen, setItems]);

  /* Memos and Callbacks */
  const uniqueId = useUniqueId("mapped-item-");
  const setOpen = useCallback(
    (val: boolean) => {
      setIsModelOpen({
        type: val ? "OPEN_TN" : "CLOSE",
        payload: isModelsOpen.patientId,
      });
    },
    [isModelsOpen.patientId, setIsModelOpen]
  );

  const addNewItem = useCallback(() => {
    const newItems = [...items];

    const newItem: TNItemType = {
      date: FormatDate(new Date()),
      content: `Untitled text ${count.current++}`,
      isEdit: true,
      metadata: {
        createdBy: getCookie(COOKIE_KEYS.id),
        patientIndexId: isModelsOpen.patientId,
        createdDate: FormatDate(new Date(), "dd-MM-yyyy HH:mm:ss"),
        notesDate: FormatDate(new Date(), "dd-MM-yyyy HH:mm:ss"),
        notesStatus: false,
      } as TNItemType["metadata"],
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
      open={isModelsOpen.isTNOpen}
      onOpenChange={(val) => setOpen(val)}
    >
      {({ Header }) => (
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
            <Accordion.Multiple value={accordionOpen}>
              {(Item) => (
                <>
                  {items.map((item, i) => (
                    <TechnicalNotesItem
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

const TechnicalNotesItem: React.FC<TechnicalNotesItemProps> = (props) => {
  const { Item, data: Data, openAccordion, accordionOpen } = props;

  const data = useMemo(() => Data as Required<TNItemType>, [Data]);

  const uniqueId = useUniqueId("new-accordion-notes-item-");

  /* APIs */
  const { TNMutation } = useTechnicalNotes();

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
    TNMutation.mutate({
      clinicalNotesText: text,
      lastUpdatedBy: 1,
      lastUpdatedDate: FormatDate(new Date(), "dd-MM-yyyy HH:mm:ss"),
      recStatus: false,
      ...data.metadata,
    });
    TNMutation.isSuccess && setIsEdit(false);
  }, [TNMutation, data.metadata, text]);

  return (
    <Item value={uniqueId}>
      <Item.Trigger onClick={() => openAccordion(uniqueId)}>
        <div className="flex items-center justify-between w-full">
          <Text size="base" className="text-ellipsis text-left overflow-hidden">
            {titleText}
          </Text>
          <div className="flex items-center">
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
            borderColor={TNMutation.isError ? "#EF4444" : undefined}
            readOnly={!isEdit}
            height="15rem"
            onChange={(val) => setText(val)}
            value={text}
          />
          {TNMutation.isError && (
            <Text color="red" size="sm">
              {TNMutation.error as any}
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
