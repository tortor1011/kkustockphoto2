import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user, handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        navigate("/login");
        return null;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Welcome, {user.firstname}!</h1>
            <p>Email: {user.email}</p>
            <p>Role: {user.role.role}</p>
            <button onClick={handleLogout} className="mt-4 bg-red-500 text-white p-2 rounded">Logout</button>
        </div>
    );
};

export default Dashboard;
