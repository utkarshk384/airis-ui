const ContainerPlugin = ({ addUtilities }) => {
  addUtilities({
    ".container": { maxWidth: "96rem", margin: "0 auto", width: "90%" },
    ".inner-container": { backgroundColor: "white", bordeRadius: "8px" },
  });
};

module.exports = ContainerPlugin;
