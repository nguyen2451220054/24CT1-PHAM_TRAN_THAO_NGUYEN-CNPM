import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Star, Eye, Check } from 'lucide-react';

export default function ProductCard({ product, onSelectProduct }) {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = (e) => {
        e.stopPropagation();
        addToCart(product, 1);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
    };

    const formatPrice = (val) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
    };

    const discountPercent = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="product-card" onClick={() => onSelectProduct(product)}>
            <div className="product-badges">
                {product.badge && <span className="product-badge badge-primary">{product.badge}</span>}
                {discountPercent > 0 && <span className="product-badge badge-discount">-{discountPercent}%</span>}
            </div>

            <div className="product-img-wrap">
                <img src={product.image} alt={product.name} loading="lazy" />
                <button
                    className="quick-view-btn"
                    onClick={(e) => { e.stopPropagation(); onSelectProduct(product); }}
                    title="Xem chi tiết"
                >
                    <Eye size={18} /> Xem nhanh
                </button>
            </div>

            <div className="product-info">
                <div className="product-meta">
                    <span className="product-volume">{product.volume}</span>
                    <div className="product-rating">
                        <Star size={14} className="star-icon fill-gold" />
                        <span>{product.rating}</span>
                        <span className="reviews-count">({product.reviewsCount})</span>
                    </div>
                </div>

                <h3 className="product-title" title={product.name}>
                    {product.name}
                </h3>

                <p className="product-snippet">{product.description}</p>

                <div className="product-footer">
                    <div className="product-pricing">
                        <span className="current-price">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                            <span className="original-price">{formatPrice(product.originalPrice)}</span>
                        )}
                    </div>

                    <button
                        className={`add-to-cart-btn ${isAdded ? 'btn-added' : ''}`}
                        onClick={handleAdd}
                        title="Thêm vào giỏ"
                    >
                        {isAdded ? (
                            <>
                                <Check size={16} /> Đã thêm
                            </>
                        ) : (
                            <>
                                <ShoppingCart size={16} /> Mua ngay
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}