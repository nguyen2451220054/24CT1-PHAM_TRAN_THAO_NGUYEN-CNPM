import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from './models/User.js';
import { Product } from './models/Product.js';
import { Coupon } from './models/Coupon.js';

dotenv.config();

const sampleProducts = [
  {
    name: 'Sữa Tươi Thanh Trùng Nguyên Chất 100% Organic',
    category: 'fresh',
    price: 38000,
    originalPrice: 45000,
    rating: 4.9,
    reviewsCount: 142,
    volume: '900ml',
    badge: 'Bán chạy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    description: 'Sữa tươi thanh trùng lấy từ đàn bò ăn cỏ tự nhiên tại trang trại Mộc Châu, giữ trọn vẹn hương vị béo ngậy và dinh dưỡng tự nhiên.',
    ingredients: '100% Sữa bò tươi nguyên chất tiệt trùng ở nhiệt độ 75-85°C.',
    origin: 'Trang trại FreshFarm Mộc Châu, Sơn La',
    expiry: '10 ngày kể từ NSX (bảo quản lạnh 2-4°C)'
  },
  {
    name: 'Sữa Tươi Ít Đường Giàu Canxi & Vitamin D3',
    category: 'fresh',
    price: 36000,
    originalPrice: 42000,
    rating: 4.8,
    reviewsCount: 98,
    volume: '900ml',
    badge: 'Mới',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80',
    description: 'Công thức giảm 30% đường, tăng cường canxi sinh học giúp xương chắc khỏe và tăng cường đề kháng cho cả gia đình.',
    ingredients: 'Sữa bò tươi (96%), đường tinh luyện (3.5%), canxi carbonate, vitamin D3.',
    origin: 'Đà Lạt, Lâm Đồng',
    expiry: '12 ngày kể từ NSX (bảo quản lạnh 2-4°C)'
  },
  {
    name: 'Sữa Hạt Hạnh Nhân & Óc Chó Dinh Dưỡng Cao',
    category: 'nut',
    price: 45000,
    originalPrice: 52000,
    rating: 5.0,
    reviewsCount: 86,
    volume: '1000ml',
    badge: 'Ưu chuộng',
    image: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?auto=format&fit=crop&w=600&q=80',
    description: 'Chiết xuất từ hạt hạnh nhân California và hạt óc chó tự nhiên, giàu Omega-3, tốt cho tim mạch và phát triển trí não.',
    ingredients: 'Dịch chiết hạnh nhân (60%), dịch chiết óc chó (30%), nước tinh khiết, mật hoa dừa tự nhiên.',
    origin: 'Nguyên liệu nhập khẩu Mỹ, đóng chai chuẩn GMP Việt Nam',
    expiry: '6 tháng kể từ NSX'
  },
  {
    name: 'Sữa Hạt Yến Mạch Hương Vani Thuần Chay',
    category: 'nut',
    price: 42000,
    originalPrice: 48000,
    rating: 4.7,
    reviewsCount: 64,
    volume: '1000ml',
    badge: 'Thuần chay',
    image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80',
    description: 'Sữa yến mạch thơm sánh mịn, không lactose, không gluten, thích hợp cho người ăn chay và người bất dung nạp đường sữa.',
    ingredients: 'Yến mạch hữu cơ (94%), dầu hạt cải ép lạnh, chiết xuất vani tự nhiên, muối biển.',
    origin: 'Châu Âu',
    expiry: '9 tháng kể từ NSX'
  },
  {
    name: 'Sữa Chua Uống Men Sống Probiotic Nha Đam',
    category: 'yogurt',
    price: 28000,
    originalPrice: 32000,
    rating: 4.9,
    reviewsCount: 215,
    volume: '450ml',
    badge: 'Bán chạy',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    description: 'Chứa hàng tỷ lợi khuẩn probiotic sống kết hợp thạch nha đam giòn ngọt, hỗ trợ tiêu hóa vượt trội và làn da tươi tắn.',
    ingredients: 'Sữa tươi lên men, thạch nha đam tươi (12%), men vi sinh Lactobacillus paracasei.',
    origin: 'Trang trại FreshFarm Ba Vì',
    expiry: '30 ngày kể từ NSX (bảo quản lạnh 4-8°C)'
  },
  {
    name: 'Sữa Chua Hy Lạp Greek Yogurt Tự Nhiên Không Đường',
    category: 'yogurt',
    price: 55000,
    originalPrice: 65000,
    rating: 4.8,
    reviewsCount: 110,
    volume: '500g',
    badge: 'Ăn kiêng',
    image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=600&q=80',
    description: 'Sữa chua Hy Lạp sánh đặc như kem, gấp đôi lượng protein, hoàn hảo cho gymer, người theo chế độ Eat Clean và Keto.',
    ingredients: 'Sữa tươi nguyên chất, men sữa chua thuần khiết Bulgaricus & Thermophilus.',
    origin: 'Công nghệ lên men Hy Lạp truyền thống',
    expiry: '25 ngày kể từ NSX (bảo quản lạnh 2-4°C)'
  },
  {
    name: 'Sữa Bột Dinh Dưỡng GrowPlus Cho Bé 1-3 Tuổi',
    category: 'baby',
    price: 385000,
    originalPrice: 420000,
    rating: 4.9,
    reviewsCount: 340,
    volume: '850g',
    badge: 'Mẹ tin dùng',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    description: 'Bổ sung DHA, Choline, HMO và 28 vitamin khoáng chất thiết yếu giúp bé phát triển toàn diện chiều cao và trí tuệ.',
    ingredients: 'Bột sữa tách béo, đạm whey khử khoáng, DHA từ tảo biển, hỗn hợp vitamin (A, C, D, E, B12), canxi, kẽm.',
    origin: 'Nhập khẩu 100% nguyên lon từ New Zealand',
    expiry: '24 tháng kể từ NSX'
  },
  {
    name: 'Sữa Non Colostrum Tăng Cường Miễn Dịch Cho Bé',
    category: 'baby',
    price: 490000,
    originalPrice: 550000,
    rating: 5.0,
    reviewsCount: 178,
    volume: '400g',
    badge: 'Cao cấp',
    image: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?auto=format&fit=crop&w=600&q=80',
    description: 'Chứa kháng thể IgG tự nhiên cao vượt trội thu hoạch trong 24 giờ đầu sau sinh, bảo vệ bé tối đa trước vi khuẩn môi trường.',
    ingredients: '100% Bột sữa non bò cô đặc chứa hàm lượng IgG 20%.',
    origin: 'New Zealand',
    expiry: '36 tháng kể từ NSX'
  }
];

const sampleCoupons = [
  { code: 'FRESHMILK', discount: 15, maxDiscount: 50000, description: 'Giảm 15% cho đơn hàng đầu tiên', isActive: true },
  { code: 'SUASACH', discount: 10, maxDiscount: 30000, description: 'Giảm 10% tối đa 30.000₫', isActive: true },
  { code: 'FREESHIP', discount: 0, freeShip: true, description: 'Miễn phí vận chuyển toàn quốc', isActive: true }
];

const sampleUser = {
  fullName: 'Nguyễn Văn An',
  email: 'demo@freshmilk.com',
  phone: '0987654321',
  password: 'password123',
  address: '123 Đường Sữa Tươi, Quận 1, TP. Hồ Chí Minh',
  role: 'customer'
};

const seedData = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/milk_shop');
    console.log(`Đã kết nối MongoDB: ${conn.connection.host}`);

    // Xóa dữ liệu cũ
    await Product.deleteMany({});
    await Coupon.deleteMany({});
    await User.deleteMany({ email: sampleUser.email });

    // Bơm dữ liệu mới
    await Product.insertMany(sampleProducts);
    await Coupon.insertMany(sampleCoupons);
    await User.create(sampleUser);

    console.log('✅ Đã nạp thành công 8 sản phẩm sữa mẫu vào MongoDB!');
    console.log('✅ Đã nạp 3 mã giảm giá (FRESHMILK, SUASACH, FREESHIP)!');
    console.log('✅ Đã nạp tài khoản demo (demo@freshmilk.com / password123)!');

    process.exit(0);
  } catch (error) {
    console.error(`❌ Lỗi nạp dữ liệu: ${error.message}`);
    process.exit(1);
  }
};

seedData();
