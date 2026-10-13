import express from 'express';
import { Coupon } from '../models/Coupon.js';

const router = express.Router();

// [POST] /api/coupons/apply - Kiểm tra mã giảm giá
router.post('/apply', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập mã giảm giá' });
    }

    const cleanCode = code.trim().toUpperCase();
    const coupon = await Coupon.findOne({ code: cleanCode, isActive: true });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn! Thử: FRESHMILK, SUASACH hoặc FREESHIP'
      });
    }

    res.json({
      success: true,
      message: `Áp dụng mã ${coupon.code} thành công!`,
      coupon
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// [GET] /api/coupons - Lấy danh sách mã giảm giá đang hoạt động
router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.find({ isActive: true });
    res.json({ success: true, coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
