'use client'

import {
    LayoutDashboard,
    LifeBuoy,
    Users,
    Settings,
    BarChart3,
    Bell,
    Search,
    Plus,
    UserCircle,
    Monitor,
    ChevronRight,
    TrendingUp,
    Clock,
    ShieldCheck
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState('Visão Geral');

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const renderContent = () => {
        switch (activeTab) {
            case 'Visão Geral':
                return (
                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* KPI Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                            {[
                                { label: 'Chamados (24h)', value: '38', trend: '+14%', color: '#2563eb' },
                                { label: 'Clientes Ativos', value: '142', trend: '+2%', color: '#10b981' },
                                { label: 'Tempo Médio Rec.', value: '1.8h', trend: 'Estável', color: '#6366f1' },
                                { label: 'Conformidade SLA', value: '99.2%', trend: '+0.4%', color: '#f59e0b' }
                            ].map((stat, i) => (
                                <div key={i} className="stat-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{stat.label}</span>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: stat.trend.includes('+') ? 'var(--success)' : 'var(--text-secondary)' }}>{stat.trend}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</h3>
                                </div>
                            ))}
                        </div>

                        {/* Recent Activity Section */}
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                            <div className="panel" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>MONITORAMENTO DE CHAMADOS</h3>
                                    <button className="nav-link" style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Relatório Completo</button>
                                </div>
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Protocolo</th>
                                            <th>Cliente</th>
                                            <th>Assunto</th>
                                            <th>Status</th>
                                            <th style={{ textAlign: 'right' }}>Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { id: 'OS-8842', client: 'Alpha Corp', subject: 'Manutenção Servidor', status: 'Em Análise', type: 'blue' },
                                            { id: 'OS-8843', client: 'Beta Systems', subject: 'Configuração VPN', status: 'Pendente', type: 'red' },
                                            { id: 'OS-8844', client: 'Indústrias Atlas', subject: 'Upgrade Hardware', status: 'Resolvido', type: 'green' }
                                        ].map((row, i) => (
                                            <tr key={i}>
                                                <td style={{ fontWeight: 600 }}>{row.id}</td>
                                                <td>{row.client}</td>
                                                <td>{row.subject}</td>
                                                <td><span className={`badge badge-${row.type}`}>{row.status}</span></td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <button style={{ color: 'var(--brand-primary)', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>Gerenciar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="panel" style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem' }}>INTEGRIDADE DO SISTEMA</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {[
                                        { label: 'Cloud Infrastructure', val: 99 },
                                        { label: 'Database Shard A', val: 84 },
                                        { label: 'API Endpoints', val: 100 }
                                    ].map((m, i) => (
                                        <div key={i}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>{m.label}</span>
                                                <span style={{ fontWeight: 600 }}>{m.val}%</span>
                                            </div>
                                            <div style={{ height: '4px', background: 'var(--bg-elevated)', borderRadius: '2px', overflow: 'hidden' }}>
                                                <div style={{ width: `${m.val}%`, height: '100%', background: m.val > 90 ? 'var(--success)' : 'var(--warning)', borderRadius: '2px' }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: '2rem', padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontSize: '0.75rem', fontWeight: 700 }}>
                                        <ShieldCheck size={14} /> TODOS OS SISTEMAS ONLINE
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Chamados':
                return (
                    <div style={{ padding: '2rem' }}>
                        <div className="panel" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>SISTEMA DE CHAMADOS</h2>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Gerenciamento centralizado de helpdesk.</p>
                                </div>
                                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Plus size={16} /> Novo Registro
                                </button>
                            </div>
                            <div style={{ border: '1px solid var(--border-main)', borderRadius: 'var(--radius-md)', padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                <Monitor size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.2 }} />
                                <p style={{ fontSize: '0.875rem' }}>Selecione um filtro para visualizar a base de dados.</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        Seção em desenvolvimento.
                    </div>
                );
        }
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', padding: '0 0.5rem' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--brand-primary)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <LifeBuoy size={20} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>UNBUG</h1>
                        <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Enterprise ERP</p>
                    </div>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <button onClick={() => setActiveTab('Visão Geral')} className={`nav-link ${activeTab === 'Visão Geral' ? 'active' : ''}`}>
                        <LayoutDashboard size={18} /> Painel de Controle
                    </button>
                    <button onClick={() => setActiveTab('Chamados')} className={`nav-link ${activeTab === 'Chamados' ? 'active' : ''}`}>
                        <LifeBuoy size={18} /> Gestão de Chamados
                    </button>
                    <button onClick={() => setActiveTab('Clientes')} className={`nav-link ${activeTab === 'Clientes' ? 'active' : ''}`}>
                        <Users size={18} /> Base de Clientes
                    </button>
                    <button onClick={() => setActiveTab('Financeiro')} className={`nav-link ${activeTab === 'Financeiro' ? 'active' : ''}`}>
                        <TrendingUp size={18} /> Movimentação Financeira
                    </button>
                    <button onClick={() => setActiveTab('Relatórios')} className={`nav-link ${activeTab === 'Relatórios' ? 'active' : ''}`}>
                        <BarChart3 size={18} /> Relatórios Estátisticos
                    </button>
                </nav>

                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-main)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', marginBottom: '1rem' }}>
                        <UserCircle size={32} color="var(--text-muted)" />
                        <div>
                            <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Administrador</p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ID: #001</p>
                        </div>
                    </div>
                    <button className="nav-link">
                        <Settings size={18} /> Administração
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-view">
                <header style={{ padding: '1.25rem 2rem', borderBottom: '1px solid var(--border-main)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface)' }}>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{activeTab}</h2>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input type="text" className="input-field" placeholder="Pesquisar..." style={{ width: '250px', paddingLeft: '2.5rem', paddingRight: '1rem', height: '36px' }} />
                        </div>
                        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', position: 'relative' }}>
                            <Bell size={18} />
                            <div style={{ position: 'absolute', top: -2, right: -2, width: '6px', height: '6px', background: 'var(--error)', borderRadius: '50%' }} />
                        </button>
                    </div>
                </header>

                <div style={{ flex: 1 }}>
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}
