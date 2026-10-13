export const categories = [
    { id: 'all', name: 'Tất cả sản phẩm', icon: '🥛' },
    { id: 'fresh', name: 'Sữa tươi thanh trùng', icon: '🌱' },
    { id: 'nut', name: 'Sữa hạt dinh dưỡng', icon: '🥜' },
    { id: 'yogurt', name: 'Sữa chua lên men', icon: '🥣' },
    { id: 'baby', name: 'Sữa công thức cho bé', icon: '🍼' }
];


export const products = [
    {
        id: 1,
        name: 'Sữa Tươi Thanh Trùng Nguyên Chất 100% Organic',
        category: 'fresh',
        price: 38000,
        originalPrice: 45000,
        rating: 4.9,
        reviewsCount: 142,
        volume: '900ml',
        badge: 'Bán chạy',
        image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/Sua_dau_nanh_de_tu_lanh_qua_dem_duoc_khong_Cropped_0adf82629d.jpg',
        description: 'Sữa tươi thanh trùng lấy từ đàn bò ăn cỏ tự nhiên tại trang trại Mộc Châu, giữ trọn vẹn hương vị béo ngậy và dinh dưỡng tự nhiên.',
        ingredients: '100% Sữa bò tươi nguyên chất tiệt trùng ở nhiệt độ 75-85°C.',
        origin: 'Trang trại FreshFarm Mộc Châu, Sơn La',
        expiry: '10 ngày kể từ NSX (bảo quản lạnh 2-4°C)'
    },


    {
        id: 2,
        name: 'Sữa Tươi Ít Đường Giàu Canxi & Vitamin D3',
        category: 'fresh',
        price: 36000,
        originalPrice: 42000,
        rating: 4.8,
        reviewsCount: 98,
        volume: '900ml',
        badge: 'Mới',
        image: 'https://giadinh.mediacdn.vn/zoom/740_463/2014/sua-1415150748431.jpg',
        description: 'Công thức giảm 30% đường, tăng cường canxi sinh học giúp xương chắc khỏe và tăng cường đề kháng cho cả gia đình.',
        ingredients: 'Sữa bò tươi (96%), đường tinh luyện (3.5%), canxi carbonate, vitamin D3.',
        origin: 'Đà Lạt, Lâm Đồng',
        expiry: '12 ngày kể từ NSX (bảo quản lạnh 2-4°C)'
    },
    {
        id: 3,
        name: 'Sữa Hạt Hạnh Nhân & Óc Chó Dinh Dưỡng Cao',
        category: 'nut',
        price: 45000,
        originalPrice: 52000,
        rating: 5.0,
        reviewsCount: 86,
        volume: '1000ml',
        badge: 'Ưu chuộng',
        image: 'https://rapido.vn/wp-content/uploads/2022/02/sua-hanh-nhan-oc-cho-dau-den-4.jpg',
        description: 'Chiết xuất từ hạt hạnh nhân California và hạt óc chó tự nhiên, giàu Omega-3, tốt cho tim mạch và phát triển trí não.',
        ingredients: 'Dịch chiết hạnh nhân (60%), dịch chiết óc chó (30%), nước tinh khiết, mật hoa dừa tự nhiên.',
        origin: 'Nguyên liệu nhập khẩu Mỹ, đóng chai chuẩn GMP Việt Nam',
        expiry: '6 tháng kể từ NSX'
    },
    {
        id: 4,
        name: 'Sữa Hạt Yến Mạch Hương Vani Thuần Chay',
        category: 'nut',
        price: 42000,
        originalPrice: 48000,
        rating: 4.7,
        reviewsCount: 64,
        volume: '1000ml',
        badge: 'Thuần chay',
        image: 'https://file.hstatic.net/200000700229/article/lam-sua-hat-yen-mach-thumb_236cf26e0ab948caac5ca34758724d68.jpg',
        description: 'Sữa yến mạch thơm sánh mịn, không lactose, không gluten, thích hợp cho người ăn chay và người bất dung nạp đường sữa.',
        ingredients: 'Yến mạch hữu cơ (94%), dầu hạt cải ép lạnh, chiết xuất vani tự nhiên, muối biển.',
        origin: 'Châu Âu',
        expiry: '9 tháng kể từ NSX'
    },
    {
        id: 5,
        name: 'Sữa Chua Uống Men Sống Probiotic Nha Đam',
        category: 'yogurt',
        price: 28000,
        originalPrice: 32000,
        rating: 4.9,
        reviewsCount: 215,
        volume: '450ml',
        badge: 'Bán chạy',
        image: 'https://www.huongnghiepaau.com/wp-content/uploads/2019/01/sua-chua-cai-la-gi.jpg',
        description: 'Chứa hàng tỷ lợi khuẩn probiotic sống kết hợp thạch nha đam giòn ngọt, hỗ trợ tiêu hóa vượt trội và làn da tươi tắn.',
        ingredients: 'Sữa tươi lên men, thạch nha đam tươi (12%), men vi sinh Lactobacillus paracasei.',
        origin: 'Trang trại FreshFarm Ba Vì',
        expiry: '30 ngày kể từ NSX (bảo quản lạnh 4-8°C)'
    },
    {
        id: 6,
        name: 'Sữa Chua Hy Lạp Greek Yogurt Tự Nhiên Không Đường',
        category: 'yogurt',
        price: 55000,
        originalPrice: 65000,
        rating: 4.8,
        reviewsCount: 110,
        volume: '500g',
        badge: 'Ăn kiêng',
        image: 'https://cdn.hachihachi.com.vn/Uploads/_6/Blog/Amthuc/Greek-yogurt.jpg',
        description: 'Sữa chua Hy Lạp sánh đặc như kem, gấp đôi lượng protein, hoàn hảo cho gymer, người theo chế độ Eat Clean và Keto.',
        ingredients: 'Sữa tươi nguyên chất, men sữa chua thuần khiết Bulgaricus & Thermophilus.',
        origin: 'Công nghệ lên men Hy Lạp truyền thống',
        expiry: '25 ngày kể từ NSX (bảo quản lạnh 2-4°C)'
    },
    {
        id: 7,
        name: 'Sữa Bột Dinh Dưỡng Cho Bé ',
        category: 'baby',
        price: 385000,
        originalPrice: 420000,
        rating: 4.9,
        reviewsCount: 340,
        volume: '850g',
        badge: 'Mẹ tin dùng',
        image: 'https://cdn.tgdd.vn/Files/2019/12/02/1224113/sua-gay-la-gi-sua-gay-co-tot-khong-201912030938014699.jpg',
        description: 'Bổ sung DHA, Choline, HMO và 28 vitamin khoáng chất thiết yếu giúp bé phát triển toàn diện chiều cao và trí tuệ.',
        ingredients: 'Bột sữa tách béo, đạm whey khử khoáng, DHA từ tảo biển, hỗn hợp vitamin (A, C, D, E, B12), canxi, kẽm.',
        origin: 'Nhập khẩu 100% nguyên lon từ New Zealand',
        expiry: '24 tháng kể từ NSX'
    },
    {
        id: 8,
        name: 'Sữa Non Colostrum Tăng Cường Miễn Dịch Cho Bé',
        category: 'baby',
        price: 490000,
        originalPrice: 550000,
        rating: 5.0,
        reviewsCount: 178,
        volume: '400g',
        badge: 'Cao cấp',
        image: 'https://intechvietnam.com/uploads/noidung/images/baiviet/nguyen-lieu-san-xuat-sua-bot.jpg',
        description: 'Chứa kháng thể IgG tự nhiên cao vượt trội thu hoạch trong 24 giờ đầu sau sinh, bảo vệ bé tối đa trước vi khuẩn môi trường.',
        ingredients: '100% Bột sữa non bò cô đặc chứa hàm lượng IgG 20%.',
        origin: 'New Zealand',
        expiry: '36 tháng kể từ NSX'
    }
];

export const coupons = [
    { code: 'FRESHMILK', discount: 15, maxDiscount: 50000, description: 'Giảm 15% cho đơn hàng đầu tiên' },
    { code: 'SUASACH', discount: 10, maxDiscount: 30000, description: 'Giảm 10% tối đa 30.000₫' },
    { code: 'FREESHIP', discount: 0, freeShip: true, description: 'Miễn phí vận chuyển toàn quốc' }
];