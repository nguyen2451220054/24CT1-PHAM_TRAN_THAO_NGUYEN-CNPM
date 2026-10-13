import express from 'express';
import { Order } from '../models/Order.js';

const router = express.Router();

// [POST] /api/orders - Tạo đơn hàng mới
router.post('/', async (req, res) => {
  try {
    const { customer, items, subtotal, shippingFee, discountAmount, totalAmount, couponCode, paymentMethod, paymentStatus, transactionId } = req.body;

    if (!customer || !customer.fullName || !customer.phone || !customer.address) {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp đầy đủ thông tin người nhận' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Giỏ hàng đang trống' });
    }

    const orderCode = 'FM' + Math.floor(100000 + Math.random() * 900000);

    const newOrder = await Order.create({
      orderCode,
      customer,
      items,
      subtotal,
      shippingFee: shippingFee || 0,
      discountAmount: discountAmount || 0,
      totalAmount,
      couponCode: couponCode || '',
      paymentMethod: paymentMethod || 'cod',
      paymentStatus: paymentStatus || (paymentMethod === 'cod' ? 'pending' : 'pending'),
      transactionId: transactionId || ''
    });

    res.status(201).json({
      success: true,
      message: 'Đặt hàng thành công!',
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// [GET] /api/orders - Lấy danh sách toàn bộ đơn hàng
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// [PUT] /api/orders/:orderCode/pay - Cập nhật trạng thái thanh toán đơn hàng (xác nhận chuyển khoản QR thành công)
router.put('/:orderCode/pay', async (req, res) => {
  try {
    const { transactionId } = req.body;
    const order = await Order.findOneAndUpdate(
      { orderCode: req.params.orderCode },
      {
        paymentStatus: 'paid',
        transactionId: transactionId || ('MB' + Date.now())
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
    }

    res.json({ success: true, message: 'Cập nhật thanh toán thành công', order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
