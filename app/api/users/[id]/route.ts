import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETE - Kullanıcı sil
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.user.delete({
            where: { id: params.id }
        });

        return NextResponse.json({ message: 'Kullanıcı silindi' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json(
            { error: 'Kullanıcı silinirken hata oluştu' },
            { status: 500 }
        );
    }
}
