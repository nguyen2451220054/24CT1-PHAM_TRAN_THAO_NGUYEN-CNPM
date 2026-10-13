import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Mail, Lock, Eye, EyeOff, LogIn, Milk, AlertCircle, Sparkles } from 'lucide-react';

export default function LoginPage({ onNavigate }) {
    const { login } = useAuth();
    const { showToast } = useCart();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!email.trim() || !password) {
            setErrorMsg('Vui lòng nhập đầy đủ Email và Mật khẩu!');
            return;
        }

        setLoading(true);
        setTimeout(async () => {
            const res = await login(email, password);
            setLoading(false);

            if (res.success) {
                showToast(res.message, 'success');
                onNavigate('home');
            } else {
                setErrorMsg(res.message);
            }
        }, 300);
    };

    const handleFillDemo = () => {
        setEmail('demo@freshmilk.com');
        setPassword('password123');
        setErrorMsg('');
    };

    return (
        <div className="auth-page">
            <div className="container auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-icon-wrap">
                            <Milk size={32} className="text-blue" />
                        </div>
                        <h2>Đăng Nhập Thành Viên</h2>
                        <p>Chào mừng bạn trở lại với thiên đường sữa tươi FreshMilk Mart</p>
                    </div>

                    {errorMsg && (
                        <div className="auth-error-alert">
                            <AlertCircle size={18} />
                            <span>{errorMsg}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Địa chỉ Email <span className="req">*</span></label>
                            <div className="input-with-icon">
                                <Mail size={18} className="field-icon" />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="label-with-link">
                                <label>Mật khẩu <span className="req">*</span></label>
                            </div>
                            <div className="input-with-icon">
                                <Lock size={18} className="field-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Nhập mật khẩu của bạn"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-pwd-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="form-extras">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span>Ghi nhớ đăng nhập</span>
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary auth-submit-btn" disabled={loading}>
                            <LogIn size={18} /> {loading ? 'Đang xác thực...' : 'Đăng Nhập Ngay'}
                        </button>
                    </form>

                    <div className="demo-login-box">
                        <button type="button" className="btn-demo-fill" onClick={handleFillDemo}>
                            <Sparkles size={16} /> Điền tài khoản Demo mẫu
                        </button>
                        <p className="demo-hint">(demo@freshmilk.com / password123)</p>
                    </div>

                    <div className="auth-footer-switch">
                        <p>
                            Bạn chưa có tài khoản?{' '}
                            <button className="link-button" onClick={() => onNavigate('register')}>
                                Đăng ký ngay tại đây
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}