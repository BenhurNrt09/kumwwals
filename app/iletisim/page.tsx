'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateScripts from '@/components/TemplateScripts';
import Breadcrumb from '@/components/Breadcrumb';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
                // Reset status after 3 seconds
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <main>
            <Navbar />
            <Breadcrumb title="İletişim" />

            {/* Contact Form Area */}
            <section className="space-top space-extra-bottom">
                <div className="container">
                    <div className="tab-content" id="contactTabContent">
                        <div className="tab-pane fade show active" id="tab1" role="tabpanel">
                            <div className="row">
                                <div className="col-lg-6 mb-30">
                                    <div className="contact-box">
                                        <h3 className="contact-box__title h4">İletişim Bilgileri</h3>
                                        <p className="contact-box__text">Sorularınız, görüşleriniz veya rezervasyon talepleriniz için bize ulaşın. Size en kısa sürede dönüş yapacağız.</p>
                                        <div className="contact-box__item">
                                            <div className="contact-box__icon"><i className="fal fa-phone-alt"></i></div>
                                            <div className="media-body">
                                                <h4 className="contact-box__label">Telefon</h4>
                                                <p className="contact-box__info"><a href="tel:+905555555555">0 555 555 55 55</a></p>
                                            </div>
                                        </div>
                                        <div className="contact-box__item">
                                            <div className="contact-box__icon"><i className="far fa-envelope"></i></div>
                                            <div className="media-body">
                                                <h4 className="contact-box__label">E-posta</h4>
                                                <p className="contact-box__info"><a href="mailto:info@kumwals.com">info@kumwals.com</a></p>
                                            </div>
                                        </div>
                                        <div className="contact-box__item">
                                            <div className="contact-box__icon"><i className="fal fa-map-marker-alt"></i></div>
                                            <div className="media-body">
                                                <h4 className="contact-box__label">Adres</h4>
                                                <p className="contact-box__info">Örnek Mahallesi, Örnek Sokak No:1, İstanbul</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-30">
                                    <div className="contact-form-wrapper">
                                        <form onSubmit={handleSubmit} className="contact-form">
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Adınız Soyadınız"
                                                        value={formData.name}
                                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                        required
                                                    />
                                                    <i className="fal fa-user"></i>
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="E-posta Adresi"
                                                        value={formData.email}
                                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                    />
                                                    <i className="fal fa-envelope"></i>
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Telefon Numarası"
                                                        value={formData.phone}
                                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                    />
                                                    <i className="fal fa-phone"></i>
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <select className="form-select">
                                                        <option value="" disabled selected hidden>Konu Seçiniz</option>
                                                        <option>Genel Bilgi</option>
                                                        <option>Şube Başvurusu</option>
                                                        <option>Öneri / Şikayet</option>
                                                    </select>
                                                </div>
                                                <div className="col-12 form-group">
                                                    <textarea
                                                        className="form-control"
                                                        placeholder="Mesajınız"
                                                        value={formData.message}
                                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                                        required
                                                    ></textarea>
                                                </div>
                                                <div className="col-12 form-group mb-0">
                                                    <button type="submit" className="vs-btn style4" disabled={status === 'submitting'}>
                                                        <span className="vs-btn__border"></span>
                                                        {status === 'submitting' ? 'GÖNDERİLİYOR...' : 'GÖNDER'}
                                                    </button>
                                                </div>
                                            </div>
                                            {status === 'success' && (
                                                <p className="form-messages mb-0 mt-3 text-success">Mesajınız başarıyla gönderildi!</p>
                                            )}
                                            {status === 'error' && (
                                                <p className="form-messages mb-0 mt-3 text-danger">Mesaj gönderilirken bir hata oluştu.</p>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <TemplateScripts />
        </main>
    );
}
