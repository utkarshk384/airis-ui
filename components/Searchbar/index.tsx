import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

/* Components */
import { StyledSearchBar, StyledContainer } from "./styled";

type Props = {
  children?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Searchbar: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <StyledContainer>
      <StyledSearchBar {...props} />
      <MagnifyingGlassIcon
        stroke="currentColor"
        className="absolute top-0 bottom-0 right-2 my-auto"
        width={24}
        height={24}
      />
    </StyledContainer>
  );
};
