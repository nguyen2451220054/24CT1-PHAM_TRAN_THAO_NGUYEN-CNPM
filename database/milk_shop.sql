-- ==========================================================
-- Cơ Sở Dữ Liệu MySQL: milk_shop
-- Website Bán Sữa FreshMilk Mart
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `milk_shop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `milk_shop`;

-- ----------------------------------------------------------
-- 1. Bảng `users`: Lưu trữ thông tin tài khoản đăng ký
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `fullName` VARCHAR(255) NOT NULL COMMENT 'Họ và tên người dùng',
  `email` VARCHAR(255) NOT NULL UNIQUE COMMENT 'Địa chỉ email duy nhất',
  `phone` VARCHAR(50) NOT NULL COMMENT 'Số điện thoại',
  `password` VARCHAR(255) NOT NULL COMMENT 'Mật khẩu',
  `address` TEXT NULL COMMENT 'Địa chỉ giao hàng',
  `role` VARCHAR(50) DEFAULT 'customer' COMMENT 'Phân quyền: customer / admin',
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Ngày tạo tài khoản',
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dữ liệu mẫu ban đầu cho bảng users
INSERT INTO `users` (`fullName`, `email`, `phone`, `password`, `address`, `role`) VALUES
('Nguyễn Văn An', 'demo@freshmilk.com', '0987654321', 'password123', '123 Đường Sữa Tươi, Quận 1, TP. Hồ Chí Minh', 'customer')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- ----------------------------------------------------------
-- 2. Bảng `products`: Lưu danh sách các sản phẩm sữa
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `price` INT NOT NULL,
  `originalPrice` INT DEFAULT 0,
  `rating` FLOAT DEFAULT 5.0,
  `reviewsCount` INT DEFAULT 0,
  `volume` VARCHAR(50) DEFAULT '900ml',
  `badge` VARCHAR(50) DEFAULT '',
  `image` TEXT NOT NULL,
  `description` TEXT,
  `ingredients` TEXT,
  `origin` VARCHAR(255),
  `expiry` VARCHAR(100),
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dữ liệu mẫu sản phẩm sữa
INSERT INTO `products` (`name`, `category`, `price`, `originalPrice`, `rating`, `reviewsCount`, `volume`, `badge`, `image`, `description`, `ingredients`, `origin`, `expiry`) VALUES
('Sữa Tươi Thanh Trùng Nguyên Chất 100% Organic', 'fresh', 38000, 45000, 4.9, 142, '900ml', 'Bán chạy', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80', 'Sữa tươi thanh trùng lấy từ đàn bò ăn cỏ tự nhiên tại trang trại Mộc Châu.', '100% Sữa bò tươi nguyên chất tiệt trùng ở nhiệt độ 75-85°C.', 'Mộc Châu, Sơn La', '10 ngày'),
('Sữa Tươi Ít Đường Giàu Canxi & Vitamin D3', 'fresh', 36000, 42000, 4.8, 98, '900ml', 'Mới', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80', 'Công thức giảm 30% đường, tăng cường canxi sinh học giúp xương chắc khỏe.', 'Sữa bò tươi (96%), đường (3.5%), canxi, vitamin D3.', 'Đà Lạt, Lâm Đồng', '12 ngày'),
('Sữa Hạt Hạnh Nhân & Óc Chó Dinh Dưỡng Cao', 'nut', 45000, 52000, 5.0, 86, '1000ml', 'Ưu chuộng', 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?auto=format&fit=crop&w=600&q=80', 'Chiết xuất từ hạt hạnh nhân California và hạt óc chó tự nhiên giàu Omega-3.', 'Dịch chiết hạnh nhân (60%), óc chó (30%), mật dừa.', 'Nguyên liệu Mỹ', '6 tháng'),
('Sữa Chua Uống Men Sống Probiotic Nha Đam', 'yogurt', 28000, 32000, 4.9, 215, '450ml', 'Bán chạy', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80', 'Chứa hàng tỷ lợi khuẩn probiotic sống kết hợp thạch nha đam tươi giòn ngọt.', 'Sữa tươi lên men, thạch nha đam (12%), men vi sinh.', 'Ba Vì', '30 ngày')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- ----------------------------------------------------------
-- 3. Bảng `orders`: Quản lý đơn hàng
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `orderCode` VARCHAR(50) NOT NULL UNIQUE,
  `customerName` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `address` TEXT NOT NULL,
  `note` TEXT,
  `totalAmount` INT NOT NULL,
  `paymentMethod` VARCHAR(20) DEFAULT 'cod',
  `paymentStatus` VARCHAR(20) DEFAULT 'pending',
  `transactionId` VARCHAR(100),
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
