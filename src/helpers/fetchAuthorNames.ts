export const fetchAuthorNames = async (authors: Array<any>) => {
  try {
    const authorPromises = authors.map((author) =>
      fetch(`https://openlibrary.org${author.author.key}.json`).then(
        (response) => response.json()
      )
    );

    const authorDetails = await Promise.all(authorPromises);

    const authorNamesString = authorDetails
      .map((details) => details.name)
      .join(", ");

    return authorNamesString;
  } catch (error) {
    console.error("Error fetching author names:", error);
    return "";
  }
};
