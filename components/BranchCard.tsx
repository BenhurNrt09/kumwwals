'use client';

import { useState } from 'react';

interface BranchCardProps {
    branch: {
        id: string;
        name: string;
        address: string;
        phone?: string | null;
        email?: string | null;
        imageUrl?: string | null;
        logoUrl?: string | null;
        city: string;
    };
    index: number;
}

const MALL_LOGOS: Record<string, string> = {
    'izmirpark': '/assets/img/malls/izmirpark.png',
    'westpark': '/assets/img/malls/westpark.png',
    'optimum': '/assets/img/malls/optimum.png',
    'hilltown': '/assets/img/malls/hilltown.png',
    'forum bornova': '/assets/img/malls/forum_bornova.png',
    'bornova': '/assets/img/malls/forum_bornova.png',
    'park bornova': '/assets/img/malls/parkbornova.png',
    'lovelet': '/assets/img/malls/lovelet.png',
    'park 23': '/assets/img/malls/park23.jpg',
    'park23': '/assets/img/malls/park23.jpg',
    'van mall': '/assets/img/malls/vanmall.png',
    'vanmall': '/assets/img/malls/vanmall.png',
};

export default function BranchCard({ branch, index }: BranchCardProps) {
    const [imgSrc, setImgSrc] = useState(branch.imageUrl || '/assets/img/kumlogo.jpeg');

    // Identify mall from name or address
    const getMallInfo = () => {
        // If logo is manually uploaded in admin, use it
        if (branch.logoUrl) {
            return {
                name: branch.name,
                logo: branch.logoUrl
            };
        }

        const fullText = (branch.name + ' ' + branch.address).toLowerCase();
        for (const [key, logo] of Object.entries(MALL_LOGOS)) {
            if (fullText.includes(key)) {
                return {
                    name: key.toUpperCase(),
                    logo: logo
                };
            }
        }
        return {
            name: branch.name,
            logo: '/assets/img/kumlogo.jpeg'
        };
    };

    const mallInfo = getMallInfo();
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address + ' ' + branch.city + ' ' + branch.name)}`;

    return (
        <div className="col-lg-6 mb-40 wow animate__fadeInUp" data-wow-delay={`${0.2 + index * 0.1}s`}>
            <div className="vs-branch-card bg-white shadow-sm border-radius-20 overflow-hidden h-100" style={{ border: '1px solid #eee' }}>
                <div className="row g-0">
                    <div className="col-md-5">
                        <div style={{ height: '100%', minHeight: '250px', overflow: 'hidden', position: 'relative' }}>
                            <img
                                src={imgSrc}
                                alt={branch.name}
                                className="w-100 h-100"
                                style={{ objectFit: 'cover' }}
                                onError={() => setImgSrc('/assets/img/kumlogo.jpeg')}
                            />
                            {/* Mall Logo Overlay */}
                            <div style={{
                                position: 'absolute',
                                top: '15px',
                                left: '15px',
                                background: 'white',
                                padding: '5px',
                                borderRadius: '10px',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                                width: '60px',
                                height: '60px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img
                                    src={mallInfo.logo}
                                    alt={mallInfo.name}
                                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="p-4 d-flex flex-column h-100" style={{ backgroundColor: '#fff' }}>
                            {/* Mall Name as Subtitle/Title */}
                            <span className="small fw-bold text-uppercase mb-1" style={{ color: '#7B2CBF', letterSpacing: '1px' }}>
                                {mallInfo.name}
                            </span>
                            <h3 className="h4 mb-3" style={{ color: '#333', fontWeight: '800' }}>{branch.name}</h3>

                            <div className="mb-3">
                                <div className="d-flex align-items-start mb-2">
                                    <i className="fas fa-map-marker-alt me-2 mt-1" style={{ color: '#7B2CBF' }}></i>
                                    <p className="mb-0 text-muted small">{branch.address}</p>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <i className="fas fa-phone-alt me-2" style={{ color: '#7B2CBF' }}></i>
                                    <a
                                        href={`tel:${branch.phone?.replace(/\s+/g, '') || '+908503090215'}`}
                                        className="text-muted small text-decoration-none"
                                    >
                                        {branch.phone || '+90 (850) 309 0215'}
                                    </a>
                                </div>
                                {branch.email && (
                                    <div className="d-flex align-items-center mb-2">
                                        <i className="fas fa-envelope me-2" style={{ color: '#7B2CBF' }}></i>
                                        <a
                                            href={`mailto:${branch.email}`}
                                            className="text-muted small text-decoration-none"
                                        >
                                            {branch.email}
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div className="mt-auto">
                                <a
                                    href={mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="vs-btn style4 w-100"
                                >
                                    <span className="vs-btn__border"></span>
                                    YOL TARİFİ
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
