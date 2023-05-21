/* 
  NOTE: the order of items shouldn't be changed.

  For example, if you take the `[{ color: [] }, { background: [] }],` item one step below the other then you ha ve to change the css numbering in the `styled.tsx` file.
*/
export const TOOLBAR_OPTS = [
  [{ font: [] }, { header: [1, 2, 3, 4, 5, 6, false] }],

  ["bold", "italic", "underline", "strike", { align: [] }],
  ["blockquote", "code-block"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],

  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
];
