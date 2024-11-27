import React, { useState, useEffect, useRef } from 'react';
import './OwnerChat.css';

const OwnerChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const messagesEndRef = useRef(null);

  const autoResponses = [
    {
      trigger: ['thuê xe'],
      response: 'Xin chào! Tôi muốn thuê xe Vios ạ, giá cả như nào ạ?'
    },
    {
      trigger: ['giá thuê'],
      response: 'Giá thuê xe Vios là 800.000đ/ngày. Nếu thuê trên 3 ngày, tôi sẽ giảm giá còn 700.000đ/ngày p ko bạn.'
    },
    {
      trigger: ['thời gian thuê'],
      response: 'Tôi dự định thuê xe khoảng 3 ngày. Bạn có thể cho tôi biết là bạn muốn thuê trong bao lâu không ạ?'
    },
    {
      trigger: ['thủ tục', 'giấy tờ'],
      response: 'Để thuê xe, tôi cần mang theo CMND/CCCD, bằng lái xe và đặt cọc 5 triệu đồng. Bạn có thể chuẩn bị vậy được không?'
    },
    {
      trigger: ['địa chỉ', 'lấy xe'],
      response: 'Tôi có thể đến 123 Nguyễn Văn A, Quận 1, TP.HCM để lấy xe được không ạ?'
    },
    {
      trigger: ['bảo hiểm', 'tai nạn'],
      response: 'Xe đã được mua bảo hiểm 2 chiều. Trong trường hợp có sự cố, tôi sẽ liên lạc với bạn ngay để hỗ trợ.'
    },
    {
      trigger: ['thanh toán', 'trả tiền'],
      response: 'Tôi có thể thanh toán bằng tiền mặt hoặc chuyển khoản. Bạn gửi thông tin tài khoản cho tôi nhé.'
    },
    {
      trigger: ['cọc', 'đặt cọc'],
      response: 'Tôi hiểu rồi, tôi sẽ đặt cọc 5 triệu đồng khi nhận xe. Khi trả xe đúng thời gian và tình trạng nguyên vẹn, tiền cọc sẽ được hoàn lại.'
    },
    {
      trigger: ['hợp đồng', 'ký hợp đồng'],
      response: 'Sau khi tôi hoàn tất thủ tục và thanh toán, chúng ta sẽ ký hợp đồng cho thuê xe. Bạn có thể chuẩn bị sẵn sàng để ký hợp đồng không ạ?'
    }
  ];
  

  const initialMessages = [
    {
      id: 1,
      sender: 'renter',
      content: 'Chào anh/chị, em muốn hỏi thông tin thuê xe Vios ạ',
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
    return response?.response || 'Tôi muốn bạn tư vấn thêm thông tin gì về việc thuê xe ';
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
          <h5>Chat với khách thuê xe</h5>
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

export default OwnerChat;