import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateScripts from '@/components/TemplateScripts';
import Breadcrumb from '@/components/Breadcrumb';
import { prisma } from '@/lib/prisma';

export const revalidate = 0; // Always fresh data

async function getBranches() {
    try {
        const branches = await prisma.branch.findMany({
            where: {
                isActive: true
            },
            orderBy: {
                order: 'asc'
            }
        });
        return branches;
    } catch (error) {
        console.error('Error fetching branches:', error);
        return [];
    }
}

export default async function Branches() {
    const subeler = await getBranches();

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
                        {subeler.length === 0 ? (
                            <div className="col-12 text-center py-5">
                                <p className="text-muted">Henüz aktif şube bulunmamaktadır.</p>
                            </div>
                        ) : (
                            subeler.map((sube, i) => (
                                <div key={sube.id} className="col-lg-6 mb-40 wow animate__fadeInUp" data-wow-delay={`${0.2 + i * 0.1}s`}>
                                    <div className="vs-branch-card bg-white shadow-sm border-radius-20 overflow-hidden h-100">
                                        <div className="row g-0">
                                            <div className="col-md-5">
                                                <div style={{ height: '100%', minHeight: '250px', overflow: 'hidden' }}>
                                                    <img
                                                        src={sube.imageUrl || '/assets/img/home-8/gallery-img1-h8.jpg'}
                                                        alt={sube.name}
                                                        className="w-100 h-100"
                                                        style={{ objectFit: 'cover' }}
                                                    />
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
                                                            <a
                                                                href="tel:+908503090215"
                                                                className="text-muted small text-decoration-none"
                                                            >
                                                                +90 (850) 309 0215
                                                            </a>
                                                        </div>
                                                        {sube.email && (
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="fas fa-envelope me-2" style={{ color: '#7B2CBF' }}></i>
                                                                <a
                                                                    href={`mailto:${sube.email}`}
                                                                    className="text-muted small text-decoration-none"
                                                                >
                                                                    {sube.email}
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="mt-auto">
                                                        <a href="/iletisim" className="vs-btn style4 w-100"><span className="vs-btn__border"></span>BİLGİ AL</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <Footer />
            <TemplateScripts />
        </main>
    );
}
