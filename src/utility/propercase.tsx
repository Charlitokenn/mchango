export const toProperCase = (text: string | null | undefined) => {
  if (!text) return "";
  return text.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
};

export const trimText = (text: string | null | undefined, maxLength = 120) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
