import React, { useState } from 'react';
import { Milk, Phone, Mail, MapPin, ShieldCheck, Heart, Send } from 'lucide-react';

export default function Footer({ onNavigate }) {
    const [emailSub, setEmailSub] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (emailSub) {
            setSubscribed(true);
            setEmailSub('');
            setTimeout(() => setSubscribed(false), 4000);
        }
    };

    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-newsletter">
                    <div className="newsletter-text">
                        <h3>Nhận Ưu Đãi 15% Cho Đơn Hàng Đầu Tiên!</h3>
                        <p>Đăng ký email để nhận mã giảm giá và cẩm nang chăm sóc sức khỏe dinh dưỡng gia đình.</p>
                    </div>
                    <form className="newsletter-form" onSubmit={handleSubscribe}>
                        <input
                            type="email"
                            placeholder="Nhập địa chỉ email của bạn..."
                            value={emailSub}
                            onChange={(e) => setEmailSub(e.target.value)}
                            required
                        />
                        <button type="submit" className="newsletter-btn">
                            <Send size={16} /> Đăng Ký
                        </button>
                    </form>
                    {subscribed && (
                        <p className="newsletter-success">Cảm ơn bạn! Mã giảm giá <strong>FRESHMILK</strong> (15%) đã sẵn sàng dùng.</p>
                    )}
                </div>

                <div className="footer-grid">
                    <div className="footer-col">
                        <div className="footer-logo">
                            <Milk size={26} className="logo-icon" />
                            <span className="brand-name">FreshMilk Mart</span>
                        </div>
                        <p className="footer-about">
                            Thương hiệu sữa sạch hàng đầu Việt Nam. Cam kết 100% sữa tươi nguyên chất từ đàn bò chăn thả tự nhiên, an toàn, chuẩn hữu cơ quốc tế.
                        </p>
                        <div className="footer-certifications">
                            <span className="cert-tag"><ShieldCheck size={14} /> VietGAP</span>
                            <span className="cert-tag"><ShieldCheck size={14} /> ISO 22000</span>
                            <span className="cert-tag"><ShieldCheck size={14} /> Organic USDA</span>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-heading">Danh Mục Sữa</h4>
                        <ul className="footer-links">
                            <li><button onClick={() => onNavigate('products')}>Sữa Tươi Thanh Trùng</button></li>
                            <li><button onClick={() => onNavigate('products')}>Sữa Hạt Dinh Dưỡng</button></li>
                            <li><button onClick={() => onNavigate('products')}>Sữa Chua Lên Men Tự Nhiên</button></li>
                            <li><button onClick={() => onNavigate('products')}>Sữa Công Thức Cho Bé</button></li>
                            <li><button onClick={() => onNavigate('products')}>Sữa Bột Nhập Khẩu</button></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-heading">Hỗ Trợ Khách Hàng</h4>
                        <ul className="footer-links">
                            <li><button onClick={() => onNavigate('about')}>Về Nông Trại FreshMilk</button></li>
                            <li><button onClick={() => onNavigate('cart')}>Chính Sách Đặt Hàng & Giao Nhận</button></li>
                            <li><button onClick={() => onNavigate('about')}>Cam Kết Đổi Trả Trong 24H</button></li>
                            <li><button onClick={() => onNavigate('login')}>Tài Khoản Thành Viên</button></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-heading">Liên Hệ Nhanh</h4>
                        <div className="footer-contact-list">
                            <div className="contact-item">
                                <MapPin size={18} className="contact-icon" />
                                <span>Số 88 Nông Trại Xanh, Mộc Châu, Sơn La & Chi nhánh Q1, TP. HCM</span>
                            </div>
                            <div className="contact-item">
                                <Phone size={18} className="contact-icon" />
                                <span>Hotline: <strong>1900 888 999</strong> (7:00 - 21:00)</span>
                            </div>
                            <div className="contact-item">
                                <Mail size={18} className="contact-icon" />
                                <span>cskh@freshmilkmart.vn</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 FreshMilk Mart. Được thiết kế với <Heart size={14} className="text-pink inline-icon" /> cho sức khỏe mọi gia đình.</p>
                    <div className="payment-badges">
                        <span className="pay-badge">Tiền mặt (COD)</span>
                        <span className="pay-badge">Chuyển khoản QR</span>
                        <span className="pay-badge">Thẻ Visa/Mastercard</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}