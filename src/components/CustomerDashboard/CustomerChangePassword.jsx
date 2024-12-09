import { customerLogout } from "../../store/Reducers/authReducer";
import ChangePassword from "../ChangePassword/ChangePassword";

const CustomerChangePassword = () => {
  return <ChangePassword role="customer" logoutAction={customerLogout} />;
};

export default CustomerChangePassword;
