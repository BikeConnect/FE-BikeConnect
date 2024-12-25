import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import logo from "../../assets/images/8.png";
import { overrideStyle } from "../../util/util";
import { admin_login, messageClear } from "../../store/Reducers/authReducer";
const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage, token } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [token]);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(admin_login(state));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      localStorage.setItem("userRole", "admin");
      navigate("/admin/dashboard");
    }
  }, [errorMessage, successMessage]);

  return (
    <div className="min-h-screen min-w-screen bg-[#ffffff] flex justify-center items-center">
      <div className="w-[400px] text-[#ffffff] p-2">
        <div className="p-6 bg-white border rounded-md border-slate-300">
          <div className="h-[70px] flex justify-center items-center">
            <div className="w-[380px] h-[180px]">
              <img
                className="w-full h-full object-contain"
                src={logo}
                alt="image"
              />
            </div>
          </div>
          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3 text-black">
              <label htmlFor="email">Nhập Email</label>
              <input
                onChange={inputHandle}
                value={state.email}
                className="px-3 py-2 bg-transparent border rounded-md outline-none border-slate-400"
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                autoComplete="email"
                required
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3 text-black">
              <label htmlFor="password">Nhập Mật Khẩu</label>
              <input
                onChange={inputHandle}
                value={state.password}
                className="px-3 py-2 bg-transparent border rounded-md outline-none border-slate-400"
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                required
              />
            </div>
            <button
              disabled={loader ? true : false}
              className="w-full py-2 mb-3 text-white bg-[#472CB2] rounded-md hover:shadow-black-300/50 hover:shadow-lg px-7"
            >
              {loader ? (
                <PropagateLoader cssOverride={overrideStyle} color="white" />
              ) : (
                "Đăng Nhập"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;