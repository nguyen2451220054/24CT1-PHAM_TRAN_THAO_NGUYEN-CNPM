import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import ProductModal from './components/ProductModal';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import './App.css';

function MainApp() {
    const [activeTab, setActiveTab] = useState('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleNavigate = (tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="app-container">
            <Toast />

            <Navbar
                activeTab={activeTab}
                setActiveTab={handleNavigate}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <main className="main-content">
                {activeTab === 'home' && (
                    <HomePage
                        onSelectProduct={setSelectedProduct}
                        onNavigate={handleNavigate}
                        searchQuery={searchQuery}
                    />
                )}

                {activeTab === 'products' && (
                    <ProductsPage
                        onSelectProduct={setSelectedProduct}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                )}

                {activeTab === 'about' && (
                    <AboutPage
                        onNavigate={handleNavigate}
                    />
                )}

                {activeTab === 'cart' && (
                    <CartPage
                        onNavigate={handleNavigate}
                    />
                )}

                {activeTab === 'login' && (
                    <LoginPage
                        onNavigate={handleNavigate}
                    />
                )}

                {activeTab === 'register' && (
                    <RegisterPage
                        onNavigate={handleNavigate}
                    />
                )}
            </main>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}

            <Footer onNavigate={handleNavigate} />
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <MainApp />
            </CartProvider>
        </AuthProvider>
    );
}