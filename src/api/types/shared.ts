type Result<T> = {
  value: string;
} & T;

export type Failure<T = {}> = {
  message: string;
} & T;

export type Success<T> = {
  result: Result<T>;
};
