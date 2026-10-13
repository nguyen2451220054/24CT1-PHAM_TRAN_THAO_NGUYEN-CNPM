import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import { Filter, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

export default function ProductsPage({ onSelectProduct, searchQuery, setSearchQuery }) {
    const [selectedCat, setSelectedCat] = useState('all');
    const [priceRange, setPriceRange] = useState('all');
    const [sortBy, setSortBy] = useState('default');

    const filteredProducts = useMemo(() => {
        return products.filter(item => {
            const matchCat = selectedCat === 'all' || item.category === selectedCat;
            const matchSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
            let matchPrice = true;
            if (priceRange === 'under40') matchPrice = item.price < 40000;
            else if (priceRange === '40to100') matchPrice = item.price >= 40000 && item.price <= 100000;
            else if (priceRange === 'over100') matchPrice = item.price > 100000;

            return matchCat && matchSearch && matchPrice;
        }).sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            return 0;
        });
    }, [selectedCat, searchQuery, priceRange, sortBy]);

    const resetFilters = () => {
        setSelectedCat('all');
        setPriceRange('all');
        setSortBy('default');
        if (setSearchQuery) setSearchQuery('');
    };

    return (
        <div className="products-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Cửa Hàng Sữa Tươi & Sản Phẩm Dinh Dưỡng</h1>
                    <p className="page-desc">
                        Toàn bộ các dòng sữa thanh trùng organic, sữa hạt dinh dưỡng, sữa chua và sữa công thức cao cấp.
                    </p>
                </div>

                <div className="filter-toolbar">
                    <div className="filter-group">
                        <span className="filter-label"><Filter size={16} /> Danh mục:</span>
                        <div className="filter-chips">
                            {categories.map(c => (
                                <button
                                    key={c.id}
                                    className={`chip ${selectedCat === c.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCat(c.id)}
                                >
                                    {c.icon} {c.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-controls-row">
                        <div className="select-control">
                            <label><SlidersHorizontal size={14} /> Mức giá:</label>
                            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                                <option value="all">Tất cả mức giá</option>
                                <option value="under40">Dưới 40.000₫</option>
                                <option value="40to100">40.000₫ - 100.000₫</option>
                                <option value="over100">Trên 100.000₫</option>
                            </select>
                        </div>

                        <div className="select-control">
                            <label><ArrowUpDown size={14} /> Sắp xếp theo:</label>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="default">Phổ biến nhất</option>
                                <option value="price-asc">Giá: Thấp đến Cao</option>
                                <option value="price-desc">Giá: Cao đến Thấp</option>
                                <option value="rating">Đánh giá cao nhất</option>
                            </select>
                        </div>

                        {(selectedCat !== 'all' || priceRange !== 'all' || sortBy !== 'default' || searchQuery) && (
                            <button className="btn-reset-filters" onClick={resetFilters}>
                                <X size={14} /> Đặt lại bộ lọc
                            </button>
                        )}
                    </div>
                </div>

                <div className="results-count-bar">
                    <p>
                        Tìm thấy <strong>{filteredProducts.length}</strong> sản phẩm sữa
                        {searchQuery && <span> cho từ khóa "<em>{searchQuery}</em>"</span>}
                    </p>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="empty-results-box">
                        <div className="empty-icon">🥛</div>
                        <h3>Không có sản phẩm nào phù hợp!</h3>
                        <p>Vui lòng thử chọn danh mục khác hoặc xóa từ khóa tìm kiếm.</p>
                        <button className="btn btn-primary" onClick={resetFilters}>
                            Xem tất cả sản phẩm
                        </button>
                    </div>
                ) : (
                    <div className="product-grid">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onSelectProduct={onSelectProduct}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}