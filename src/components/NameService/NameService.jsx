import React from 'react';
import './NameService.css'; 
import Header from '../Header/HeaderNoLogin'; 

const NameService = () => { 
  return (
    <div className="service-name">
      <Header />  
      <div className="title-container" >
          <h1 className="title">Cộng Đồng Những Người Thuê Và Cho Thuê Xe</h1>
      </div>
      
    </div>
  );
}

export default NameService;