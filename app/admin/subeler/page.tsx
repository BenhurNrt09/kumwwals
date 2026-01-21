'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Pencil, Trash2, Plus, GripVertical, Loader2, Upload } from 'lucide-react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Branch {
    id: string;
    name: string;
    address: string;
    phone: string;
    email?: string | null;
    city: string;
    imageUrl?: string | null;
    isActive: boolean;
    order: number;
    createdAt: string;
    updatedAt: string;
}

// Sortable Row Component
function SortableRow({ branch, onEdit, onDelete }: { branch: Branch; onEdit: (b: Branch) => void; onDelete: (id: string) => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: branch.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 2 : 1,
        position: 'relative' as 'relative',
        backgroundColor: isDragging ? '#f3f4f6' : 'white',
    };

    return (
        <TableRow ref={setNodeRef} style={style}>
            <TableCell>
                <button {...attributes} {...listeners} className="cursor-grab hover:text-purple-600">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                </button>
            </TableCell>
            <TableCell className="font-medium text-gray-900">{branch.name}</TableCell>
            <TableCell className="text-gray-600">{branch.city}</TableCell>
            <TableCell className="text-gray-600">{branch.phone}</TableCell>
            <TableCell className="max-w-xs truncate text-gray-600">{branch.address}</TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(branch)}
                        className="text-purple-600 border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(branch.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}

export default function AdminBranchesPage() {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
    const [uploading, setUploading] = useState(false);

    // File input ref
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        city: '',
        imageUrl: '',
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Şubeleri getir
    const fetchBranches = async () => {
        try {
            const res = await fetch('/api/branches');
            const data = await res.json();

            if (Array.isArray(data)) {
                setBranches(data);
            } else {
                console.error('API returned non-array:', data);
                setBranches([]);
            }
        } catch (error) {
            console.error('Error fetching branches:', error);
            setBranches([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBranches();
    }, []);

    // Sıralama değişince
    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id && over) {
            setBranches((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                const newItems = arrayMove(items, oldIndex, newIndex);

                // Arka planda API'ye sıralamayı gönder
                updateOrder(newItems);

                return newItems;
            });
        }
    };

    const updateOrder = async (items: Branch[]) => {
        try {
            const orderUpdates = items.map((item, index) => ({
                id: item.id,
                order: index
            }));

            await fetch('/api/branches', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: orderUpdates })
            });
        } catch (error) {
            console.error('Sıralama güncellenemedi:', error);
        }
    };

    // Dosya Yükleme
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
                setFormData(prev => ({ ...prev, imageUrl: data.imageUrl }));
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Görsel yüklenirken hata oluştu');
        } finally {
            setUploading(false);
        }
    };

    // Form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingBranch) {
                // Güncelleme
                await fetch(`/api/branches/${editingBranch.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            } else {
                // Yeni ekleme
                await fetch('/api/branches', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            }

            setDialogOpen(false);
            resetForm();
            fetchBranches();
        } catch (error) {
            console.error('Error saving branch:', error);
        }
    };

    // Silme
    const handleDelete = async (id: string) => {
        if (!confirm('Bu şubeyi silmek istediğinize emin misiniz?')) return;

        try {
            await fetch(`/api/branches/${id}`, {
                method: 'DELETE',
            });
            fetchBranches();
        } catch (error) {
            console.error('Error deleting branch:', error);
        }
    };

    // Düzenleme için dialog aç
    const openEditDialog = (branch: Branch) => {
        setEditingBranch(branch);
        setFormData({
            name: branch.name,
            address: branch.address,
            phone: branch.phone,
            email: branch.email || '',
            city: branch.city,
            imageUrl: branch.imageUrl || '',
        });
        setDialogOpen(true);
    };

    // Yeni ekleme için dialog aç
    const openAddDialog = () => {
        setEditingBranch(null);
        resetForm();
        setDialogOpen(true);
    };

    // Form resetle
    const resetForm = () => {
        setFormData({
            name: '',
            address: '',
            phone: '',
            email: '',
            city: '',
            imageUrl: '',
        });
        setEditingBranch(null);
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
                    <h1 className="text-3xl font-bold text-gray-900">Şube Yönetimi</h1>
                    <p className="text-gray-600 mt-2">
                        Şubeleri sürükleyip bırakarak sıralayabilirsiniz.
                    </p>
                </div>
                <Button onClick={openAddDialog} className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Şube Ekle
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-100">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]"></TableHead>
                                <TableHead className="text-gray-900 font-semibold">Şube Adı</TableHead>
                                <TableHead className="text-gray-900 font-semibold">Şehir</TableHead>
                                <TableHead className="text-gray-900 font-semibold">Telefon</TableHead>
                                <TableHead className="text-gray-900 font-semibold">Adres</TableHead>
                                <TableHead className="text-right text-gray-900 font-semibold">İşlemler</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <SortableContext
                                items={branches.map(b => b.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {branches.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                            Henüz şube eklenmemiş
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    branches.map((branch) => (
                                        <SortableRow
                                            key={branch.id}
                                            branch={branch}
                                            onEdit={openEditDialog}
                                            onDelete={handleDelete}
                                        />
                                    ))
                                )}
                            </SortableContext>
                        </TableBody>
                    </Table>
                </DndContext>
            </div>

            {/* Add/Edit Dialog - Force White Background and Black Text */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[600px] bg-white text-gray-900 border-gray-200">
                    <DialogHeader>
                        <DialogTitle className="text-purple-700 font-bold text-xl">
                            {editingBranch ? 'Şube Düzenle' : 'Yeni Şube Ekle'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-gray-900 font-medium">Şube Adı *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-purple-200"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="city" className="text-gray-900 font-medium">Şehir *</Label>
                                <Input
                                    id="city"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    required
                                    className="bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-purple-200"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address" className="text-gray-900 font-medium">Adres *</Label>
                                <Input
                                    id="address"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    required
                                    className="bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-purple-200"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="phone" className="text-gray-900 font-medium">Telefon *</Label>
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                        className="bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-purple-200"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-gray-900 font-medium">E-posta</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-purple-200"
                                    />
                                </div>
                            </div>

                            {/* File Upload Section */}
                            <div className="grid gap-2">
                                <Label className="text-gray-900 font-medium">Şube Görseli</Label>
                                <div className="flex items-center gap-4">
                                    {formData.imageUrl && (
                                        <img
                                            src={formData.imageUrl}
                                            alt="Preview"
                                            className="h-16 w-16 object-cover rounded border border-gray-200"
                                        />
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
                                            className="border-purple-200 text-purple-700 hover:bg-purple-50"
                                        >
                                            {uploading ? (
                                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                            ) : (
                                                <Upload className="h-4 w-4 mr-2" />
                                            )}
                                            {uploading ? 'Yükleniyor...' : 'Görsel Seç'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setDialogOpen(false)}
                                className="text-gray-700 border-gray-300 hover:bg-gray-100"
                            >
                                İptal
                            </Button>
                            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                                {editingBranch ? 'Güncelle' : 'Ekle'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
