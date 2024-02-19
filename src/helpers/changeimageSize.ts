const changeImageSize = (url: string, size: "S" | "M" | "L"): string => {
  const urlParts = url.split("-");
  if (urlParts.length > 1) {
    const lastPart = urlParts[urlParts.length - 1];
    const extension = lastPart.split(".")[1];
    urlParts[urlParts.length - 1] = `${size}.${extension}`;
    return urlParts.join("-");
  }
  return url;
};

export default changeImageSize;
