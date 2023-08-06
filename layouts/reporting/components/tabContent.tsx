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
import { TechnicalNotesDrawer, AllergyDrawer } from "@layouts/modals/";
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
import { useDocumentUpload, usePatientHistory, useTemplates } from "@src/api";

/* Types */
import type { PatientListType, PatientHistory } from "@src/api/types";

type Props = {
  children?: React.ReactNode;
  patient: PatientListType | null;
};

export const TabContent: React.FC<Props> = (props) => {
  const { patient } = props;

  /* Hooks */
  const { tab } = useTab();
  const router = useRouter();
  const { setIsModelOpen } = useIsModalsOpen();

  /* States */
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [templates, setTemplates] = useDropdown();
  const [history, setHistory] = useState<PatientHistory | null>(null);

  const { getRadiologistTemplate, setListRadiologistPayload } = useTemplates();
  const { getPatientHistory, setPatientId } = usePatientHistory();
  const { getUploadDocument, setGetUploadBody } = useDocumentUpload();

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
        "reportTemplate",
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
        <div className="grid grid-cols-[1fr_1fr] px-4">
          <div className="flex gap-4">
            <Select
              label="Template:"
              containerClassName="!w-2/3"
              labelClassName="!justify-self-start"
              name="template"
              placeholder="Select Template..."
              options={templates}
            />
            <Button
              variant="solid"
              size="base"
              rightIcon={() => <PlusIcon width={24} height={24} />}
            ></Button>
          </div>
          <div className="flex gap-4 justify-self-end">
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
