import { useCombobox, useMultipleSelection } from "downshift";
import React, { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";

/* Components */
import { Label } from "@components/shared";
import { Button } from "@components/Button";
import {
  DropdownItem,
  StyledSearchBar,
  DropdownContainer,
  StyledValueContainer,
  MultiSelectedItem,
  MultiSelectedItemsContainer,
} from "../styled";

/* Hooks */
import { useUniqueId } from "@src/hooks";

/* Types */
import type { SelectSharedProps } from "../types";
import type { DropdownOption } from "@components/sharedTypes";

type Props = {
  name: string;
  onChange?: (value: DropdownOption[]) => void;
  defaultValue?: DropdownOption[];
  width?: string;
} & SelectSharedProps;

export const MultiSelect: React.FC<Props> = (props) => {
  const { input, label, ...rest } = DefaultProps(props);

  if (!rest.options) throw new Error("Options is required");

  /* States */
  const [items, setItems] = useState(rest.options);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [serach, setSearch] = useState("");

  const MultiSelectBox = useMultipleSelection({
    itemToString: (item) => item?.label || "",
    defaultSelectedItems: rest.defaultValue,
    onSelectedItemsChange: ({ selectedItems }) => {
      rest.onChange?.(selectedItems as DropdownOption[]);
      const hashSet = new Set();
      selectedItems?.forEach((item) => hashSet.add(item.value));
      const newItems = rest.options.filter((item) => !hashSet.has(item.value));
      setItems(newItems);
    },
  });

  const ComboBox = useCombobox({
    items,
    inputValue: serach,
    itemToString: (item) => item?.label || "",
    onStateChange({
      inputValue: newInputValue,
      type,
      selectedItem: newSelectedItem,
    }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (newSelectedItem)
            MultiSelectBox.setSelectedItems([
              ...MultiSelectBox.selectedItems,
              newSelectedItem,
            ]);
        // Intentionally fall through to clear input (no break)
        case useCombobox.stateChangeTypes.ItemClick:
          setSearch("");
          break;
        default:
          break;
      }
    },
  });

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const uniqueId = useUniqueId("dropdown-");
  const uniqueIdSelected = useUniqueId("dropdown-selected-");

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
          <MultiSelectedItemsContainer>
            {MultiSelectBox.selectedItems?.map((item, i) => (
              <MultiSelectedItem
                {...MultiSelectBox.getSelectedItemProps({
                  selectedItem: item,
                  index: i,
                })}
                key={uniqueIdSelected + item.value}
              >
                {item.label}

                <Button
                  onClick={() => MultiSelectBox.removeSelectedItem(item)}
                  iconButton
                  variant="icon"
                  size="sm"
                >
                  <XMarkIcon
                    className="fill-white stroke-white"
                    width={16}
                    height={16}
                  />
                </Button>
              </MultiSelectedItem>
            ))}
            <StyledSearchBar
              {...ComboBox.getInputProps({
                ...input,
                ...MultiSelectBox.getDropdownProps({
                  preventKeyAction: isMenuOpen,
                }),
                readOnly: true,
              })}
              onBlur={() => setIsMenuOpen(false)}
              onClick={() => setIsMenuOpen(true)}
            />
          </MultiSelectedItemsContainer>
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
    defaultValue: props.defaultValue || [],
    labelClassName: props.labelClassName || "",
    containerClassName: props.containerClassName || "",
    menuPlacement: props.menuPlacement || "bottom",
  };

  return defaultProps;
};
