/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { MdFace6 } from "react-icons/md";
import toast from "react-hot-toast";
import { socket } from "../../util/socket";
import {
  get_admin_message,
  get_owners,
  messageClear,
  send_message_owner_admin,
  updateOwnerAdminMessage,
} from "../../store/Reducers/chatReducer";
import ava from "../../assets/images/avatar_user1.jpg";
import admin from "../../assets/images/admin.png";

const AdminChatOwner = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const scrollRef = useRef();
  const [show, setShow] = useState(false);
  const { ownerId } = useParams();
  const {
    owners,
    owner_admin_message,
    activeOwner,
    currentOwner,
    successMessage,
  } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [receiverMessage, setReceiverMessage] = useState("");

  useEffect(() => {
    dispatch(get_owners());
  }, []);

  useEffect(() => {
    socket.emit("add_admin", userInfo);
  }, [userInfo]);

  const send = (e) => {
    e.preventDefault();
    dispatch(
      send_message_owner_admin({
        senderId: "",
        receiverId: ownerId,
        message: text,
        senderName: "Admin Support",
      })
    );
    setText("");
  };

  useEffect(() => {
    if (ownerId) {
      dispatch(get_admin_message(ownerId));
    }
  }, [ownerId]);

  // lay tin nhan cuoi cung va gui qua socket de khoi can load lai trang
  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "send_message_admin_to_owner",
        owner_admin_message[owner_admin_message.length - 1]
      ); // lay message cuoi cung
      dispatch(messageClear());
    }
  }, [successMessage]);

  //lang nghe tin nhan tu owner
  useEffect(() => {
    socket.on("received_owner_message", (msg) => {
      setReceiverMessage(msg);
    });
  }, []);

  useEffect(() => {
    if (receiverMessage) {
      if (
        receiverMessage.senderId === ownerId &&
        receiverMessage.receiverId === ""
      ) {
        dispatch(updateOwnerAdminMessage(receiverMessage));
      } else {
        toast.success(receiverMessage.senderName + " " + "gửi tin nhắn");
        dispatch(messageClear());
      }
    }
  }, [receiverMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [owner_admin_message]);

  return (
    <div className="ml-[100px] px-5 py-5 lg:px-7">
      <div className="w-full px-4 py-4 bg-white rounded-md h-[calc(100vh-140px)]">
        <div className="relative flex w-full h-full">
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? "-left-[16px]" : "-left-[336px]"
            } md:left-0 md:relative transition-all`}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-[#e5e3e5] md:bg-transparent overflow-y-auto">
              <div className="flex items-center justify-between p-4 text-xl md:p-0 md:px-3 md:pb-3 ">
                <h2>Chủ xe</h2>
                <span
                  onClick={() => setShow(!show)}
                  className="block cursor-pointer md:hidden"
                >
                  <IoCloseCircle />
                </span>
              </div>

              {owners.map((s, i) => (
                <Link
                  key={i}
                  to={`/admin/chat-owner/${s._id}`}
                  className={`h-[60px] flex justify-start gap-2 items-center px-2 py-2 rounded-md cursor-pointer ${
                    ownerId === s._id ? "bg-[#e2e4e7]" : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      className="w-[38px] h-[38px] border-gray-500 border-2 max-w-[38px] p-[2px] rounded-full"
                      src={s.image || ava}
                      alt=""
                    />

                    {activeOwner.some((a) => a.ownerId === s._id) && (
                      <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    )}
                  </div>
                  <div className="flex flex-col items-start justify-center w-full">
                    <div className="flex items-center justify-between w-full">
                      <h2 className="text-base font-semibold">{s.name}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
            <div className="flex items-center justify-between">
              {ownerId && (
                <div className="flex items-center justify-start gap-3">
                  <div className="relative">
                    <img
                      className="w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full"
                      src={currentOwner?.image || ava}
                      alt=""
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  </div>
                  <span className="font-semibold">{currentOwner?.name}</span>
                </div>
              )}

              <div
                onClick={() => setShow(!show)}
                className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-[#4b9cd9] shadow-lg hover:shadow-blue-500/50 justify-center cursor-pointer items-center"
              >
                <span>
                  <FaList />
                </span>
              </div>
            </div>

            <div className="py-4">
              <div className="bg-[#f1f5f9] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                {ownerId ? (
                    owner_admin_message.map((m, i) => {
                    if (m.senderId === ownerId) {
                      return (
                        <div
                          className="flex items-center justify-start w-full"
                          key={i}
                          ref={scrollRef}
                        >
                          <div className="flex items-start justify-start max-w-full gap-2 py-2 md:px-3 lg:max-w-[85%]">
                            <div>
                              <img
                                className=" w-[38px] h-[38px] border-2 border-green-500 rounded-full max-w-[38px] p-[3px]"
                                src={currentOwner?.image}
                                alt=""
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center w-full text-white bg-[#51a8ff] shadow-lg py-1 px-2 rounded-sm">
                              <span>{m.message}</span>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="flex items-center justify-end w-full"
                          key={i}
                          ref={scrollRef}
                        >
                          <div className="flex items-start justify-start max-w-full gap-2 py-2 md:px-3 lg:max-w-[85%]">
                            <div className="flex flex-col items-start justify-center w-full text-white bg-[#e84839] shadow-lg py-1 px-2 rounded-sm">
                              <span>{m.message}</span>
                            </div>
                            <div>
                              <img
                                className=" w-[38px] h-[38px] border-2 border-green-500 rounded-full max-w-[38px] p-[3px]"
                                src={admin}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full gap-2 text-black">
                    <span>
                      <MdFace6 />
                    </span>
                    <span>Chọn chủ xe để chat</span>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={send} className="flex gap-3">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                readOnly={ownerId ? false : true}
                type="text"
                className="flex items-center justify-between w-full px-2 py-[5px] border focus:border-blue-500 rounded-md border-slate-700 outline-none bg-transparent"
                placeholder="Nhập tin nhắn"
              />
              <button
                disabled={ownerId ? false : true}
                className="shadow-lg bg-[#51a8ff] hover:shadow-cyan-500/50 font-bold w-[75px] h-[35px] rounded-md flex justify-center items-center text-white"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChatOwner;
