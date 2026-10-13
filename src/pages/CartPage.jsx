import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import {
    Trash2,
    Plus,
    Minus,
    ShoppingBag,
    ArrowLeft,
    Tag,
    Truck,
    ShieldCheck,
    CheckCircle2,
    Banknote,
    QrCode,
    X,
    Loader2,
    CheckCircle
} from 'lucide-react';

// Cấu hình thông tin tài khoản nhận thanh toán
const BANK_CONFIG = {
    bankId: 'MB', // Mã ngân hàng: MB, VCB, ICB, TCB, ACB,...
    accountNo: '0388348428', // Số tài khoản cửa hàng
    accountName: 'PHAM TRAN THAO NGUYEN' // Tên chủ tài khoản không dấu chuẩn VietQR
};

// Hàm sinh mã VietQR tự động tính theo số tiền và mã đơn hàng
const getQrUrl = (amount, orderCode = 'DONHANG') => {
    const cleanName = BANK_CONFIG.accountName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toUpperCase();
    const content = encodeURIComponent(`FreshMilk ${orderCode}`);
    const name = encodeURIComponent(cleanName);
    return `https://img.vietqr.io/image/${BANK_CONFIG.bankId}-${BANK_CONFIG.accountNo}-compact2.png?amount=${amount}&addInfo=${content}&accountName=${name}`;
};

export default function CartPage({ onNavigate }) {
    const {
        cartItems,
        totalItems,
        subtotal,
        shippingFee,
        discountAmount,
        totalAmount,
        appliedCoupon,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon
    } = useCart();

    const { user } = useAuth();

    const [couponInput, setCouponInput] = useState('');
    const [checkoutData, setCheckoutData] = useState({
        fullName: user ? user.fullName : '',
        phone: user ? user.phone : '',
        address: user ? (user.address || '') : '',
        note: '',
        paymentMethod: 'cod'
    });

    const [orderSuccessModal, setOrderSuccessModal] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    const formatPrice = (val) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
    };

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        if (!couponInput.trim()) return;
        applyCoupon(couponInput);
        setCouponInput('');
    };

    const handleCheckoutSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        if (!checkoutData.fullName.trim()) errors.fullName = 'Vui lòng nhập họ tên người nhận!';
        if (!checkoutData.phone.trim()) errors.phone = 'Vui lòng nhập số điện thoại!';
        if (!checkoutData.address.trim()) errors.address = 'Vui lòng nhập địa chỉ nhận sữa!';

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const newOrder = {
            orderId: 'FM' + Math.floor(100000 + Math.random() * 900000),
            items: [...cartItems],
            totalAmount,
            customer: { ...checkoutData },
            date: new Date().toLocaleString('vi-VN'),
            estimatedDelivery: 'Giao lạnh trong 2 giờ tới'
        };

        setOrderSuccessModal(newOrder);
        clearCart();
        setFormErrors({});
    };

    if (cartItems.length === 0 && !orderSuccessModal) {
        return (
            <div className="cart-page empty-cart-view">
                <div className="container">
                    <div className="empty-cart-box">
                        <div className="empty-cart-icon">🥛</div>
                        <h2>Giỏ Hàng Của Bạn Đang Trống</h2>
                        <p>Hãy chọn những chai sữa tươi nguyên chất thơm ngon và bổ dưỡng cho gia đình bạn nhé!</p>
                        <button className="btn btn-primary" onClick={() => onNavigate('products')}>
                            <ShoppingBag size={18} /> Khám Phá Sản Phẩm Ngay
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <div className="cart-header">
                    <button className="back-link" onClick={() => onNavigate('products')}>
                        <ArrowLeft size={16} /> Tiếp tục chọn thêm sữa
                    </button>
                    <h1 className="cart-title">
                        Giỏ Hàng Của Bạn <span className="cart-count">({totalItems} sản phẩm)</span>
                    </h1>
                </div>

                <div className="cart-layout">
                    <div className="cart-items-column">
                        <div className="cart-table-card">
                            <div className="cart-table-header">
                                <span className="col-product">Sản phẩm</span>
                                <span className="col-price">Đơn giá</span>
                                <span className="col-qty">Số lượng</span>
                                <span className="col-total">Thành tiền</span>
                                <span className="col-action"></span>
                            </div>

                            <div className="cart-items-list">
                                {cartItems.map(item => (
                                    <div key={item.id} className="cart-item-row">
                                        <div className="item-product-info">
                                            <img src={item.image} alt={item.name} className="item-img" />
                                            <div>
                                                <h4 className="item-name">{item.name}</h4>
                                                <span className="item-volume">Dung tích: {item.volume}</span>
                                            </div>
                                        </div>

                                        <div className="item-unit-price">
                                            <span>{formatPrice(item.price)}</span>
                                        </div>

                                        <div className="item-quantity-controls">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="qty-btn"><Minus size={14} /></button>
                                            <span className="qty-number">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="qty-btn"><Plus size={14} /></button>
                                        </div>

                                        <div className="item-row-total">
                                            <strong>{formatPrice(item.price * item.quantity)}</strong>
                                        </div>

                                        <div className="item-remove">
                                            <button className="btn-delete-item" onClick={() => removeFromCart(item.id)} title="Xóa khỏi giỏ">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-table-footer">
                                <button className="btn-clear-all" onClick={clearCart}>
                                    <Trash2 size={16} /> Xóa toàn bộ giỏ hàng
                                </button>
                            </div>
                        </div>

                        <div className="checkout-card">
                            <h3 className="checkout-card-title">
                                <Truck size={20} className="text-blue" /> Thông Tin Giao Nhận Sữa Tươi
                            </h3>
                            <form id="checkout-form" onSubmit={handleCheckoutSubmit}>
                                <div className="form-row-2">
                                    <div className="form-group">
                                        <label>Họ và tên người nhận <span className="req">*</span></label>
                                        <input
                                            type="text"
                                            placeholder="VD: Nguyễn Văn A"
                                            value={checkoutData.fullName}
                                            onChange={(e) => setCheckoutData({ ...checkoutData, fullName: e.target.value })}
                                            className={formErrors.fullName ? 'has-error' : ''}
                                        />
                                        {formErrors.fullName && <span className="error-msg">{formErrors.fullName}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>Số điện thoại nhận hàng <span className="req">*</span></label>
                                        <input
                                            type="tel"
                                            placeholder="VD: 0987654321"
                                            value={checkoutData.phone}
                                            onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                                            className={formErrors.phone ? 'has-error' : ''}
                                        />
                                        {formErrors.phone && <span className="error-msg">{formErrors.phone}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Địa chỉ giao hàng chi tiết <span className="req">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                                        value={checkoutData.address}
                                        onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                                        className={formErrors.address ? 'has-error' : ''}
                                    />
                                    {formErrors.address && <span className="error-msg">{formErrors.address}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Ghi chú cho shipper (tuỳ chọn)</label>
                                    <textarea
                                        rows={2}
                                        placeholder="Ví dụ: Gọi trước khi giao, giao trước 11h..."
                                        value={checkoutData.note}
                                        onChange={(e) => setCheckoutData({ ...checkoutData, note: e.target.value })}
                                    />
                                </div>

                                <div className="payment-options">
                                    <label className="payment-label">Hình thức thanh toán:</label>
                                    <div className="payment-methods-grid">
                                        <label className={`payment-method-card ${checkoutData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="cod"
                                                checked={checkoutData.paymentMethod === 'cod'}
                                                onChange={() => setCheckoutData({ ...checkoutData, paymentMethod: 'cod' })}
                                            />
                                            <Banknote size={24} className="method-icon text-green" />
                                            <div>
                                                <strong>Thanh toán khi nhận sữa (COD)</strong>
                                                <p>Kiểm tra sữa mát lạnh rồi mới thanh toán tiền mặt</p>
                                            </div>
                                        </label>

                                        <label className={`payment-method-card ${checkoutData.paymentMethod === 'qr' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="qr"
                                                checked={checkoutData.paymentMethod === 'qr'}
                                                onChange={() => setCheckoutData({ ...checkoutData, paymentMethod: 'qr' })}
                                            />
                                            <QrCode size={24} className="method-icon text-blue" />
                                            <div>
                                                <strong>Quét mã QR Ngân Hàng / Ví MoMo</strong>
                                                <p>Chuyển khoản tức thời, xác nhận đơn hàng tự động</p>
                                            </div>
                                        </label>
                                    </div>

                                    {/* Khung hiển thị mã QR động theo đúng số tiền */}
                                    {checkoutData.paymentMethod === 'qr' && (
                                        <div className="qr-preview-box">
                                            <div className="qr-box-header">
                                                <QrCode size={20} className="text-blue" />
                                                <strong>Mã VietQR Tự Động Theo Đúng Tổng Tiền</strong>
                                            </div>
                                            <p className="qr-hint">
                                                Quét mã bằng bất kỳ App Ngân Hàng hoặc MoMo, hệ thống sẽ tự động điền đúng số tiền <strong>{formatPrice(totalAmount)}</strong>:
                                            </p>
                                            <div className="qr-image-wrap">
                                                <img
                                                    src={getQrUrl(totalAmount, 'THANHTOAN')}
                                                    alt="Mã QR Chuyển Khoản"
                                                    className="vietqr-img"
                                                />
                                            </div>
                                            <div className="qr-bank-details">
                                                <p>Ngân hàng: <strong>MBBank (Ngân hàng Quân Đội)</strong></p>
                                                <p>Số tài khoản: <strong>0388348428</strong></p>
                                                <p>Chủ tài khoản: <strong>PHẠM TRẦN THẢO NGUYÊN</strong></p>
                                                <p>Số tiền chính xác: <strong className="text-primary">{formatPrice(totalAmount)}</strong></p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="cart-summary-column">
                        <div className="summary-card coupon-box">
                            <div className="coupon-header">
                                <Tag size={18} className="text-blue" />
                                <h4>Mã Khuyến Mãi / Voucher</h4>
                            </div>

                            {appliedCoupon ? (
                                <div className="applied-coupon-pill">
                                    <div>
                                        <strong>{appliedCoupon.code}</strong>
                                        <span>{appliedCoupon.description}</span>
                                    </div>
                                    <button onClick={removeCoupon} className="btn-remove-coupon">
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleApplyCoupon} className="coupon-form">
                                    <input
                                        type="text"
                                        placeholder="Nhập mã (VD: FRESHMILK)"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value)}
                                    />
                                    <button type="submit" className="btn-apply-coupon">
                                        Áp dụng
                                    </button>
                                </form>
                            )}


                        </div>

                        <div className="summary-card order-summary">
                            <h3 className="summary-title">Tóm Tắt Đơn Hàng</h3>

                            <div className="summary-row">
                                <span>Tạm tính ({totalItems} món):</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>

                            <div className="summary-row">
                                <span>Phí giao lạnh (2H):</span>
                                <span>
                                    {shippingFee === 0 ? (
                                        <strong className="text-green">Miễn phí (Freeship)</strong>
                                    ) : (
                                        formatPrice(shippingFee)
                                    )}
                                </span>
                            </div>

                            {discountAmount > 0 && (
                                <div className="summary-row text-success">
                                    <span>Giảm giá khuyến mãi:</span>
                                    <span>-{formatPrice(discountAmount)}</span>
                                </div>
                            )}

                            <div className="summary-divider"></div>

                            <div className="summary-row final-total">
                                <span>Tổng cộng:</span>
                                <span className="total-price-large">{formatPrice(totalAmount)}</span>
                            </div>

                            <p className="vat-note">(Đã bao gồm VAT và thùng bảo quản lạnh)</p>

                            <button
                                type="submit"
                                form="checkout-form"
                                className="btn btn-primary btn-checkout-action"
                            >
                                Xác Nhận Đặt Hàng Ngay ({formatPrice(totalAmount)})
                            </button>

                            <div className="summary-guarantee">
                                <ShieldCheck size={18} className="text-green" />
                                <span>Cam kết 100% sữa tươi chuẩn bảo quản 2-4°C</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {orderSuccessModal && (
                <div className="modal-overlay">
                    <div className="modal-content order-success-modal">
                        <div className="success-icon-wrap">
                            <CheckCircle2 size={54} className="text-green" />
                        </div>

                        <h2>Đặt Hàng Thành Công!</h2>
                        <p className="order-id-text">
                            Mã đơn hàng: <strong>#{orderSuccessModal.orderId}</strong>
                        </p>
                        <p className="delivery-timing">
                            Thời gian dự kiến: <strong>{orderSuccessModal.estimatedDelivery}</strong>
                        </p>

                        <div className="order-details-box">
                            <div className="detail-line">
                                <span>Người nhận:</span>
                                <strong>{orderSuccessModal.customer.fullName} ({orderSuccessModal.customer.phone})</strong>
                            </div>
                            <div className="detail-line">
                                <span>Địa chỉ giao:</span>
                                <strong>{orderSuccessModal.customer.address}</strong>
                            </div>
                            <div className="detail-line">
                                <span>Hình thức:</span>
                                <strong>
                                    {orderSuccessModal.customer.paymentMethod === 'cod'
                                        ? 'Thanh toán tiền mặt khi nhận hàng (COD)'
                                        : 'Quét mã QR chuyển khoản ngân hàng'}
                                </strong>
                            </div>
                            <div className="detail-line total-line">
                                <span>Tổng thanh toán:</span>
                                <span className="text-primary font-bold">{formatPrice(orderSuccessModal.totalAmount)}</span>
                            </div>
                        </div>

                        {/* Hiển thị mã QR thanh toán nếu chọn phương thức QR */}
                        {orderSuccessModal.customer.paymentMethod === 'qr' && (
                            <div className="order-qr-section">
                                <h4>Quét mã QR để thanh toán đơn hàng #{orderSuccessModal.orderId}:</h4>
                                <div className="qr-image-wrap modal-qr">
                                    <img
                                        src={getQrUrl(orderSuccessModal.totalAmount, orderSuccessModal.orderId)}
                                        alt="Mã QR Chuyển Khoản"
                                        className="vietqr-img"
                                    />
                                </div>
                                <p className="qr-transfer-note">
                                    Số tiền: <strong>{formatPrice(orderSuccessModal.totalAmount)}</strong> • Nội dung: <strong>FreshMilk {orderSuccessModal.orderId}</strong>
                                </p>
                            </div>
                        )}

                        <div className="modal-success-actions">
                            <button
                                className="btn btn-primary w-full"
                                onClick={() => {
                                    setOrderSuccessModal(null);
                                    onNavigate('home');
                                }}
                            >
                                Quay Về Trang Chủ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}