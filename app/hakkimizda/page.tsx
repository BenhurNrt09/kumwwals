import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateScripts from '@/components/TemplateScripts';
import Breadcrumb from '@/components/Breadcrumb';

export default function About() {
    return (
        <main>
            <Navbar />
            <Breadcrumb title="Hakkımızda" />

            {/* About Section */}
            <section className="vs-about--section pt-50 space-extra-bottom overflow-hidden">
                <div className="container">
                    <div className="row align-items-center gx-50">
                        <div className="col-lg-6 mb-30 wow animate__fadeInUp" data-wow-delay="0.25s">
                            <div className="position-relative">
                                <img
                                    src="/assets/img/about-kumwals.png"
                                    alt="Kumwals - Çocuklar Eğleniyor"
                                    className="w-100 border-radius-20 shadow-lg"
                                    style={{ objectFit: 'cover', height: 'auto' }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 mb-30 wow animate__fadeInUp" data-wow-delay="0.25s">
                            <div className="vs-about--right">
                                <span className="vs-title__sub">Kum Oyununun Merkezi</span>
                                <h2 className="vs-title__main">Kumwals İle Eğlence <span>Sınır Tanımaz</span></h2>
                                <p className="vs-text pt-15">
                                    Kumwals, çocukların doğal meraklarını ve yaratıcılıklarını desteklemek amacıyla kurulmuş, Türkiye'nin önde gelen kum oyun atölyesidir.
                                    Modern oyun alanlarımızda, çocuklara sadece bir oyun değil, aynı zamanda bir öğrenme deneyimi sunuyoruz.
                                </p>
                                <div className="tab-content pt-20">
                                    <h4 className="border-bottom pb-2" style={{ color: '#7B2CBF', fontWeight: '800' }}>Vizyonumuz</h4>
                                    <p className="text-muted">Her çocuğun dokunarak, hissederek ve inşa ederek öğrenme hakkına sahip olduğuna inanıyoruz. Kumun büyülü dünyasını tüm çocuklara ulaştırmayı hedefliyoruz.</p>
                                    <h4 className="border-bottom pb-2 pt-10" style={{ color: '#7B2CBF', fontWeight: '800' }}>Misyonumuz</h4>
                                    <p className="text-muted">En yüksek hijyen standartlarında, güvenli ve eğitici oyun alanları yaratarak ailelerin güvenle çocuklarını emanet edebileceği bir marka olmak.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section - Colorful Boxes with Icons */}
            <section className="space-extra-bottom overflow-hidden py-5" style={{ backgroundColor: '#F9F6FF' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 text-center mb-50">
                            <span className="vs-title__sub">Neden Biz?</span>
                            <h2 className="vs-title__main">Kumwals&apos;ın <span>Farkı</span></h2>
                        </div>
                    </div>
                    <div className="row">
                        {[
                            { title: "Eğitici Oyunlar", icon: "fa-graduation-cap", text: "Motor becerilerini geliştiren özel oyun kurguları.", colorClass: "kumwals-box-red", iconColor: "#B91C1C" },
                            { title: "Güvenli Alan", icon: "fa-shield-alt", text: "Yumuşak zeminler ve %100 güvenli ekipmanlar.", colorClass: "kumwals-box-yellow", iconColor: "#92400E" },
                            { title: "Uzman Kadro", icon: "fa-users", text: "Çocuk gelişimi konusunda deneyimli oyun uzmanları.", colorClass: "kumwals-box-green", iconColor: "#065F46" }
                        ].map((f, i) => (
                            <div key={i} className="col-lg-4 wow animate__fadeInUp" data-wow-delay={`${0.25 + i * 0.1}s`}>
                                <div className={`vs-feature d-flex align-items-stretch p-4 mb-30 shadow-lg border-radius-20 h-100 ${f.colorClass}`} style={{ transition: 'all 0.3s ease', minHeight: '180px' }}>
                                    {/* Icon Section - Left Half */}
                                    <div className="vs-feature__icon-wrapper d-flex align-items-center justify-content-center" style={{ flex: '0 0 45%', marginRight: '20px' }}>
                                        <div className="vs-feature__icon" style={{ backgroundColor: '#ffffff', width: '90px', height: '90px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                                            <i className={`fas ${f.icon}`} style={{ fontSize: '2.5rem', color: f.iconColor }}></i>
                                        </div>
                                    </div>
                                    {/* Text Section - Right Half */}
                                    <div className="vs-feature__content d-flex flex-column justify-content-center" style={{ flex: '1 1 55%' }}>
                                        <h3 className="vs-feature__title h5 mb-2" style={{ color: '#333', fontWeight: '800', lineHeight: '1.3' }}>{f.title}</h3>
                                        <p className="vs-feature__text mb-0" style={{ color: '#333', opacity: 0.75, fontSize: '0.9rem', lineHeight: '1.4' }}>{f.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
            <TemplateScripts />
        </main>
    );
}
