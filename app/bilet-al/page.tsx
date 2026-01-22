'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateScripts from '@/components/TemplateScripts';
import Breadcrumb from '@/components/Breadcrumb';
import { Loader2, MapPin, Phone, CreditCard, User, Users, ChevronRight, ChevronLeft, CheckCircle2, Plus, Minus } from 'lucide-react';

interface Branch {
    id: string;
    name: string;
    address: string;
    phone: string;
    city: string;
    imageUrl?: string | null;
    isActive: boolean;
}

export default function BiletAl() {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1);
    const [isFlipped, setIsFlipped] = useState(false);

    // Form State
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
    const [formData, setFormData] = useState({
        fullName: '',
        numPeople: 1,
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const res = await fetch('/api/branches');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setBranches(data.filter(b => b.isActive));
                }
            } catch (error) {
                console.error('Error fetching branches:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBranches();
    }, []);

    const getPricePerPerson = (branch: Branch) => {
        const name = branch.name.toLowerCase();
        const city = branch.city.toLowerCase();

        if (name.includes('izmirpark') || name.includes('bornova') || city.includes('izmir')) {
            return 500;
        }
        if (city.includes('elazığ') || city.includes('van') || city.includes('samsun') ||
            name.includes('elazığ') || name.includes('van') || name.includes('samsun')) {
            return 400;
        }
        return 400; // Default
    };

    const totalPrice = selectedBranch ? getPricePerPerson(selectedBranch) * formData.numPeople : 0;

    const handleNext = () => setStep(prev => prev + 1);
    const handlePrev = () => setStep(prev => prev - 1);

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    const renderStep1 = () => (
        <div className="row mt-4">
            {branches.map((branch) => (
                <div key={branch.id} className="col-lg-4 col-md-6 mb-30">
                    <div
                        onClick={() => {
                            setSelectedBranch(branch);
                            handleNext();
                        }}
                        className={`branch-card p-4 h-100 ${selectedBranch?.id === branch.id ? 'active' : ''}`}
                        style={{
                            cursor: 'pointer',
                            borderRadius: '25px',
                            border: selectedBranch?.id === branch.id ? '3px solid #7B2CBF' : '1px solid #eee',
                            backgroundColor: selectedBranch?.id === branch.id ? '#F9F6FF' : '#fff',
                            transition: 'all 0.3s ease',
                            boxShadow: selectedBranch?.id === branch.id ? '0 10px 30px rgba(123, 44, 191, 0.2)' : '0 5px 15px rgba(0,0,0,0.05)'
                        }}
                    >
                        <div className="branch-image mb-4" style={{ height: '200px', borderRadius: '15px', overflow: 'hidden' }}>
                            <img
                                src={branch.imageUrl || '/assets/img/kumlogo.jpeg'}
                                alt={branch.name}
                                className="w-100 h-100"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <h3 className="h5 mb-3 fw-bold" style={{ color: selectedBranch?.id === branch.id ? '#7B2CBF' : '#333' }}>{branch.name}</h3>
                        <div className="branch-info space-y-2 mb-3">
                            <div className="d-flex align-items-center gap-2 mb-2 text-muted">
                                <MapPin className="h-4 w-4" />
                                <span className="small">{branch.city} / {branch.address}</span>
                            </div>
                            <div className="fw-bold" style={{ color: '#7B2CBF' }}>
                                Fiyat: {getPricePerPerson(branch)} TL / Kişi
                            </div>
                        </div>

                        <button className="vs-btn style4 w-100 mt-2">
                            <span className="vs-btn__border"></span>
                            ŞUBEYİ SEÇ
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderStep2 = () => (
        <div className="row justify-content-center">
            <div className="col-lg-6">
                <div className="payment-card p-4 p-md-5 bg-white shadow-lg" style={{ borderRadius: '30px', border: '2px solid #F9F6FF' }}>
                    <div className="selected-summary mb-4 p-3" style={{ background: '#F9F6FF', borderRadius: '15px' }}>
                        <h4 className="h6 mb-2 text-muted">Seçili Şube:</h4>
                        <p className="h5 fw-bold mb-0" style={{ color: '#7B2CBF' }}>{selectedBranch?.name}</p>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold">Ad Soyad</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-0"><User size={18} /></span>
                            <input
                                type="text"
                                className="form-control bg-light border-0 py-3"
                                placeholder="Adınız Soyadınız"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                style={{ borderRadius: '0 15px 15px 0' }}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold d-block">Kişi Sayısı</label>
                        <div className="d-flex align-items-center justify-content-between p-2 bg-light" style={{ borderRadius: '15px' }}>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, numPeople: Math.max(1, formData.numPeople - 1) })}
                                className="btn d-flex align-items-center justify-content-center"
                                style={{ width: '45px', height: '45px', borderRadius: '12px', backgroundColor: '#fff', color: '#7B2CBF', border: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
                            >
                                <Minus size={20} strokeWidth={3} />
                            </button>
                            <div className="text-center px-4">
                                <span className="h4 mb-0 fw-900" style={{ color: '#7B2CBF' }}>{formData.numPeople}</span>
                                <span className="ms-2 text-muted fw-bold">Kişi</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, numPeople: Math.min(10, formData.numPeople + 1) })}
                                className="btn d-flex align-items-center justify-content-center"
                                style={{ width: '45px', height: '45px', borderRadius: '12px', backgroundColor: '#7B2CBF', color: '#fff', border: 'none', boxShadow: '0 5px 15px rgba(123, 44, 191, 0.3)' }}
                            >
                                <Plus size={20} strokeWidth={3} />
                            </button>
                        </div>
                    </div>

                    <div className="total-area mb-4 p-3 text-center" style={{ background: 'linear-gradient(135deg, #7B2CBF 0%, #9D4EDD 100%)', borderRadius: '15px', color: '#fff' }}>
                        <span className="d-block mb-1 small opacity-75 text-white">Toplam Tutar</span>
                        <h3 className="h2 mb-0 fw-bold text-white">{totalPrice} TL</h3>
                    </div>

                    <div className="d-flex gap-3">
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="vs-btn style2 w-100"
                            style={{ background: '#eee', color: '#333' }}
                        >
                            GERİ
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                if (formData.fullName.trim()) {
                                    handleNext();
                                } else {
                                    alert('Lütfen adınızı soyadınızı giriniz.');
                                }
                            }}
                            className="vs-btn w-100"
                        >
                            <span className="vs-btn__border"></span>
                            DEVAM ET
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="row justify-content-center">
            <div className="col-lg-10">
                <div className="row gx-lg-5">
                    {/* Visual Card Column */}
                    <div className="col-lg-6 mb-40">
                        <div className="card-container mb-4 mx-auto" style={{
                            perspective: '1000px',
                            width: '300px',
                            height: '180px'
                        }}>
                            <div className={`credit-card-3d ${isFlipped ? 'flipped' : ''}`} style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                transition: 'transform 0.6s',
                                transformStyle: 'preserve-3d'
                            }}>
                                {/* Front */}
                                <div className="card-front p-3 text-white" style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    backfaceVisibility: 'hidden',
                                    background: 'linear-gradient(135deg, #7B2CBF 0%, #5a1e8c 100%)',
                                    borderRadius: '12px',
                                    boxShadow: '0 15px 35px rgba(123, 44, 191, 0.3)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div className="mastercard-logo d-flex align-items-center gap-1">
                                            <div style={{ width: '25px', height: '25px', borderRadius: '50%', background: '#eb001b', opacity: 0.9 }}></div>
                                            <div style={{ width: '25px', height: '25px', borderRadius: '50%', background: '#f79e1b', opacity: 0.9, marginLeft: '-12px' }}></div>
                                            <span style={{ fontSize: '10px', marginLeft: '5px', fontWeight: '600' }}>Master Card</span>
                                        </div>
                                        <div className="chip" style={{
                                            width: '40px',
                                            height: '30px',
                                            background: 'linear-gradient(135deg, #ffd700 0%, #b8860b 100%)',
                                            borderRadius: '4px',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
                                            <div style={{ position: 'absolute', left: '50%', top: 0, width: '1px', height: '100%', background: 'rgba(0,0,0,0.1)' }}></div>
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <span style={{ fontSize: '8px', opacity: 0.8, display: 'block', marginBottom: '2px' }}>Card Number</span>
                                        <div className="card-number-display fw-bold text-white mb-2" style={{ fontSize: '16px', letterSpacing: '2px', minHeight: '20px', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                                            {formData.cardNumber || '#### #### #### ####'}
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-end">
                                        <div style={{ flex: 1, maxWidth: '160px' }}>
                                            <span className="fw-bold text-white d-block text-truncate" style={{ fontSize: '12px' }}>{formData.fullName || 'AD SOYAD'}</span>
                                        </div>
                                        <div className="text-end">
                                            <span style={{ fontSize: '7px', opacity: 0.8, display: 'block' }}>Valid Thru</span>
                                            <span className="fw-bold text-white d-block" style={{ fontSize: '11px' }}>{formData.expiryDate || 'MM/YY'}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Back */}
                                <div className="card-back text-white" style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    backfaceVisibility: 'hidden',
                                    background: 'linear-gradient(135deg, #5a1e8c 0%, #7B2CBF 100%)',
                                    borderRadius: '12px',
                                    boxShadow: '0 15px 35px rgba(123, 44, 191, 0.3)',
                                    transform: 'rotateY(180deg)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'start',
                                    paddingTop: '20px',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <div className="black-stripe bg-dark w-100 mb-3" style={{ height: '35px' }}></div>
                                    <div className="px-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="cvv-stripe bg-white text-dark text-end p-1 px-2 fw-bold" style={{ borderRadius: '3px', flex: 1, height: '28px', fontSize: '12px' }}>
                                                {formData.cvv || '***'}
                                            </div>
                                            <div style={{ width: '40px', height: '25px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}></div>
                                        </div>
                                        <span className="small d-block mt-1 text-white opacity-80 fw-bold" style={{ fontSize: '8px' }}>CVV</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="alert alert-warning p-3 mt-4" style={{ borderRadius: '15px' }}>
                            <small className="d-block fw-bold mb-1"><i className="fas fa-shield-alt me-2"></i> Güvenli Ödeme Sitemi</small>
                            <p className="small mb-0">Bilgileriniz 256-bit SSL sertifikası ile korunmaktadır. Ödeme işlemi PayTR altyapısı üzerinden gerçekleştirilecektir.</p>
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="col-lg-6">
                        <div className="payment-card p-4 p-md-5 bg-white shadow-lg" style={{ borderRadius: '30px', border: '2px solid #F9F6FF' }}>
                            <div className="mb-4">
                                <label className="form-label fw-bold">Kart Numarası</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0"><CreditCard size={18} /></span>
                                    <input
                                        type="text"
                                        className="form-control bg-light border-0 py-3"
                                        placeholder="0000 0000 0000 0000"
                                        maxLength={19}
                                        value={formData.cardNumber}
                                        onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
                                        style={{ borderRadius: '0 15px 15px 0' }}
                                    />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-6">
                                    <label className="form-label fw-bold">S.K.T.</label>
                                    <input
                                        type="text"
                                        className="form-control bg-light border-0 py-3 text-center"
                                        placeholder="AA/YY"
                                        maxLength={5}
                                        value={formData.expiryDate}
                                        onChange={(e) => setFormData({ ...formData, expiryDate: formatExpiryDate(e.target.value) })}
                                        style={{ borderRadius: '15px' }}
                                    />
                                </div>
                                <div className="col-6">
                                    <label className="form-label fw-bold">CVV</label>
                                    <input
                                        type="text"
                                        className="form-control bg-light border-0 py-3 text-center"
                                        placeholder="***"
                                        maxLength={3}
                                        onFocus={() => setIsFlipped(true)}
                                        onBlur={() => setIsFlipped(false)}
                                        value={formData.cvv}
                                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                                        style={{ borderRadius: '15px' }}
                                    />
                                </div>
                            </div>

                            <div className="total-area mb-4 p-3 text-center" style={{ background: 'linear-gradient(135deg, #7B2CBF 0%, #9D4EDD 100%)', borderRadius: '15px', color: '#fff' }}>
                                <span className="d-block mb-1 small opacity-75 text-white">Ödenecek Tutar</span>
                                <h3 className="h2 mb-0 fw-bold text-white">{totalPrice} TL</h3>
                            </div>

                            <div className="d-flex gap-3">
                                <button onClick={handlePrev} className="vs-btn style2 w-100" style={{ background: '#eee', color: '#333' }}>
                                    GERİ
                                </button>
                                <button className="vs-btn w-100" onClick={() => alert('Ödeme sistemi PayTR yakında bağlanacaktır.')}>
                                    <span className="vs-btn__border"></span>
                                    ÖDEMEYİ TAMAMLA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <main>
            <Navbar />
            <Breadcrumb title="Bilet Satın Al" />

            <section className="space-top space-extra-bottom">
                <div className="container">
                    {/* Stepper Header */}
                    <div className="row justify-content-center mb-50">
                        <div className="col-lg-8">
                            <div className="d-flex justify-content-between position-relative">
                                {/* Connector Line */}
                                <div style={{
                                    position: 'absolute',
                                    top: '25px',
                                    left: '10%',
                                    right: '10%',
                                    height: '2px',
                                    background: '#eee',
                                    zIndex: 0
                                }}>
                                    <div style={{
                                        width: step === 1 ? '0%' : step === 2 ? '50%' : '100%',
                                        height: '100%',
                                        background: '#7B2CBF',
                                        transition: 'width 0.3s ease'
                                    }}></div>
                                </div>

                                {[1, 2, 3].map((s) => (
                                    <div key={s} className="text-center position-relative" style={{ zIndex: 1, width: '33%' }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            background: step >= s ? '#7B2CBF' : '#fff',
                                            color: step >= s ? '#fff' : '#999',
                                            border: '2px solid',
                                            borderColor: step >= s ? '#7B2CBF' : '#eee',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 10px',
                                            fontWeight: 'bold',
                                            boxShadow: step >= s ? '0 5px 15px rgba(123, 44, 191, 0.3)' : 'none'
                                        }}>
                                            {step > s ? <CheckCircle2 size={24} /> : s}
                                        </div>
                                        <span style={{
                                            fontSize: '14px',
                                            fontWeight: step === s ? '800' : '600',
                                            color: step === s ? '#7B2CBF' : '#999'
                                        }}>
                                            {s === 1 ? 'Şube Seçimi' : s === 2 ? 'Detaylar' : 'Ödeme'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center text-center mb-40">
                        <div className="col-lg-8">
                            <div className="title-area">
                                <span className="vs-title__sub" style={{ color: '#7B2CBF', fontWeight: '700' }}>
                                    {step === 1 ? 'Adım 1' : step === 2 ? 'Adım 2' : 'Adım 3'}
                                </span>
                                <h2 className="vs-title__main" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900' }}>
                                    {step === 1 ? <>Lütfen <span style={{ color: '#7B2CBF' }}>Şubeyi Seçin</span></> :
                                        step === 2 ? <>Bilet <span style={{ color: '#7B2CBF' }}>Bilgilerini Girin</span></> :
                                            <>Ödeme <span style={{ color: '#7B2CBF' }}>Bilgileri</span></>}
                                </h2>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20 text-purple-600">
                            <Loader2 className="h-10 w-10 animate-spin" />
                        </div>
                    ) : (
                        <>
                            {step === 1 && renderStep1()}
                            {step === 2 && renderStep2()}
                            {step === 3 && renderStep3()}
                        </>
                    )}
                </div>
            </section>

            <style jsx global>{`
                .branch-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                }
                .vs-btn:hover {
                    color: #fff !important;
                    background-color: #5a1e8c !important;
                }
                .form-control:focus, .form-select:focus {
                    background-color: #fff !important;
                    box-shadow: 0 0 0 0.25rem rgba(123, 44, 191, 0.1) !important;
                    border: 1px solid #7B2CBF !important;
                }
                .credit-card-3d.flipped {
                    transform: rotateY(180deg);
                }
                .tracking-widest {
                    letter-spacing: 0.2em;
                }
                .fw-900 {
                    font-weight: 900;
                }
            `}</style>

            <Footer />
            <TemplateScripts />
        </main>
    );
}
