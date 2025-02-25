import React, { useState, useEffect, useCallback } from "react";
import { fetchUsers } from "../../services/Api";
import UserCard from "../UserCard/UserCard";
import SearchBar from "../SearchBar/SearchBar";
import { useDebounce } from "../../Hooks/UserDebounce/UserDebounce";
import Spinner from "../Spinner/spinner";

const UserList = () => {
    const [userlist, setUserList] = useState({
        users: [],
        page: 1,
        loading: false,
        searchTerm: "",
    });

    const debouncedSearch = useDebounce(userlist.searchTerm, 500);

    const fetchMoreUsers = useCallback(async (reset = false) => {
        if (userlist.loading) return;

        setUserList((prev) => ({ ...prev, loading: true }));

        try {
            const newUsers = await fetchUsers(reset ? 1 : userlist.page, 5, debouncedSearch);
            setUserList((prev) => ({
                ...prev,
                users: reset ? newUsers : [...prev.users, ...newUsers],
                page: reset ? 2 : prev.page + 1,
                loading: false,
            }));
        } catch (error) {
            console.error("Error fetching users:", error);
            setUserList((prev) => ({ ...prev, loading: false }));
        }
    }, [userlist.page, debouncedSearch]);
    useEffect(() => {
        setUserList((prev) => ({ ...prev, users: [], page: 1 }));
        fetchMoreUsers(true);
    }, [debouncedSearch]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !userlist.loading) {
                    fetchMoreUsers();
                }
            },
            { threshold: 1.0 }
        );

        const loadMoreTrigger = document.getElementById("loadMoreTrigger");
        if (loadMoreTrigger) observer.observe(loadMoreTrigger);

        return () => {
            if (loadMoreTrigger) observer.unobserve(loadMoreTrigger);
        };
    }, [fetchMoreUsers, userlist.loading]);

    return (
        <div>
            <SearchBar
                searchTerm={userlist.searchTerm}
                setSearchTerm={(term) =>
                    setUserList((prev) => ({ ...prev, searchTerm: term }))
                }
            />
            <p className="text-center">You are searching for: {userlist.searchTerm}</p>
            <div className="mt-4">
                {userlist.users.length > 0 ? (
                    userlist.users.map((user) => <UserCard key={user.id} user={user} />)
                ) : (
                    <p className="text-center">No Results Found</p>
                )}
            </div>
            {userlist.loading && <Spinner />}
            <div id="loadMoreTrigger"></div>
        </div>
    );
};

export default UserList;
