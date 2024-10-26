import React, { useState } from 'react';
import './CustomerProfile.css';
import HeaderAfterLogin from '../Header/HeaderAfterLogin';
import { FaPen } from 'react-icons/fa'; // Thư viện icon

const CustomerProfile = () => {
    const [isEditing, setIsEditing] = useState({
        gender: false,
        dob: false,
        phone: false,
        email: false,
        license: false,
    });

    const [userInfo, setUserInfo] = useState({
        name: "Phúc Văn",
        dob: "01/01/2000",
        gender: "Nam",
        phone: "Đã xác thực",
        email: "vvphuc28062003@gmail.com",
        license: "",
    });

    const handleEditClick = (field) => {
        setIsEditing((prev) => ({ ...prev, [field]: true }));
    };

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleSave = (field) => {
        // Validate thông tin ở đây (VD: email, số điện thoại...)
        setIsEditing((prev) => ({ ...prev, [field]: false }));
    };

    return (
        <div>
            <HeaderAfterLogin />
            <div className="customer-profile">
                <div className="profile-header">
                    <h2>Thông tin tài khoản</h2>
                    <div className="profile-details">
                        <div className="profile-image">
                            <div className="profile-initial">P</div>
                        </div>
                        <div className="profile-info">
                            <h3>{userInfo.name}</h3>
                            <p>
                                Ngày sinh: {isEditing.dob ? (
                                    <input
                                        type="date"
                                        name="dob"
                                        value={userInfo.dob}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <>
                                        {userInfo.dob}
                                        <FaPen onClick={() => handleEditClick('dob')} />
                                    </>
                                )}
                            </p>
                            <p>
                                Giới tính: {isEditing.gender ? (
                                    <select
                                        name="gender"
                                        value={userInfo.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
                                ) : (
                                    <>
                                        {userInfo.gender}
                                        <FaPen onClick={() => handleEditClick('gender')} />
                                    </>
                                )}
                            </p>
                            <p>
                                Số điện thoại: {isEditing.phone ? (
                                    <input
                                        type="text"
                                        name="phone"
                                        value={userInfo.phone}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <>
                                        {userInfo.phone}
                                        <FaPen onClick={() => handleEditClick('phone')} />
                                    </>
                                )}
                            </p>
                            <p>
                                Email: {isEditing.email ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={userInfo.email}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <>
                                        {userInfo.email}
                                        <FaPen onClick={() => handleEditClick('email')} />
                                    </>
                                )}
                            </p>
                            <p>
                                <strong>Số GPLX:</strong> {isEditing.license ? (
                                    <input
                                        type="text"
                                        name="license"
                                        value={userInfo.license}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <>
                                        {userInfo.license}
                                        <FaPen onClick={() => handleEditClick('license')} />
                                    </>
                                )}
                            </p>
                            <button className="edit-button" onClick={() => handleSave('dob')}>Lưu</button>
                            <button className="edit-button" onClick={() => handleSave('gender')}>Lưu</button>
                            <button className="edit-button" onClick={() => handleSave('phone')}>Lưu</button>
                            <button className="edit-button" onClick={() => handleSave('email')}>Lưu</button>
                            <button className="edit-button" onClick={() => handleSave('license')}>Lưu</button>
                        </div>
                    </div>
                </div>

                <div className="license-section">
                    <h2>Giấy phép lái xe</h2>
                    <p className="warning-text">Lưu ý: để tránh phát sinh vấn đề trong quá trình thuê xe, ...</p>
                    <div className="license-details">
                        <input type="text" placeholder="Nhập số GPLX đã cấp" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerProfile;
