export type DateType = number | Date;

export type ParseStringDateInterface = (
  date: DateType | string,
  format: FormatOpts
) => Date;

export type FormatOpts =
  | "dd-MM-yyyy"
  | "dd/MM/yyyy"
  | "dd-MM-yyyy HH:mm"
  | "dd-MM-yyyy HH:mm:ss"
  | "HH:mm"
  | "MMM"
  | "MMM dd"
  | "MMMM"
  | "yyyy";

/* Functions */
export type FormatDateInterface = (
  date: DateType,
  format?: FormatOpts
) => string;
