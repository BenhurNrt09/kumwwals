'use client';

import { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    Download,
    CheckCircle2,
    XCircle,
    MoreVertical,
    Calendar,
    CreditCard,
    DollarSign,
    Users
} from 'lucide-react';

interface Ticket {
    id: string;
    fullName: string;
    email: string | null;
    phone: string | null;
    numPeople: number;
    totalPrice: number;
    isPaid: boolean;
    bookingDate: string;
    branch: {
        name: string;
        city: string;
    };
}

export default function AdminFinancePage() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all'); // all, paid, unpaid

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const res = await fetch('/api/tickets');
            const data = await res.json();
            if (Array.isArray(data)) {
                setTickets(data);
            }
        } catch (error) {
            console.error('Error fetching tickets:', error);
        } finally {
            setLoading(false);
        }
    };

    const togglePaymentStatus = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/tickets/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isPaid: !currentStatus })
            });

            if (res.ok) {
                // Optimistic update
                setTickets(tickets.map(t =>
                    t.id === id ? { ...t, isPaid: !currentStatus } : t
                ));
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Güncelleme sırasında hata oluştu.');
        }
    };

    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch =
            ticket.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.branch.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            filterStatus === 'all' ? true :
                filterStatus === 'paid' ? ticket.isPaid :
                    !ticket.isPaid;

        return matchesSearch && matchesStatus;
    });

    const totalRevenue = tickets.reduce((sum, t) => t.isPaid ? sum + t.totalPrice : sum, 0);
    const totalPotentialRevenue = tickets.reduce((sum, t) => sum + t.totalPrice, 0);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Finans Yönetimi</h1>
                    <p className="text-gray-500">Bilet satışlarını ve ödemeleri takip edin</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                        <Download size={18} />
                        Rapor İndir
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Toplam Gelir (Ödenen)</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalRevenue.toLocaleString('tr-TR')} ₺</h3>
                        </div>
                        <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                            <DollarSign size={24} />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Bekleyen Ödeme</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">{(totalPotentialRevenue - totalRevenue).toLocaleString('tr-TR')} ₺</h3>
                            </div>
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                                <Calendar size={24} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Toplam Bilet</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">{tickets.length}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <Users size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center justify-between">
                <div className="relative flex-1 min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Müşteri veya şube ara..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter size={20} className="text-gray-400" />
                    <select
                        className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">Tüm Durumlar</option>
                        <option value="paid">Ödenenler</option>
                        <option value="unpaid">Ödenmeyenler</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Tarih</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Müşteri</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Şube</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Kişi</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Toplam</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Durum</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">Yükleniyor...</td>
                                </tr>
                            ) : filteredTickets.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">Kayıt bulunamadı.</td>
                                </tr>
                            ) : (
                                filteredTickets.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(ticket.bookingDate).toLocaleDateString('tr-TR')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{ticket.fullName}</div>
                                            <div className="text-xs text-gray-500">{ticket.phone || '-'}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{ticket.branch.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{ticket.numPeople} Kişi</td>
                                        <td className="px-6 py-4 text-sm font-medium text-purple-600">{ticket.totalPrice} ₺</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${ticket.isPaid
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {ticket.isPaid ? 'Ödendi' : 'Ödenmedi'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => togglePaymentStatus(ticket.id, ticket.isPaid)}
                                                className={`p-2 rounded-lg transition ${ticket.isPaid
                                                        ? 'text-red-600 hover:bg-red-50'
                                                        : 'text-green-600 hover:bg-green-50'
                                                    }`}
                                                title={ticket.isPaid ? "Ödenmedi Olarak İşaretle" : "Ödendi Olarak İşaretle"}
                                            >
                                                {ticket.isPaid ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
