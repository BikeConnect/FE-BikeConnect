import React, { useState } from 'react';
import './CustomerProfile.css';
import HeaderAfterLogin from '../Header/HeaderAfterLogin';
import { FaPen } from 'react-icons/fa';

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
        dob: "2000-01-01",
        gender: "Nam",
        phone: "0905665294",
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
        setIsEditing((prev) => ({ ...prev, [field]: false }));
    };

    const renderEditButton = (field) => (
        <button className="save-button" onClick={() => handleSave(field)}>Lưu</button>
    );

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
                        <h3>{userInfo.name}</h3>
                        <div className="profile-info">
                            <div className="profile-field">
                                <strong>Ngày sinh: </strong>
                                {isEditing.dob ? (
                                    <>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={userInfo.dob}
                                            onChange={handleChange}
                                        />
                                        {renderEditButton('dob')}
                                    </>
                                ) : (
                                    <>
                                        {userInfo.dob}
                                        <FaPen onClick={() => handleEditClick('dob')} className="edit-icon" />
                                    </>
                                )}
                            </div>

                            <div className="profile-field">
                                <strong>Giới tính: </strong>
                                {isEditing.gender ? (
                                    <>
                                        <select
                                            name="gender"
                                            value={userInfo.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                        </select>
                                        {renderEditButton('gender')}
                                    </>
                                ) : (
                                    <>
                                        {userInfo.gender}
                                        <FaPen onClick={() => handleEditClick('gender')} className="edit-icon" />
                                    </>
                                )}
                            </div>

                            <div className="profile-field">
                                <strong>Số điện thoại: </strong>
                                {isEditing.phone ? (
                                    <>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={userInfo.phone}
                                            onChange={handleChange}
                                        />
                                        {renderEditButton('phone')}
                                    </>
                                ) : (
                                    <>
                                        {userInfo.phone}
                                        <FaPen onClick={() => handleEditClick('phone')} className="edit-icon" />
                                    </>
                                )}
                            </div>

                            <div className="profile-field">
                                <strong>Email: </strong>
                                {isEditing.email ? (
                                    <>
                                        <input
                                            type="email"
                                            name="email"
                                            value={userInfo.email}
                                            onChange={handleChange}
                                        />
                                        {renderEditButton('email')}
                                    </>
                                ) : (
                                    <>
                                        {userInfo.email}
                                        <FaPen onClick={() => handleEditClick('email')} className="edit-icon" />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="license-section">
                    <h2>Giấy phép lái xe</h2>
                    <div className="license-details">
                        {isEditing.license ? ( // Kiểm tra xem có đang chỉnh sửa GPLX không
                            <>
                                <input
                                    type="text"
                                    placeholder="Nhập số GPLX đã cấp"
                                    value={userInfo.license}
                                    name="license"
                                    onChange={handleChange}
                                />
                                {renderEditButton('license')}
                            </>
                        ) : (
                            <>
                                GPLX :{userInfo.license || "Chưa có GPLX"} {/* Hiển thị thông báo nếu chưa có GPLX */}
                                <FaPen onClick={() => handleEditClick('license')} className="edit-icon" />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerProfile;
