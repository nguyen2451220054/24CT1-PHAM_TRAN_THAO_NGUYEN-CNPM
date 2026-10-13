import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Sparkles } from 'lucide-react';

export default function Features() {
    const features = [
        {
            icon: <Truck size={28} className="feature-icon text-blue" />,
            title: 'Giao Lạnh Trong 2H',
            desc: 'Hệ thống xe thùng lạnh chuyên dụng giữ sữa luôn ở mức 2-4°C thơm ngon trọn vị.'
        },
        {
            icon: <ShieldCheck size={28} className="feature-icon text-green" />,
            title: '100% Nguồn Gốc Rõ Ràng',
            desc: 'Chứng nhận Organic, truy xuất nguồn gốc trang trại bò sữa qua mã QR từng lô.'
        },
        {
            icon: <RefreshCw size={28} className="feature-icon text-yellow" />,
            title: 'Đổi Trả Dễ Dàng Trong 24H',
            desc: 'Cam kết hoàn tiền 100% nếu sữa phát sinh lỗi do bảo quản hay vận chuyển.'
        },
        {
            icon: <Sparkles size={28} className="feature-icon text-purple" />,
            title: 'Dinh Dưỡng Chuẩn Quốc Tế',
            desc: 'Giàu Canxi, Protein, Vitamin A, D3 hỗ trợ phát triển chiều cao và sức khỏe.'
        }
    ];

    return (
        <section className="features-section">
            <div className="container">
                <div className="features-grid">
                    {features.map((f, idx) => (
                        <div key={idx} className="feature-card">
                            <div className="feature-icon-wrapper">
                                {f.icon}
                            </div>
                            <h3 className="feature-title">{f.title}</h3>
                            <p className="feature-desc">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}