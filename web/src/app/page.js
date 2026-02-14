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
    const [tickets, setTickets] = useState([
        { id: 1, subject: 'SSD Failure - Laptop', guest_name: 'Marcos Silva', status: 'open', priority: 'high', created_at: '2026-02-13T10:00:00' },
        { id: 2, subject: 'Software Install', guest_name: 'Julia Lima', status: 'pending', priority: 'low', created_at: '2026-02-13T11:30:00' }
    ]);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return (
                    <>
                        {/* Metrics Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', padding: '0 1rem' }}>
                            <div className="bento-panel stat-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '1rem', color: '#3b82f6' }}><FileText size={24} /></div>
                                    <span style={{ color: '#10b981', fontSize: '0.7rem', fontWeight: 900 }}>+12.5%</span>
                                </div>
                                <div>
                                    <p style={{ color: '#555', fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Tickets MTD</p>
                                    <h3 className="title-reveal" style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.05em' }}>124</h3>
                                </div>
                            </div>

                            <div className="bento-panel stat-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ padding: '1rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '1rem', color: '#a855f7' }}><Monitor size={24} /></div>
                                    <span style={{ color: '#10b981', fontSize: '0.7rem', fontWeight: 900 }}>Optimal</span>
                                </div>
                                <div>
                                    <p style={{ color: '#555', fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Avg. Resolution</p>
                                    <h3 className="title-reveal" style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.05em' }}>4.2h</h3>
                                </div>
                            </div>

                            <div className="bento-panel stat-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '1rem', color: '#f59e0b' }}><Zap size={24} /></div>
                                    <span style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: 900 }}>-0.4%</span>
                                </div>
                                <div>
                                    <p style={{ color: '#555', fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>SLA Compliance</p>
                                    <h3 className="title-reveal" style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.05em' }}>97%</h3>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem', padding: '0 1rem', flex: 1 }}>
                            <div className="bento-panel" style={{ gridColumn: 'span 8', padding: '3rem', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.03em', fontStyle: 'italic' }}>LATEST TICKETS</h3>
                                    <span style={{ fontSize: '0.6rem', fontWeight: 900, color: '#444', letterSpacing: '0.2em' }}>SYNCED LIVE</span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
                                    {tickets.map((t, i) => (
                                        <div key={t.id} style={{ padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.01)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                                <span style={{ fontSize: '2rem', fontWeight: 900, color: '#222' }}>{i + 1}</span>
                                                <div>
                                                    <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>{t.subject}</h4>
                                                    <p style={{ fontSize: '0.65rem', color: '#555', fontWeight: 700, textTransform: 'uppercase', marginTop: '0.2rem' }}>{t.guest_name} • Feb 13</p>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <span style={{ fontSize: '0.6rem', padding: '4px 10px', borderRadius: '20px', backgroundColor: t.priority === 'high' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)', color: t.priority === 'high' ? '#ef4444' : '#3b82f6', fontWeight: 900, textTransform: 'uppercase' }}>
                                                    {t.priority}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div className="bento-panel" style={{ flex: 1, padding: '2rem', backgroundColor: 'rgba(59, 130, 246, 0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                    <p style={{ fontSize: '0.6rem', fontWeight: 900, color: '#3b82f6', letterSpacing: '0.3em', marginBottom: '1rem' }}>SYSTEM LOAD</p>
                                    <h4 style={{ fontSize: '3rem', fontWeight: 900, fontStyle: 'italic' }}>STABLE</h4>
                                </div>

                                <div className="bento-panel" style={{ padding: '2rem', borderLeft: '4px solid #ef4444' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                        <ShieldAlert size={16} color="#ef4444" />
                                        <span style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.1em' }}>ALERTS</span>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', fontWeight: 800 }}>3 Pending Tickets Over 24h</p>
                                </div>
                            </div>
                        </div>
                    </>
                );
            case 'Tickets':
                return (
                    <div className="bento-panel" style={{ flex: 1, margin: '0 1rem', padding: '3rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: 900, fontStyle: 'italic' }}>TICKET MANAGEMENT</h2>
                            <button className="btn-primary">Filter</button>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                            <thead>
                                <tr style={{ color: '#555', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    <th style={{ textAlign: 'left', padding: '1rem' }}>ID</th>
                                    <th style={{ textAlign: 'left', padding: '1rem' }}>Subject</th>
                                    <th style={{ textAlign: 'left', padding: '1rem' }}>Client</th>
                                    <th style={{ textAlign: 'left', padding: '1rem' }}>Priority</th>
                                    <th style={{ textAlign: 'left', padding: '1rem' }}>Status</th>
                                    <th style={{ textAlign: 'right', padding: '1rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map(t => (
                                    <tr key={t.id} style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '1rem' }}>
                                        <td style={{ padding: '1.5rem', borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}>#{t.id}</td>
                                        <td style={{ padding: '1.5rem', fontWeight: 700 }}>{t.subject}</td>
                                        <td style={{ padding: '1.5rem' }}>{t.guest_name}</td>
                                        <td style={{ padding: '1.5rem' }}>
                                            <span style={{ fontSize: '0.6rem', padding: '4px 10px', borderRadius: '20px', backgroundColor: t.priority === 'high' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)', color: t.priority === 'high' ? '#ef4444' : '#3b82f6', fontWeight: 900 }}>{t.priority}</span>
                                        </td>
                                        <td style={{ padding: '1.5rem' }}>{t.status}</td>
                                        <td style={{ padding: '1.5rem', textAlign: 'right', borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem' }}>
                                            <button style={{ color: '#3b82f6', fontSize: '0.7rem', fontWeight: 900 }}>RESOLVE</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'Clients':
                return (
                    <div className="bento-panel" style={{ flex: 1, margin: '0 1rem', padding: '3rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 900, fontStyle: 'italic', marginBottom: '2rem' }}>CLIENT DATABASE</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bento-panel" style={{ padding: '2rem', backgroundColor: 'rgba(255,255,255,0.03)' }}>
                                    <div style={{ width: '3rem', height: '3rem', borderRadius: '1rem', backgroundColor: '#3b82f622', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                        <Users size={20} color="#3b82f6" />
                                    </div>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Client {i}</h4>
                                    <p style={{ fontSize: '0.8rem', color: '#555', marginTop: '0.5rem' }}>contact@client{i}.com</p>
                                    <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#555' }}>3 ACTIVE JOBS</span>
                                        <ChevronRight size={16} color="#333" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-full w-full p-6 gap-6 bg-black" style={{ display: 'flex', height: '100vh', width: '100vw', padding: '1.5rem', gap: '1.5rem', backgroundColor: 'black' }}>
            <div className="mesh-bg" />

            {/* Sidebar */}
            <aside className="bento-panel" style={{ width: '20rem', padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
                    <div style={{ width: '3rem', height: '3rem', backgroundColor: 'white', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
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
                    <button onClick={() => setActiveTab('Tickets')} className={`nav-item ${activeTab === 'Tickets' ? 'active' : ''}`}>
                        <FileText size={18} /> Tickets
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
                        <h2 className="heading-xl title-reveal" style={{ textTransform: 'uppercase' }}>{activeTab}</h2>
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

                {renderContent()}
            </main>
        </div>
    );
}

const Wallet = ({ size, color }) => <FileText size={size} color={color} />; // Proxy for Wallet if not available
