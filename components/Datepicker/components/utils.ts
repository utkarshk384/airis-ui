const MONTHS = [
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const GetYearMonthDropdown = () => {
  const now = new Date();

  const years = [];

  for (let i = 4; i > 0; i--) {
    years.push({
      value: now.getFullYear() - i,
      label: `${now.getFullYear() - i}`,
    });
  }

  for (let i = 0; i < 5; i++) {
    years.push({
      value: now.getFullYear() + i,
      label: `${now.getFullYear() + i}`,
    });
  }

  const months = MONTHS.map((month) => ({
    value: month,
    label: month,
  }));

  return { months, years };
};
