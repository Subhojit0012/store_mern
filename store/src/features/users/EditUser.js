import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./userApiSlice";
import EditUserForm from "./EditUserForm";
const EditUser = () => {
  const { id } = useParams();

  const user = useSelector((state) => selectUserById(state, id));

  const content = user ? <EditUserForm user={user} /> : <p>loading...</p>;

  return content;
};

export default EditUser;
