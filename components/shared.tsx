import { Text } from "./Typography";

type LabelProps = {
  htmlFor?: string;
  label?: string;
  labelClassName?: string;
};

export const Label: React.FC<LabelProps> = (props) => {
  const { htmlFor, label, labelClassName } = props;
  return (
    <>
      {label && (
        <label
          className={`justify-self-end ${labelClassName}`}
          htmlFor={htmlFor}
        >
          <Text size="base">{label}</Text>
        </label>
      )}
    </>
  );
};
