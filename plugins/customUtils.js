const CustomUtils = ({ addUtilities }) => {
  addUtilities({
    ".fieldset-grid": {
      display: "grid",
      gap: "0.5rem",
      alignItems: "center",
      width: "100%",
    },
    ".fieldset-label": {
      "grid-template-columns": "1fr 2fr",
    },
    ".fieldset-no-label": {
      "grid-template-columns": "1fr",
    },
    ".custom-scroll-bar": {
      scrollbarWidth: "thin",
      scrollbarColor: "var(--colors-gray) transparent",
    },

    ".custom-scroll-bar:-webkit-scrollbar": {
      width: "11px",
    },

    ".custom-scroll-bar::-webkit-scrollbar-track ": {
      backgroundColor: "transparent",
    },

    ".custom-scroll-bar::-webkit-scrollbar-thumb ": {
      backgroundColor: "var(--colors-gray)",
      borderRadius: "6px",
      border: "3px solid transparent",
    },
  });
};

module.exports = CustomUtils;
