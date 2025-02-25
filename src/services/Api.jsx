const API_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = async (page, limit, searchQuery) => {
    try {
        const response = await fetch(`${API_URL}?_page=${page}&_limit=${limit}&q=${searchQuery}`);
        return response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};
