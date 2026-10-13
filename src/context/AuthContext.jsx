import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext();

const INITIAL_USERS = [
    {
        id: 1,
        fullName: 'Nguyễn Văn An',
        email: 'demo@freshmilk.com',
        phone: '0987654321',
        password: 'password123',
        address: '123 Đường Sữa Tươi, Quận 1, TP. Hồ Chí Minh'
    }
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('milk_user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });

    const [users, setUsers] = useState(() => {
        try {
            const savedUsers = localStorage.getItem('milk_users_list');
            return savedUsers ? JSON.parse(savedUsers) : INITIAL_USERS;
        } catch {
            return INITIAL_USERS;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('milk_users_list', JSON.stringify(users));
        } catch (e) {
            console.error(e);
        }
    }, [users]);

    useEffect(() => {
        try {
            if (user) {
                localStorage.setItem('milk_user', JSON.stringify(user));
            } else {
                localStorage.removeItem('milk_user');
            }
        } catch (e) {
            console.error(e);
        }
    }, [user]);

    // Đăng nhập kết nối MySQL
    const login = async (email, password) => {
        const cleanEmail = email.trim().toLowerCase();

        // 1. Thử xác thực với Backend MySQL
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
            console.warn('Lỗi kết nối MySQL server, kiểm tra tạm localStorage:', err);
        }

        // 2. Fallback nếu server chưa bật
        const found = users.find(u => u.email.toLowerCase() === cleanEmail);
        if (!found) {
            return { success: false, message: 'Email này chưa được đăng ký tài khoản!' };
        }
        if (found.password !== password) {
            return { success: false, message: 'Mật khẩu không chính xác, vui lòng thử lại!' };
        }

        const { password: _, ...userData } = found;
        setUser(userData);
        return { success: true, message: `Chào mừng ${userData.fullName} quay trở lại!` };
    };

    // Đăng ký tài khoản kết nối MySQL
    const register = async ({ fullName, email, phone, password }) => {
        const cleanEmail = email.trim().toLowerCase();

        // 1. Gửi lên Backend để lưu trực tiếp vào cơ sở dữ liệu MySQL
        try {
            const apiRes = await api.register({ fullName, email: cleanEmail, phone, password });
            if (apiRes) {
                if (!apiRes.success) {
                    return { success: false, message: apiRes.message };
                }
                const registeredUser = apiRes.user;
                setUser(registeredUser);
                setUsers(prev => [...prev, registeredUser]);
                return {
                    success: true,
                    message: 'Đăng ký tài khoản thành công! Dữ liệu đã được lưu vào MySQL.'
                };
            }
        } catch (err) {
            console.warn('Lỗi kết nối MySQL server, lưu tạm vào localStorage:', err);
        }

        // 2. Fallback nếu server chưa bật
        const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
        if (existing) {
            return { success: false, message: 'Email này đã được sử dụng. Vui lòng đăng nhập hoặc dùng email khác!' };
        }

        const newUser = {
            id: Date.now(),
            fullName: fullName.trim(),
            email: cleanEmail,
            phone: phone.trim(),
            password,
            address: ''
        };

        setUsers(prev => [...prev, newUser]);
        const { password: _, ...userData } = newUser;
        setUser(userData);
        return { success: true, message: 'Đăng ký tài khoản thành công!' };
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