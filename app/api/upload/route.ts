import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json(
                { error: 'Dosya yüklenmedi' },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Uploads klasörünü oluştur (varsa geçer)
        const uploadDir = join(process.cwd(), 'public/uploads');
        await mkdir(uploadDir, { recursive: true });

        // Dosya adını oluştur (benzersiz olması için tarih ekle)
        const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
        const path = join(uploadDir, filename);

        // Dosyayı kaydet
        await writeFile(path, buffer);

        // Url'i döndür
        const imageUrl = `/uploads/${filename}`;

        return NextResponse.json({ imageUrl });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Dosya yüklenirken hata oluştu' },
            { status: 500 }
        );
    }
}
