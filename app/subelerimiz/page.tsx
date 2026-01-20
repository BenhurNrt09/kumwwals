import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateScripts from '@/components/TemplateScripts';
import Breadcrumb from '@/components/Breadcrumb';

export default function Branches() {
    const subeler = [
        {
            name: "İZMİR PARK AVM",
            address: "Güneşli Mahallesi Eşrefpaşa Caddesi No:1B07 Konak / İzmir ",
            phone: "0555 555 55 55",
            image: "/assets/img/home-8/gallery-img1-h8.jpg"
        },
        {
            name: "PARK BORNOVA AVM ",
            address: "Doğanlar Mahallesi Ankara Caddesi No:192 Bornova / İzmir ",
            phone: "0555 555 55 55",
            image: "/assets/img/home-8/gallery-img2-h8.jpg"
        },
        {
            name: "VAN MALL AVM",
            address: "Şerefiye Mahallesi Cumhuriyet Caddesi No:45 İpekyolu / Van ",
            phone: "0555 555 55 55",
            image: "/assets/img/home-8/gallery-img3-h8.jpg"
        },
        {
            name: "PARK YİRMİÜÇ AVM",
            address: "Cumhuriyet Mahallesi Malatya Caddesi No:48 Elazığ / Merkez ",
            phone: "0555 555 55 55",
            image: "/assets/img/home-8/gallery-img4-h8.jpg"
        },
        {
            name: "LOVELET AVM",
            address: "Toptepe Mahallesi Hacı Mansur Sokak  No: 3D 34 Canik/ SAMSUN",
            phone: "0555 555 55 55",
            image: "/assets/img/home-8/gallery-img5-h8.jpg"
        }
    ];

    return (
        <main>
            <Navbar />
            <Breadcrumb title="Şubelerimiz" />

            <section className="space-top space-extra-bottom overflow-hidden">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7 text-center mb-50">
                            <span className="vs-title__sub">Türkiye Genelinde</span>
                            <h2 className="vs-title__main">Kumwals <span>Şubeleri</span></h2>
                            <p className="vs-text">Türkiye&apos;nin farklı şehirlerinde hizmet veren şubelerimizi keşfedin. Her şubemiz aynı kalitede güvenli ve eğlenceli oyun alanları sunmaktadır.</p>
                        </div>
                    </div>
                    <div className="row">
                        {subeler.map((sube, i) => (
                            <div key={i} className="col-lg-6 mb-40 wow animate__fadeInUp" data-wow-delay={`${0.2 + i * 0.1}s`}>
                                <div className="vs-branch-card bg-white shadow-sm border-radius-20 overflow-hidden h-100">
                                    <div className="row g-0">
                                        <div className="col-md-5">
                                            <div style={{ height: '100%', minHeight: '250px', overflow: 'hidden' }}>
                                                <img src={sube.image} alt={sube.name} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="p-4 d-flex flex-column h-100">
                                                <h3 className="h4 mb-3" style={{ color: '#7B2CBF', fontWeight: '800' }}>{sube.name}</h3>
                                                <div className="mb-3">
                                                    <div className="d-flex align-items-start mb-2">
                                                        <i className="fas fa-map-marker-alt me-2 mt-1" style={{ color: '#7B2CBF' }}></i>
                                                        <p className="mb-0 text-muted small">{sube.address}</p>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <i className="fas fa-phone-alt me-2" style={{ color: '#7B2CBF' }}></i>
                                                        {sube?.phone ? (
                                                            <a
                                                                href={`tel:${sube.phone.replace(/\s/g, "")}`}
                                                                className="text-muted small text-decoration-none"
                                                            >
                                                                {sube.phone}
                                                            </a>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="mt-auto">
                                                    <a href="/iletisim" className="vs-btn style4 w-100"><span className="vs-btn__border"></span>BİLGİ AL</a>
                                                </div>
                                            </div>
                                        </div>
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
