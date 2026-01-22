import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Tek bir bileti getir
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const ticket = await prisma.ticket.findUnique({
            where: { id: params.id },
            include: {
                branch: true
            }
        });

        if (!ticket) {
            return NextResponse.json(
                { error: 'Bilet bulunamadı' },
                { status: 404 }
            );
        }

        return NextResponse.json(ticket);
    } catch (error) {
        console.error('Error fetching ticket:', error);
        return NextResponse.json(
            { error: 'Bilet getirilirken hata oluştu' },
            { status: 500 }
        );
    }
}

// PUT - Bileti güncelle (Ödeme durumu vb.)
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { isPaid, paymentMethod, fullName, email, phone, numPeople, totalPrice } = body;

        const ticket = await prisma.ticket.update({
            where: { id: params.id },
            data: {
                ...(isPaid !== undefined && { isPaid }),
                ...(paymentMethod && { paymentMethod }),
                ...(fullName && { fullName }),
                ...(email && { email }),
                ...(phone && { phone }),
                ...(numPeople && { numPeople: Number(numPeople) }),
                ...(totalPrice && { totalPrice: Number(totalPrice) })
            }
        });

        return NextResponse.json(ticket);
    } catch (error) {
        console.error('Error updating ticket:', error);
        return NextResponse.json(
            { error: 'Bilet güncellenirken hata oluştu' },
            { status: 500 }
        );
    }
}

// DELETE - Bileti sil
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.ticket.delete({
            where: { id: params.id }
        });

        return NextResponse.json({ message: 'Bilet silindi' });
    } catch (error) {
        console.error('Error deleting ticket:', error);
        return NextResponse.json(
            { error: 'Bilet silinirken hata oluştu' },
            { status: 500 }
        );
    }
}
