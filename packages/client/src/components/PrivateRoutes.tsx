import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AccountContext } from "./AccountContext";

const useAuth = () => {
    const ctx = useContext(AccountContext);
    if (ctx) {
        return ctx.user && ctx.user.loggedIn;
    }
};
const PrivateRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
