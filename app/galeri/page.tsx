import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateScripts from '@/components/TemplateScripts';
import Breadcrumb from '@/components/Breadcrumb';
import { prisma } from '@/lib/prisma';

export const revalidate = 0;

async function getGallery() {
    try {
        const gallery = await prisma.gallery.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' }
        });
        return gallery;
    } catch (error) {
        console.error('Error fetching gallery:', error);
        return [];
    }
}

export default async function Gallery() {
    const images = await getGallery();

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
                        {images.length === 0 ? (
                            <div className="col-12 text-center">
                                <p className="text-muted">Henüz görsel eklenmemiş.</p>
                            </div>
                        ) : (
                            images.map((img, i) => (
                                <div key={img.id} className="col-lg-4 col-md-6 wow animate__fadeInUp" data-wow-delay={`${0.1 * i}s`}>
                                    <div className="gallery-thumb position-relative overflow-hidden shadow-sm" style={{ borderRadius: '15px' }}>
                                        <img src={img.imageUrl} alt={img.title} className="w-100" style={{ height: '300px', objectFit: 'cover' }} />
                                        <a href={img.imageUrl} className="popup-image gal-btn position-absolute top-50 start-50 translate-middle">
                                            <i className="fal fa-plus"></i>
                                        </a>
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
