import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import avatar1 from "../../assets/images/avatar_user1.png";
import { useDispatch, useSelector } from "react-redux";
import {
  add_chat_owner,
  customer_send_messages,
  messageClear,
  updateCustomerMessage,
} from "../../store/Reducers/chatReducer";
import { socket } from "../../util/socket";

const CustomerChat = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [receiverMessage, setReceiverMessage] = useState("");
  const [activeOwner, setActiveOwner] = useState([]);
  const [show, setShow] = useState(false);
  const { ownerId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { fr_messages, currentFr, my_friends, successMessage } = useSelector(
    (state) => state.chat
  );

  const scrollRef = useRef();

  useEffect(() => {
    socket.emit("add_user", userInfo._id, userInfo);
  }, []);

  useEffect(() => {
    if (userInfo?._id) {
      if (ownerId) {
        dispatch(
          add_chat_owner({
            ownerId,
            customerId: userInfo._id,
          })
        );
      } else {
        dispatch(
          add_chat_owner({
            ownerId: "",
            customerId: userInfo._id,
          })
        );
      }
    }
  }, [ownerId, userInfo]);

  const send = () => {
    if (text) {
      dispatch(
        customer_send_messages({
          customerId: userInfo._id,
          text,
          ownerId,
          name: userInfo.name,
        })
      );
      setText("");
    }
  };

  useEffect(() => {
    socket.on("owner_message", (msg) => {
      setReceiverMessage(msg);
    });
    socket.on("active_owner", (owners) => {
      setActiveOwner(owners);
    });
  }, []);

  useEffect(() => {
    if (successMessage) {
      socket.emit("send_customer_message", fr_messages[fr_messages.length - 1]); // lay message cuoi cung
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    if (receiverMessage) {
      if (
        ownerId === receiverMessage.senderId &&
        userInfo._id === receiverMessage.receiverId
      ) {
        dispatch(updateCustomerMessage(receiverMessage));
      }
    }
  }, [receiverMessage]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [fr_messages]);

  return (
    <div className="p-3 bg-white rounded-md">
      <div className="flex w-full">
        <div
          className={`w-[230px] md-lg:absolute bg-white md-lg:h-full -left-[350px] ${
            show ? "-left-0" : "-left-[350px]"
          }`}
        >
          <div className="flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]">
            <span>
              <AiOutlineMessage />
            </span>
            <span>Message</span>
          </div>
          <div className="w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3">
            {my_friends.map((f, i) => (
              <Link
                key={i}
                to={`/user-dashboard/chat/${f.fdId}`}
                className={`flex gap-2 justify-start items-center pl-2 py-[5px] rounded-md ${
                  ownerId === f.fdId ? "bg-[#e2e4e7]" : ""
                }`}
              >
                <div className="w-[30px] h-[30px] rounded-full relative">
                  {activeOwner.some((c) => c.ownerId === f.fdId) && (
                    <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute left-7 top-6"></div>
                  )}
                  <img
                    src={f.image === "" ? avatar1 : f.image}
                    alt=""
                    className="w-[38px] h-[38px] border-[#e04660] border-2 max-w-[38px] p-[2px] rounded-full"
                  />
                </div>
                <span>{f.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-[calc(100%-230px)] md-lg:w-full">
          {ownerId && currentFr ? (
            <div className="w-full h-full">
              <div className="flex justify-between gap-3 items-center text-slate-600 text-xl h-[50px]">
                <div className="flex gap-2">
                  <div className="w-[30px] h-[30px] rounded-full relative">
                    {activeOwner.some((c) => c.ownerId === currentFr.fdId) && (
                      <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute left-7 top-6"></div>
                    )}
                    <img
                      src={currentFr.image === "" ? avatar1 : currentFr.image}
                      alt=""
                      className="w-[40px] h-[40px] border-[#e04660] border-2 max-w-[40px] p-[2px] rounded-full"
                    />
                  </div>
                  <span className="pl-2 pt-1">{currentFr.name}</span>
                </div>
                <div>
                  <div
                    onClick={() => setShow(!show)}
                    className="w-[35px] h-[35px] hidden md-lg:flex cursor-pointer rounded-sm justify-center items-center bg-sky-500 text-white"
                  >
                    <FaList />
                  </div>
                </div>
              </div>
              <div className="h-[400px] w-full bg-slate-100 p-3 rounded-md">
                <div
                  className="flex flex-col w-full h-full gap-3 overflow-y-auto"
                  ref={scrollRef}
                >
                  {fr_messages.map((m, i) => {
                    if (currentFr?.fdId !== m.receiverId) {
                      return (
                        <div
                          key={i}
                          className="w-full flex gap-2 justify-start items-center text-[14px]"
                        >
                          <img
                            className="w-[38px] h-[38px] border-[#e04660] border-2 max-w-[38px] p-[2px] rounded-full"
                            src={currentFr.image}
                            alt=""
                          />
                          <div className="p-2 text-white bg-purple-500 rounded-md">
                            <span>{m.message}</span>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          className="w-full flex gap-2 justify-end items-center text-[14px]"
                        >
                          <div className="p-2 text-white rounded-md bg-cyan-500">
                            <span>{m.message}</span>
                          </div>
                          <img
                            className="w-[38px] h-[38px] border-[#e04660] border-2 max-w-[38px] p-[2px] rounded-full"
                            src={userInfo.image}
                            alt=""
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="flex items-center justify-between w-full p-2 pt-8">
                <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full">
                  <label className="cursor-pointer" htmlFor="">
                    <AiOutlinePlus />
                  </label>
                  <input className="hidden" type="file" />
                </div>
                <div className="border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    placeholder="input message"
                    className="w-full h-full p-3 rounded-full outline-none"
                  />
                  <div className="absolute text-2xl cursor-auto right-2 top-2">
                    <span>
                      <GrEmoji />
                    </span>
                  </div>
                </div>
                <div className="w-[40px] p-2 justify-center items-center rounded-full">
                  <div onClick={send} className="text-2xl cursor-pointer">
                    <IoSend />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setShow(true)}
              className="flex items-center justify-center w-full h-[250px] text-lg font-bold text-slate-600"
            >
              <span>Select owner</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerChat;
