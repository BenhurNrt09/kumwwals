const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const galleryImages = [
    { title: 'Gallery Image 1', imageUrl: '/assets/img/home-8/gallery-img1-h8.jpg' },
    { title: 'Gallery Image 2', imageUrl: '/assets/img/home-8/gallery-img2-h8.jpg' },
    { title: 'Gallery Image 3', imageUrl: '/assets/img/home-8/gallery-img3-h8.jpg' },
    { title: 'Gallery Image 4', imageUrl: '/assets/img/home-8/gallery-img4-h8.jpg' },
    { title: 'Gallery Image 5', imageUrl: '/assets/img/home-8/gallery-img5-h8.jpg' },
    { title: 'Gallery Image 6', imageUrl: '/assets/img/home-8/gallery-img6-h8.jpg' }
];

async function main() {
    console.log('Start seeding gallery...');

    // Optional: Clear existing if you want a fresh start
    // await prisma.gallery.deleteMany({});

    for (const img of galleryImages) {
        await prisma.gallery.create({
            data: {
                title: img.title,
                imageUrl: img.imageUrl,
                description: 'Galeri görseli'
            }
        });
    }
    console.log('Gallery seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
