import { differenceInYears, format, parse } from "date-fns";

/* Types */
import type {
  FormatDateInterface,
  FormatOpts,
  ParseStringDateInterface,
} from "./types";

export const ParseStringDate: ParseStringDateInterface = (date, format) => {
  if (typeof date === "string") return parse(date, format, new Date());

  return date as Date;
};

export const FormatDate: FormatDateInterface = (date, dateFormat) => {
  if (!dateFormat) dateFormat = "dd-MM-yyyy";
  if (!date) return "";

  return format(date, dateFormat);
};

export const GetAge = (
  date: string | Date,
  parseFormat: FormatOpts = "dd-MM-yyyy"
) => {
  if (typeof date === "string") date = ParseStringDate(date, parseFormat);

  const today = new Date();
  const age = differenceInYears(today, date);
  return age;
};
