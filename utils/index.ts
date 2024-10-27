export const capitalize = function(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const snakeToCamel = function(text: string) {
  return text
    .split("_")
    .map((word, i) => (i === 0 ? word : capitalize(word)))
    .join("");
};
