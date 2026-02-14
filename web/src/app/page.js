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
    Monitor,
    ShieldAlert,
    Clock,
    UserCircle,
    Activity,
    LifeBuoy
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState('Visão Geral');
    const [tickets, setTickets] = useState([
        { id: 1042, subject: 'Falha de SSD - Servidor Principal', client: 'Alpha Tech Co.', status: 'Crítico', priority: 'Alta', time: '12m atrás' },
        { id: 1043, subject: 'Instalação de Backup Cloud', client: 'Indústrias Atlas', status: 'Em fila', priority: 'Média', time: '1h atrás' },
        { id: 1044, subject: 'Manutenção Preventiva', client: 'Beta Logística', status: 'Aberto', priority: 'Baixa', time: '3h atrás' }
    ]);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const renderContent = () => {
        switch (activeTab) {
            case 'Visão Geral':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '0 2rem' }}
                    >
                        {/* Status Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                            {[
                                { title: 'Chamados Hoje', val: '24', icon: <LifeBuoy size={20} />, trend: '+12%', color: 'var(--accent-blue)' },
                                { title: 'Tempo Médio', val: '4.2h', icon: <Clock size={20} />, trend: '-5%', color: 'var(--accent-indigo)' },
                                { title: 'Clientes Ativos', val: '156', icon: <Users size={20} />, trend: '+2%', color: 'var(--success)' },
                                { title: 'SLA Mensal', val: '98.4%', icon: <ShieldAlert size={20} />, trend: 'Estável', color: 'var(--warning)' }
                            ].map((s, i) => (
                                <div key={i} className="bento-panel stat-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                        <div style={{ backgroundColor: `${s.color}15`, color: s.color, padding: '0.75rem', borderRadius: '0.75rem' }}>
                                            {s.icon}
                                        </div>
                                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: s.trend.startsWith('+') ? 'var(--success)' : 'var(--text-muted)' }}>
                                            {s.trend}
                                        </span>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{s.title}</p>
                                        <h3 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{s.val}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Middle Section */}
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                            <div className="bento-panel" style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>CHAMADOS RECENTES</h3>
                                    <button style={{ background: 'transparent', border: 'none', color: 'var(--accent-blue)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Ver Todos</button>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {tickets.map(t => (
                                        <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', borderRadius: '1rem', border: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--surface-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700 }}>
                                                    #{t.id}
                                                </div>
                                                <div>
                                                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.2rem' }}>{t.subject}</h4>
                                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.client} • {t.time}</p>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <span style={{ fontSize: '0.7rem', padding: '4px 12px', borderRadius: '20px', backgroundColor: t.priority === 'Alta' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)', color: t.priority === 'Alta' ? 'var(--danger)' : 'var(--accent-blue)', fontWeight: 700 }}>
                                                    {t.priority}
                                                </span>
                                                <ChevronRight size={16} color="var(--text-muted)" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bento-panel" style={{ padding: '2rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '2rem' }}>CARGA DO SISTEMA</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {[
                                        { label: 'Cloud API', val: 94, color: 'var(--accent-blue)' },
                                        { label: 'Database', val: 78, color: 'var(--accent-indigo)' },
                                        { label: 'Auth Service', val: 99, color: 'var(--success)' }
                                    ].map((cap, idx) => (
                                        <div key={idx}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>{cap.label}</span>
                                                <span style={{ fontWeight: 600 }}>{cap.val}%</span>
                                            </div>
                                            <div style={{ height: '6px', backgroundColor: 'var(--surface-light)', borderRadius: '10px', overflow: 'hidden' }}>
                                                <div style={{ width: `${cap.val}%`, height: '100%', backgroundColor: cap.color, borderRadius: '10px' }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: '2.5rem', padding: '1.25rem', borderRadius: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--success)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                                        <Activity size={14} /> Sistema Nominal
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Nenhuma falha detectada nas últimas 24h.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            case 'Chamados':
                return (
                    <div style={{ padding: '0 2rem' }}>
                        <div className="bento-panel" style={{ padding: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>GERENCIAMENTO DE TICKETS</h2>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Total de 1,240 chamados registrados no sistema.</p>
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <button className="glass-input" style={{ width: 'auto', padding: '0.75rem 1rem' }}>Filtros Avançados</button>
                                    <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Plus size={16} /> Novo Ticket
                                    </button>
                                </div>
                            </div>

                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                                        <th style={{ padding: '1rem' }}>ID</th>
                                        <th style={{ padding: '1rem' }}>Assunto</th>
                                        <th style={{ padding: '1rem' }}>Cliente</th>
                                        <th style={{ padding: '1rem' }}>Prioridade</th>
                                        <th style={{ padding: '1rem' }}>Status</th>
                                        <th style={{ padding: '1rem', textAlign: 'right' }}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map(t => (
                                        <tr key={t.id} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                                            <td style={{ padding: '1.25rem', color: 'var(--text-muted)', fontWeight: 600 }}>#{t.id}</td>
                                            <td style={{ padding: '1.25rem', fontWeight: 600 }}>{t.subject}</td>
                                            <td style={{ padding: '1.25rem', color: 'var(--text-secondary)' }}>{t.client}</td>
                                            <td style={{ padding: '1.25rem' }}>
                                                <span style={{ fontSize: '0.7rem', padding: '4px 10px', borderRadius: '6px', border: '1px solid', borderColor: t.priority === 'Alta' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)', backgroundColor: t.priority === 'Alta' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(59, 130, 246, 0.05)', color: t.priority === 'Alta' ? 'var(--danger)' : 'var(--accent-blue)', fontWeight: 700 }}>
                                                    {t.priority}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1.25rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: t.status === 'Crítico' ? 'var(--danger)' : 'var(--warning)' }} />
                                                    {t.status}
                                                </div>
                                            </td>
                                            <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                                                <button style={{ background: 'transparent', border: 'none', color: 'var(--accent-blue)', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>Gerenciar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'Clientes':
                return (
                    <div style={{ padding: '0 2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>BASE DE CLIENTES</h2>
                            <button className="btn-primary">Adicionar Empresa</button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="bento-panel" style={{ padding: '2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                                        <div style={{ width: '56px', height: '56px', borderRadius: '14px', backgroundColor: 'var(--surface-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)' }}>
                                            <UserCircle size={28} />
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Empresa Corporativa {i}</h4>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Contrato Enterprise v2</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Chamados Abertos</span>
                                            <span style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>{i * 2}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Última Atividade</span>
                                            <span style={{ fontWeight: 600 }}>Há {i * 2}h</span>
                                        </div>
                                    </div>
                                    <button className="glass-input" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Detalhes do Perfil</button>
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
        <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: 'var(--background)' }}>
            <div className="mesh-bg" />

            {/* Fixed Sidebar */}
            <aside style={{ width: '280px', borderRight: '1px solid var(--border)', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(8, 9, 13, 0.8)', backdropFilter: 'blur(20px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem', padding: '0 0.5rem' }}>
                    <div style={{ width: '42px', height: '42px', backgroundColor: 'var(--accent-blue)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <Zap size={22} fill="white" />
                    </div>
                    <div>
                        <h1 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>UNBUG</h1>
                        <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Enterprise ERP</p>
                    </div>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <button onClick={() => setActiveTab('Visão Geral')} className={`nav-item ${activeTab === 'Visão Geral' ? 'active' : ''}`}>
                        <LayoutDashboard size={20} /> Visão Geral
                    </button>
                    <button onClick={() => setActiveTab('Chamados')} className={`nav-item ${activeTab === 'Chamados' ? 'active' : ''}`}>
                        <LifeBuoy size={20} /> Chamados
                    </button>
                    <button onClick={() => setActiveTab('Clientes')} className={`nav-item ${activeTab === 'Clientes' ? 'active' : ''}`}>
                        <Users size={20} /> Clientes
                    </button>
                    <button onClick={() => setActiveTab('Monitoramento')} className={`nav-item ${activeTab === 'Monitoramento' ? 'active' : ''}`}>
                        <Monitor size={20} /> Monitoramento
                    </button>
                    <button onClick={() => setActiveTab('Relatórios')} className={`nav-item ${activeTab === 'Relatórios' ? 'active' : ''}`}>
                        <BarChart3 size={20} /> Relatórios Estátisticos
                    </button>
                </nav>

                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0 0.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--surface-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <UserCircle size={20} color="var(--text-secondary)" />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Admin UNBUG</p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Gerente Técnico</p>
                        </div>
                    </div>
                    <button className="nav-item">
                        <Settings size={20} /> Configurações
                    </button>
                </div>
            </aside>

            {/* Main Scrollable View */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
                <header style={{ padding: '2rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'rgba(8, 9, 13, 0.8)', backdropFilter: 'blur(10px)' }}>
                    <div>
                        <h2 className="title-reveal" style={{ fontSize: '1.75rem', fontWeight: 800, textTransform: 'uppercase' }}>{activeTab}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--success)', letterSpacing: '0.05em' }}>
                                <div className="dot-online" /> OPERAÇÃO ATIVA
                            </span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input type="text" className="glass-input" placeholder="Pesquisar no sistema..." style={{ width: '24rem', paddingLeft: '2.75rem' }} />
                        </div>
                        <button style={{ position: 'relative', background: 'var(--surface)', border: '1px solid var(--border)', padding: '0.8rem', borderRadius: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                            <Bell size={20} />
                            <div style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', backgroundColor: 'var(--danger)', borderRadius: '50%', border: '2px solid var(--surface)' }} />
                        </button>
                    </div>
                </header>

                <section style={{ paddingBottom: '4rem' }}>
                    {renderContent()}
                </section>
            </main>
        </div>
    );
}
