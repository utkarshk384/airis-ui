import React, { useEffect, useMemo, useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";

/* Components */
import { ListItem } from "./shared";
import { DrFormDrawer } from "@layouts/shared/drawer/drFormDrawer";
import { TechnicalNotesDrawer, AllergyDrawer } from "@layouts/shared/drawer";
import {
  AllergyIcon,
  Button,
  DrFormIcon,
  Select,
  WritingIcon,
  useDropdown,
} from "@components";

/* APIs */
import { usePatientHistory, useTemplates } from "@src/api";

/* Types */
import type { PatientListType, PatientHistory } from "@src/api/types";
import type { DropdownOption } from "@components/sharedTypes";
import { useTab } from "../context/tabs";
import { FormatDate } from "@utils/dates-fns";
import { parseISO } from "date-fns";
import { useRouter } from "next/router";

type Props = {
  children?: React.ReactNode;
  patient: PatientListType | null;
};

export const TabContent: React.FC<Props> = (props) => {
  const { patient } = props;

  /* Hooks */
  const { tab } = useTab();
  const router = useRouter();

  /* States */
  const [isAllergyOpen, setIsAllergyOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [templates, setTemplates] = useDropdown();
  const [history, setHistory] = useState<PatientHistory | null>(null);

  const { getRadiologistTemplate, setListRadiologistPayload } = useTemplates();
  const { getPatientHistory, setPatientId } = usePatientHistory();

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
    if (getRadiologistTemplate.isSuccess)
      setTemplates(getRadiologistTemplate.data, [
        "reportTemplate",
        "reportTemplateId",
      ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRadiologistTemplate.isSuccess]);

  const examDate = useMemo(() => {
    console.log({ history });
    if (history && history.visitDate) {
      const parsedDate = parseISO(history.visitDate);
      console.log({ parsedDate });
      return FormatDate(parsedDate, "dd-MM-yyyy HH:mm");
    }
    return "Failed to load exam date";
  }, [history]);

  return (
    <>
      <TechnicalNotesDrawer setOpen={setIsNotesOpen} open={isNotesOpen} />
      <AllergyDrawer setOpen={setIsAllergyOpen} open={isAllergyOpen} />
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
            title="Examination Name"
            value={history?.procedureText || "Failed to load procedure"}
          />
          <ListItem color="black" title="Examination Date" value={examDate} />
          <ListItem
            color="black"
            title="Referral Doctor"
            value={history?.referringDoctor || "Failed to load referral doctor"}
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
            >
              Add Template
            </Button>
          </div>
          <div className="flex gap-4 justify-self-end">
            <Button
              onClick={() => setIsNotesOpen(true)}
              tooltip="Technical Notes"
              variant="outline"
              iconButton
              size="base"
            >
              <WritingIcon fill="currentColor" />
            </Button>
            <Button
              onClick={() => setIsAllergyOpen(true)}
              tooltip="Allergies"
              variant="outline"
              iconButton
              size="base"
            >
              <AllergyIcon fill="currentColor" />
            </Button>
            <Button
              onClick={() => setIsFormOpen(true)}
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
