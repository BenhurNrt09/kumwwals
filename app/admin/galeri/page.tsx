'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Trash2, Loader2, Image as ImageIcon, Upload } from 'lucide-react';

interface GalleryItem {
    id: string;
    title: string;
    imageUrl: string;
    description?: string;
    createdAt: string;
}

export default function AdminGalleryPage() {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [uploading, setUploading] = useState(false);

    // File input ref
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        imageUrl: '',
    });

    const fetchImages = async () => {
        try {
            const res = await fetch('/api/gallery');
            const data = await res.json();
            if (Array.isArray(data)) {
                setImages(data);
            } else {
                setImages([]);
            }
        } catch (error) {
            console.error('Error fetching gallery:', error);
            setImages([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();

            if (data.imageUrl) {
                setFormData({ imageUrl: data.imageUrl });
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Görsel yüklenirken hata oluştu');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Title is required by schema, so we generate a simple one
            const payload = {
                ...formData,
                title: 'Galeri Görseli',
                description: ''
            };

            await fetch('/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            setDialogOpen(false);
            setFormData({ imageUrl: '' });
            fetchImages();
        } catch (error) {
            console.error('Error saving image:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu görseli silmek istediğinize emin misiniz?')) return;
        try {
            await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
            fetchImages();
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-purple-600">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Galeri Yönetimi</h1>
                    <p className="text-gray-600 mt-2">
                        Site galerisindeki görselleri yönetin
                    </p>
                </div>
                <Button onClick={() => setDialogOpen(true)} className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Görsel Ekle
                </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {images.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">Görsel Yok</h3>
                        <p className="mt-1 text-sm text-gray-500">Henüz galeriye görsel eklenmemiş.</p>
                    </div>
                ) : (
                    images.map((img) => (
                        <div key={img.id} className="group relative bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="aspect-square w-full overflow-hidden bg-gray-200">
                                <img
                                    src={img.imageUrl}
                                    alt={img.title}
                                    className="h-full w-full object-cover group-hover:opacity-75 transition-opacity"
                                />
                            </div>
                            <button
                                onClick={() => handleDelete(img.id)}
                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="bg-white text-gray-900 border-gray-200">
                    <DialogHeader>
                        <DialogTitle className="text-purple-700 font-bold">Yeni Görsel Ekle</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* File Upload Section */}
                        <div className="grid gap-2">
                            <Label className="text-gray-900 font-medium">Görsel Seç *</Label>
                            <div className="flex flex-col gap-4">
                                {formData.imageUrl && (
                                    <div className="w-full aspect-video rounded border border-gray-200 overflow-hidden bg-gray-100">
                                        <img
                                            src={formData.imageUrl}
                                            alt="Preview"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                )}
                                <div className="relative">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={uploading}
                                        className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 h-12"
                                    >
                                        {uploading ? (
                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        ) : (
                                            <Upload className="h-4 w-4 mr-2" />
                                        )}
                                        {uploading ? 'Yükleniyor...' : (formData.imageUrl ? 'Görseli Değiştir' : 'Görsel Yükle')}
                                    </Button>
                                    <input type="hidden" name="imageUrl" value={formData.imageUrl} />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="text-gray-700 border-gray-300 hover:bg-gray-100">Iptal</Button>
                            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white" disabled={!formData.imageUrl}>Ekle</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
