import authReducer from "./Reducers/authReducer";
import chatReducer from "./Reducers/chatReducer";
const rootReducer = {
  auth: authReducer,
  chat: chatReducer,
};

export default rootReducer;
