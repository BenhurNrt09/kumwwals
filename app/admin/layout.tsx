'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { LayoutDashboard, Building2, LogOut, Menu, Image, MessageSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated' && pathname !== '/admin/login') {
            router.push('/admin/login');
        }
    }, [status, router, pathname]);

    if (pathname === '/admin/login') {
        return children;
    }

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Yükleniyor...</div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Şubeler', href: '/admin/subeler', icon: Building2 },
        { name: 'Galeri', href: '/admin/galeri', icon: Image },
        { name: 'İletişim', href: '/admin/iletisim', icon: MessageSquare },
        { name: 'Kullanıcılar', href: '/admin/users', icon: User },
    ];

    const handleLogout = () => {
        signOut({ callbackUrl: '/admin/login' });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-purple-900 text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center h-20 border-b border-purple-800">
                        <img
                            src="/assets/img/kumlogo.jpeg"
                            alt="Kumwals"
                            className="h-12"
                        />
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-purple-800 text-white'
                                        : 'text-purple-200 hover:bg-purple-800 hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    {item.name}
                                </a>
                            );
                        })}
                    </nav>

                    {/* User Info & Logout */}
                    <div className="p-4 border-t border-purple-800">
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="w-full justify-start text-purple-200 border-purple-700 hover:bg-purple-800 hover:text-white"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Çıkış Yap
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Top Bar */}
                <div className="bg-white shadow-sm lg:hidden">
                    <div className="px-4 py-3">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Page Content */}
                <main className="min-h-screen">
                    {children}
                </main>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
