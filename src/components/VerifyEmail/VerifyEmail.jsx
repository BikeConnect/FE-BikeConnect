import React, { useState } from 'react';
import './VerifyEmail.css';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const VerifyEmail = ({ onClose }) => {
    const [code, setCode] = useState(new Array(6).fill(""));
    const navigate = useNavigate(); // Initialize navigate function

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (index < code.length - 1 && value !== "") {
                e.target.nextSibling.focus();
            }
        } else if (value === "") {
            const newCode = [...code];
            newCode[index] = "";
            setCode(newCode);

            if (index > 0) {
                e.target.previousSibling.focus();
            }
        }
    };

    const handleVerify = () => {
        if (code.join("").length === 6) {
            if (code.join("") === "745678") { 
                alert("Xác thực thành công!");
                onClose(); 
                navigate('/homepage'); // Redirect to homepage or desired route
            } else {
                alert("Mã xác thực không chính xác. Vui lòng thử lại.");
            }
        } else {
            alert("Vui lòng nhập đủ 6 ký tự.");
        }
    };

    const handleResend = () => {
        alert("Mã xác thực mới đã được gửi!");
        setCode(new Array(6).fill(""));
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Xác thực email</h2>
            <p>Chúng tôi đã gửi mã xác thực đến email <span id="email">contact@gmail.com</span></p>
            <p>Nhập mã để xác thực tài khoản của bạn</p>
            <div className="code-input">
                {code.map((value, index) => (
                   <Form.Control
                       type="text"
                       maxLength="1"
                       value={code[index]}
                       onChange={(e) => handleChange(e, index)}
                       onFocus={(e) => e.target.select()}
                       className="text-center"
                       key={index} // Add key prop
                   />
                ))}
            </div>
            <button className="verify-btn role-btn" onClick={handleVerify}>
                Xác thực
            </button>
            <p>
                Bạn chưa nhận được mã? <button onClick={handleResend} className="resend-btn">Gửi lại</button>
            </p>
        </div>
    );
};

export default VerifyEmail;
