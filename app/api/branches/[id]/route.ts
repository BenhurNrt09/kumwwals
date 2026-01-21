import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Tek bir şubeyi getir
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const branch = await prisma.branch.findUnique({
            where: { id: params.id }
        });

        if (!branch) {
            return NextResponse.json(
                { error: 'Şube bulunamadı' },
                { status: 404 }
            );
        }

        return NextResponse.json(branch);
    } catch (error) {
        console.error('Error fetching branch:', error);
        return NextResponse.json(
            { error: 'Şube getirilirken hata oluştu' },
            { status: 500 }
        );
    }
}

// PUT - Şubeyi güncelle
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { name, address, phone, email, city, imageUrl, isActive } = body;

        const branch = await prisma.branch.update({
            where: { id: params.id },
            data: {
                ...(name && { name }),
                ...(address && { address }),
                ...(phone && { phone }),
                ...(email !== undefined && { email }),
                ...(city && { city }),
                ...(imageUrl !== undefined && { imageUrl }),
                ...(isActive !== undefined && { isActive })
            }
        });

        return NextResponse.json(branch);
    } catch (error) {
        console.error('Error updating branch:', error);
        return NextResponse.json(
            { error: 'Şube güncellenirken hata oluştu' },
            { status: 500 }
        );
    }
}

// DELETE - Şubeyi sil
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.branch.delete({
            where: { id: params.id }
        });

        return NextResponse.json({ message: 'Şube silindi' });
    } catch (error) {
        console.error('Error deleting branch:', error);
        return NextResponse.json(
            { error: 'Şube silinirken hata oluştu' },
            { status: 500 }
        );
    }
}
