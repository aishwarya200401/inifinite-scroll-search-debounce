import React from "react";
import UserList from "./components/UserList/UserList";
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center">Infinite Scroll with Search</h1>
            <UserList/>
        </div>
    );
};

export default App;
