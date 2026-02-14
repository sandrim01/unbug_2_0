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
import { motion } from 'framer-motion'; // Added framer-motion import

export default function Dashboard() {
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState('Visão Geral');

    // Data States
    const [data, setData] = useState({
        tickets: [],
        clients: [],
        inventory: [],
        finance: []
    });
    const [loading, setLoading] = useState(true);

    // UI States
    const [modal, setModal] = useState({ show: false, type: null }); // type: 'client', 'ticket', 'inventory', 'finance'
    const [form, setForm] = useState({});

    useEffect(() => {
        setMounted(true);
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Simulate API calls
            const [tRes, cRes, iRes, fRes] = await Promise.all([
                Promise.resolve({
                    json: () => ([
                        { id: '8842', subject: 'Manutenção Servidor', priority: 'high', status: 'open', client_id: '1' },
                        { id: '8843', subject: 'Configuração VPN', priority: 'medium', status: 'pending', client_id: '2' },
                        { id: '8844', subject: 'Upgrade Hardware', priority: 'low', status: 'closed', client_id: '3' }
                    ])
                }),
                Promise.resolve({
                    json: () => ([
                        { id: '1', name: 'Alpha Corp', document: '12.345.678/0001-90', email: 'contact@alpha.com', status: 'active' },
                        { id: '2', name: 'Beta Systems', document: '98.765.432/0001-10', email: 'info@beta.com', status: 'active' }
                    ])
                }),
                Promise.resolve({
                    json: () => ([
                        { id: '101', name: 'Servidor Dell R740', sku: 'SRV-DEL-R740', quantity: 5, unit_price: '15000.00', location: 'Rack A1' },
                        { id: '102', name: 'Switch Cisco Catalyst', sku: 'SW-CIS-CAT', quantity: 12, unit_price: '2500.00', location: 'Rack B2' }
                    ])
                }),
                Promise.resolve({
                    json: () => ([
                        { id: '201', date: new Date().toISOString(), type: 'income', amount: '10000.00', description: 'Serviços de Consultoria', category: 'Serviços' },
                        { id: '202', date: new Date().toISOString(), type: 'expense', amount: '1500.00', description: 'Aluguel Escritório', category: 'Despesas Fixas' }
                    ])
                }),
                Promise.resolve({
                    json: () => ([
                        { id: '301', name: 'Implantação ERP', start_date: '2026-01-15', end_date: '2026-03-30', status: 'active', client_id: '1' },
                        { id: '302', name: 'Atualização de Segurança', start_date: '2026-02-01', end_date: '2026-02-28', status: 'completed', client_id: '2' }
                    ])
                })
            ]);

            setData({
                tickets: await tRes.json() || [],
                clients: await cRes.json() || [],
                inventory: await iRes.json() || [],
                finance: await fRes.json() || [],
                projects: await pRes.json() || []
            });
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (e) => {
        e.preventDefault();
        const endpoint = {
            client: '/api/clients/',
            ticket: '/api/tickets/',
            inventory: '/api/inventory/',
            finance: '/api/finance/',
            project: '/api/projects/'
        }[modal.type];

        try {
            // Simulate API call
            console.log(`Submitting to ${endpoint}:`, form);
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

            setModal({ show: false, type: null });
            setForm({});
            fetchData(); // Re-fetch data to update UI
        } catch (error) {
            alert("Erro ao salvar dados.");
        }
    };

    if (!mounted) return null;

    const Modal = () => {
        if (!modal.show) return null;
        return (
            <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="panel" style={{ width: '500px', padding: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>ADICIONAR {modal.type === 'project' ? 'PROJETO' : modal.type?.toUpperCase()}</h2>
                        <button onClick={() => setModal({ show: false })} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Fechar</button>
                    </div>
                    <form onSubmit={handleAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {modal.type === 'client' && (
                            <>
                                <input required placeholder="Nome do Cliente" className="input-field" onChange={e => setForm({ ...form, name: e.target.value })} />
                                <input placeholder="Documento (CPF/CNPJ)" className="input-field" onChange={e => setForm({ ...form, document: e.target.value })} />
                                <input required type="email" placeholder="E-mail" className="input-field" onChange={e => setForm({ ...form, email: e.target.value })} />
                                <input placeholder="Telefone" className="input-field" onChange={e => setForm({ ...form, phone: e.target.value })} />
                            </>
                        )}
                        {modal.type === 'ticket' && (
                            <>
                                <input required placeholder="Assunto" className="input-field" onChange={e => setForm({ ...form, subject: e.target.value })} />
                                <textarea required rows={4} placeholder="Descrição" className="input-field" style={{ resize: 'none' }} onChange={e => setForm({ ...form, description: e.target.value })} />
                                <select className="input-field" onChange={e => setForm({ ...form, priority: e.target.value })}>
                                    <option value="low">Baixa</option>
                                    <option value="medium">Média</option>
                                    <option value="high">Alta</option>
                                </select>
                                <select required className="input-field" onChange={e => setForm({ ...form, client_id: e.target.value })}>
                                    <option value="">Selecione um Cliente</option>
                                    {data.clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </>
                        )}
                        {modal.type === 'inventory' && (
                            <>
                                <input required placeholder="Nome do Item" className="input-field" onChange={e => setForm({ ...form, name: e.target.value })} />
                                <input placeholder="SKU" className="input-field" onChange={e => setForm({ ...form, sku: e.target.value })} />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <input required type="number" placeholder="Qtd Inicial" className="input-field" onChange={e => setForm({ ...form, quantity: e.target.value })} />
                                    <input required type="number" step="0.01" placeholder="Preço Unit." className="input-field" onChange={e => setForm({ ...form, unit_price: e.target.value })} />
                                </div>
                                <input placeholder="Localização" className="input-field" onChange={e => setForm({ ...form, location: e.target.value })} />
                            </>
                        )}
                        {modal.type === 'finance' && (
                            <>
                                <select required className="input-field" onChange={e => setForm({ ...form, type: e.target.value })}>
                                    <option value="">Tipo de Movimentação</option>
                                    <option value="income">Receita (+)</option>
                                    <option value="expense">Despesa (-)</option>
                                </select>
                                <input required type="number" step="0.01" placeholder="Valor (R$)" className="input-field" onChange={e => setForm({ ...form, amount: e.target.value })} />
                                <input required placeholder="Descrição" className="input-field" onChange={e => setForm({ ...form, description: e.target.value })} />
                                <input placeholder="Categoria (Ex: Aluguel, Hardware)" className="input-field" onChange={e => setForm({ ...form, category: e.target.value })} />
                            </>
                        )}
                        {modal.type === 'project' && (
                            <>
                                <input required placeholder="Nome do Projeto" className="input-field" onChange={e => setForm({ ...form, name: e.target.value })} />
                                <textarea required rows={3} placeholder="Descrição do Escopo" className="input-field" style={{ resize: 'none' }} onChange={e => setForm({ ...form, description: e.target.value })} />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'block' }}>INÍCIO</label>
                                        <input type="date" className="input-field" onChange={e => setForm({ ...form, start_date: e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'block' }}>PREVISÃO FIM</label>
                                        <input type="date" className="input-field" onChange={e => setForm({ ...form, end_date: e.target.value })} />
                                    </div>
                                </div>
                                <select required className="input-field" onChange={e => setForm({ ...form, client_id: e.target.value })}>
                                    <option value="">Cliente Associado</option>
                                    {data.clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                                <select className="input-field" onChange={e => setForm({ ...form, status: e.target.value })}>
                                    <option value="planning">Planejamento</option>
                                    <option value="active">Em Desenvolvimento</option>
                                    <option value="on_hold">Em Espera</option>
                                    <option value="completed">Finalizado</option>
                                </select>
                            </>
                        )}
                        <button type="submit" className="btn-primary" style={{ padding: '1rem', marginTop: '1rem' }}>SALVAR REGISTRO</button>
                    </form>
                </motion.div>
            </div>
        )
    }

    const renderContent = () => {
        if (loading) return <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>Sincronizando base de dados...</div>;

        switch (activeTab) {
            case 'Visão Geral':
                return (
                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                            {[
                                { label: 'Projetos Ativos', value: data.projects.filter(p => p.status === 'active').length, trend: 'Roadmap', color: '#2563eb' },
                                { label: 'Base de Clientes', value: data.clients.length, trend: 'Total', color: '#10b981' },
                                { label: 'Itens em Estoque', value: data.inventory.length, trend: 'SKUs', color: '#6366f1' },
                                { label: 'Saldo Mensal', value: `R$ ${data.finance.reduce((acc, curr) => curr.type === 'income' ? acc + Number(curr.amount) : acc - Number(curr.amount), 0).toFixed(2)}`, trend: 'Ref: Fev/26', color: '#f59e0b' }
                            ].map((stat, i) => (
                                <div key={i} className="stat-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{stat.label}</span>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success)' }}>{stat.trend}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</h3>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                            <div className="panel" style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem' }}>CRONOGRAMA DE PROJETOS</h3>
                                <table className="data-table">
                                    <thead><tr><th>Projeto</th><th>Status</th><th>Entrega</th></tr></thead>
                                    <tbody>
                                        {data.projects.slice(0, 5).map((p, i) => (
                                            <tr key={i}>
                                                <td style={{ fontWeight: 700 }}>{p.name}</td>
                                                <td><span className={`badge badge-${p.status === 'active' ? 'blue' : 'zinc'}`}>{p.status}</span></td>
                                                <td>{p.end_date ? new Date(p.end_date).toLocaleDateString() : 'TBD'}</td>
                                            </tr>
                                        ))}
                                        {data.projects.length === 0 && <tr><td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>Nenhum projeto em andamento</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                            <div className="panel" style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem' }}>ESTADO DE COMPLIANCE</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                                            <span>Uptime Infraestrutura</span>
                                            <span>99.9%</span>
                                        </div>
                                        <div style={{ height: '4px', background: 'var(--bg-elevated)', borderRadius: '2px' }}>
                                            <div style={{ width: '99%', height: '100%', background: 'var(--success)' }} />
                                        </div>
                                    </div>
                                    <div style={{ padding: '1rem', background: 'rgba(37, 99, 235, 0.05)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(37, 99, 235, 0.1)' }}>
                                        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                            <strong>Nota de Operação:</strong> Todos os clusters de banco de dados operando nominalmente.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Chamados':
            case 'Clientes':
            case 'Financeiro':
            case 'Gestão de Estoque':
            case 'Projetos': // Matching current nav or mapping
                const typeMap = { 'Chamados': 'ticket', 'Clientes': 'client', 'Financeiro': 'finance', 'Gestão de Estoque': 'inventory', 'Projetos': 'project' };
                const currentType = typeMap[activeTab] || 'client';
                const currentData = data[currentType === 'ticket' ? 'tickets' : currentType === 'client' ? 'clients' : currentType === 'finance' ? 'finance' : currentType === 'project' ? 'projects' : 'inventory'] || [];

                return (
                    <div style={{ padding: '2rem' }}>
                        <div className="panel" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>GESTÃO DE {activeTab.toUpperCase()}</h2>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Painel operacional de {activeTab.toLowerCase()}.</p>
                                </div>
                                <button onClick={() => setModal({ show: true, type: currentType })} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Plus size={16} /> Novo Registro
                                </button>
                            </div>

                            <table className="data-table">
                                <thead>
                                    {currentType === 'client' && <tr><th>Nome</th><th>Documento</th><th>E-mail</th><th>Status</th></tr>}
                                    {currentType === 'ticket' && <tr><th>ID</th><th>Assunto</th><th>Prioridade</th><th>Status</th></tr>}
                                    {currentType === 'inventory' && <tr><th>Item</th><th>SKU</th><th>Quantidade</th><th>Preço</th></tr>}
                                    {currentType === 'finance' && <tr><th>Data</th><th>Tipo</th><th>Valor</th><th>Descrição</th></tr>}
                                    {currentType === 'project' && <tr><th>Projeto</th><th>Início</th><th>Previsão Fim</th><th>Status</th></tr>}
                                </thead>
                                <tbody>
                                    {currentData.map((item, i) => (
                                        <tr key={i}>
                                            {currentType === 'client' && (
                                                <>
                                                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                                                    <td>{item.document}</td>
                                                    <td>{item.email}</td>
                                                    <td><span className="badge badge-green">Ativo</span></td>
                                                </>
                                            )}
                                            {currentType === 'ticket' && (
                                                <>
                                                    <td style={{ fontWeight: 700 }}>#{item.id}</td>
                                                    <td>{item.subject}</td>
                                                    <td><span className={`badge badge-${item.priority === 'high' ? 'red' : 'blue'}`}>{item.priority}</span></td>
                                                    <td>{item.status}</td>
                                                </>
                                            )}
                                            {currentType === 'inventory' && (
                                                <>
                                                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                                                    <td>{item.sku}</td>
                                                    <td>{item.quantity} un</td>
                                                    <td>R$ {item.unit_price}</td>
                                                </>
                                            )}
                                            {currentType === 'finance' && (
                                                <>
                                                    <td>{new Date(item.date).toLocaleDateString()}</td>
                                                    <td><span className={`badge badge-${item.type === 'income' ? 'green' : 'red'}`}>{item.type}</span></td>
                                                    <td style={{ fontWeight: 700, color: item.type === 'income' ? 'var(--success)' : 'var(--error)' }}>
                                                        {item.type === 'income' ? '+' : '-'} R$ {item.amount}
                                                    </td>
                                                    <td>{item.description}</td>
                                                </>
                                            )}
                                            {currentType === 'project' && (
                                                <>
                                                    <td style={{ fontWeight: 700 }}>{item.name}</td>
                                                    <td>{item.start_date ? new Date(item.start_date).toLocaleDateString() : '-'}</td>
                                                    <td>{item.end_date ? new Date(item.end_date).toLocaleDateString() : '-'}</td>
                                                    <td><span className={`badge badge-${item.status === 'active' ? 'blue' : item.status === 'completed' ? 'green' : 'zinc'}`}>{item.status}</span></td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                    {currentData.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Nenhum registro encontrado.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'Relatórios':
                return (
                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Print Only Header */}
                        <div className="report-header">
                            <div>
                                <h1 style={{ fontSize: '1.5rem', fontWeight: 900 }}>UNBUG ENTERPRISE ERP</h1>
                                <p style={{ fontSize: '0.8rem' }}>Relatório Consolidado de Operações</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '0.8rem' }}>Data de Emissão: {new Date().toLocaleDateString()}</p>
                                <p style={{ fontSize: '0.7rem' }}>Ref: Fevereiro/2026</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }} className="no-print">
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>RELATÓRIOS ANALÍTICOS</h2>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Métricas de performance e saúde operacional.</p>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button className="nav-link" style={{ width: 'auto', background: 'var(--bg-elevated)', padding: '0.6rem 1rem' }}>Fevereiro, 2026</button>
                                <button className="btn-primary" onClick={() => window.print()}>EXPORTAR PDF PROFISSIONAL</button>
                            </div>
                        </div>

                        {/* Analytic Stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                            <div className="panel" style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>EFICIÊNCIA DE SUPORTE</span>
                                    <TrendingUp size={16} color="var(--success)" />
                                </div>
                                <h3 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{data.tickets.length > 0 ? ((data.tickets.filter(t => t.status === 'closed').length / data.tickets.length) * 100).toFixed(1) : '0'}%</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Taxa de resolução de chamados</p>
                            </div>
                            <div className="panel" style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>TEMPO MÉDIO (SLA)</span>
                                    <Clock size={16} color="var(--brand-primary)" />
                                </div>
                                <h3 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>1.8h</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Resposta inicial em incidentes</p>
                            </div>
                            <div className="panel" style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>MARGEM FINANCEIRA</span>
                                    <TrendingUp size={16} color="var(--success)" />
                                </div>
                                <h3 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                    {((data.finance.reduce((acc, curr) => curr.type === 'income' ? acc + Number(curr.amount) : acc - Number(curr.amount), 0) / (data.finance.filter(f => f.type === 'income').reduce((acc, curr) => acc + Number(curr.amount), 0) || 1)) * 100).toFixed(1)}%
                                </h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Lucratividade operacional</p>
                            </div>
                        </div>

                        {/* Charts Area */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div className="panel" style={{ padding: '2rem' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Distribuição Semanal de Demanda</h4>
                                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', padding: '0 1rem' }}>
                                    {[35, 65, 45, 80, 55, 90, 40].map((h, i) => (
                                        <div key={i} style={{ textAlign: 'center', width: '30px' }}>
                                            <motion.div
                                                initial={{ height: 0 }} animate={{ height: `${h}%` }}
                                                style={{ width: '100%', background: i === 6 ? 'var(--brand-primary)' : 'var(--bg-elevated)', borderRadius: '4px', border: i === 6 ? 'none' : '1px solid var(--border-main)' }}
                                            />
                                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.75rem', display: 'block' }}>{['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][i]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="panel" style={{ padding: '2rem' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categorias Financeiras</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {[
                                        { label: 'Serviços Cloud', val: 45, color: 'var(--brand-primary)' },
                                        { label: 'Manutenção Hardware', val: 30, color: 'var(--success)' },
                                        { label: 'Licenciamento SaaS', val: 15, color: 'var(--warning)' },
                                        { label: 'Outros', val: 10, color: 'var(--text-muted)' }
                                    ].map((cat, i) => (
                                        <div key={i}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>{cat.label}</span>
                                                <span style={{ fontWeight: 600 }}>{cat.val}%</span>
                                            </div>
                                            <div style={{ height: '8px', background: 'var(--bg-elevated)', borderRadius: '4px', overflow: 'hidden' }}>
                                                <motion.div initial={{ width: 0 }} animate={{ width: `${cat.val}%` }} style={{ height: '100%', background: cat.color }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Inventory Aging / Health */}
                        <div className="panel" style={{ padding: '2rem' }}>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1.5rem' }}>RESUMO DE ATIVOS EM ESTOQUE</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                                <div>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>TOTAL DE ATIVOS</p>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>{data.inventory.reduce((acc, curr) => acc + Number(curr.quantity), 0)} un</p>
                                </div>
                                <div style={{ borderLeft: '1px solid var(--border-main)', paddingLeft: '1.5rem' }}>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>VALOR PATRIMONIAL</p>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>R$ {data.inventory.reduce((acc, curr) => acc + (Number(curr.quantity) * Number(curr.unit_price)), 0).toLocaleString()}</p>
                                </div>
                                <div style={{ borderLeft: '1px solid var(--border-main)', paddingLeft: '1.5rem' }}>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>ITENS ABAIXO DO MÍNIMO</p>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--error)' }}>2 SKUs</p>
                                </div>
                                <div style={{ borderLeft: '1px solid var(--border-main)', paddingLeft: '1.5rem' }}>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>GIRO DE ESTOQUE</p>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>4.2x</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>Seção em desenvolvimento.</div>;
        }
    };

    return (
        <div className="dashboard-container">
            <Modal />
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
                    {[
                        { id: 'Visão Geral', icon: <LayoutDashboard size={18} /> },
                        { id: 'Projetos', icon: <Monitor size={18} /> },
                        { id: 'Chamados', icon: <LifeBuoy size={18} /> },
                        { id: 'Clientes', icon: <Users size={18} /> },
                        { id: 'Gestão de Estoque', icon: <Monitor size={18} /> },
                        { id: 'Financeiro', icon: <TrendingUp size={18} /> },
                        { id: 'Relatórios', icon: <BarChart3 size={18} /> }
                    ].map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}>
                            {tab.icon} {tab.id}
                        </button>
                    ))}
                </nav>

                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-main)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', marginBottom: '1rem' }}>
                        <UserCircle size={32} color="var(--text-muted)" />
                        <div>
                            <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Administrador</p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ID: #001</p>
                        </div>
                    </div>
                    <button className="nav-link"><Settings size={18} /> Administração</button>
                </div>
            </aside>

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
                <div style={{ flex: 1 }}>{renderContent()}</div>
            </main>
        </div>
    );
}
