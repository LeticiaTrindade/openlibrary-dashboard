export const searchBooks = async (query, page, limit, yearRange, language, sort) => {
  const baseUrl = 'https://openlibrary.org/search.json';
  const offset = (page - 1) * limit;

  let url = `${baseUrl}?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`;

  if (yearRange && yearRange.length === 2) {
    const [minYear, maxYear] = yearRange;
    if (minYear !== null && minYear !== undefined) {
      url += `&first_publish_year_from=${minYear}`;
    }
    if (maxYear !== null && maxYear !== undefined) {
      url += `&first_publish_year_to=${maxYear}`;
    }
  }

  if (language) {
    url += `&language=${language}`;
  }

  console.log("Fetching URL:", url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching books from OpenLibrary:", error);
    throw error;
  }
};