import React, { useRef, useState } from "react";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import avatar1 from "../../assets/images/avatar_user1.png";
import avatar2 from "../../assets/images/avatar_user2.png";
import avatar3 from "../../assets/images/avatar_user3.png";

const CustomerChat = () => {
  const [text, setText] = useState("");
  const [receiverMessage, setReceiverMessage] = useState("");
  const [activeOwner, setActiveOwner] = useState([]);
  const [show, setShow] = useState(false);
  const { ownerId} = useParams();
  const scrollRef = useRef();

  const mockFriends = [
    {
      fdId: "1",
      name: "John Skibidi",
      image: avatar1,
    },
    {
      fdId: "2",
      name: "Cristiano Ronaldo",
      image: avatar2,
    },
    {
      fdId: "3",
      name: "Mike Tyson",
      image: avatar3,
    },
  ];
  const mockMessages = [
    {
      receiverId: "1",
      message: "Alo bạn ơi, cho tôi thuê xe",
      senderId: "2",
    },
    {
      receiverId: "2",
      message: "Vâng, bạn muốn thuê xe máy nào nhỉ?",
      senderId: "1",
    },
    {
      receiverId: "1",
      message: "Bí mật",
      senderId: "2",
    },
  ];
  const mockCurrentFriend = {
    fdId: "1",
    name: "John Skibidi",
    image: avatar1,
  };
  const mockActiveOwners = [{ ownerId: "1" }, { ownerId: "3" }];
  const send = () => {
    if (text.trim()) {
      console.log("Sending message:", text);
      setText("");
    }
  };
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
            {mockFriends.map((f, i) => (
              <Link
                key={i}
                to={`/user-dashboard/chat/${f.fdId}`}
                className={`flex gap-2 justify-start items-center pl-2 py-[5px] rounded-md ${
                  f.fdId === mockCurrentFriend.fdId ? "bg-[#e2e4e7]" : ""
                }`}
              >
                <div className="w-[30px] h-[30px] rounded-full relative">
                  {mockActiveOwners.some((c) => c.ownerId === f.fdId) && (
                    <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                  )}
                  <img src={f.image} alt="" className="rounded-full" />
                </div>
                <span>{f.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-[calc(100%-230px)] md-lg:w-full">
          {mockCurrentFriend ? (
            <div className="w-full h-full">
              {/* Header */}
              <div className="flex justify-between gap-3 items-center text-slate-600 text-xl h-[50px]">
                <div className="flex gap-2">
                  <div className="w-[30px] h-[30px] rounded-full relative">
                    {mockActiveOwners.some(
                      (c) => c.ownerId === mockCurrentFriend.fdId
                    ) && (
                      <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                    )}
                    <img
                      src={mockCurrentFriend.image}
                      alt=""
                      className="rounded-full"
                    />
                  </div>
                  <span>{mockCurrentFriend.name}</span>
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
              {/* Messages */}
              <div className="h-[400px] w-full bg-slate-100 p-3 rounded-md">
                <div
                  className="flex flex-col w-full h-full gap-3 overflow-y-auto"
                  ref={scrollRef}
                >
                  {mockMessages.map((m, i) => (
                    <div
                      key={i}
                      className={`w-full flex gap-2 ${
                        m.receiverId === mockCurrentFriend.fdId
                          ? "justify-end"
                          : "justify-start"
                      } items-center text-[14px]`}
                    >
                      {m.receiverId !== mockCurrentFriend.fdId && (
                        <img
                          className="w-[30px] h-[30px] rounded-full"
                          src={mockCurrentFriend.image}
                          alt=""
                        />
                      )}
                      <div
                        className={`p-2 text-white rounded-md ${
                          m.receiverId === mockCurrentFriend.fdId
                            ? "bg-cyan-500"
                            : "bg-purple-500"
                        }`}
                      >
                        <span>{m.message}</span>
                      </div>
                      {m.receiverId === mockCurrentFriend.fdId && (
                        <img
                          className="w-[30px] h-[30px] rounded-full"
                          src={avatar1}
                          alt=""
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* Input Area */}
              <div className="flex items-center justify-between w-full p-2 pt-8">
                <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full">
                  <label className="cursor-pointer">
                    <AiOutlinePlus />
                  </label>
                  <input className="hidden" type="file" />
                </div>
                <div className="border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    placeholder="Input message"
                    className="w-full h-full p-3 rounded-full outline-none"
                  />
                  <div className="absolute text-2xl cursor-pointer right-2 top-2">
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
              <span>Select Owner</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CustomerChat;
