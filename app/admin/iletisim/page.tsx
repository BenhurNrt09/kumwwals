'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Trash2, Loader2, MessageSquare } from 'lucide-react';

interface Contact {
    id: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    createdAt: string;
}

export default function AdminContactPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchContacts = async () => {
        try {
            const res = await fetch('/api/contact');
            const data = await res.json();
            if (Array.isArray(data)) {
                setContacts(data);
            } else {
                setContacts([]);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setContacts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Bu mesajı silmek istediğinize emin misiniz?')) return;
        try {
            await fetch(`/api/contact/${id}`, { method: 'DELETE' });
            fetchContacts();
        } catch (error) {
            console.error('Error deleting contact:', error);
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
                    <h1 className="text-3xl font-bold text-gray-900">İletişim Mesajları</h1>
                    <p className="text-gray-600 mt-2">
                        Gelen iletişim kutusu mesajları
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-100">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tarih</TableHead>
                            <TableHead>Ad Soyad</TableHead>
                            <TableHead>E-posta</TableHead>
                            <TableHead>Telefon</TableHead>
                            <TableHead className="w-[40%]">Mesaj</TableHead>
                            <TableHead className="text-right">İşlem</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                                    <div className="flex flex-col items-center">
                                        <MessageSquare className="h-12 w-12 text-gray-300 mb-2" />
                                        <p>Henüz mesaj yok</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            contacts.map((contact) => (
                                <TableRow key={contact.id}>
                                    <TableCell className="whitespace-nowrap">
                                        {new Date(contact.createdAt).toLocaleDateString('tr-TR')}
                                    </TableCell>
                                    <TableCell className="font-medium">{contact.name}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.phone}</TableCell>
                                    <TableCell className="max-w-md truncate" title={contact.message}>
                                        {contact.message}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(contact.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
