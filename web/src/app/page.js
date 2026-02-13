'use client'

import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    FileText,
    Package,
    Users,
    BarChart3,
    Settings,
    Search,
    Zap,
    Bell,
    ChevronRight,
    Plus,
    ArrowUpRight,
    Activity,
    Cpu,
    Shield
} from 'lucide-react';
import { useState, useEffect } from 'react';

const SidebarLink = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${active
                ? 'nav-item-active text-black'
                : 'text-zinc-500 hover:text-white hover:bg-white/5'
            }`}
    >
        <Icon size={20} />
        <span className="font-bold text-sm tracking-tight">{label}</span>
    </button>
);

const MetricBox = ({ label, value, trend, icon: Icon, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="premium-card rounded-[2.5rem] p-8 flex flex-col justify-between h-64"
    >
        <div className="flex justify-between items-start">
            <div className={`p-4 rounded-2xl ${color} bg-white/5 border border-white/10 text-white`}>
                <Icon size={24} />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                <ArrowUpRight size={14} className="text-emerald-500" />
                {trend}
            </div>
        </div>
        <div>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{label}</p>
            <h3 className="title-reveal text-6xl font-black">{value}</h3>
        </div>
    </motion.div>
);

export default function Home() {
    const [activeTab, setActiveTab] = useState('DASHBOARD');
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="flex h-screen w-screen bg-black overflow-hidden p-6 gap-6">
            <div className="mesh-gradient" />

            {/* Sidebar - The Control Center */}
            <aside className="w-80 premium-card rounded-[3rem] p-8 flex flex-col">
                <div className="flex items-center gap-4 mb-16 px-2">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        <Shield size={24} className="text-black" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">UNBUG</h1>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] leading-none">Enterprise</p>
                    </div>
                </div>

                <nav className="space-y-3 flex-1">
                    <SidebarLink icon={LayoutDashboard} label="DASHBOARD" active={activeTab === 'DASHBOARD'} onClick={() => setActiveTab('DASHBOARD')} />
                    <SidebarLink icon={FileText} label="ORDERS" active={activeTab === 'ORDERS'} onClick={() => setActiveTab('ORDERS')} />
                    <SidebarLink icon={Package} label="INVENTORY" active={activeTab === 'INVENTORY'} onClick={() => setActiveTab('INVENTORY')} />
                    <SidebarLink icon={Users} label="CLIENTS" active={activeTab === 'CLIENTS'} onClick={() => setActiveTab('CLIENTS')} />
                    <SidebarLink icon={BarChart3} label="REPORTS" active={activeTab === 'REPORTS'} onClick={() => setActiveTab('REPORTS')} />
                </nav>

                <div className="mt-auto">
                    <button className="w-full premium-card p-5 rounded-3xl flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden">
                            <Settings size={20} className="text-zinc-400 group-hover:rotate-90 transition-transform duration-500" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-black text-white leading-none">SETTINGS</p>
                            <p className="text-[10px] text-zinc-500 mt-1 uppercase font-bold">V 2.5.0</p>
                        </div>
                    </button>
                </div>
            </aside>

            {/* Main viewport */}
            <main className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">

                {/* Elite Navigation Bar */}
                <header className="flex justify-between items-end px-4 py-4 mt-4">
                    <div>
                        <h2 className="title-reveal text-8xl font-black leading-none">OVERVIEW</h2>
                        <div className="flex items-center gap-4 mt-4">
                            <span className="flex items-center gap-2 text-[11px] font-black text-emerald-500 uppercase tracking-widest">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 status-glow animate-pulse" />
                                Systems Operational
                            </span>
                            <span className="w-1 h-1 rounded-full bg-zinc-800" />
                            <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">February 13, 2026</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="EXECUTE SEARCH..."
                                className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-8 text-xs font-black tracking-widest focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all w-80"
                            />
                        </div>
                        <button className="w-14 h-14 premium-card rounded-2xl flex items-center justify-center text-zinc-400 hover:text-white relative">
                            <Bell size={22} />
                            <span className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full status-glow" />
                        </button>
                        <button className="h-14 px-8 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-95 transition-transform active:scale-90">
                            NEW ORDER
                        </button>
                    </div>
                </header>

                {/* Core Metrics Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 px-4">
                    <MetricBox label="REVENUE MTD" value="$84.2K" trend="12.4%" icon={Wallet} color="text-blue-500" />
                    <MetricBox label="CORE CAPACITY" value="98.2%" trend="1.2%" icon={Cpu} color="text-purple-500" />
                    <MetricBox label="EFFICIENCY" value="0.94" trend="0.4%" icon={Zap} color="text-amber-500" />
                </div>

                {/* Main Operational Feed */}
                <div className="grid grid-cols-12 gap-6 px-4 mb-10 min-h-[500px]">

                    <div className="col-span-8 premium-card rounded-[3.5rem] p-12 flex flex-col">
                        <div className="flex justify-between items-center mb-12">
                            <div>
                                <h3 className="text-2xl font-black tracking-tighter text-white italic">OPERATIONAL FEED</h3>
                                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mt-2">Real-time system updates</p>
                            </div>
                            <button className="text-[10px] font-black text-zinc-400 hover:text-white border-b border-zinc-800 pb-1 tracking-[0.2em] transition-colors">VIEW ALL HISTORY</button>
                        </div>

                        <div className="space-y-4 flex-1 overflow-y-auto pr-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="group flex items-center justify-between p-8 rounded-[2rem] border border-white/5 hover:bg-white/[0.02] hover:border-white/20 transition-all cursor-pointer">
                                    <div className="flex items-center gap-8">
                                        <span className="text-4xl font-black text-zinc-900 group-hover:text-zinc-700 transition-colors">0{i}</span>
                                        <div>
                                            <h4 className="text-lg font-black tracking-tight text-white/90 group-hover:text-white transition-colors">Server Cluster Alpha-{i}42 • Maintenance</h4>
                                            <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest mt-1">Enterprise Infra • <span className="text-blue-500/80">Completed</span></p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-10">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-lg font-black text-white leading-none">$ 2,400.00</p>
                                            <p className="text-[10px] text-zinc-600 font-black uppercase mt-2 tracking-widest">USD</p>
                                        </div>
                                        <ChevronRight className="text-zinc-800 group-hover:text-white group-hover:translate-x-1 transition-all" size={24} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-4 flex flex-col gap-6">
                        <div className="flex-1 premium-card rounded-[3.5rem] p-12 bg-gradient-to-br from-white/5 to-transparent flex flex-col justify-between overflow-hidden relative">
                            <div className="relative z-10">
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4">SYSTEM LOAD</p>
                                <h4 className="text-4xl font-black text-white tracking-tighter italic">OPTIMAL</h4>
                            </div>

                            <div className="relative h-40 flex items-end gap-2 px-2">
                                {[40, 20, 60, 30, 80, 45, 90, 50, 70, 40].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ delay: i * 0.1, duration: 1, ease: "circOut" }}
                                        className={`flex-1 rounded-full ${i === 6 ? 'bg-white shadow-[0_0_30px_rgba(255,255,255,0.4)]' : 'bg-zinc-800'}`}
                                    />
                                ))}
                            </div>

                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-zinc-800/20 blur-[80px] rounded-full" />
                        </div>

                        <div className="premium-card rounded-[3.5rem] p-12">
                            <div className="flex items-center gap-3 mb-8">
                                <Activity size={20} className="text-emerald-500" />
                                <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Health Check</p>
                            </div>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-zinc-500">DATABASE</span>
                                    <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full uppercase">SYNCED</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-zinc-500">LATENCY</span>
                                    <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full uppercase">12MS</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-zinc-500">API UPTIME</span>
                                    <span className="text-[10px] font-black text-white bg-white/5 px-3 py-1 rounded-full uppercase">99.99%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
