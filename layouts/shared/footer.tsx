import React from "react";

/* Components */
import { Button } from "@components";

type Props = {
  children?: React.ReactNode;
  onCancel?: () => void;
  onDraft?: () => void;
  onConfirm?: () => void;
};

export const FooterComponent: React.FC<Props> = (props) => {
  const { onCancel, onConfirm, onDraft } = props;
  return (
    <>
      <Button type="submit" onClick={onConfirm}>
        Confirm
      </Button>
      <Button type="submit" onClick={onDraft} variant="outline">
        Save as Draft
      </Button>
      <Button onClick={onCancel} variant="outline" color="red">
        Cancel
      </Button>
    </>
  );
};
