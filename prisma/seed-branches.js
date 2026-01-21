
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const branches = [
    {
        name: 'Kumwals İstanbul',
        city: 'İstanbul',
        phone: '0 555 555 55 55',
        address: 'Örnek Mahallesi, Örnek Sokak No:1, Kadıköy/İstanbul',
        email: 'istanbul@kumwals.com',
        imageUrl: '/assets/img/home-8/gallery-img1-h8.jpg',
        order: 1
    },
    {
        name: 'Kumwals Ankara',
        city: 'Ankara',
        phone: '0 555 555 55 56',
        address: 'Örnek Mahallesi, Örnek Sokak No:1, Çankaya/Ankara',
        email: 'ankara@kumwals.com',
        imageUrl: '/assets/img/home-8/gallery-img2-h8.jpg',
        order: 2
    },
    {
        name: 'Kumwals İzmir',
        city: 'İzmir',
        phone: '0 555 555 55 57',
        address: 'Örnek Mahallesi, Örnek Sokak No:1, Karşıyaka/İzmir',
        email: 'izmir@kumwals.com',
        imageUrl: '/assets/img/home-8/gallery-img3-h8.jpg',
        order: 3
    },
    {
        name: 'Kumwals Bursa',
        city: 'Bursa',
        phone: '0 555 555 55 58',
        address: 'Örnek Mahallesi, Örnek Sokak No:1, Nilüfer/Bursa',
        email: 'bursa@kumwals.com',
        imageUrl: '/assets/img/home-8/gallery-img4-h8.jpg',
        order: 4
    },
    {
        name: 'Kumwals Antalya',
        city: 'Antalya',
        phone: '0 555 555 55 59',
        address: 'Örnek Mahallesi, Örnek Sokak No:1, Muratpaşa/Antalya',
        email: 'antalya@kumwals.com',
        imageUrl: '/assets/img/home-8/gallery-img5-h8.jpg',
        order: 5
    }
];

async function main() {
    console.log('Start seeding branches...');
    for (const branch of branches) {
        await prisma.branch.create({
            data: branch
        });
    }
    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
