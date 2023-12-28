export function toTitleCase(str) {
  const words = str.split(" ");
  const titleCaseWords = words.map((word) => word.charAt(0).toUpperCase() + word.substring(1));
  const titleCaseStr = titleCaseWords.join(" ");

  return titleCaseStr;
}
