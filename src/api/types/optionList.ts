import type { Success, Failure } from "./shared";

export type OptionListResponse = OptionList[];

export type OptionList = {
  displayText: string;
  name: string;
  id: number;
};

export type LookupType = "BODYPART" | "MODALITY" | "PROCEDUREMASTER";
