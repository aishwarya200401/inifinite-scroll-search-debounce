import React from "react";

const UserCard = ({ user }) => {
    return (
        <div className="border p-3 rounded shadow-md mb-4">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
        </div>
    );
};

export default React.memo(UserCard);
