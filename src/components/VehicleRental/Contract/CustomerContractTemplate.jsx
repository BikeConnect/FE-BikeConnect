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
  
  BÊN THUÊ(BÊN A):
  Ông/Bà: ${userInfo.name}
  Số điện thoại: ${contractData.customerPhone || "_______________"}
  
  BÊN CHO THUÊ (BÊN B):
  Ông/Bà: ${bikeData.ownerName}
  Số điện thoại: ${
    bikeData.ownerPhone ||
    "𝗖𝗵𝘂̉ 𝘅𝗲 𝗵𝗶𝗲̣̂𝗻 𝗰𝗵𝘂̛𝗮 𝗰𝗮̣̂𝗽 𝗻𝗵𝗮̣̂𝘁 𝘀𝗼̂́ đ𝗶𝗲̣̂𝗻 𝘁𝗵𝗼𝗮̣𝗶, 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗰𝗵𝗮𝘁 𝘃𝗼̛́𝗶 𝗰𝗵𝘂̉ 𝘅𝗲 đ𝗲̂̉ 𝗯𝗶𝗲̂́𝘁 𝘁𝗵𝗲̂𝗺 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻"
  }
  
  Sau khi trao đổi, thỏa thuận, hai bên nhất trí ký kết hợp đồng thuê xe với các điều khoản dưới đây:
  
  ĐIỀU 1: ĐỐI TƯỢNG CỦA HỢP ĐỒNG
  Bên A đồng ý cho Bên B thuê xe với các thông tin cơ bản:
  - Loại xe: ${bikeData.model}
  - Biển số: ${bikeData.license}
  
  ĐIỀU 2: THỜI HẠN CỦA HỢP ĐỒNG
  Thời hạn thuê xe: từ ngày ${bikeData.startDate} đến ngày ${bikeData.endDate}
  
  ĐIỀU 3: GIÁ THUÊ XE
  Giá thuê xe là: ${contractData.totalAmount?.toLocaleString("vi-VN")} đồng
  ...
  `;
};
