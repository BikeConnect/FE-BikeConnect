import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const messagesEndRef = useRef(null);

  const autoResponses = [
    {
      trigger: ['giá', 'thuê', 'giá thuê', 'chi phí'],
      response: 'Giá thuê xe Vios của chúng tôi là 800.000đ/ngày. Đã bao gồm bảo hiểm xe.'
    },
    {
      trigger: ['thời gian', 'khi nào', 'ngày'],
      response: 'Xe có sẵn từ ngày mai. Bạn có thể đặt trước tối thiểu 4 tiếng.'
    },
    {
      trigger: ['địa chỉ', 'đâu', 'ở đâu', 'địa điểm'],
      response: 'Bạn có thể đến nhận xe tại 123 Nguyễn Văn A, Quận 1, TP.HCM.'
    },
    {   
      trigger: ['giấy tờ', 'yêu cầu', 'cần gì'],
      response: 'Bạn cần mang theo CMND/CCCD và bằng lái xe để làm thủ tục thuê xe.'
    },
    {
      trigger: ['đặt cọc', 'cọc'],
      response: 'Đặt cọc 5 triệu đồng, sẽ hoàn trả khi kết thúc hợp đồng thuê xe.'
    }
  ];

  const initialMessages = [
    {
      id: 1,
      sender: 'owner',
      content: 'Xin chào! Tôi là chủ xe Mạnh đẹp trai vip pro nhất cmn vũ trụ. Bạn quan tâm đến xe nào?',
      time: '10:00'
    }
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAutoResponse = (message) => {
    const messageLower = message.toLowerCase();
    const response = autoResponses.find(res => 
      res.trigger.some(trigger => messageLower.includes(trigger.toLowerCase()))
    );
    return response?.response || 'Bạn có thể cho biết thêm thông tin cụ thể về nhu cầu thuê xe của bạn không?';
  };

  const addAutoResponse = (userMessage) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const autoResponse = {
        id: messages.length + 2,
        sender: 'owner',
        content: findAutoResponse(userMessage),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, autoResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMsg = {
        id: messages.length + 1,
        sender: 'renter',
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, userMsg]);
      setNewMessage('');
      addAutoResponse(newMessage);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="chat-container">
      <div className="chat-window">
        <div className="chat-header">
          <h5>Chat với chủ xe</h5>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-wrapper ${message.sender === 'renter' ? 'message-right' : 'message-left'}`}
            >
              <div className={`message ${message.sender === 'renter' ? 'message-renter' : 'message-owner'}`}>
                <div className="message-content">{message.content}</div>
                <div className="message-time">{message.time}</div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message-wrapper message-left">
              <div className="message message-owner typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-footer">
          <form onSubmit={handleSendMessage}>
            <div className="message-input-wrapper">
              <input
                type="text"
                className="message-input"
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button className="send-button" type="submit">
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;