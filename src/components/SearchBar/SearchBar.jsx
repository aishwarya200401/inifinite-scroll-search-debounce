import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-full"
        />
    );
};

export default React.memo(SearchBar);
