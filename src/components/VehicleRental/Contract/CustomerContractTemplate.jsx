import { useSelector } from "react-redux";

export const CustomerContractTemplate = ({ contractData, bikeData }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return `
  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
  Độc lập – Tự do – Hạnh phúc
  ---o0o---
  HỢP ĐỒNG THUÊ XE
  
  - Căn cứ Bộ luật dân sự số 91/2005/QH13 và các văn bản luật liên quan khác;
  - Căn cứ vào nhu cầu và sự tự nguyện của các bên.
  
  Hôm nay, ngày ${contractData.startDate}, tại ${
    contractData.location || "BikeConnect"
  }, chúng tôi gồm:
  
  BÊN THUÊ (BÊN A):
  Ông/Bà: ${userInfo.name}
  CMND/CCCD: ${contractData.customerIdentityCard || "_______________"}
  
  BÊN CHO THUÊ (BÊN B):
  Ông/Bà: ${bikeData.ownerName}
  
  Sau khi trao đổi, thỏa thuận, hai bên nhất trí ký kết hợp đồng thuê xe với các điều khoản dưới đây:
  
  ĐIỀU 1: ĐỐI TƯỢNG CỦA HỢP ĐỒNG
  Bên B đồng ý cho Bên A thuê xe với các thông tin cơ bản:
  - Loại xe: ${bikeData.model}
  - Biển số: ${contractData.vehicleLicense}
  
  ĐIỀU 2: THỜI HẠN CỦA HỢP ĐỒNG
  Thời hạn thuê xe: từ ngày ${contractData.startDate} đến ngày ${
    contractData.endDate
  }
  
  ĐIỀU 3: GIÁ THUÊ XE
  Giá thuê xe là: ${contractData.totalAmount?.toLocaleString("vi-VN")} đồng
  ...
  `;
};
