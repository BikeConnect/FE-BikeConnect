import React, { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import avatar1 from "../../assets/images/avatar_user2.jpg";

const OwnerChatAdmin = () => {
  const scrollRef = useRef();
  const { userInfo } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    {
      senderId: "admin123",
      message: "What's sup homie, bạn có chuyện gì",
      timestamp: "10:00 AM",
    },
    {
      senderId: userInfo?._id,
      message: "Mình cần hỗ trợ về vấn đề đăng ký xe á",
      timestamp: "10:01 AM",
    },
    {
      senderId: "admin123",
      message: "Ok bro, Let's go",
      timestamp: "10:02 AM",
    },
  ]);

  const adminInfo = {
    _id: "admin123",
    name: "Admin Support",
    image: avatar1,
    status: "online",
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (text.trim()) {
      const newMessage = {
        senderId: userInfo?._id,
        message: text,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setText("");

      setTimeout(() => {
        const adminResponse = {
          senderId: "admin123",
          message:
            "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ xử lý yêu cầu của bạn sớm nhất có thể.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, adminResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="px-2 lg:px-7">
      <div className="w-full px-4 py-4 bg-white rounded-md h-[calc(100vh-140px)]">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 p-3 border-b">
            <div className="relative">
              <img
                className="w-[45px] h-[45px] border-2 border-green-500 rounded-full p-[2px]"
                src={adminInfo.image}
                alt="Admin"
              />
              <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold">{adminInfo.name}</span>
              <span className="text-sm text-green-500">{adminInfo.status}</span>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.senderId === userInfo?._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                  ref={i === messages.length - 1 ? scrollRef : null}
                >
                  <div className={`flex items-end gap-2 max-w-[80%]`}>
                    {msg.senderId !== userInfo?._id && (
                      <img
                        src={adminInfo.image}
                        alt="Admin"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div
                      className={`flex flex-col ${
                        msg.senderId === userInfo?._id
                          ? "items-end"
                          : "items-start"
                      }`}
                    >
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          msg.senderId === userInfo?._id
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-gray-200 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        <p>{msg.message}</p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        {msg.timestamp}
                      </span>
                    </div>
                    {msg.senderId === userInfo?._id && (
                      <img
                        src={userInfo?.image || avatar1}
                        alt="User"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 border-t">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập tin nhắn..."
                className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={send}
                className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
              >
                <IoSend size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerChatAdmin;
