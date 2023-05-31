import { format, parse } from "date-fns";

/* Types */
import type { FormatDateInterface, ParseStringDateInterface } from "./types";

export const ParseStringDate: ParseStringDateInterface = (date, format) => {
  if (typeof date === "string") return parse(date, format, new Date());

  return date as Date;
};

export const FormatDate: FormatDateInterface = (date, dateFormat) => {
  if (!dateFormat) dateFormat = "dd-MM-yyyy";
  if (!date) return "";

  return format(date, dateFormat);
};
