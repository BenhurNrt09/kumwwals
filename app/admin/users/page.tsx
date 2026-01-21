'use client';

import { useState, useEffect } from 'react';
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
import { Trash2, Loader2, User, Plus, Pencil } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface UserData {
    id: string;
    email: string;
    name: string | null;
    role: string;
    createdAt: string;
}

export default function AdminUsersPage() {
    const { data: session } = useSession();
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserData | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'admin'
    });

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                setUsers([]);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) return;
        try {
            const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
            if (res.ok) fetchUsers();
            else alert('Silme işlemi başarısız');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingUser) {
                // Update
                const res = await fetch(`/api/users/${editingUser.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                if (!res.ok) throw new Error('Update failed');
            } else {
                // Create
                const res = await fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                if (!res.ok) {
                    const errorData = await res.json();
                    alert(errorData.error || 'Create failed');
                    return;
                }
            }

            setDialogOpen(false);
            resetForm();
            fetchUsers();
        } catch (error) {
            console.error('Error saving user:', error);
            alert('İşlem sırasında bir hata oluştu');
        }
    };

    const openAddDialog = () => {
        setEditingUser(null);
        resetForm();
        setDialogOpen(true);
    };

    const openEditDialog = (user: UserData) => {
        setEditingUser(user);
        setFormData({
            name: user.name || '',
            email: user.email,
            password: '', // Password empty means don't change
            role: user.role
        });
        setDialogOpen(true);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'admin'
        });
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
                    <h1 className="text-3xl font-bold text-gray-900">Kullanıcı Yönetimi</h1>
                    <p className="text-gray-600 mt-2">
                        Panel erişimi olan kullanıcıları yönetin
                    </p>
                </div>
                <Button onClick={openAddDialog} className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Kullanıcı
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-100">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-gray-900 font-semibold">Ad Soyad</TableHead>
                            <TableHead className="text-gray-900 font-semibold">E-posta</TableHead>
                            <TableHead className="text-gray-900 font-semibold">Rol</TableHead>
                            <TableHead className="text-gray-900 font-semibold">Kayıt Tarihi</TableHead>
                            <TableHead className="text-right text-gray-900 font-semibold">İşlemler</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                                    <div className="flex flex-col items-center">
                                        <User className="h-12 w-12 text-gray-300 mb-2" />
                                        <p>Kullanıcı bulunamadı</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium text-gray-900">{user.name || '-'}</TableCell>
                                    <TableCell className="text-gray-600">{user.email}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-gray-600">
                                        {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openEditDialog(user)}
                                                className="text-purple-600 border-purple-200 hover:bg-purple-50"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            {/* Don't let users delete themselves */}
                                            {session?.user?.email !== user.email && (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="bg-white text-gray-900 border-gray-200">
                    <DialogHeader>
                        <DialogTitle className="text-purple-700 font-bold">
                            {editingUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-gray-900 font-medium">Ad Soyad</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-white border-gray-300 text-gray-900"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-gray-900 font-medium">E-posta *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="bg-white border-gray-300 text-gray-900"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-gray-900 font-medium">
                                {editingUser ? 'Şifre (Değiştirmek istemiyorsanız boş bırakın)' : 'Şifre *'}
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required={!editingUser}
                                className="bg-white border-gray-300 text-gray-900"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="role" className="text-gray-900 font-medium">Rol</Label>
                            <select
                                id="role"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900"
                            >
                                <option value="admin">Admin</option>
                                <option value="editor">Editör</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="text-gray-700 border-gray-300 hover:bg-gray-100">Iptal</Button>
                            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                                {editingUser ? 'Güncelle' : 'Ekle'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
