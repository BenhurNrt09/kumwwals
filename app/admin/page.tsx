'use client';

import { useSession } from 'next-auth/react';
import { Building2, Users, Image, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
    const { data: session } = useSession();
    const [stats, setStats] = useState({
        branches: 0,
        contacts: 0,
        gallery: 0,
    });

    useEffect(() => {
        // Get branches count
        fetch('/api/branches')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setStats(prev => ({ ...prev, branches: data.length }));
                }
            })
            .catch(console.error);
    }, []);

    const statsCards = [
        {
            name: 'Toplam Şube',
            value: stats.branches,
            icon: Building2,
            color: 'bg-purple-500',
            href: '/admin/subeler'
        },
        {
            name: 'İletişim Mesajları',
            value: stats.contacts,
            icon: Phone,
            color: 'bg-blue-500',
            href: '/admin/iletisim'
        },
        {
            name: 'Galeri Görselleri',
            value: stats.gallery,
            icon: Image,
            color: 'bg-green-500',
            href: '/admin/galeri'
        },
    ];

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Hoş Geldiniz, {session?.user?.name || 'Admin'}!
                </h1>
                <p className="text-gray-600 mt-2">
                    Kumwals Yönetim Paneli
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {statsCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <a
                            key={stat.name}
                            href={stat.href}
                            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Hızlı İşlemler</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <a
                        href="/admin/subeler"
                        className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
                    >
                        <Building2 className="w-5 h-5 text-purple-600 mr-3" />
                        <span className="font-medium text-gray-700">Şube Yönetimi</span>
                    </a>

                    <a
                        href="/admin/galeri"
                        className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
                    >
                        <Image className="w-5 h-5 text-purple-600 mr-3" />
                        <span className="font-medium text-gray-700">Galeri Yönetimi</span>
                    </a>

                    <a
                        href="/admin/iletisim"
                        className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
                    >
                        <Phone className="w-5 h-5 text-purple-600 mr-3" />
                        <span className="font-medium text-gray-700">Mesajları İncele</span>
                    </a>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Son Aktiviteler</h2>
                <div className="text-center py-8 text-gray-500">
                    <p>Henüz aktivite bulunmuyor</p>
                </div>
            </div>
        </div>
    );
}
