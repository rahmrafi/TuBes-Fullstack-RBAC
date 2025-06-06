import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <h2>Dashboard</h2>
            {user ? (
                <p>Welcome, {user.username}! Your roles: {user.roles ? user.roles.join(', ') : 'None'}</p>
            ) : (
                <p>Please log in to see your dashboard.</p>
            )}
        </div>
    );
}

export default Dashboard;