import { useCombobox } from "downshift";
import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

/* Components */
import { Text } from "@components";
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
  initialSelectedItem?: DropdownOption;
  unstyled?: boolean;
  dropdownIconSize?: number;
  value?: string;
} & SelectSharedProps;

export const Select: React.FC<Props> = (props) => {
  const {
    input,
    label,
    unstyled,
    dropdownIconSize,
    value,
    errorText,
    initialSelectedItem,
    ...rest
  } = DefaultProps(props);

  if (!rest.options) throw new Error("Options is required");

  /* States */
  const [items, setItems] = useState(rest.options);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ComboBox = useCombobox({
    items,
    inputValue: value ? value : undefined,
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
    const newItems = rest.options.filter((item) =>
      item.label.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    setItems(newItems);
  }, 350);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const uniqueId = useUniqueId("dropdown-");

  /* Effects */
  useEffect(() => {
    if (initialSelectedItem) ComboBox.selectItem(initialSelectedItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSelectedItem]);

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
      <div className="relative bg-white">
        <StyledValueContainer unstyled={unstyled}>
          <StyledSearchBar
            {...ComboBox.getInputProps({
              ...input,
              onFocus: (e) => {
                if (rest.isSearchable) e.target.select();
              },
              onBlur: () => setIsMenuOpen(false),
              onClick: () => {
                toggleMenu();
                if (!isMenuOpen) setItems(rest.options);
              },
              readOnly: !rest.isSearchable,
            })}
          />
          <Button
            onClick={toggleMenu}
            onBlur={() => setIsMenuOpen(false)}
            iconButton
            variant="icon"
            className={`justify-self-end ${
              isMenuOpen ? "text-accent" : "text-black"
            }`}
          >
            <ChevronDownIcon
              width={dropdownIconSize}
              height={dropdownIconSize}
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
                  unstyled={unstyled}
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
        <Text className="!text-red-500">{errorText}</Text>
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
    dropdownIconSize: props.dropdownIconSize || 24,
    unstyled: props.unstyled || false,
    isSearchable: props.isSearchable || false,
    labelClassName: props.labelClassName || "",
    containerClassName: props.containerClassName || "",
    menuPlacement: props.menuPlacement || "bottom",
  };

  return defaultProps;
};
