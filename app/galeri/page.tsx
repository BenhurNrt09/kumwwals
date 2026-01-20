import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateScripts from '@/components/TemplateScripts';
import Breadcrumb from '@/components/Breadcrumb';

export default function Gallery() {
    const images = [
        { src: "/assets/img/gallery/kumwals-1.jpg", big: "/assets/img/gallery/kumwals-1.jpg" },
        { src: "/assets/img/widget/gal-1-1.jpg", big: "/assets/img/widget/gal-1-1-big.jpg" },
        { src: "/assets/img/widget/gal-1-2.jpg", big: "/assets/img/widget/gal-1-2-big.jpg" },
        { src: "/assets/img/widget/gal-1-3.jpg", big: "/assets/img/widget/gal-1-3-big.jpg" },
        { src: "/assets/img/widget/gal-1-4.jpg", big: "/assets/img/widget/gal-1-4-big.jpg" },
        { src: "/assets/img/widget/gal-1-5.jpg", big: "/assets/img/widget/gal-1-5-big.jpg" },
        { src: "/assets/img/widget/gal-1-6.jpg", big: "/assets/img/widget/gal-1-6-big.jpg" },
        { src: "/assets/img/about/vs-about-h3-1.png", big: "/assets/img/about/vs-about-h3-1.png" },
        { src: "/assets/img/bg/breadcrumb-bg-2.jpg", big: "/assets/img/bg/breadcrumb-bg-2.jpg" }
    ];

    return (
        <main>
            <Navbar />
            <Breadcrumb title="Galeri" />

            <section className="space-top space-extra-bottom">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7 text-center mb-50">
                            <span className="vs-title__sub">Kum Oyun Alanımızdan Kareler</span>
                            <h2 className="vs-title__main">Eğlenceli <span>Anlar</span></h2>
                        </div>
                    </div>
                    <div className="row g-4">
                        {images.map((img, i) => (
                            <div key={i} className="col-lg-4 col-md-6 wow animate__fadeInUp" data-wow-delay={`${0.1 * i}s`}>
                                <div className="gallery-thumb position-relative overflow-hidden shadow-sm" style={{ borderRadius: '15px' }}>
                                    <img src={img.src} alt="galeri" className="w-100" style={{ height: '300px', objectFit: 'cover' }} />
                                    <a href={img.big} className="popup-image gal-btn position-absolute top-50 start-50 translate-middle">
                                        <i className="fal fa-plus"></i>
                                    </a>
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
