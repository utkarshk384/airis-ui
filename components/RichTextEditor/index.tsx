import React, { useMemo, useState } from "react";

/* Components */
import { ReactQuill } from "./rte";
import { TOOLBAR_OPTS } from "./toolbar";
import { QuillCSS } from "./styled";

/* Types */
import type { DeltaStatic, Sources } from "quill";
import type { QuillOptions, UnprivilegedEditor } from "react-quill";

type OnChangeRQ = (
  value: string,
  delta: DeltaStatic,
  source: Sources,
  editor: UnprivilegedEditor
) => void;

type Props = {
  onChange?: OnChangeRQ;
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

  const [value, setValue] = useState(rest.defaultValue || "");
  const modules = useMemo(() => MODULES, []);

  const handleChange: OnChangeRQ = (value: string, delta, source, editor) => {
    setValue(value);
    onChange?.(value, delta, source, editor);
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
        value={rest.value || value}
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
