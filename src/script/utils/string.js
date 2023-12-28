export function lowerToTitleCase(str) {
  const words = str.split(" ");
  return toTitleCase(words);
}

export function snakeToTitleCase(str) {
  const words = str.split("-");
  return toTitleCase(words);
}

function toTitleCase(words) {
  const titleCaseWords = words.map((word) => word.charAt(0).toUpperCase() + word.substring(1));
  const titleCaseStr = titleCaseWords.join(" ");
  return titleCaseStr;
}
