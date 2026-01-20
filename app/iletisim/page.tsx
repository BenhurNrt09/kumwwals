import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateScripts from '@/components/TemplateScripts';
import Breadcrumb from '@/components/Breadcrumb';

export default function Contact() {
    return (
        <main>
            <Navbar />
            <Breadcrumb title="İletişim" />

            <section className="space-top space-extra-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 mb-50">
                            <div className="vs-title pe-xl-5">
                                <span className="vs-title__sub">Bize Ulaşın</span>
                                <h2 className="vs-title__main">Sorularınız İçin <span>Yanınızdayız</span></h2>
                                <p className="vs-title__text mt-4">
                                    Kumwals şubeleri, franchising şartları veya atölye programlarımız hakkında daha fazla bilgi almak için formu doldurabilir veya bize doğrudan ulaşabilirsiniz.
                                </p>
                            </div>
                            <div className="contact-info mt-5">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="vs-feature__icon me-3" style={{ width: '50px', height: '50px', background: '#F9F6FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #7B2CBF' }}>
                                        <i className="fas fa-map-marker-alt" style={{ color: '#7B2CBF' }}></i>
                                    </div>
                                    <div>
                                        <h4 className="h5 mb-1">Merkez Ofis</h4>
                                        <p className="mb-0 text-muted">İzmir, Türkiye</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mb-4">
                                    <div className="vs-feature__icon me-3" style={{ width: '50px', height: '50px', background: '#F9F6FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #7B2CBF' }}>
                                        <i className="fas fa-phone-alt" style={{ color: '#7B2CBF' }}></i>
                                    </div>
                                    <div>
                                        <h4 className="h5 mb-1">Telefon</h4>
                                        <a href="tel:+905555555555" className="text-inherit" style={{ fontWeight: '600' }}>+90 555 555 55 55</a>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mb-4">
                                    <div className="vs-feature__icon me-3" style={{ width: '50px', height: '50px', background: '#F9F6FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #7B2CBF' }}>
                                        <i className="fas fa-envelope" style={{ color: '#7B2CBF' }}></i>
                                    </div>
                                    <div>
                                        <h4 className="h5 mb-1">E-Posta</h4>
                                        <a href="mailto:info@kumwals.com" className="text-inherit" style={{ fontWeight: '600' }}>info@kumwals.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="contact-form bg-white shadow-lg p-4 p-md-5" style={{ borderRadius: '30px', border: '2px solid #F9F6FF' }}>
                                <h3 className="mb-4" style={{ color: '#7B2CBF' }}>Mesaj Gönderin</h3>
                                <form className="row g-3">
                                    <div className="col-md-6">
                                        <input type="text" className="form-control bg-light border-0 py-3" style={{ borderRadius: '15px' }} placeholder="Adınız Soyadınız" required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="email" className="form-control bg-light border-0 py-3" style={{ borderRadius: '15px' }} placeholder="E-Posta Adresiniz" required />
                                    </div>
                                    <div className="col-12">
                                        <input type="tel" className="form-control bg-light border-0 py-3" style={{ borderRadius: '15px' }} placeholder="Telefon Numaranız" />
                                    </div>
                                    <div className="col-12">
                                        <textarea className="form-control bg-light border-0 py-3" style={{ borderRadius: '15px' }} rows={4} placeholder="Mesajınız" required></textarea>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="vs-btn w-100 py-3 shadow-sm"><span className="vs-btn__border"></span>GÖNDER</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Google Map İzmir - Moved up and simplified container */}
            <div className="container-fluid p-0 mt-5">
                <div className="map-area" style={{ height: '500px', width: '100%' }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100034.406935105!2d27.0544521!3d38.41785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd862a7621791%3A0xd1658c0d16c59dee!2zxLB6bWly!5e0!3m2!1str!2str!4v1705680000000!5m2!1str!2str"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="İzmir Map"
                    ></iframe>
                </div>
            </div>

            <Footer />
            <TemplateScripts />
        </main>
    );
}
