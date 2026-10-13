import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Mail, Lock, User, Phone, Eye, EyeOff, UserPlus, Milk, AlertCircle } from 'lucide-react';

export default function RegisterPage({ onNavigate }) {
    const { register } = useAuth();
    const { showToast } = useCart();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg('');

        const { fullName, email, phone, password, confirmPassword } = formData;

        if (!fullName.trim() || !email.trim() || !phone.trim() || !password) {
            setErrorMsg('Vui lòng điền đầy đủ tất cả các trường thông tin!');
            return;
        }

        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        if (!phoneRegex.test(phone)) {
            setErrorMsg('Số điện thoại không đúng định dạng (Ví dụ: 0987654321)!');
            return;
        }

        if (password.length < 6) {
            setErrorMsg('Mật khẩu phải chứa ít nhất 6 ký tự!');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMsg('Mật khẩu xác nhận không khớp, vui lòng kiểm tra lại!');
            return;
        }

        if (!agreeTerms) {
            setErrorMsg('Bạn cần đồng ý với Điều khoản dịch vụ và chính sách của FreshMilk!');
            return;
        }

        setLoading(true);
        setTimeout(async () => {
            const res = await register({ fullName, email, phone, password });
            setLoading(false);

            if (res.success) {
                showToast(res.message || 'Chúc mừng bạn đã đăng ký tài khoản thành công!');
                onNavigate('home');
            } else {
                setErrorMsg(res.message);
            }
        }, 300);
    };

    return (
        <div className="auth-page">
            <div className="container auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-icon-wrap">
                            <Milk size={32} className="text-blue" />
                        </div>
                        <h2>Đăng Ký Thành Viên</h2>
                        <p>Trở thành thành viên FreshMilk Mart để nhận nhiều ưu đãi độc quyền</p>
                    </div>

                    {errorMsg && (
                        <div className="auth-error-alert">
                            <AlertCircle size={18} />
                            <span>{errorMsg}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Họ và tên của bạn <span className="req">*</span></label>
                            <div className="input-with-icon">
                                <User size={18} className="field-icon" />
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="VD: Trần Thị Mai"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row-2">
                            <div className="form-group">
                                <label>Địa chỉ Email <span className="req">*</span></label>
                                <div className="input-with-icon">
                                    <Mail size={18} className="field-icon" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="email@vidu.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Số điện thoại <span className="req">*</span></label>
                                <div className="input-with-icon">
                                    <Phone size={18} className="field-icon" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="0987654321"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-row-2">
                            <div className="form-group">
                                <label>Mật khẩu <span className="req">*</span></label>
                                <div className="input-with-icon">
                                    <Lock size={18} className="field-icon" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Tối thiểu 6 ký tự"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Xác nhận mật khẩu <span className="req">*</span></label>
                                <div className="input-with-icon">
                                    <Lock size={18} className="field-icon" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        placeholder="Nhập lại mật khẩu"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
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
                        </div>

                        <div className="form-extras">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                />
                                <span>Tôi đồng ý với Điều khoản dịch vụ và chính sách của FreshMilk</span>
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary auth-submit-btn" disabled={loading}>
                            <UserPlus size={18} /> {loading ? 'Đang tạo tài khoản...' : 'Tạo Tài Khoản Ngay'}
                        </button>
                    </form>

                    <div className="auth-footer-switch">
                        <p>
                            Đã có tài khoản thành viên?{' '}
                            <button className="link-button" onClick={() => onNavigate('login')}>
                                Đăng nhập ngay
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}