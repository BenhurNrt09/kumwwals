import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateScripts from '@/components/TemplateScripts';
import Breadcrumb from '@/components/Breadcrumb';

export default function Workshops() {
    const atolyeler = [
        { title: "Serbest Kum Oyunu", image: "/assets/img/home-8/rides-img1-h8.jpg", desc: "Çocukların hayal güçlerini serbest bıraktıkları, diledikleri şekilleri inşa ettikleri temel oyun alanımız." },
        { title: "Boyama Atölyesi", image: "/assets/img/home-8/rides-img2-h8.jpg", desc: "Kumdan şekillerin renklendirildiği, görsel sanatlara odaklanan yaratıcı etkinlik programımız." },
        { title: "İnşaat Atölyesi", image: "/assets/img/home-8/rides-img4-h8.jpg", desc: "Kamyonlar, vinçler ve kum ekipmanlarıyla gerçekleştirilen, koordinasyon odaklı teknik oyun alanı." },
        { title: "Dinozor Kazısı", image: "/assets/img/home-8/gallery-img3-h8.jpg", desc: "Kumun altına gizlenmiş fosilleri bulmaya yönelik, keşif duygusunu tetikleyen arkeoloji temalı atölye." },
        { title: "Kum Sanatı", image: "/assets/img/home-8/blog-img1-h8.jpg", desc: "Renkli kumlarla şişe boyama ve kum tabloları hazırlamaya yönelik artistik çalışma alanı." },
        { title: "Duyusal Terapi", image: "/assets/img/home-8/blog-img2-h8.jpg", desc: "Özel dokulu kumlarla çocukların dokunma duyusunu geliştiren, sakinleştirici aktivite saati." }
    ];

    return (
        <main>
            <Navbar />
            <Breadcrumb title="Atölyelerimiz" />

            <section className="space-top space-extra-bottom overflow-hidden">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7 text-center mb-50">
                            <span className="vs-title__sub">Eğlenceli Aktiviteler</span>
                            <h2 className="vs-title__main">Her Yaşa Uygun <span>Atölyeler</span></h2>
                            <p className="vs-text">Çocukların yaş gruplarına ve ilgi alanlarına göre özenle hazırlanmış programlarımızı inceleyin.</p>
                        </div>
                    </div>
                    <div className="row">
                        {atolyeler.map((a, i) => (
                            <div key={i} className="col-lg-4 col-md-6 mb-30 wow animate__fadeInUp" data-wow-delay={`${0.2 + i * 0.1}s`}>
                                <div className="vs-room bg-light shadow-sm border-radius-20 overflow-hidden h-100 d-flex flex-column">
                                    <div className="vs-room__img" style={{ height: '300px', overflow: 'hidden' }}>
                                        <img src={a.image} alt={a.title} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="p-4 d-flex flex-column flex-grow-1">
                                        <h3 className="h4 mb-3" style={{ color: '#7B2CBF', fontWeight: '800' }}>{a.title}</h3>
                                        <p className="vs-room__text mb-4 text-muted">{a.desc}</p>
                                        <div className="mt-auto">
                                            <a href="/iletisim" className="vs-btn style4 w-100"><span className="vs-btn__border"></span>BİLGİ AL</a>
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
