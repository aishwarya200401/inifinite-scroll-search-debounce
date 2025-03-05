const API_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = async (page = 1, limit = 10, searchQuery = "") => {
    try {
        const start = (page - 1) * limit;
        const response = await fetch(`${API_URL}?_start=${start}&_limit=${limit}`);
        let users = await response.json();

        // Apply search filtering manually since JSONPlaceholder does not support query searching
        if (searchQuery) {
            users = users.filter(user =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};
