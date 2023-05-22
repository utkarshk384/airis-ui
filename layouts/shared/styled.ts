import { styled } from "@/styles/stitches";

export const CardContainer = styled("div", {
  borderRadius: "56px",
  boxShadow: "15px 15px 50px 15px rgba(175, 175, 175, 0.25)",
  height: "70vh",
  display: "grid",
  gridTemplateRows: "1fr 1fr",
  width: "100%",
  maxWidth: "64rem",
  "@lg": {
    height: "50vh",
    borderRadius: "84px",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr",
  },
  overflow: "hidden",
});

export const Banner = styled("div", {
  background: "linear-gradient(270deg, #67B2FF 0%, #027FFF 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "fit-content",
  borderRadius: "0px 84px 84px 0px",
  padding: "1rem 2rem",
});
