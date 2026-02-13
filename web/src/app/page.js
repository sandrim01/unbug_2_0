'use client'

import { motion } from 'framer-motion';
import {
    BarChart3,
    Users,
    Settings,
    Package,
    FileText,
    Wallet,
    Ticket,
    ChevronRight,
    Plus,
    LayoutDashboard,
    Search,
    Bell,
    LogOut,
    TrendingUp,
    Clock
} from 'lucide-react';
import { useState } from 'react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl nav-item ${active ? 'active' : ''}`}
    >
        <Icon size={20} className={active ? 'text-primary' : ''} />
        <span className="font-medium text-sm">{label}</span>
        {active && <motion.div layoutId="activeNav" className="ml-auto w-1 h-5 bg-primary rounded-full" />}
    </button>
);

const StatCard = ({ title, value, change, icon: Icon, gradient }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-6 relative overflow-hidden group"
    >
        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${gradient}`} />

        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${gradient} bg-opacity-10 text-white shadow-lg`}>
                <Icon size={22} />
            </div>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
                <TrendingUp size={14} />
                {change}
            </div>
        </div>

        <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{title}</p>
            <h3 className="text-white text-3xl font-bold mt-1 tracking-tight">{value}</h3>
        </div>
    </motion.div>
);

export default function Dashboard() {
    const [activeNav, setActiveNav] = useState('Painel');

    return (
        <div className="min-h-screen bg-transparent flex">
            {/* Mesh Background */}
            <div className="bg-mesh" />

            {/* Sidebar */}
            <aside className="w-64 glass-panel border-r border-white/5 p-6 flex flex-col fixed h-full z-50">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-10 h-10 rounded-xl premium-btn flex items-center justify-center font-bold text-xl text-white">U</div>
                    <span className="text-xl font-bold tracking-tight text-white">Unbug<span className="text-primary text-2xl">.</span></span>
                </div>

                <nav className="space-y-2 flex-1">
                    <SidebarItem icon={LayoutDashboard} label="Painel" active={activeNav === 'Painel'} onClick={() => setActiveNav('Painel')} />
                    <SidebarItem icon={FileText} label="Serviços" active={activeNav === 'Serviços'} onClick={() => setActiveNav('Serviços')} />
                    <SidebarItem icon={Package} label="Estoque" active={activeNav === 'Estoque'} onClick={() => setActiveNav('Estoque')} />
                    <SidebarItem icon={Users} label="Clientes" active={activeNav === 'Clientes'} onClick={() => setActiveNav('Clientes')} />
                    <SidebarItem icon={BarChart3} label="Relatórios" active={activeNav === 'Relatórios'} onClick={() => setActiveNav('Relatórios')} />
                    <SidebarItem icon={Settings} label="Ajustes" active={activeNav === 'Ajustes'} onClick={() => setActiveNav('Ajustes')} />
                </nav>

                <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all">
                    <LogOut size={20} />
                    <span className="font-medium text-sm">Sair</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {/* Top Header */}
                <header className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4 flex-1 max-w-xl">
                        <div className="relative w-full group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Pesquisar OS, Clientes ou Peças..."
                                className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all focus:ring-4 ring-primary/10"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-slate-400 hover:text-white transition-colors">
                            <Bell size={22} />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#020617]" />
                        </button>
                        <div className="h-8 w-[1px] bg-white/10" />
                        <div className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold border-2 border-white/10">AD</div>
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-bold text-white leading-none">Administrador</p>
                                <p className="text-[10px] text-slate-500 font-medium tracking-wide mt-1 uppercase">Admin Master</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Welcome Section */}
                <div className="mb-10 animate-in">
                    <h2 className="text-4xl font-bold text-white tracking-tight">Painel Executivo</h2>
                    <p className="text-slate-400 mt-2 font-medium flex items-center gap-2">
                        <Clock size={16} />
                        Sexta-feira, 13 de Fevereiro | <span className="text-primary font-semibold">Tudo em dia</span>
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard title="OS Pendentes" value="12" change="+3.2%" icon={FileText} gradient="from-amber-400 to-orange-500" />
                    <StatCard title="Faturamento" value="R$ 15.420" change="+12.5%" icon={Wallet} gradient="from-emerald-400 to-teal-500" />
                    <StatCard title="Clientes Ativos" value="158" change="+8.1%" icon={Users} gradient="from-indigo-400 to-blue-500" />
                    <StatCard title="Casos Abertos" value="5" change="-2.4%" icon={Ticket} gradient="from-rose-400 to-pink-500" />
                </div>

                {/* Main Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activity Table */}
                    <div className="lg:col-span-2">
                        <div className="glass-card rounded-[32px] p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold text-white">Ordens de Serviço Ativas</h3>
                                <button className="text-sm font-bold text-primary hover:text-indigo-400 transition-colors">Visualizar Todas</button>
                            </div>

                            <div className="space-y-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-primary/20 transition-all leading-none focus:outline-none focus:ring-0">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm tracking-tight leading-none mb-1">Manutenção Servidor Dell - OS 1420{i}</p>
                                                <p className="text-xs text-slate-500 font-medium">TechCorp Solutions • <span className="text-slate-600 italic">Há 2 horas</span></p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right hidden sm:block">
                                                <p className="text-white font-bold text-sm leading-none mb-1">R$ 1.450</p>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-right">Crédito</p>
                                            </div>
                                            <span className="px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                                Concluído
                                            </span>
                                            <ChevronRight className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" size={18} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions & Low Stock */}
                    <div className="space-y-8">
                        <div className="glass-card rounded-[32px] p-8">
                            <h3 className="text-lg font-bold text-white mb-6">Ações Executivas</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="p-4 rounded-3xl bg-primary/10 border border-primary/20 flex flex-col items-center gap-2 hover:bg-primary transition-all group overflow-hidden relative">
                                    <Plus className="text-primary group-hover:text-white transition-colors" size={24} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary group-hover:text-white transition-colors">Nova OS</span>
                                </button>
                                <button className="p-4 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center gap-2 hover:bg-white/10 transition-all group">
                                    <Package className="text-slate-400 group-hover:text-white transition-colors" size={24} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">Estoque</span>
                                </button>
                            </div>
                        </div>

                        <div className="glass-card rounded-[32px] p-8 bg-gradient-to-br from-rose-500/10 to-transparent border-l-4 border-l-rose-500">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-rose-500 rounded-lg shadow-lg shadow-rose-500/30">
                                    <Package size={18} className="text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Alerta Estoque</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center group cursor-default">
                                    <div>
                                        <p className="text-white text-sm font-bold leading-none mb-1">SSD 240GB Kingston</p>
                                        <p className="text-[10px] text-slate-500 font-medium">Peça Hardware</p>
                                    </div>
                                    <span className="text-rose-500 font-black text-sm p-1.5 px-3 rounded-lg bg-rose-500/10">2U</span>
                                </div>
                                <div className="h-[1px] bg-white/5" />
                                <div className="flex justify-between items-center group cursor-default">
                                    <div>
                                        <p className="text-white text-sm font-bold leading-none mb-1">Cabo de Rede CAT6</p>
                                        <p className="text-[10px] text-slate-500 font-medium">Infraestrutura</p>
                                    </div>
                                    <span className="text-amber-500 font-black text-sm p-1.5 px-3 rounded-lg bg-amber-500/10">15m</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
