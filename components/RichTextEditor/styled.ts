import { css, styled } from "@/styles/stitches";

export const StyledToolbar = styled("div", {
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
});

export const QuillCSS = css({
  ".ql-container": {
    borderEndStartRadius: "8px",
    borderEndEndRadius: "8px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
});
