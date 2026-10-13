import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Lưu phiên đăng nhập người dùng hiện tại
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('milk_user_session');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        try {
            if (user) {
                localStorage.setItem('milk_user_session', JSON.stringify(user));
            } else {
                localStorage.removeItem('milk_user_session');
            }
        } catch (e) {
            console.error(e);
        }
    }, [user]);

    // 1. Đăng nhập: Xác thực tài khoản trực tiếp từ MySQL Database (bảng users)
    const login = async (email, password) => {
        const cleanEmail = email.trim().toLowerCase();

        try {
            const apiRes = await api.login({ email: cleanEmail, password });
            if (apiRes) {
                if (!apiRes.success) {
                    return { success: false, message: apiRes.message };
                }
                setUser(apiRes.user);
                return { success: true, message: `Chào mừng ${apiRes.user.fullName} quay trở lại!` };
            }
        } catch (err) {
            console.warn('Lỗi kết nối MySQL API:', err);
        }

        // Demo fallback khi chưa bật server
        if (cleanEmail === 'demo@freshmilk.com' && password === 'password123') {
            const demoUser = { id: 1, fullName: 'Nguyễn Văn An', email: 'demo@freshmilk.com', role: 'customer' };
            setUser(demoUser);
            return { success: true, message: 'Đăng nhập thành công với tài khoản mẫu!' };
        }

        return { success: false, message: 'Lỗi: Không thể kết nối đến Cơ sở dữ liệu MySQL server (cổng 5000)!' };
    };

    // 2. Đăng ký: Lưu thông tin tài khoản trực tiếp vào MySQL Database (bảng users)
    const register = async ({ fullName, email, phone, password }) => {
        const cleanEmail = email.trim().toLowerCase();

        try {
            const apiRes = await api.register({ fullName, email: cleanEmail, phone, password });
            if (apiRes) {
                if (!apiRes.success) {
                    return { success: false, message: apiRes.message };
                }
                const registeredUser = apiRes.user;
                setUser(registeredUser);
                return {
                    success: true,
                    message: 'Đăng ký tài khoản thành công! Dữ liệu đã được lưu vào MySQL Database (bảng users).'
                };
            }
        } catch (err) {
            console.warn('Lỗi kết nối MySQL API:', err);
        }

        return { success: false, message: 'Lỗi: Không thể kết nối đến Cơ sở dữ liệu MySQL server (cổng 5000)!' };
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn: !!user,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);