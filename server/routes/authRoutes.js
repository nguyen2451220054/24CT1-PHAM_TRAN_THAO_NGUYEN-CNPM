import express from 'express';
import { pool } from '../config/mysql.js';

const router = express.Router();

// [POST] /api/auth/register - Đăng ký tài khoản mới và lưu thẳng vào MySQL
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, phone, password, address } = req.body;

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ tất cả các trường thông tin!'
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Kiểm tra xem email đã tồn tại trong MySQL chưa
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [cleanEmail]);
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email này đã được sử dụng. Vui lòng đăng nhập hoặc dùng email khác!'
      });
    }

    // 2. Thêm người dùng mới vào bảng users trong MySQL
    const [insertResult] = await pool.query(
      'INSERT INTO users (fullName, email, phone, password, address, role) VALUES (?, ?, ?, ?, ?, ?)',
      [fullName.trim(), cleanEmail, phone.trim(), password, address || '', 'customer']
    );

    console.log(`✅ [MySQL] Đã lưu thành công thành viên mới: ${fullName.trim()} (${cleanEmail}) với ID: ${insertResult.insertId}`);

    const userData = {
      id: insertResult.insertId,
      fullName: fullName.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      address: address || '',
      role: 'customer'
    };

    res.status(201).json({
      success: true,
      message: 'Đăng ký tài khoản thành công! Dữ liệu đã được lưu vào MySQL.',
      user: userData
    });
  } catch (error) {
    console.error('❌ Lỗi khi đăng ký (MySQL):', error.message);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ cơ sở dữ liệu: ' + error.message });
  }
});

// [POST] /api/auth/login - Đăng nhập tài khoản kiểm tra trực tiếp từ MySQL
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập đầy đủ Email và Mật khẩu!'
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Tìm tài khoản trong MySQL
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [cleanEmail]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Email này chưa được đăng ký tài khoản trong hệ thống MySQL!'
      });
    }

    const user = rows[0];

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Mật khẩu không chính xác, vui lòng thử lại!'
      });
    }

    const { password: _, ...userData } = user;

    res.json({
      success: true,
      message: `Chào mừng ${user.fullName} quay trở lại!`,
      user: userData
    });
  } catch (error) {
    console.error('❌ Lỗi khi đăng nhập (MySQL):', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// [GET] /api/auth/users - Lấy danh sách thành viên từ MySQL
router.get('/users', async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, fullName, email, phone, address, role, createdAt FROM users ORDER BY id DESC'
    );
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
