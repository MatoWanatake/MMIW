import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFollows } from "../../redux/follows"; // make sure this exists
import UserCard from './UserCard';

export default function UsersList() {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const res = await fetch('/api/users/', { credentials: 'include' });
            if (res.ok) {
                const data = await res.json();
                setUsers(data.users);
            }
        }

        fetchUsers();
        dispatch(fetchFollows()); // <-- Add this to populate follows in Redux
    }, [dispatch]);

    return (
        <div>
            <h2>All Users</h2>
            {users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
}
