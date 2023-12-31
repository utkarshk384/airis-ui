import { Heading, Text } from "@components";

/* Types */
import type { ListItemProps } from "../types";

export const ListItem: React.FC<ListItemProps> = (props) => {
  const { color = "white", headingSize = "sm" } = props;

  return (
    <div className="flex flex-col gap-1">
      <Heading color={color} size={headingSize} weight="600">
        {props.title}
      </Heading>
      <div className="flex gap-2">
        {props.children}
        <Text size="sm" color={color}>
          {props.value}
        </Text>
      </div>
    </div>
  );
};
