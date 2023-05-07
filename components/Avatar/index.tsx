import React from "react";

/* Components */
import { UserIcon } from "@components/Icons";
import { Dropdown } from "@components/Dropdown";

/* Types */
import type { DropdownMenuType } from "@components/Dropdown";

type Props =
  | {
      hasDropdown?: true;
      DropdownContent: DropdownMenuType;
    }
  | {
      hasDropdown?: false;
      DropdownContent?: never;
    };

export const Avatar: React.FC<Props> = (props) => {
  const { hasDropdown, DropdownContent } = props;

  if (hasDropdown)
    return (
      <Dropdown TriggerComponent={() => <UserIcon />}>
        {DropdownContent}
      </Dropdown>
    );

  return (
    <button>
      <UserIcon />
    </button>
  );
};
