import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Tüm galeri öğelerini getir
export async function GET() {
    try {
        const gallery = await prisma.gallery.findMany({
            where: { isActive: true },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(gallery);
    } catch (error) {
        console.error('Error fetching gallery:', error);
        return NextResponse.json(
            { error: 'Galeri getirilirken hata oluştu' },
            { status: 500 }
        );
    }
}

// POST - Yeni görsel ekle
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, imageUrl, description } = body; // Multi interface in plan, but let's stick to single first or loop in frontend

        if (!title || !imageUrl) {
            return NextResponse.json(
                { error: 'Başlık ve görsel URL zorunludur' },
                { status: 400 }
            );
        }

        const galleryItem = await prisma.gallery.create({
            data: {
                title,
                imageUrl,
                description,
                order: 0 // Default order
            }
        });

        return NextResponse.json(galleryItem, { status: 201 });
    } catch (error) {
        console.error('Error creating gallery item:', error);
        return NextResponse.json(
            { error: 'Görsel eklenirken hata oluştu' },
            { status: 500 }
        );
    }
}
