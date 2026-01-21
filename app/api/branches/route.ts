import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Tüm şubeleri getir
export async function GET() {
    try {
        const branches = await prisma.branch.findMany({
            orderBy: {
                order: 'asc'
            }
        });
        return NextResponse.json(branches);
    } catch (error) {
        console.error('Error fetching branches:', error);
        return NextResponse.json(
            { error: 'Şubeler getirilirken hata oluştu' },
            { status: 500 }
        );
    }
}

// POST - Yeni şube ekle
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, address, phone, email, city, imageUrl } = body;

        if (!name || !address || !phone || !city) {
            return NextResponse.json(
                { error: 'Ad, adres, telefon ve şehir zorunludur' },
                { status: 400 }
            );
        }

        // En son eklenen şubenin sırasını bul
        const lastBranch = await prisma.branch.findFirst({
            orderBy: { order: 'desc' }
        });
        const newOrder = (lastBranch?.order || 0) + 1;

        const branch = await prisma.branch.create({
            data: {
                name,
                address,
                phone,
                email,
                city,
                imageUrl,
                order: newOrder
            }
        });

        return NextResponse.json(branch, { status: 201 });
    } catch (error) {
        console.error('Error creating branch:', error);
        return NextResponse.json(
            { error: 'Şube oluşturulurken hata oluştu' },
            { status: 500 }
        );
    }
}

// PATCH - Şube sıralamasını güncelle
export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { items } = body; // [{ id: '...', order: 1 }, ...]

        if (!Array.isArray(items)) {
            return NextResponse.json(
                { error: 'Geçersiz veri formatı' },
                { status: 400 }
            );
        }

        // Transaction ile tüm güncellemeleri yap
        await prisma.$transaction(
            items.map((item: any) =>
                prisma.branch.update({
                    where: { id: item.id },
                    data: { order: item.order }
                })
            )
        );

        return NextResponse.json({ message: 'Sıralama güncellendi' });
    } catch (error) {
        console.error('Error reordering branches:', error);
        return NextResponse.json(
            { error: 'Sıralama güncellenirken hata oluştu' },
            { status: 500 }
        );
    }
}
