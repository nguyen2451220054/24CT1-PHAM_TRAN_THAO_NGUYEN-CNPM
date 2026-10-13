import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/milk_shop');
    console.log(`✅ Kết nối MongoDB thành công: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Lỗi kết nối MongoDB: ${error.message}`);
    console.log(`💡 Lưu ý: Hãy đảm bảo dịch vụ MongoDB (mongod) đang chạy hoặc dán link MongoDB Atlas vào server/.env`);
    // Không exit ngay để server vẫn có thể thông báo hướng dẫn qua API nếu cần
  }
};
