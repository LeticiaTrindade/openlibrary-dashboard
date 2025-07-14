import axios from 'axios';

const BASE_URL = 'https://openlibrary.org/search.json';

export const searchBooks = async (query, page = 1, limit = 12) => {
    try {
        const safeQuery = query && query.trim() !== '' ? query : 'a';

        const response = await axios.get(BASE_URL, {
            params: {
                q: safeQuery,
                page,
                limit,
                fields: 'title,author_name,cover_i,first_publish_year,key,number_of_pages_median,publisher'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        throw error;
    }
};
