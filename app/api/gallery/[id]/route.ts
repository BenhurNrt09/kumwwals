import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETE - Görseli sil
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.gallery.delete({
            where: { id: params.id }
        });

        return NextResponse.json({ message: 'Görsel silindi' });
    } catch (error) {
        console.error('Error deleting gallery item:', error);
        return NextResponse.json(
            { error: 'Görsel silinirken hata oluştu' },
            { status: 500 }
        );
    }
}
