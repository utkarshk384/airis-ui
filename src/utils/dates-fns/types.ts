export type DateType = number | Date;

export type ParseStringDateInterface = (date: DateType, format: string) => Date;

export type FormatOpts = "dd-MM-yyyy" | "dd-MM-yyyy HH:mm";

/* Functions */
export type FormatDateInterface = (
  date: DateType,
  format?: FormatOpts
) => string;
