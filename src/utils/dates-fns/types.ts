export type DateType = number | Date;

export type ParseStringDateInterface = (
  date: DateType | string,
  format: string
) => Date;

export type FormatOpts =
  | "dd-MM-yyyy"
  | "dd-MM-yyyy HH:mm"
  | "HH:mm"
  | "MMM"
  | "MMMM"
  | "yyyy";

/* Functions */
export type FormatDateInterface = (
  date: DateType,
  format?: FormatOpts
) => string;
