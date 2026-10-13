// API Client kết nối Frontend React với Backend MongoDB (Express server trên cổng 5000)
const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // 1. Sản phẩm
  getProducts: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE_URL}/products?${query}`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      return data.products;
    } catch {
      return null; // Fallback khi server chưa bật
    }
  },

  // 2. Tài khoản: Đăng ký
  register: async (userData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  // 3. Tài khoản: Đăng nhập
  login: async (credentials) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  // 4. Đơn hàng: Tạo đơn mới
  createOrder: async (orderData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  // 5. Cập nhật trạng thái thanh toán QR
  confirmPayment: async (orderCode, transactionId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${orderCode}/pay`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId })
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  // 6. Kiểm tra mã giảm giá
  applyCoupon: async (code) => {
    try {
      const res = await fetch(`${API_BASE_URL}/coupons/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      return await res.json();
    } catch {
      return null;
    }
  }
};
