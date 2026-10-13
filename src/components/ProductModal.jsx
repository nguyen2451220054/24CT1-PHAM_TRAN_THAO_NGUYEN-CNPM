import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Star, ShoppingCart, ShieldCheck, Check, Plus, Minus, MapPin, Calendar, Layers } from 'lucide-react';

export default function ProductModal({ product, onClose }) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    if (!product) return null;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAdded(true);
        setTimeout(() => {
            setAdded(false);
            onClose();
        }, 1200);
    };

    const formatPrice = (val) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content product-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <X size={22} />
                </button>

                <div className="modal-grid">
                    <div className="modal-image-col">
                        <img src={product.image} alt={product.name} />
                    </div>

                    <div className="modal-details-col">
                        <div className="modal-badges">
                            {product.badge && <span className="product-badge badge-primary">{product.badge}</span>}
                            <span className="product-badge badge-organic">100% Tự Nhiên</span>
                        </div>

                        <h2 className="modal-title">{product.name}</h2>

                        <div className="modal-rating">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className={`star-icon ${i < Math.floor(product.rating) ? 'fill-gold' : ''}`} />
                                ))}
                            </div>
                            <span className="rating-num">{product.rating} / 5</span>
                            <span className="reviews-text">({product.reviewsCount} khách hàng đánh giá)</span>
                        </div>

                        <div className="modal-price-box">
                            <span className="modal-price">{formatPrice(product.price)}</span>
                            {product.originalPrice && (
                                <span className="modal-original-price">{formatPrice(product.originalPrice)}</span>
                            )}
                            <span className="modal-volume-tag">Quy cách: {product.volume}</span>
                        </div>

                        <p className="modal-desc">{product.description}</p>

                        <div className="modal-specs">
                            <div className="spec-row">
                                <Layers size={16} className="spec-icon" />
                                <span><strong>Thành phần:</strong> {product.ingredients}</span>
                            </div>
                            <div className="spec-row">
                                <MapPin size={16} className="spec-icon" />
                                <span><strong>Xuất xứ:</strong> {product.origin}</span>
                            </div>
                            <div className="spec-row">
                                <Calendar size={16} className="spec-icon" />
                                <span><strong>Hạn sử dụng:</strong> {product.expiry}</span>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <div className="quantity-selector">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    disabled={quantity <= 1}
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="quantity-display">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)}>
                                    <Plus size={16} />
                                </button>
                            </div>

                            <button
                                className={`btn btn-primary add-modal-btn ${added ? 'btn-added' : ''}`}
                                onClick={handleAddToCart}
                            >
                                {added ? (
                                    <>
                                        <Check size={18} /> Đã thêm vào giỏ!
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={18} /> Thêm Vào Giỏ ({formatPrice(product.price * quantity)})
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="modal-guarantee-note">
                            <ShieldCheck size={16} className="text-green" />
                            <span>Giao lạnh 2h giữ nguyên độ tươi ngon • Hoàn tiền nếu sản phẩm hỏng</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}