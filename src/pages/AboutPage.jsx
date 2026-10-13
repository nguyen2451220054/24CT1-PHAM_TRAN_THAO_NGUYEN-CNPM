import React, { useState } from 'react';
import { ShieldCheck, Award, CheckCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export default function AboutPage({ onNavigate }) {
    const [openFaq, setOpenFaq] = useState(0);

    const faqs = [
        {
            q: 'Sữa tươi thanh trùng khác gì so với sữa tiệt trùng thông thường?',
            a: 'Sữa thanh trùng chỉ được xử lý nhiệt ở mức 75-85°C trong khoảng 15-30 giây, sau đó làm lạnh đột ngột xuống 2-4°C. Nhờ đó, hầu hết các vitamin, khoáng chất, men vi sinh và hương vị thơm ngậy tự nhiên được giữ lại gần như nguyên vẹn.'
        },
        {
            q: 'Hạn sử dụng và cách bảo quản sữa FreshMilk như thế nào?',
            a: 'Vì hoàn toàn không chứa chất bảo quản, sữa thanh trùng FreshMilk có hạn sử dụng 10-12 ngày kể từ ngày sản xuất và BẮT BUỘC phải được bảo quản liên tục trong ngăn mát tủ lạnh ở nhiệt độ từ 2°C đến 4°C. Sau khi mở nắp, nên dùng hết trong 48 giờ.'
        },
        {
            q: 'Đơn hàng được giao lạnh tới tay khách hàng như thế nào?',
            a: 'FreshMilk sở hữu đội ngũ giao nhận trang bị thùng giữ nhiệt chuyên dụng với đá gel lạnh đạt chuẩn, đảm bảo nhiệt độ của sữa luôn ổn định từ kho lạnh tới tận tay khách hàng trong vòng 2 giờ.'
        },
        {
            q: 'Nếu sản phẩm bị hỏng trong quá trình vận chuyển thì xử lý ra sao?',
            a: 'Chúng tôi cam kết đổi mới sản phẩm miễn phí hoặc hoàn tiền 100% trong vòng 24 giờ nếu sữa bị vỡ, rò rỉ hoặc suy giảm chất lượng trong quá trình bảo quản và giao nhận.'
        }
    ];

    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="container">
                    <div className="about-hero-content">
                        <span className="about-badge"><Sparkles size={16} /> CÂU CHUYỆN THƯƠNG HIỆU</span>
                        <h1>Từ Đồng Cỏ Xanh Đến Ly Sữa Mát Lành Mỗi Sớm</h1>
                        <p>
                            FreshMilk Mart ra đời từ khát khao mang nguồn sữa tươi thanh trùng chuẩn quốc tế, nguyên bản và an lành nhất đến cho mọi gia đình Việt Nam.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section about-values">
                <div className="container">
                    <div className="about-grid-2">
                        <div className="about-img-box">
                            <img
                                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80"
                                alt="Trang trại bò sữa xanh mát"
                            />
                            <div className="about-experience-card">
                                <span className="exp-num">12+</span>
                                <span className="exp-text">Năm phát triển nông nghiệp hữu cơ</span>
                            </div>
                        </div>

                        <div className="about-text-box">
                            <span className="sub-title">SỨ MỆNH CỦA CHÚNG TÔI</span>
                            <h2>Bảo Tồn Dưỡng Chất Thuần Khiết Từ Thiên Nhiên</h2>
                            <p>
                                Tại FreshMilk, chúng tôi tin rằng ly sữa ngon nhất là ly sữa giữ được trọn vẹn sự tự nhiên. Đàn bò sữa của chúng tôi được chăn thả tự do trên những cánh đồng cỏ không phân hóa học tại Mộc Châu và Đà Lạt, tắm nắng sớm và uống nguồn nước ngầm thanh lọc.
                            </p>

                            <ul className="about-checklist">
                                <li>
                                    <CheckCircle size={20} className="check-icon text-green" />
                                    <span><strong>Không chất bảo quản:</strong> 100% tinh khiết, không thêm bất kỳ phụ gia hóa chất nào.</span>
                                </li>
                                <li>
                                    <CheckCircle size={20} className="check-icon text-green" />
                                    <span><strong>Không hormone tăng trưởng:</strong> Bò được chăm sóc nhân đạo, phát triển tự nhiên.</span>
                                </li>
                                <li>
                                    <CheckCircle size={20} className="check-icon text-green" />
                                    <span><strong>Không tồn dư kháng sinh:</strong> Quy trình kiểm tra mẫu sữa 3 tầng nghiêm ngặt trước khi đóng chai.</span>
                                </li>
                            </ul>

                            <button className="btn btn-primary" onClick={() => onNavigate('products')}>
                                Khám Phá Sản Phẩm Của Chúng Tôi
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section process-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge"><Award size={16} /> TIÊU CHUẨN CHÂU ÂU</span>
                        <h2 className="section-title">Quy Trình Khép Kín Từ Trang Trại Đến Bàn Ăn</h2>
                        <p className="section-subtitle">Mỗi giọt sữa đều trải qua hành trình kiểm soát nghiêm ngặt nhất.</p>
                    </div>

                    <div className="process-steps">
                        <div className="step-card">
                            <div className="step-number">01</div>
                            <h3>Trang Trại Xanh</h3>
                            <p>Đàn bò được tuyển chọn giống thuần chủng, ăn cỏ voi tươi và nghe nhạc thư giãn kích thích tiết sữa tự nhiên.</p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">02</div>
                            <h3>Vắt Sữa Chân Không</h3>
                            <p>Hệ thống vắt sữa tự động khép kín hoàn toàn tiệt trùng, sữa đi thẳng vào bồn làm lạnh 4°C trong 10 giây.</p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">03</div>
                            <h3>Thanh Trùng 75°C</h3>
                            <p>Công nghệ thanh trùng nhiệt độ thấp giữ nguyên 99% kháng thể sinh học, canxi và enzyme tiêu hóa có lợi.</p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">04</div>
                            <h3>Giao Lạnh Tức Thì</h3>
                            <p>Vận chuyển bằng xe lạnh chuyên dụng, phân phối tới tận tay người tiêu dùng chỉ trong vòng 2 giờ.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section certifications-section">
                <div className="container">
                    <div className="cert-card-wrapper">
                        <h3 className="cert-title">Chứng Nhận Chất Lượng Quốc Tế</h3>
                        <div className="cert-logos">
                            <div className="cert-box">
                                <ShieldCheck size={36} className="text-green" />
                                <h4>VietGAP</h4>
                                <p>Thực hành nông nghiệp sạch Việt Nam</p>
                            </div>
                            <div className="cert-box">
                                <ShieldCheck size={36} className="text-blue" />
                                <h4>ISO 22000:2018</h4>
                                <p>Hệ thống an toàn thực phẩm quốc tế</p>
                            </div>
                            <div className="cert-box">
                                <ShieldCheck size={36} className="text-yellow" />
                                <h4>HACCP Certified</h4>
                                <p>Kiểm soát mối nguy an toàn thực phẩm</p>
                            </div>
                            <div className="cert-box">
                                <ShieldCheck size={36} className="text-purple" />
                                <h4>Organic USDA</h4>
                                <p>Tiêu chuẩn hữu cơ của Bộ Nông nghiệp Hoa Kỳ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section faq-section">
                <div className="container faq-container">
                    <div className="section-header">
                        <h2 className="section-title">Câu Hỏi Thường Gặp Về Sữa Tươi</h2>
                        <p className="section-subtitle">Giải đáp các thắc mắc về cách sử dụng và bảo quản sữa thanh trùng.</p>
                    </div>

                    <div className="faq-list">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className={`faq-item ${openFaq === idx ? 'open' : ''}`}
                                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                            >
                                <div className="faq-question">
                                    <span>{faq.q}</span>
                                    {openFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                                {openFaq === idx && (
                                    <div className="faq-answer">
                                        <p>{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}