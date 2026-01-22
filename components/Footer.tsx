'use client';

import React from 'react';

const Footer = () => {
    const instagramImages = [
        "/assets/img/home-8/gallery-img1-h8.jpg",
        "/assets/img/home-8/gallery-img2-h8.jpg",
        "/assets/img/home-8/gallery-img3-h8.jpg",
        "/assets/img/home-8/gallery-img4-h8.jpg",
        "/assets/img/home-8/gallery-img5-h8.jpg",
        "/assets/img/home-8/gallery-img6-h8.jpg"
    ];

    return (
        <footer className="vs-footer bg-title">
            <div className="vs-footer__top z-index-common space-extra-top space-extra-bottom">
                <img src="/assets/img/footer/footer-element-1.png" alt="Footer Element" className="vs-footer__ele1 wow animate__fadeInLeft" data-wow-delay="0.25s" />
                <img src="/assets/img/footer/footer-element-2.png" alt="Footer Element" className="vs-footer__ele2" />
                <img src="/assets/img/footer/footer-element-3.png" alt="Footer Element" className="vs-footer__ele3 wow animate__fadeInRight" data-wow-delay="0.35s" />
                <div className="vs-balls vs-balls--screen" data-balls-top="-6px" data-balls-color="#ffffff"></div>
                <div className="container">
                    <div className="row gy-4 gx-xxl-5">
                        <div className="col-lg-4 col-md-6 wow animate__fadeInUp" data-wow-delay="0.25s">
                            <div className="vs-footer__widget">
                                <div className="vs-footer__logo text-center text-md-start mb-25">
                                    <a href="/" className="vs-footer__logo-link">
                                        <img src="/assets/img/kumlogo.png" alt="Kumwals Logo" width={150} />
                                    </a>
                                </div>
                                <p className="vs-footer__desc text-center text-md-start">
                                    Kumwals, çocukların hayal güçlerini özgür bıraktıkları, güvenli ve hijyenik bir oyun dünyasıdır.
                                </p>
                                <div className="icon-call justify-content-center justify-content-md-start pt-10 mb-10">
                                    <span className="icon-call__icon"><i className="fa-solid fa-phone-rotary"></i></span>
                                    <div className="icon-call__content">
                                        <span className="icon-call__title">Destek Hattı</span>
                                        <a href="tel:+908503090215" className="icon-call__number">+90 (850) 309 0215</a>
                                    </div>
                                </div>
                                <div className="social-style social-style--version2 w-100 justify-content-center justify-content-md-start pt-25">
                                    <span className="social-style__label">Bizi Takip Edin :</span>
                                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow animate__fadeInUp" data-wow-delay="0.35s">
                            <div className="vs-footer__widget">
                                <h3 className="vs-footer__title">Hızlı Linkler</h3>
                                <div className="vs-footer__menu">
                                    <ul className="vs-footer__menu--list">
                                        <li><a href="/">Anasayfa</a></li>
                                        <li><a href="/hakkimizda">Hakkımızda</a></li>
                                        <li><a href="/atolyeler">Atölyeler</a></li>
                                        <li><a href="/galeri">Galeri</a></li>
                                        <li><a href="/iletisim">İletişim</a></li>
                                    </ul>
                                    <ul className="vs-footer__menu--list">
                                        <li><a href="/subelerimiz">Şubelerimiz</a></li>
                                        <li><a href="#">Franchise</a></li>
                                        <li><a href="#">S.S.S.</a></li>
                                        <li><a href="#">İnsan Kaynakları</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow animate__fadeInUp" data-wow-delay="0.45s">
                            <div className="vs-footer__widget">
                                <h3 className="vs-footer__title">Instagram</h3>
                                <div className="sidebar-gallery">
                                    {instagramImages.map((img, i) => (
                                        <div key={i} className="gallery-thumb">
                                            <img src={img} alt="Gallery Image" className="w-100" style={{ height: '80px', objectFit: 'cover' }} />
                                            <a href={img} className="popup-image gal-btn"><i className="fal fa-plus"></i></a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="vs-footer__bottom bg-theme-color-1">
                <div className="container">
                    <div className="row gy-3 gx-5 align-items-center justify-content-center justify-content-lg-between flex-column-reverse flex-lg-row">
                        <div className="col-md-auto">
                            <p className="vs-footer__copyright mb-0">
                                Copyright © 2026 <a href="/">Kumwals</a>. Tüm Hakları Saklıdır.
                            </p>
                        </div>
                        <div className="col-md-auto">
                            <ul className="vs-footer__bottom--menu">
                                <li><a href="#">Kullanım Şartları</a></li>
                                <li><a href="#">Gizlilik Politikası</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
