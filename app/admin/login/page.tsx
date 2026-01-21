'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        try {
            const result = await signIn('credentials', {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Kullanıcı adı veya şifre hatalı');
            } else {
                router.push('/admin');
                router.refresh();
            }
        } catch (error) {
            setError('Bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-900 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <img
                            src="/assets/img/kumlogo.jpeg"
                            alt="Kumwals"
                            className="mx-auto mb-4"
                            style={{ maxWidth: '180px' }}
                        />
                        <h1 className="text-2xl font-bold text-gray-900">Admin Girişi</h1>
                        <p className="text-gray-600 mt-2">Yönetim paneline hoş geldiniz</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="username">Kullanıcı Adı</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                required
                                placeholder="admin"
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Şifre</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="••••••••"
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        <p>Varsayılan: admin / admin123</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
