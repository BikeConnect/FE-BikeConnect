import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chat.css';

const Chat = ({ userRole }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const messagesEndRef = useRef(null);

  const autoResponses = {
    owner: [
      {
        trigger: ['còn trống', 'có xe'],
        response: 'Dạ, cho em hỏi giá thuê xe một ngày là bao nhiêu ạ?'
      },
      {
        trigger: ['800', 'giá', 'tiền'],
        response: 'Vậy em muốn thuê xe từ ngày mai đến cuối tuần được không ạ?'
      },
      {
        trigger: ['được', 'ok', 'đồng ý'],
        response: 'Em cần chuẩn bị những giấy tờ gì ạ?'
      },
      {
        trigger: ['CMND', 'căn cước', 'bằng lái'],
        response: 'Dạ vâng. Vậy em có thể đến địa chỉ nào để xem xe ạ?'
      },
      {
        trigger: ['địa chỉ', 'đến'],
        response: 'Dạ vâng, ngày mai em sẽ qua xem xe. Cảm ơn anh/chị!'
      }
    ],
    renter: [
      {
        trigger: ['giá', 'thuê', 'bao nhiêu'],
        response: 'Giá thuê xe là 800.000đ/ngày. Nếu thuê dài hạn sẽ có ưu đãi đặc biệt ạ.'
      },
      {
        trigger: ['ngày mai', 'cuối tuần'],
        response: 'Dạ được ạ. Bạn cần mang theo CMND/CCCD và bằng lái xe để làm thủ tục thuê xe nhé.'
      },
      {
        trigger: ['giấy tờ', 'cần'],
        response: 'Bạn có thể đến xem xe tại 123 Nguyễn Văn A, Quận 1, TP.HCM ạ.'
      },
      {
        trigger: ['địa chỉ', 'đâu', 'xem xe'],
        response: 'Dạ vâng, hẹn gặp bạn. Nếu cần thông tin gì thêm bạn cứ nhắn tin cho tôi nhé!'
      }
    ]
  };

  const initialMessages = {
    owner: [
      {
        id: 1,
        sender: 'renter',
        content: 'Xin chào, tôi có nhu cầu thuê xe Vios. Bạn có xe trống không?',
        time: '10:05'
      }
    ],
    renter: [
      {
        id: 1,
        sender: 'owner',
        content: 'Xin chào! Tôi là chủ xe. Bạn quan tâm đến việc thuê xe phải không ạ?',
        time: '10:00'
      }
    ]
  };

  useEffect(() => {
    if (userRole && initialMessages[userRole]) {
      setMessages(initialMessages[userRole]);
    }
  }, [userRole]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAutoResponse = (message) => {
    const messageLower = message.toLowerCase();
    const responses = autoResponses[userRole === 'owner' ? 'owner' : 'renter'];
    const response = responses.find(res => 
      res.trigger.some(trigger => messageLower.includes(trigger.toLowerCase()))
    );
    return response?.response || (
      userRole === 'owner' 
        ? 'Dạ, anh/chị có thể cho em biết thêm thông tin được không ạ?' 
        : 'Bạn cần hỗ trợ thêm thông tin gì không ạ?'
    );
  };

  const addAutoResponse = (userMessage) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const autoResponse = {
        id: messages.length + 2,
        sender: userRole === 'owner' ? 'renter' : 'owner',
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
        sender: userRole,
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
          <h5>{userRole === 'owner' ? 'Chat với khách thuê xe' : 'Chat với chủ xe'}</h5>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div
            key={message.id}
            className={`message-wrapper ${message.sender === userRole ? 'message-right' : 'message-left'}`}
          >
          
              <div className={`message ${message.sender === userRole ? 'message-renter' : 'message-owner'}`}>
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