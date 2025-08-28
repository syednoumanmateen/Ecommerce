import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const UnProtected = () => {
    const { userData } = useUser();

    if (userData) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="center-main">
            <div className="w-1/3">
                <Outlet />
            </div>
        </div>
    );
};

export default UnProtected;
