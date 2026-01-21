import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Tüm mesajları getir
export async function GET() {
    try {
        const contacts = await prisma.contact.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json(
            { error: 'Mesajlar getirilirken hata oluştu' },
            { status: 500 }
        );
    }
}

// POST - Yeni mesaj kaydet
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, message } = body;

        if (!name || !message) {
            return NextResponse.json(
                { error: 'Ad ve mesaj zorunludur' },
                { status: 400 }
            );
        }

        const contact = await prisma.contact.create({
            data: {
                name,
                email: email || '',
                phone: phone || '',
                message
            }
        });

        return NextResponse.json(contact, { status: 201 });
    } catch (error) {
        console.error('Error creating contact:', error);
        return NextResponse.json(
            { error: 'Mesaj gönderilirken hata oluştu' },
            { status: 500 }
        );
    }
}
