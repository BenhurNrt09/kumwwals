'use client';

import { useState, useEffect } from 'react';

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Add click handler to hamburger button
        const handleToggle = () => setIsOpen(prev => !prev);
        const button = document.querySelector('.vs-menu-toggle');

        if (button) {
            button.addEventListener('click', handleToggle);
        }

        // Update body overflow
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            if (button) {
                button.removeEventListener('click', handleToggle);
            }
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const closeMenu = () => setIsOpen(false);

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                onClick={closeMenu}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.5)',
                    zIndex: 99998,
                }}
            />

            {/* Mobile Menu Panel */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '280px',
                    height: '100vh',
                    background: '#7B2CBF',
                    zIndex: 99999,
                    overflowY: 'auto',
                    boxShadow: '2px 0 10px rgba(0,0,0,0.3)',
                    animation: 'slideIn 0.3s ease',
                }}
            >
                <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <img src="/assets/img/kumlogo.jpeg" alt="Kumwals" width={120} />
                        <button
                            onClick={closeMenu}
                            style={{
                                background: '#ffffff',
                                color: '#7B2CBF',
                                border: 'none',
                                width: '35px',
                                height: '35px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <i className="fal fa-times"></i>
                        </button>
                    </div>
                    <nav>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ marginBottom: '15px' }}>
                                <a href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 600, fontSize: '16px', display: 'block', padding: '10px 0' }}>ANASAYFA</a>
                            </li>
                            <li style={{ marginBottom: '15px' }}>
                                <a href="/hakkimizda" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 600, fontSize: '16px', display: 'block', padding: '10px 0' }}>HAKKIMIZDA</a>
                            </li>
                            <li style={{ marginBottom: '15px' }}>
                                <a href="/atolyeler" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 600, fontSize: '16px', display: 'block', padding: '10px 0' }}>ATÖLYELER</a>
                            </li>
                            <li style={{ marginBottom: '15px' }}>
                                <a href="/subelerimiz" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 600, fontSize: '16px', display: 'block', padding: '10px 0' }}>ŞUBELERİMİZ</a>
                            </li>
                            <li style={{ marginBottom: '15px' }}>
                                <a href="/galeri" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 600, fontSize: '16px', display: 'block', padding: '10px 0' }}>GALERİ</a>
                            </li>
                            <li style={{ marginBottom: '15px' }}>
                                <a href="/iletisim" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 600, fontSize: '16px', display: 'block', padding: '10px 0' }}>İLETİŞİM</a>
                            </li>
                        </ul>
                    </nav>
                    <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                        <div style={{ marginBottom: '15px' }}>
                            <i className="fa-solid fa-phone-volume" style={{ color: '#FFD700', marginRight: '10px' }}></i>
                            <a href="tel:+908503090215" style={{ color: '#ffffff', textDecoration: 'none' }}>+90 (850) 309 0215</a>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                            <a href="#" style={{ color: '#FFD700', fontSize: '20px' }}><i className="fab fa-facebook-f"></i></a>
                            <a href="#" style={{ color: '#FFD700', fontSize: '20px' }}><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(-100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }
            `}</style>
        </>
    );
}
