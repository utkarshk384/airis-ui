import { parseISO } from "date-fns";
import { useRouter } from "next/router";
import { PlusIcon } from "@heroicons/react/20/solid";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* Components */
import { ListItem } from "./shared";
import { DrFormDrawer } from "@layouts/modals/drForm";
import {
  TechnicalNotesDrawer,
  AllergyDrawer,
  AddTemplate,
} from "@layouts/modals/";
import {
  AllergyIcon,
  Button,
  DrFormIcon,
  Select,
  WritingIcon,
  useDropdown,
} from "@components";

/* Hooks */
import { useTab } from "../context/tabs";
import { useIsModalsOpen } from "@layouts/patients/modalContext";

/* Utils */
import { FormatDate } from "@utils/dates-fns";

/* APIs */
import {
  useDocumentUpload,
  usePatientHistory,
  useRadiologistList,
  useTemplates,
} from "@src/api";

/* Types */
import type { PatientListType, PatientHistory } from "@src/api/types";

type Props = {
  children?: React.ReactNode;
  patient: PatientListType | null;
  setEditorText: React.Dispatch<React.SetStateAction<string>>;
};

export const TabContent: React.FC<Props> = (props) => {
  const { patient, setEditorText } = props;

  /* Hooks */
  const { tab } = useTab();
  const router = useRouter();
  const { setIsModelOpen } = useIsModalsOpen();
  const [dropdownData, setDropdownData] = useDropdown();

  /* States */
  const [templates, setTemplates] = useDropdown();
  const [isTemplateOpen, setTemplateOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [history, setHistory] = useState<PatientHistory | null>(null);

  /* APIs */
  const { getRadiologistList } = useRadiologistList();
  const { getPatientHistory, setPatientId } = usePatientHistory();
  const { getUploadDocument, setGetUploadBody } = useDocumentUpload();
  const { getRadiologistTemplate, setListRadiologistPayload } = useTemplates();

  useEffect(() => {
    if (getRadiologistList.isSuccess)
      setDropdownData(getRadiologistList.data, [
        "radiologistSignatureName",
        "radiologistId",
      ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRadiologistList.isSuccess]);

  const imgRef = useRef(null);

  /* Effects */
  useEffect(() => {
    const patientId = router.query.report;
    setPatientId(patientId as string);
  }, [router.query.report, setPatientId]);

  useEffect(() => {
    const item = getPatientHistory.data?.[tab];
    if (item) {
      setListRadiologistPayload((prev) => {
        const payload = {
          ...prev,
          procedureMasterId: item.procedure,
        };
        return payload;
      });

      setHistory(item);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPatientHistory.data, tab]);

  useEffect(() => {
    setGetUploadBody({
      id: patient?.patientVisitIndexId || "",
      patientId: patient?.patientIndexId || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient?.patientIndexId, patient?.patientVisitIndexId]);

  useEffect(() => {
    if (getRadiologistTemplate.isSuccess)
      setTemplates(getRadiologistTemplate.data, [
        "templateName",
        "reportTemplateId",
      ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRadiologistTemplate.isSuccess]);

  const examDate = useMemo(() => {
    if (history && history.visitDate) {
      const parsedDate = parseISO(history.visitDate);
      return FormatDate(parsedDate, "dd-MM-yyyy HH:mm");
    }
    return "Failed to load exam date";
  }, [history]);

  /* Callbacks */
  const loadDocument = useCallback(() => {
    // setIsFormOpen(true);
    const blob = new Blob([getUploadDocument.data as string], {
      type: "image/jpeg",
    });
    const url = URL.createObjectURL(blob);
  }, [getUploadDocument.data]);

  return (
    <>
      <TechnicalNotesDrawer />
      <AllergyDrawer />
      <DrFormDrawer open={isFormOpen} setOpen={setIsFormOpen} />
      <AddTemplate
        refetchFn={getRadiologistTemplate.refetch}
        open={isTemplateOpen}
        setOpen={setTemplateOpen}
      />
      <div className="flex flex-col gap-10">
        <div className="flex justify-between px-4">
          <ListItem
            color="black"
            title="Acc Number"
            value={patient?.accessionNumber || ""}
          />
          <ListItem
            color="black"
            title="Modality & Examination"
            value={history?.procedureText || ""}
          />
          <ListItem color="black" title="Examination Date" value={examDate} />
          <ListItem
            color="black"
            title="Referral Doctor"
            value={history?.referringDoctor || ""}
          />
        </div>
        <div className="grid grid-cols-[2fr_2fr_1fr] mx-4">
          <div className="flex w-full gap-4">
            <Select
              isSearchable
              label="Template:"
              containerClassName="!w-2/3"
              labelClassName="!justify-self-start"
              name="template"
              onChange={(vals) => {
                const item = getRadiologistTemplate.data?.find(
                  (item) => item.reportTemplateId === vals.value
                );
                if (item)
                  setEditorText((prev) => `${prev}\n ${item.reportTemplate}`);
              }}
              placeholder="Select Template..."
              options={templates}
            />
            <Button
              variant="solid"
              size="base"
              onClick={() => setTemplateOpen(true)}
              rightIcon={() => <PlusIcon width={24} height={24} />}
            />
          </div>
          <Select
            name="radiologist"
            label="Consultant Radiologist:"
            options={dropdownData}
          />
          <div className="flex justify-end w-full gap-4">
            <Button
              onClick={() =>
                setIsModelOpen({
                  type: "OPEN_TN",
                  payload: patient?.patientIndexId as number,
                })
              }
              tooltip="Technical Notes"
              variant="outline"
              iconButton
              size="base"
            >
              <WritingIcon fill="currentColor" />
            </Button>
            <Button
              onClick={() =>
                setIsModelOpen({
                  type: "OPEN_ALLERGY",
                  payload: patient?.patientIndexId as number,
                })
              }
              tooltip="Allergies"
              variant="outline"
              iconButton
              size="base"
            >
              <AllergyIcon fill="currentColor" />
            </Button>
            <Button
              // onClick={() => loadDocument()}
              tooltip="Doctor's Form"
              variant="outline"
              iconButton
              size="base"
            >
              <DrFormIcon fill="currentColor" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
