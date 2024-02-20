export const generateCoverUrl = (id: string | undefined, size: string) => {
  const baseUrl = "https://covers.openlibrary.org/b/olid/";
  return `${baseUrl}${id}-${size.toUpperCase()}.jpg`;
};
