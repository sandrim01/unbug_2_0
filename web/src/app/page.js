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
    Monitor,
    ShieldAlert
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState('Overview');

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="flex h-full w-full p-6 gap-6 bg-black" style={{ display: 'flex', height: '100vh', width: '100vw', padding: '1.5rem', gap: '1.5rem', backgroundColor: 'black' }}>
            <div className="mesh-bg" />

            {/* Sidebar */}
            <aside className="bento-panel" style={{ width: '20rem', padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
                    <div style={{ width: '3rem', height: '3rem', backgroundColor: 'white', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyCenter: 'center', boxShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
                        <Zap size={24} color="black" style={{ margin: 'auto' }} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.05em', color: 'white', fontStyle: 'italic' }}>UNBUG</h1>
                        <p style={{ fontSize: '0.6rem', fontWeight: 900, color: '#666', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Enterprise</p>
                    </div>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button onClick={() => setActiveTab('Overview')} className={`nav-item ${activeTab === 'Overview' ? 'active' : ''}`}>
                        <LayoutDashboard size={18} /> Overview
                    </button>
                    <button onClick={() => setActiveTab('Orders')} className={`nav-item ${activeTab === 'Orders' ? 'active' : ''}`}>
                        <FileText size={18} /> Orders
                    </button>
                    <button onClick={() => setActiveTab('Inventory')} className={`nav-item ${activeTab === 'Inventory' ? 'active' : ''}`}>
                        <Package size={18} /> Inventory
                    </button>
                    <button onClick={() => setActiveTab('Clients')} className={`nav-item ${activeTab === 'Clients' ? 'active' : ''}`}>
                        <Users size={18} /> Clients
                    </button>
                </nav>

                <div style={{ marginTop: 'auto' }}>
                    <button className="nav-item" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <Settings size={18} /> Settings
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto', paddingRight: '0.5rem' }}>

                {/* Top Header */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 1rem' }}>
                    <div>
                        <h2 className="heading-xl title-reveal">DASHBOARD</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 900, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                <div className="dot-online" /> Systems Active
                            </span>
                            <span style={{ color: '#444', fontSize: '0.8rem' }}>•</span>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>February 2026</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
                            <input type="text" className="glass-input" placeholder="SYSTEM SEARCH..." style={{ width: '18rem', paddingLeft: '2.5rem', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }} />
                        </div>
                        <button className="btn-primary">New Action</button>
                    </div>
                </header>

                {/* Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', padding: '0 1rem' }}>
                    <div className="bento-panel stat-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '1rem', color: '#3b82f6' }}><Wallet size={24} /></div>
                            <span style={{ color: '#10b981', fontSize: '0.7rem', fontWeight: 900 }}>+12.5%</span>
                        </div>
                        <div>
                            <p style={{ color: '#555', fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Revenue MTD</p>
                            <h3 className="title-reveal" style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.05em' }}>$84.2K</h3>
                        </div>
                    </div>

                    <div className="bento-panel stat-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ padding: '1rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '1rem', color: '#a855f7' }}><Monitor size={24} /></div>
                            <span style={{ color: '#10b981', fontSize: '0.7rem', fontWeight: 900 }}>Optimal</span>
                        </div>
                        <div>
                            <p style={{ color: '#555', fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>System Capacity</p>
                            <h3 className="title-reveal" style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.05em' }}>98.2%</h3>
                        </div>
                    </div>

                    <div className="bento-panel stat-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '1rem', color: '#f59e0b' }}><Zap size={24} /></div>
                            <span style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: 900 }}>-0.4%</span>
                        </div>
                        <div>
                            <p style={{ color: '#555', fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Efficiency Rate</p>
                            <h3 className="title-reveal" style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.05em' }}>0.94</h3>
                        </div>
                    </div>
                </div>

                {/* Activity Section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem', padding: '0 1rem', flex: 1 }}>
                    <div className="bento-panel" style={{ gridColumn: 'span 8', padding: '3rem', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.03em', fontStyle: 'italic' }}>OPERATIONAL FEED</h3>
                            <span style={{ fontSize: '0.6rem', fontWeight: 900, color: '#444', letterSpacing: '0.2em' }}>SYNCED LIVE</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.01)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <span style={{ fontSize: '2rem', fontWeight: 900, color: '#222' }}>0{i}</span>
                                        <div>
                                            <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>Core Migration Alpha-{i}</h4>
                                            <p style={{ fontSize: '0.65rem', color: '#555', fontWeight: 700, textTransform: 'uppercase', marginTop: '0.2rem' }}>Enterprise Unit • Feb 13</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} color="#333" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="bento-panel" style={{ flex: 1, padding: '2rem', backgroundColor: 'rgba(59, 130, 246, 0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                            <p style={{ fontSize: '0.6rem', fontWeight: 900, color: '#3b82f6', letterSpacing: '0.3em', marginBottom: '1rem' }}>GLOBAL LOAD</p>
                            <h4 style={{ fontSize: '3rem', fontWeight: 900, fontStyle: 'italic' }}>OPTIMIZED</h4>
                            <div style={{ marginTop: '2rem', display: 'flex', gap: '4px', alignItems: 'flex-end', height: '40px' }}>
                                {[2, 5, 3, 8, 4, 9, 6].map((h, i) => (
                                    <div key={i} style={{ width: '4px', height: `${h * 10}%`, backgroundColor: i === 5 ? 'white' : '#222', borderRadius: '10px' }} />
                                ))}
                            </div>
                        </div>

                        <div className="bento-panel" style={{ padding: '2rem', borderLeft: '4px solid #ef4444' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                <ShieldAlert size={16} color="#ef4444" />
                                <span style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.1em' }}>SYSTEM ALERT</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', fontWeight: 800 }}>SSD Core Capacity Critical</p>
                            <p style={{ fontSize: '0.65rem', color: '#555', marginTop: '0.4rem' }}>Check Inventory Unit A-102</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

const Wallet = ({ size, color }) => <FileText size={size} color={color} />; // Proxy for Wallet if not available
