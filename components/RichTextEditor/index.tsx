import React, { useMemo, useState } from "react";

/* Components */
import { ReactQuill } from "./rte";
import { TOOLBAR_OPTS } from "./toolbar";
import { QuillCSS } from "./styled";

/* Types */
import type { QuillOptions } from "react-quill";
type Props = {
  onChange?: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
  height?: string;
  maxHeight?: string;
  scrollable?: boolean;
  readOnly?: boolean;
  value?: string;
  borderColor?: string;
};

const MODULES: QuillOptions["modules"] = {
  toolbar: TOOLBAR_OPTS,
};

export const RichTextEditor: React.FC<Props> = (props) => {
  const { onChange, height, scrollable, borderColor, maxHeight, ...rest } =
    DefaultProps(props);

  const [value, setValue] = useState(rest.value || "");
  const modules = useMemo(() => MODULES, []);

  const handleChange = (value: string) => {
    setValue(value);
    onChange?.(value);
  };

  return (
    <div
      className={`rounded-lg ${QuillCSS({
        scrollable,
        css: {
          "--height": height,
          maxHeight,
          "--border-color": borderColor,
          cursor: rest.readOnly ? "default" : "text",
        },
      })}`}
    >
      <ReactQuill
        className="rounded-lg"
        {...rest}
        modules={modules}
        theme={undefined}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

const DefaultProps = (props: Props) => {
  const defaultProps: Props = {
    ...props,
    readOnly: props.readOnly || false,
    scrollable: props.scrollable || false,
    height: props.height || "auto",
    value: props.value || "",
    borderColor: props.borderColor || "#ccc",
    maxHeight: props.maxHeight || "auto",
    placeholder: props.placeholder || "Write something...",
  };

  return defaultProps;
};
