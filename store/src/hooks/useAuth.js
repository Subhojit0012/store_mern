import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { selectCurrentToken } from "../features/auth/authSlice";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = "Employee";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;

    // if (!username || !roles) return console.log("can't get the UserInfo");

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return { username, roles, status, isManager, isAdmin };
  }

  return { username: "", roles: [], isManager, isAdmin, status };
};
export default useAuth;
