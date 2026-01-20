import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Test database connection
        await prisma.$connect();

        // Get database version to verify connection
        const result = await prisma.$queryRaw`SELECT version()`;

        return NextResponse.json({
            success: true,
            message: 'Database connected successfully!',
            data: result
        });
    } catch (error) {
        console.error('Database connection error:', error);
        return NextResponse.json({
            success: false,
            message: 'Database connection failed',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
