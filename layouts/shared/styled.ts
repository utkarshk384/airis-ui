import { styled } from "@/styles/stitches";

export const CardContainer = styled("div", {
  borderRadius: "56px",
  boxShadow: "15px 15px 50px 15px rgba(175, 175, 175, 0.25)",
  height: "50vh",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  width: "100%",
  maxWidth: "64rem",
  "@lg": {
    borderRadius: "84px",
  },
  overflow: "hidden",
});

export const WelcomeBanner = styled("div", {
  background: "linear-gradient(270deg, #67B2FF 0%, #027FFF 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "fit-content",
  borderRadius: "0px 84px 84px 0px",
  padding: "1rem 2rem",
});
