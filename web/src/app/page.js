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
    ArrowUpRight,
    Monitor,
    ShieldCheck,
    Zap
} from 'lucide-react';

const NavItem = ({ icon: Icon, label, active }) => (
    <button className={`group flex items-center gap-4 py-3 px-4 rounded-xl transition-all ${active ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}>
        <Icon size={20} strokeWidth={active ? 2.5 : 2} />
        <span className="text-sm font-bold tracking-tight">{label}</span>
    </button>
);

const MetricCard = ({ label, value, trend, icon: Icon, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="obsidian-card p-8 rounded-[2rem] flex flex-col justify-between h-56"
    >
        <div className="flex justify-between items-start">
            <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-white shadow-2xl`}>
                <Icon size={24} />
            </div>
            <div className="flex items-center gap-1 text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                <ArrowUpRight size={14} className="text-emerald-500" />
                {trend}
            </div>
        </div>
        <div>
            <p className="subheading-elite text-[10px] mb-2 uppercase">{label}</p>
            <h3 className="heading-elite text-5xl font-black">{value}</h3>
        </div>
    </motion.div>
);

export default function Dashboard() {
    return (
        <div className="flex h-screen w-screen p-6 gap-6 bg-black overflow-hidden select-none">
            <div className="mesh-bg" />

            {/* Ultra Minimal Sidebar */}
            <aside className="w-20 lg:w-64 obsidian-card rounded-[2.5rem] p-8 flex flex-col items-center lg:items-stretch h-full">
                <div className="flex items-center gap-3 mb-16 px-2">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                        <ShieldCheck size={24} className="text-black" />
                    </div>
                    <span className="hidden lg:block text-2xl font-black tracking-tighter text-white uppercase italic">UNBUG</span>
                </div>

                <nav className="space-y-4 flex-1">
                    <NavItem icon={LayoutDashboard} label="Dashboard" active />
                    <NavItem icon={FileText} label="Orders" />
                    <NavItem icon={Package} label="Inventory" />
                    <NavItem icon={Users} label="Clients" />
                    <NavItem icon={BarChart3} label="Reports" />
                </nav>

                <div className="mt-auto">
                    <button className="w-full btn-icon p-4 rounded-2xl flex items-center justify-center gap-2 group">
                        <Settings size={20} className="group-hover:rotate-90 transition-transform" />
                        <span className="hidden lg:block text-xs font-black uppercase tracking-widest">Settings</span>
                    </button>
                </div>
            </aside>

            {/* Main Experience */}
            <main className="flex-1 flex flex-col gap-6 h-full overflow-y-auto custom-scroll pr-2">

                {/* Elite Header */}
                <header className="flex justify-between items-center px-4 shrink-0">
                    <div>
                        <h1 className="heading-elite text-6xl font-black">OVERVIEW</h1>
                        <p className="subheading-elite text-[12px] mt-2">SYSTEM STATUS: <span className="text-emerald-500">OPERATIONAL</span> • FEB 2026</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <input
                                type="text"
                                placeholder="COMMAND SEARCH..."
                                className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-xs font-bold tracking-widest focus:outline-none focus:border-white/30 transition-all"
                            />
                        </div>
                        <button className="btn-obsidian uppercase tracking-wider">NEW PROJECT</button>
                    </div>
                </header>

                {/* Triple Bento Grid Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
                    <MetricCard label="Revenue MTD" value="$84.2K" trend="12.5%" icon={Wallet} color="bg-blue-600" />
                    <MetricCard label="Total Assets" value="1.24K" trend="8.1%" icon={Monitor} color="bg-purple-600" />
                    <MetricCard label="Efficiency" value="98.2%" trend="1.4%" icon={Zap} color="bg-amber-600" />
                </div>

                {/* Activity & Trends Bento */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 flex-1">

                    {/* Main Feed - Bento 8/12 */}
                    <div className="lg:col-span-8 obsidian-card rounded-[3rem] p-10 flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black italic tracking-tighter">LIVE FEED</h2>
                            <div className="flex gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em]">Sincronizado</span>
                            </div>
                        </div>

                        <div className="flex-1 space-y-4 overflow-y-auto pr-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="group p-6 rounded-3xl border border-white/5 hover:bg-white/5 transition-all flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center gap-6">
                                        <p className="text-3xl font-black text-white/10 group-hover:text-white/40 transition-colors">0{i}</p>
                                        <div>
                                            <h4 className="font-black tracking-tight text-white group-hover:text-blue-400 transition-colors">System Core Migration • Stage {i}</h4>
                                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Enterprise • Feb {12 + i}, 2026</p>
                                        </div>
                                    </div>
                                    <ArrowUpRight size={20} className="text-zinc-800 group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats - Bento 4/12 */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="flex-1 obsidian-card rounded-[3rem] p-10 bg-gradient-to-br from-white/5 to-transparent relative group overflow-hidden">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500 mb-8">Status Quota</h3>
                            <div className="flex items-center justify-center p-8">
                                <div className="w-40 h-40 rounded-full border-[10px] border-zinc-900 border-t-white relative animate-[spin_10s_linear_infinite]">
                                    <div className="absolute inset-x-0 inset-y-0 m-auto w-4 h-4 rounded-full bg-white shadow-[0_0_20px_#fff]" />
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <p className="text-4xl font-black heading-elite tracking-tighter">92%</p>
                                <p className="text-[10px] font-black text-zinc-600 mt-2 uppercase tracking-widest">Global Performance</p>
                            </div>
                            <div className="absolute top-0 right-0 p-8 scale-150 rotate-12 opacity-5 translate-x-1/2 -translate-y-1/2">
                                <Monitor size={120} />
                            </div>
                        </div>

                        <div className="obsidian-card rounded-[3rem] p-10 flex flex-col gap-4">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Inventory Alertas</p>
                            <div className="flex justify-between items-center group">
                                <span className="text-xs font-bold group-hover:text-white transition-colors">Core Unit [SSD-X]</span>
                                <span className="px-3 py-1 rounded-lg bg-rose-500/10 text-rose-500 text-[10px] font-black">2 CRITICAL</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <span className="text-xs font-bold group-hover:text-white transition-colors">Network Patch [A1]</span>
                                <span className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-500 text-[10px] font-black">REQ REFILL</span>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
