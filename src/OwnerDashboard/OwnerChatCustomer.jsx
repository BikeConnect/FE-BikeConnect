import React, { useEffect, useRef, useState } from "react";
import { FaList } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { IoCloseCircle, IoSend } from "react-icons/io5";
import avatar1 from "../assets/images/avatar_user1.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  get_customer_message,
  get_customers,
  messageClear,
  owner_send_messages,
  updateCustomer,
  updateOwnerMessage,
  updateOwners,
} from "../store/Reducers/chatReducer";
import { GrEmoji } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";
import { socket } from './../util/socket';

const OwnerChatCustomer = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [receiverMessage, setReceiverMessage] = useState("");
  const [show, setShow] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { customerId } = useParams();
  const { customers, currentCustomer, customer_messages, successMessage } = useSelector(
    (state) => state.chat
  );

  const initializeChat = async () => {
    if (userInfo?._id) {
      try {
        await dispatch(get_customers(userInfo._id));
        if (customerId) {
          await dispatch(get_customer_message(customerId));
        }
      } catch (error) {
        console.error('Error loading chat data:', error);
      } finally {
      }
    }
  };

  useEffect(() => {
    socket.emit("add_owner", userInfo._id, userInfo);
  }, []);


  useEffect(() => {
    socket.on('active_customer', (customers) => {
      dispatch(updateCustomer(customers));
    })
    socket.on('active_owner', (owners) => {
      dispatch(updateOwners(owners));
    })
  }, []);

  useEffect(() => {
    initializeChat();
  }, [userInfo, customerId])

  useEffect(() => {
    dispatch(get_customers(userInfo._id));
  }, []);

  useEffect(() => {
    if (customerId) {
      dispatch(get_customer_message(customerId));
    }
  }, [customerId]);

  const scrollRef = useRef();

  const send = (e) => {
    e.preventDefault();
    dispatch(
      owner_send_messages({
        senderId: userInfo._id,
        receiverId: customerId,
        text,
        name: userInfo?.name,
      })
    );
    setText("");
  };

  useEffect(() => {
    if (successMessage) {
      socket.emit("send_owner_message", customer_messages[customer_messages.length - 1]); // lay message cuoi cung
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    socket.on("customer_message", (msg) => {
      setReceiverMessage(msg);
    });
  }, []);

  useEffect(() => {
    if (receiverMessage) {
      if (
        customerId === receiverMessage.senderId &&
        userInfo._id === receiverMessage.receiverId
      ) {
        dispatch(updateOwnerMessage(receiverMessage));
      } else {
        dispatch(messageClear());
      }
    }
  }, [receiverMessage]);


  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [customer_messages]);


  return (
    <div className="px-2 lg:px-7">
      <div className="w-full px-4 py-4 bg-white rounded-md h-[calc(100vh-140px)]">
        <div className="relative flex w-full h-full">
          <div
            className={`w-[280px] h-full absolute z-10 ${show ? "-left-[16px]" : "-left-[336px]"
              } md:left-0 md:relative transition-all`}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-[#e5e3e5] md:bg-transparent overflow-y-auto">
              <div className="flex items-center justify-between p-4 text-xl md:p-0 md:px-3 md:pb-3 ">
                <h2>Customers</h2>
                <span
                  onClick={() => setShow(!show)}
                  className="block cursor-pointer md:hidden"
                >
                  <IoCloseCircle />
                </span>
              </div>
              {customers.map((c, i) => (
                <Link
                  to={`/owner-dashboard/chat/${c.fdId}`}
                  key={i}
                  className={`h-[60px] flex justify-start gap-2 items-center px-2 py-2 rounded-md cursor-pointer bg-[#8aabec] `}
                >
                  <div className="relative">
                    <img
                      className="w-[38px] h-[38px] border-[#e04660] border-2 max-w-[38px] p-[2px] rounded-full"
                      src={customers[0]?.image}
                      alt=""
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  </div>

                  <div className="flex flex-col items-start justify-center w-full">
                    <div className="flex items-center justify-between w-full">
                      <h2 className="text-base font-semibold">{c.name}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
            <div className="flex items-center justify-between">
              {userInfo._id && (
                <div className="flex items-center justify-start gap-3">
                  <div className="relative">
                    <img
                      className="w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full"
                      src={customers[0]?.image}
                      alt=""
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  </div>
                  <h2 className="text-base font-semibold">
                    {currentCustomer.name}
                  </h2>
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

            <div className="py-3">
              <div className="bg-[#f1f5f9] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto border" ref={scrollRef}>
                {customerId ? (
                  customer_messages.map((m, i) => {
                    if (m.senderId === customerId) {
                      return (
                        <div
                          className="flex items-center justify-start w-full"
                          key={i}

                        >
                          <div className="flex items-start justify-start max-w-full gap-2 py-2 md:px-3 lg:max-w-[85%]">
                            <div>
                              <img
                                className=" w-[38px] h-[38px] border-2 border-green-500 rounded-full max-w-[38px] p-[3px]"
                                src={customers[0]?.image}
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
                        >
                          <div className="flex items-start justify-start max-w-full gap-2 py-2 md:px-3 lg:max-w-[85%]">
                            <div className="flex flex-col items-start justify-center w-full text-white bg-[#ea6c4c] shadow-lg py-1 px-2 rounded-sm">
                              <span>{m.message}</span>
                            </div>
                            <div>
                              <img
                                className=" w-[38px] h-[38px] border-2 border-green-500 rounded-full max-w-[38px] p-[3px]"
                                src={
                                  userInfo?.image === ""
                                    ? avatar1
                                    : userInfo?.image
                                }
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
                    <span>Select Customer</span>
                  </div>
                )}
              </div>
              {customerId ? (
                <div className="flex items-center justify-between w-full p-0 pt-0">
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
                      placeholder="Enter message..."
                      className="w-full h-full p-3 rounded-full outline-none"
                    />
                    <div className="absolute text-2xl cursor-pointer right-2 top-2">
                      <span>
                        <GrEmoji />
                      </span>
                    </div>
                  </div>

                  <div className="w-[40px] p-2 justify-center items-center rounded-full">
                    <div
                      onClick={send}
                      className="text-2xl cursor-pointer text-[#51a8ff] hover:text-blue-600 pb-[14px]"
                    >
                      <IoSend />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerChatCustomer;
