import { ownerLogout } from "../../store/Reducers/authReducer";
import ChangePassword from "../ChangePassword/ChangePassword";

const OwnerChangePassword = () => {
  return <ChangePassword role="owner" logoutAction={ownerLogout} />;
};

export default OwnerChangePassword;
