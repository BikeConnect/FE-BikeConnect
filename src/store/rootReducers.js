import authReducer from "./Reducers/authReducer";
import chatReducer from "./Reducers/chatReducer";
import ownerReducer from "./Reducers/ownerReducer";
const rootReducer = {
  auth: authReducer,
  chat: chatReducer,
  owner: ownerReducer,
};

export default rootReducer;
