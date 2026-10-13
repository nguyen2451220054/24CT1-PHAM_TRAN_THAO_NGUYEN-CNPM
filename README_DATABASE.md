# Hướng Dẫn Cơ Sở Dữ Liệu MongoDB (MERN Stack) - FreshMilk Mart

Website bán sữa **FreshMilk Mart** đã được trang bị hệ thống Backend và Cơ sở dữ liệu **MongoDB (Mongoose)** hoàn chỉnh.

---

## 1. Cấu Trúc Các Bảng (Collections) trong MongoDB

Hệ thống bao gồm 4 bảng dữ liệu chính:

### 1. `users` (Tài khoản người dùng)
* `fullName`: Họ và tên
* `email`: Địa chỉ email (duy nhất)
* `phone`: Số điện thoại
* `password`: Mật khẩu
* `address`: Địa chỉ giao hàng mặc định
* `role`: Phân quyền (`customer` hoặc `admin`)
* `createdAt`, `updatedAt`: Thời gian tạo

### 2. `products` (Danh sách sản phẩm sữa)
* `name`: Tên sản phẩm sữa
* `category`: Phân loại (`fresh`: Sữa tươi, `nut`: Sữa hạt, `yogurt`: Sữa chua, `baby`: Sữa cho bé)
* `price`: Giá bán hiện tại (VNĐ)
* `originalPrice`: Giá gốc trước khi giảm (VNĐ)
* `rating`: Đánh giá trung bình (1 - 5 sao)
* `reviewsCount`: Số lượt đánh giá
* `volume`: Quy cách đóng gói (900ml, 1000ml, 500g...)
* `badge`: Nhãn nổi bật ('Bán chạy', 'Mới', 'Organic'...)
* `image`: Link ảnh sản phẩm sắc nét
* `description`: Mô tả chi tiết
* `ingredients`: Thành phần dinh dưỡng
* `origin`: Xuất xứ trang trại
* `expiry`: Hạn sử dụng và điều kiện bảo quản lạnh

### 3. `orders` (Quản lý đơn hàng)
* `orderCode`: Mã đơn hàng tự sinh (VD: `FM849201`)
* `customer`: Thông tin người nhận (Họ tên, SĐT, Địa chỉ, Ghi chú)
* `items`: Danh sách các loại sữa đã đặt (Tên, số lượng, đơn giá, ảnh)
* `subtotal`: Tạm tính tiền hàng
* `shippingFee`: Phí vận chuyển giao lạnh
* `discountAmount`: Số tiền giảm giá từ Voucher
* `totalAmount`: Tổng tiền thực tế cần thanh toán
* `paymentMethod`: Hình thức thanh toán (`cod` hoặc `qr`)
* `paymentStatus`: Trạng thái thanh toán (`pending`: Chờ thanh toán, `paid`: Đã thanh toán)
* `transactionId`: Mã giao dịch ngân hàng (VD: `MB74920184`)
* `orderStatus`: Trạng thái giao hàng (`processing`, `shipping`, `completed`)

### 4. `coupons` (Mã giảm giá)
* `code`: Tên mã voucher (`FRESHMILK`, `SUASACH`, `FREESHIP`)
* `discount`: Phần trăm giảm (%)
* `maxDiscount`: Số tiền giảm tối đa (VNĐ)
* `freeShip`: Miễn phí giao hàng (true/false)

---

## 2. Các Lệnh Khởi Chạy

Tại thư mục `E:\DAU\KI 1 NAM 3\CÔNG NGHỆ PHẦN MỀM\UNGDUNG`:

### Bước 1: Nạp dữ liệu mẫu vào MongoDB (Chỉ cần chạy 1 lần)
```powershell
npm run seed
```
*(Lệnh này sẽ tự động nạp 8 sản phẩm sữa, 3 mã voucher và tài khoản demo vào MongoDB)*

### Bước 2: Chạy Server Backend (MongoDB API)
```powershell
npm run server
```
Server sẽ chạy tại: **`http://localhost:5000`**

### Bước 3: Chạy Giao Diện Web Frontend (React)
Mở một cửa sổ Terminal khác và gõ:
```powershell
npm run dev
```
Trình duyệt web sẽ mở tại: **`http://localhost:5173`**
