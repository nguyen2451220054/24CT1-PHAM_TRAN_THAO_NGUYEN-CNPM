import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testMySQLConnection } from './config/mysql.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import couponRoutes from './routes/couponRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Kết nối Cơ sở dữ liệu MySQL
testMySQLConnection();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🥛 FreshMilk Mart API Server đang chạy với Cơ sở dữ liệu MySQL!',
    database: 'MySQL (XAMPP) - Database: milk_shop - Bảng: users',
    endpoints: {
      auth: '/api/auth',
      registerUser: 'POST /api/auth/register',
      loginUser: 'POST /api/auth/login',
      listUsers: 'GET /api/auth/users',
      products: '/api/products',
      orders: '/api/orders',
      coupons: '/api/coupons'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server FreshMilk Mart đang chạy tại: http://localhost:${PORT}`);
});
