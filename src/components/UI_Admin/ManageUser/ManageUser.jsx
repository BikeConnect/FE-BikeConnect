// import React, { useState } from 'react';
// import ManageCustomer from './ManageCustomer/ManageCustomer';
// import ManageOwner from './ManageOwner/ManageOwner';
// import './ManageUser.css';

// const ManageUser = () => {    
//     const [activeTab, setActiveTab] = useState('customer');

//     return (
//         <div>
//             <div className="manage-user-container">
//                 <div className="button-container">
//                     <button
//                         className={`tab-button ${activeTab === 'customer' ? 'active' : ''}`}
//                         onClick={() => setActiveTab('customer')}
//                     >
//                         Khách thuê
//                     </button>
//                     <button
//                         className={`tab-button ${activeTab === 'owner' ? 'active' : ''}`}
//                         onClick={() => setActiveTab('owner')}
//                     >
//                         Chủ xe
//                     </button>
//                 </div>
//                 <div className="tab-content">
//                     {activeTab === 'customer' ? <ManageCustomer /> : <ManageOwner />}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ManageUser;
import React from 'react';
import ManageOwner from './ManageOwner/ManageOwner';
import './ManageUser.css';

const ManageUser = () => {    
    return (
        <div>
            <div className="manage-user-container">
                <div className="tab-content">
                    <ManageOwner />
                </div>
            </div>
        </div>
    );
};

export default ManageUser;