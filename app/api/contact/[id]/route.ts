import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETE - Mesajı sil
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.contact.delete({
            where: { id: params.id }
        });

        return NextResponse.json({ message: 'Mesaj silindi' });
    } catch (error) {
        console.error('Error deleting contact:', error);
        return NextResponse.json(
            { error: 'Mesaj silinirken hata oluştu' },
            { status: 500 }
        );
    }
}
