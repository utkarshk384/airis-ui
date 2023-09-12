import { BaseProps, Props } from "./types";

type SpinnerProps = BaseProps | Props;

export const Spinner: React.FC<SpinnerProps> = (props) => {
  const {} = props;
  return (
    <div>
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-4 h-4 ml-2 -mt-1 border-2 border-white border-solid rounded-full animate-spin"
      ></div>
    </div>
  );
};
