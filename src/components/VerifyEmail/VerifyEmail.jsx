import React, { useState } from 'react';
import './VerifyEmail.css';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = ({ role, onClose }) => {
    const [code, setCode] = useState(new Array(6).fill(""));
    const navigate = useNavigate();

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

    const handleVerify = async () => {
        const endpoint = role === 'owner'
            ? 'http://localhost:8080/api/auth/owner-verify-email'
            : 'http://localhost:8080/api/customer/customer-verify-email';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: code.join("") }),
            });

            if (response.ok) {
                alert("Đăng ký tài khoản thành công !");
                onClose();
                navigate('/homepage');
            } else {
                alert("Mã xác thực không chính xác. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error('Lỗi:', error);
            alert("Đã xảy ra lỗi khi kết nối với server");
        }
    };

    const handleResend = () => {
        alert("Mã xác thực mới đã được gửi!");
        setCode(new Array(6).fill(""));
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Xác thực Email</h2>
            <Form onSubmit={(e) => e.preventDefault()}>
                <div className="code-inputs">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                        />
                    ))}
                </div>
                <button type="button" className="btn btn-primary" onClick={handleVerify}>
                    Xác thực
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleResend}>
                    Gửi lại mã
                </button>
            </Form>
        </div>
    );
};

export default VerifyEmail;
