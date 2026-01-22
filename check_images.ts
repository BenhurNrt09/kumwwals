import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const branches = await prisma.branch.findMany();
    console.log('Branches and their Image URLs:');
    branches.forEach(b => {
        console.log(`- ${b.name}: ${b.imageUrl}`);
    });
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
