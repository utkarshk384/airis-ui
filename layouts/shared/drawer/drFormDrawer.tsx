import React from "react";

/* Components */
import { Drawer } from "@components";

type Props = {
  children?: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DrFormDrawer: React.FC<Props> = (props) => {
  const { open, setOpen } = props;

  return (
    <Drawer open={open} onOpenChange={setOpen} unstyledContent>
      {() => <div>asdas</div>}
    </Drawer>
  );
};
