import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import admin from "../../assets/images/admin.png";
import ava from "../../assets/images/avatar_user1.jpg";
import {
  get_owner_message,
  messageClear,
  send_message_owner_admin,
  updateAdminMessage,
} from "../../store/Reducers/chatReducer";
import { socket } from "../../util/socket";

const OwnerChatAdmin = () => {
  const scrollRef = useRef();
  const { userInfo } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { owner_admin_message, successMessage } = useSelector(
    (state) => state.chat
  );

  useEffect(() => {
    dispatch(get_owner_message());
  }, []);
  useEffect(() => {
    socket.emit("add_owner", userInfo._id, userInfo);
  }, []);

  useEffect(() => {
    socket.on("received_admin_message", (msg) => {
      dispatch(updateAdminMessage(msg));
    });
  }, []);

  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "send_message_owner_to_admin",
        owner_admin_message[owner_admin_message.length - 1]
      ); // lay message cuoi cung
      dispatch(messageClear());
    }
  }, [successMessage]);

  const send = (e) => {
    e.preventDefault();
    dispatch(
      send_message_owner_admin({
        senderId: userInfo._id,
        receiverId: "",
        message: text,
        senderName: userInfo.name,
      })
    );
    setText("");
  };

  useEffect(() => {
    const scrollToBottom = () => {
      const chatContainer = document.querySelector(".message-container");
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    };
    scrollToBottom();
  }, [owner_admin_message]);

  return (
    <div className="px-2 py-5 lg:px-7">
      <div className="w-full px-4 py-4 bg-white rounded-md h-[calc(100vh-140px)]">
        <div className="relative flex w-full h-full">
          <div className="w-full md:pl-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start gap-3">
                <div className="relative">
                  <img
                    className="w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full"
                    src={admin}
                    alt=""
                  />
                  <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                </div>
                <h2 className="text-base font-semibold">Admin Support</h2>
              </div>
            </div>

            <div className="py-4">
              <div className="message-container bg-[#f1f5f9] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                {owner_admin_message.map((m, i) => {
                  if (userInfo._id === m.senderId) {
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-end w-full"
                      >
                        <div className="flex items-start justify-start max-w-full gap-2 py-2 md:px-3 lg:max-w-[85%]">
                          <div className="flex flex-col items-start justify-center w-full bg-[#e84839] shadow-lg py-1 px-2 rounded-sm text-white">
                            <span>{m.message}</span>
                          </div>
                          <div>
                            <img
                              className="w-[38px] h-[38px] border-2 border-green-500 rounded-full max-w-[38px] p-[3px]"
                              src={userInfo.image || ava}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-start w-full"
                      >
                        <div className="flex items-start justify-start max-w-full gap-2 py-2 md:px-3 lg:max-w-[85%]">
                          <div>
                            <img
                              className="w-[38px] h-[38px] border-2 border-green-500 rounded-full max-w-[38px] p-[3px]"
                              src={admin}
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center w-full bg-[#51a8ff] shadow-lg py-1 px-2 rounded-sm text-white">
                            <span>{m.message}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
                <div ref={scrollRef} />
              </div>
            </div>

            <form onSubmit={send} className="flex gap-3">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                className="flex items-center justify-between w-full px-2 py-[5px] border focus:border-blue-500 rounded-md border-slate-700 outline-none bg-transparent"
                placeholder="Enter Message"
              />
              <button className="shadow-lg bg-[#51a8ff] hover:shadow-cyan-500/50 font-bold w-[75px] h-[35px] rounded-md flex justify-center items-center text-white">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerChatAdmin;
