import React, { createContext, useContext, useState, useEffect } from 'react';
import { coupons } from '../data/products';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem('milk_cart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);

    useEffect(() => {
        try {
            localStorage.setItem('milk_cart', JSON.stringify(cartItems));
        } catch (err) {
            console.error('Lỗi lưu giỏ hàng:', err);
        }
    }, [cartItems]);

    const showToast = (message, type = 'success') => {
        setToastMessage({ message, type, id: Date.now() });
        setTimeout(() => {
            setToastMessage(null);
        }, 3000);
    };

    const addToCart = (product, quantity = 1) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
        showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
        showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
    };

    const updateQuantity = (productId, delta) => {
        setCartItems(prev =>
            prev.map(item => {
                if (item.id === productId) {
                    const newQty = item.quantity + delta;
                    return newQty > 0 ? { ...item, quantity: newQty } : null;
                }
                return item;
            }).filter(Boolean)
        );
    };

    const clearCart = () => {
        setCartItems([]);
        setAppliedCoupon(null);
        setCouponCode('');
    };

    const applyCoupon = (code) => {
        const clean = code.trim().toUpperCase();
        const found = coupons.find(c => c.code === clean);
        if (found) {
            setAppliedCoupon(found);
            showToast(`Áp dụng mã ${clean} thành công!`);
            return { success: true, message: 'Áp dụng mã thành công' };
        } else {
            showToast('Mã giảm giá không hợp lệ', 'error');
            return { success: false, message: 'Mã giảm giá không hợp lệ. Thử: FRESHMILK, SUASACH hoặc FREESHIP' };
        }
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
        setCouponCode('');
        showToast('Đã hủy mã giảm giá', 'info');
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    let shippingFee = subtotal > 200000 || (appliedCoupon && appliedCoupon.freeShip) ? 0 : (subtotal > 0 ? 25000 : 0);

    let discountAmount = 0;
    if (appliedCoupon && appliedCoupon.discount > 0) {
        const rawDiscount = (subtotal * appliedCoupon.discount) / 100;
        discountAmount = appliedCoupon.maxDiscount ? Math.min(rawDiscount, appliedCoupon.maxDiscount) : rawDiscount;
    }

    const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                totalItems,
                subtotal,
                shippingFee,
                discountAmount,
                totalAmount,
                appliedCoupon,
                couponCode,
                setCouponCode,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                applyCoupon,
                removeCoupon,
                toastMessage,
                showToast
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);