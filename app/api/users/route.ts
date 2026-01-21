import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Kullanıcılar getirilirken hata oluştu' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password, name, role } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email ve şifre zorunludur' },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Bu email adresi zaten kayıtlı' },
                { status: 400 }
            );
        }

        const hashedPassword = await hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name || '',
                role: role || 'admin' // Default 'admin' for now, or fetch from UI
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'Kullanıcı oluşturulurken hata oluştu' },
            { status: 500 }
        );
    }
}
