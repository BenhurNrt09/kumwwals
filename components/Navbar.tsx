'use client';

import React from 'react';
import MobileMenu from './MobileMenu';

const Navbar = () => {
    return (
        <>
            <header className="vs-header">
                <MobileMenu />
                <div className="vs-balls"></div>
                <div className="vs-header__top">
                    <div className="container container--custom">
                        <div className="row align-items-center justify-content-between gy-1 text-center text-lg-start">
                            <div className="col-lg-auto d-none d-lg-block">
                                <div className="d-flex align-items-center flex-wrap gap-4">
                                    <div className="vs-header__info">
                                        <i className="fa-solid fa-phone-volume"></i>
                                        <span> Telefon : <a href="tel:+908503090215">+90 (850) 309 0215</a></span>
                                    </div>
                                    <div className="vs-header__info">
                                        <i className="fa-solid fa-clock-rotate-left"></i>
                                        <span className="text-theme-color5">
                                            Açılış Saati :
                                            <a href="#">09:30 - 22:00</a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-auto">
                                <div className="social-style">
                                    <span className="social-style__label">Bizi Takip Edin :</span>
                                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sticky-wrapper">
                    <div className="sticky-active">
                        <div className="container container--custom">
                            <div className="row justify-content-between align-items-center">
                                <div className="col">
                                    <div className="vs-header__logo">
                                        <a href="/">
                                            <img src="/assets/img/kumlogo.jpeg" alt="Kumwals" className="logo" width={220} />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <nav className="main-menu d-none d-lg-block">
                                        <ul>
                                            <li><a href="/">ANASAYFA</a></li>
                                            <li><a href="/hakkimizda">HAKKIMIZDA</a></li>
                                            <li><a href="/atolyeler">ATÖLYELER</a></li>
                                            <li><a href="/subelerimiz">ŞUBELERİMİZ</a></li>
                                            <li><a href="/galeri">GALERİ</a></li>
                                            <li><a href="/iletisim">İLETİŞİM</a></li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="col-auto">
                                    <div className="vs-header__action">
                                        <div className="d-none d-xxl-inline-flex">
                                            <a href="/iletisim" className="vs-btn">
                                                <span className="vs-btn__border"></span>BİZE ULAŞIN
                                            </a>
                                        </div>
                                        <button className="vs-menu-toggle style2 d-inline-block d-lg-none" style={{ backgroundColor: '#7B2CBF', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '10px' }}>
                                            <i className="fal fa-bars"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Wave/Bubble Decoration Below Header - Visible on All Pages */}

        </>
    );
};

export default Navbar;

