import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Tüm biletleri getir (Filtreleme ile)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const branchId = searchParams.get('branchId');
        const isPaid = searchParams.get('isPaid');

        const where: any = {};

        if (branchId && branchId !== 'all') {
            where.branchId = branchId;
        }

        if (isPaid === 'true') {
            where.isPaid = true;
        } else if (isPaid === 'false') {
            where.isPaid = false;
        }

        const tickets = await prisma.ticket.findMany({
            where,
            include: {
                branch: {
                    select: {
                        name: true,
                        city: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        return NextResponse.json(
            { error: 'Biletler getirilirken hata oluştu' },
            { status: 500 }
        );
    }
}

// POST - Yeni bilet oluştur
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fullName, email, phone, numPeople, branchId, totalPrice } = body;

        if (!fullName || !numPeople || !branchId || !totalPrice) {
            return NextResponse.json(
                { error: 'Zorunlu alanlar eksik' },
                { status: 400 }
            );
        }

        const ticket = await prisma.ticket.create({
            data: {
                fullName,
                email,
                phone,
                numPeople: Number(numPeople),
                branchId,
                totalPrice: Number(totalPrice),
                isPaid: false, // Varsayılan olarak ödenmedi
                bookingDate: new Date()
            }
        });

        return NextResponse.json(ticket, { status: 201 });
    } catch (error) {
        console.error('Error creating ticket:', error);
        return NextResponse.json(
            { error: 'Bilet oluşturulurken hata oluştu' },
            { status: 500 }
        );
    }
}
