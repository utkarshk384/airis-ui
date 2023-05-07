import React from "react";
import { FunnelIcon } from "@heroicons/react/20/solid";

/* Components */
import { Button } from "@components/Button";

type Props = {
  children?: React.ReactNode;
  onClick: () => void;
};

export const FilterButton: React.FC<Props> = (props) => {
  const { onClick } = props;

  return (
    <Button variant="solid" onClick={onClick} iconButton>
      <FunnelIcon width={24} height={24} />
    </Button>
  );
};
