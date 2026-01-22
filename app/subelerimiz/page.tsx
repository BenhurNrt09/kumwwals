import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateScripts from '@/components/TemplateScripts';
import Breadcrumb from '@/components/Breadcrumb';
import BranchCard from '@/components/BranchCard';
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
                                <BranchCard key={sube.id} branch={sube} index={i} />
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
