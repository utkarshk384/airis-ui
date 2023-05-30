import { useCombobox } from "downshift";
import React, { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

/* Components */
import { Label } from "@components/shared";
import { Button } from "@components/Button";
import {
  DropdownItem,
  StyledSearchBar,
  DropdownContainer,
  StyledValueContainer,
} from "../styled";

/* Hooks */
import { useUniqueId } from "@src/hooks";

/* Types */
import type { SelectSharedProps } from "../types";
import type { DropdownOption } from "@components/sharedTypes";

type Props = {
  onChange?: (value: DropdownOption) => void;
  isSearchable?: boolean;
  defaultValue?: DropdownOption;
} & SelectSharedProps;

export const Select: React.FC<Props> = (props) => {
  const { input, label, ...rest } = DefaultProps(props);

  if (!rest.options) throw new Error("Options is required");

  /* States */
  const [items, setItems] = useState(rest.options);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ComboBox = useCombobox({
    items,
    defaultInputValue: rest.defaultValue?.label,
    itemToString: (item) => item?.label || "",
    onSelectedItemChange: ({ selectedItem }) => {
      rest.onChange?.(selectedItem as DropdownOption);
    },
    onInputValueChange: (value) => handleSearch(value.inputValue),
  });

  /* Handlers */
  const handleSearch = debounce((value?: string) => {
    if (!rest.isSearchable) return;

    if (!value || value === "") {
      setItems(rest.options);
      return;
    }
    const newItems = rest.options.filter((item) => item.label.includes(value));
    setItems(newItems);
  }, 350);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const uniqueId = useUniqueId("dropdown-");

  return (
    <fieldset
      className={`fieldset-grid ${
        label ? "fieldset-label" : "fieldset-no-label"
      } ${rest.containerClassName}`}
    >
      {label && (
        <Label
          htmlFor={rest.name}
          {...ComboBox.getLabelProps()}
          label={label}
          labelClassName={rest.labelClassName}
        />
      )}
      <div className="relative">
        <StyledValueContainer>
          <StyledSearchBar
            {...ComboBox.getInputProps({
              ...input,
              onFocus: (e) => {
                setIsMenuOpen(true);
                if (rest.isSearchable) e.target.select();
              },
              onBlur: () => setIsMenuOpen(false),
              onClick: () => setIsMenuOpen(true),
              readOnly: !rest.isSearchable,
            })}
          />
          <Button
            onClick={toggleMenu}
            iconButton
            variant="icon"
            className={`justify-self-end ${
              isMenuOpen ? "text-accent" : "text-black"
            }`}
          >
            <ChevronDownIcon
              width={24}
              height={24}
              className={`transition-transform ease-out duration-500 ${
                isMenuOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </Button>
        </StyledValueContainer>
        <DropdownContainer
          isMenuOpen={isMenuOpen}
          menuPlacement={rest.menuPlacement}
          css={{ "--max-height": rest.maxMenuHeight || undefined }}
          onClick={() => setIsMenuOpen(false)}
          {...ComboBox.getMenuProps()}
        >
          {isMenuOpen &&
            (items.length > 0 ? (
              items.map((item, i) => (
                <DropdownItem
                  selected={ComboBox.highlightedIndex === i}
                  key={uniqueId + i}
                  {...ComboBox.getItemProps({ item, index: i })}
                >
                  {item.label}
                </DropdownItem>
              ))
            ) : (
              <DropdownItem>No items found</DropdownItem>
            ))}
        </DropdownContainer>
      </div>
    </fieldset>
  );
};

const DefaultProps = (props: Props) => {
  const defaultProps = {
    ...props,
    input: {
      name: props.name,
      id: props.name,
      placeholder: props.placeholder,
    },
    isSearchable: props.isSearchable || false,
    labelClassName: props.labelClassName || "",
    containerClassName: props.containerClassName || "",
    menuPlacement: props.menuPlacement || "bottom",
  };

  return defaultProps;
};