type Result<T> = {
  value: string;
} & T;

export type Failure<T = {}> = {
  message: string;
} & T;

export type Success<T> = {
  result: Result<T>;
};

export type APIResponse<S = string, F = string> = {
  statusCode: number;
  success: {
    result: S;
  };
  failure: {
    message: F;
  };
};
