'use client';

import React from 'react';

interface BreadcrumbProps {
    title: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title }) => {
    return (
        <div className="breadcrumb-wrapper vs-breadcrumb-wrapper z-index-common overflow-hidden" style={{ position: 'relative' }}>
            {/* Top Wave Decoration */}
            <div className="vs-balls vs-balls--screen" data-balls-top="-6px" data-balls-color="#ffffff" style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1 }}></div>

            <div className="breadcrumb-wrapper__bg wow animate__fadeInUp" data-wow-delay="0.15s">
                <img src="/assets/img/bg/breadcrumb-bg-2.jpg" alt="breadcrumb bg" />
            </div>
            <div className="container breadcumb-content">
                <div className="breadcrumb-wrapper__content wow animate__fadeInUp" data-wow-delay="0.45s">
                    <h1 className="breadcrumb-wrapper__title">{title}</h1>
                    <div className="breadcrumb-wrapper__menu--wrap">
                        <ul className="breadcrumb-wrapper__menu">
                            <li className="breadcrumb-wrapper__menu--item"><a href="/">Anasayfa</a></li>
                            <li className="breadcrumb-wrapper__menu--item">{title}</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Wave Decoration */}
            <div className="vs-balls vs-balls--screen" data-balls-bottom="-6px" data-balls-color="#ffffff"></div>
        </div>
    );
};

export default Breadcrumb;
