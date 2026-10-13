import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Tạo pool kết nối tới MySQL XAMPP
export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'milk_shop',
  port: Number(process.env.MYSQL_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Hàm kiểm tra kết nối và tự động khởi tạo bảng users nếu chưa có
export const testMySQLConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Đã kết nối Cơ sở dữ liệu MySQL thành công (database: milk_shop)!');

    // Tự động kiểm tra và tạo bảng users nếu chưa có
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        address TEXT NULL,
        role VARCHAR(50) DEFAULT 'customer',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    connection.release();
  } catch (error) {
    console.error('❌ Lỗi kết nối MySQL:', error.message);
    console.log('💡 Hãy đảm bảo MySQL trong bảng điều khiển XAMPP Control Panel đang ở trạng thái Start (chạy cổng 3306).');
  }
};
