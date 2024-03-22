import { useSelector } from 'react-redux';
import { selectCurrentToken } from "../features/auth/authSlice";
import {jwtDecode} from 'jwt-decode';

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    let isAdmin = false;
    let status = "User";

    if (token) {
        const decoded = jwtDecode(token);
        const { id, name, username, roles, hasVoted } = decoded.UserInfo;  //token from backend, hasVoted true/false

        isAdmin = roles.includes('Admin');

        if (isAdmin) status = "Admin";

        return { id, name, username, roles, status, hasVoted, isAdmin };
    }

    return { name: '', username: '', roles: [], isAdmin, status, hasVoted: true};
}
export default useAuth;