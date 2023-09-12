export function SnakeCaseToTitleCase(str: string, firstLtrCapitalize = true) {
  const words = str.split("_");

  const capitalizedWords = words.map((word, i) => {
    if (firstLtrCapitalize && i > 0) return word.toLowerCase();

    const firstLetter = word[0].toUpperCase();
    const rest = word.slice(1).toLowerCase();
    return `${firstLetter}${rest}`;
  });
  console.log({ capitalizedWords });
  return capitalizedWords.join(" ");
}
