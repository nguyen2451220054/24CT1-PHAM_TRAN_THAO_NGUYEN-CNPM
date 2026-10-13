import React, { useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import Features from '../components/Features';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import { Sparkles, ArrowRight, Star, Users } from 'lucide-react';

export default function HomePage({ onSelectProduct, onNavigate, searchQuery }) {
    const [selectedCat, setSelectedCat] = useState('all');

    const filteredProducts = products.filter(p => {
        const matchCategory = selectedCat === 'all' || p.category === selectedCat;
        const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <div className="home-page">
            <HeroBanner
                onExplore={() => onNavigate('products')}
                onAbout={() => onNavigate('about')}
            />

            <Features />

            <section className="section section-products">
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">
                            <Sparkles size={16} /> DINH DƯỠNG MỖI NGÀY
                        </div>
                        <h2 className="section-title">Khám Phá Các Dòng Sữa Tươi Sạch</h2>
                        <p className="section-subtitle">
                            Đầy đủ các loại sữa tươi thanh trùng, sữa hạt dinh dưỡng nguyên chất và sữa chua thơm ngon dành cho mọi lứa tuổi.
                        </p>
                    </div>

                    <div className="category-tabs">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`category-tab-btn ${selectedCat === cat.id ? 'active' : ''}`}
                                onClick={() => setSelectedCat(cat.id)}
                            >
                                <span className="cat-icon">{cat.icon}</span>
                                <span className="cat-name">{cat.name}</span>
                            </button>
                        ))}
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="empty-results">
                            <p>Không tìm thấy sản phẩm sữa nào khớp với tìm kiếm của bạn.</p>
                            <button className="btn btn-primary" onClick={() => setSelectedCat('all')}>
                                Xem tất cả sản phẩm
                            </button>
                        </div>
                    ) : (
                        <div className="product-grid">
                            {filteredProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onSelectProduct={onSelectProduct}
                                />
                            ))}
                        </div>
                    )}

                    <div className="section-footer-cta">
                        <button className="btn btn-secondary" onClick={() => onNavigate('products')}>
                            Xem Thêm Tất Cả Sản Phẩm Sữa <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </section>

            <section className="promo-banner-section">
                <div className="container">
                    <div className="promo-card">
                        <div className="promo-text">
                            <span className="promo-tag">Ưu Đãi Đặc Biệt Trong Tuần</span>
                            <h2>Tặng Ngay 2 Lốc Sữa Chua Khi Đặt Đơn Từ 400.000₫</h2>
                            <p>Áp dụng tự động khi thanh toán. Cung cấp hàng tỷ lợi khuẩn men sống Probiotic cho cả gia đình.</p>
                            <div className="promo-actions">
                                <button className="btn btn-white" onClick={() => onNavigate('products')}>
                                    Mua Ngay Nhận Quà
                                </button>
                                <span className="promo-code-hint">Nhập mã: <strong>FRESHMILK</strong> (Giảm thêm 15%)</span>
                            </div>
                        </div>
                        <div className="promo-img-wrapper">
                            <img
                                src="https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=500&q=80"
                                alt="Khuyến mãi sữa chua"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="testimonials-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge"><Users size={16} /> 50.000+ KHÁCH HÀNG TIN CHỌN</div>
                        <h2 className="section-title">Khách Hàng Nói Gì Về FreshMilk?</h2>
                    </div>

                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <div className="testimonial-stars">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-gold star-icon" />)}
                            </div>
                            <p className="testimonial-content">
                                "Sữa tươi thanh trùng của FreshMilk rất thơm béo, ngậy tự nhiên mà không hề bị gắt đường. Bé nhà mình kén sữa mà chuyển sang loại này uống hết veo mỗi ngày!"
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">TM</div>
                                <div>
                                    <strong>Chị Thảo My</strong>
                                    <span>Mẹ bỉm sữa tại Cầu Giấy, Hà Nội</span>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-stars">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-gold star-icon" />)}
                            </div>
                            <p className="testimonial-content">
                                "Dịch vụ giao hàng 2h giữ thùng lạnh siêu đỉnh! Sữa tới tay còn mát rượi, hạn dùng mới toanh. Dòng sữa hạt óc chó hạnh nhân uống rất thích hợp cho người ăn kiêng như mình."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">HL</div>
                                <div>
                                    <strong>Anh Hoàng Long</strong>
                                    <span>Huấn luyện viên Gym, Q.7 TP.HCM</span>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-stars">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-gold star-icon" />)}
                            </div>
                            <p className="testimonial-content">
                                "Cả nhà tôi dùng sữa FreshMilk hơn 2 năm nay rồi. Nguồn gốc trang trại Mộc Châu rõ ràng, kiểm nghiệm chuẩn an toàn thực phẩm nên tôi hoàn toàn yên tâm."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">HT</div>
                                <div>
                                    <strong> Hữu Tuấn</strong>
                                    <span>Cán bộ hưu trí, Đà Nẵng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}