import { Text } from "./Typography";

type LabelProps = {
  htmlFor?: string;
  label?: string;
};

export const Label: React.FC<LabelProps> = (props) => {
  const { htmlFor, label } = props;
  return (
    <>
      {label && (
        <label className="justify-self-end" htmlFor={htmlFor}>
          <Text size="base">{label}</Text>
        </label>
      )}
    </>
  );
};
