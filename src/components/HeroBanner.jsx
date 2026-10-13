import React from 'react';
import { ArrowRight, ShieldCheck, Heart, Award } from 'lucide-react';

export default function HeroBanner({ onExplore, onAbout }) {
    return (
        <section className="hero-banner">
            <div className="container hero-container">
                <div className="hero-content">
                    <div className="hero-pill">
                        <Award size={16} className="text-yellow" />
                        <span>Top 1 Thương Hiệu Sữa Tươi Hữu Cơ 2026</span>
                    </div>
                    <h1 className="hero-title">
                        Dưỡng Chất Thuần Khiết Cho Cả Gia Đình
                    </h1>
                    <p className="hero-subtitle">
                        100% Sữa tươi nguyên chất thu hoạch từ đàn bò ăn cỏ tự nhiên trên cao nguyên xanh mát. Giữ trọn hương vị béo bùi, giàu canxi và vitamin tự nhiên.
                    </p>

                    <div className="hero-cta-group">
                        <button className="btn btn-primary" onClick={onExplore}>
                            Khám Phá Sản Phẩm <ArrowRight size={18} />
                        </button>
                        <button className="btn btn-outline" onClick={onAbout}>
                            Câu Chuyện Nông Trại
                        </button>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">Organic Tự Nhiên</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">2 Giờ</span>
                            <span className="stat-label">Giao Lạnh Tươi Mới</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">50k+</span>
                            <span className="stat-label">Khách Hàng Hài Lòng</span>
                        </div>
                    </div>
                </div>

                <div className="hero-image-wrapper">
                    <div className="hero-image-card">
                        <img
                            src="https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80"
                            alt="Ly sữa tươi nguyên chất"
                            className="hero-main-img"
                        />
                        <div className="floating-badge badge-fresh">
                            <Heart size={20} className="text-pink" />
                            <div>
                                <strong>Tươi Ngon 24/7</strong>
                                <p>Khử trùng công nghệ cao</p>
                            </div>
                        </div>
                        <div className="floating-badge badge-guarantee">
                            <ShieldCheck size={20} className="text-green" />
                            <div>
                                <strong>Chuẩn VietGAP</strong>
                                <p>Không hormone tăng trưởng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}