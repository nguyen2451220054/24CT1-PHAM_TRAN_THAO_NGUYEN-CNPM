import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import {
    ShoppingCart,
    User,
    Search,
    Menu,
    X,
    LogOut,
    PhoneCall,
    Sparkles,
    Milk
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, searchQuery, setSearchQuery }) {
    const { totalItems } = useCart();
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    const handleNav = (tab) => {
        setActiveTab(tab);
        setMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLogout = () => {
        logout();
        setUserDropdownOpen(false);
    };

    return (
        <header className="site-header">
            <div className="topbar">
                <div className="container topbar-content">
                    <div className="topbar-left">
                        <span className="topbar-badge"><Sparkles size={14} /> ƯU ĐÃI HÔM NAY</span>
                        <span>Miễn phí giao hàng 2h cho đơn từ 200.000₫ • Mã: <strong>FREESHIP</strong></span>
                    </div>
                    <div className="topbar-right">
                        <a href="tel:1900888999" className="topbar-link">
                            <PhoneCall size={14} /> Hotline: 1900 888 999
                        </a>
                        <span className="topbar-divider">|</span>
                        <span>Trang trại Organic chuẩn VietGAP</span>
                    </div>
                </div>
            </div>

            <nav className="main-nav">
                <div className="container nav-content">
                    <div className="logo-wrapper" onClick={() => handleNav('home')}>
                        <div className="logo-icon-bg">
                            <Milk size={28} className="logo-icon" />
                        </div>
                        <div className="logo-text">
                            <span className="brand-name">FreshMilk<span className="brand-dot">.</span></span>
                            <span className="brand-tagline">Sữa Sạch Tự Nhiên</span>
                        </div>
                    </div>

                    <div className="search-bar">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Tìm sữa tươi, sữa hạt, sữa chua..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                if (activeTab !== 'products' && activeTab !== 'home') {
                                    setActiveTab('products');
                                }
                            }}
                        />
                        {searchQuery && (
                            <button className="clear-search" onClick={() => setSearchQuery('')}>
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    <div className="desktop-links">
                        <button
                            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                            onClick={() => handleNav('home')}
                        >
                            Trang Chủ
                        </button>
                        <button
                            className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
                            onClick={() => handleNav('products')}
                        >
                            Sản Phẩm
                        </button>
                        <button
                            className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                            onClick={() => handleNav('about')}
                        >
                            Giới Thiệu
                        </button>
                    </div>

                    <div className="nav-actions">
                        {user ? (
                            <div className="user-menu-container">
                                <button
                                    className="user-btn logged-in"
                                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                >
                                    <div className="user-avatar">{user.fullName.charAt(0)}</div>
                                    <span className="user-greeting">{user.fullName}</span>
                                </button>

                                {userDropdownOpen && (
                                    <div className="user-dropdown-menu">
                                        <div className="dropdown-user-info">
                                            <p className="user-name">{user.fullName}</p>
                                            <p className="user-email">{user.email}</p>
                                        </div>
                                        <hr />
                                        <button className="dropdown-item" onClick={() => { setActiveTab('cart'); setUserDropdownOpen(false); }}>
                                            Đơn hàng & Giỏ hàng
                                        </button>
                                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                                            <LogOut size={16} /> Đăng Xuất
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="auth-buttons">
                                <button
                                    className="auth-btn login-btn"
                                    onClick={() => handleNav('login')}
                                >
                                    <User size={16} /> Đăng Nhập
                                </button>
                                <button
                                    className="auth-btn register-btn"
                                    onClick={() => handleNav('register')}
                                >
                                    Đăng Ký
                                </button>
                            </div>
                        )}

                        <button
                            className={`cart-btn ${activeTab === 'cart' ? 'active' : ''}`}
                            onClick={() => handleNav('cart')}
                            title="Xem giỏ hàng"
                        >
                            <ShoppingCart size={22} />
                            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                        </button>

                        <button
                            className="mobile-menu-btn"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="mobile-menu">
                        <div className="mobile-search">
                            <Search size={16} />
                            <input
                                type="text"
                                placeholder="Tìm sản phẩm sữa..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className={`mobile-nav-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleNav('home')}>Trang Chủ</button>
                        <button className={`mobile-nav-link ${activeTab === 'products' ? 'active' : ''}`} onClick={() => handleNav('products')}>Danh Mục Sản Phẩm</button>
                        <button className={`mobile-nav-link ${activeTab === 'about' ? 'active' : ''}`} onClick={() => handleNav('about')}>Về Chúng Tôi (Giới Thiệu)</button>
                        <button className={`mobile-nav-link ${activeTab === 'cart' ? 'active' : ''}`} onClick={() => handleNav('cart')}>Giỏ Hàng ({totalItems})</button>

                        <div className="mobile-auth">
                            {user ? (
                                <div>
                                    <p className="mobile-user-name">Đã đăng nhập: <strong>{user.fullName}</strong></p>
                                    <button className="auth-btn logout-btn w-full" onClick={handleLogout}>
                                        <LogOut size={16} /> Đăng Xuất
                                    </button>
                                </div>
                            ) : (
                                <div className="mobile-auth-grid">
                                    <button className="auth-btn login-btn" onClick={() => handleNav('login')}>Đăng Nhập</button>
                                    <button className="auth-btn register-btn" onClick={() => handleNav('register')}>Đăng Ký</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}