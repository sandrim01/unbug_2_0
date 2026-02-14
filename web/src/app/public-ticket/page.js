'use client'

import { motion } from 'framer-motion';
import { Send, LifeBuoy, Clock, ShieldCheck, Mail, Phone, User, MessageSquare, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function PublicTicket() {
    const [status, setStatus] = useState('idle');
    const [formData, setFormData] = useState({
        subject: '',
        description: '',
        guest_name: '',
        guest_email: '',
        guest_phone: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/tickets/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    priority: 'medium'
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ subject: '', description: '', guest_name: '', guest_email: '', guest_phone: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)', display: 'flex', flexDirection: 'column', color: 'var(--text-primary)' }}>
            <header style={{ padding: '2rem', borderBottom: '1px solid var(--border-main)', background: 'var(--bg-surface)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '36px', height: '36px', background: 'var(--brand-primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <LifeBuoy size={20} color="white" />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 800 }}>UNBUG</h1>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Portal de Suporte Técnico</p>
                    </div>
                </div>
            </header>

            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
                <div style={{ maxWidth: '1000px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem' }}>

                    {/* Left Column: Context */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '2rem' }}>
                            Abertura de Chamado <br /><span style={{ color: 'var(--brand-primary)' }}>Nível Enterprise.</span>
                        </h2>
                        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '3rem' }}>
                            Utilize este canal oficial para reportar incidentes críticos ou solicitar suporte técnico especializado. Sua demanda será triada instantaneamente por nossa operação.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {[
                                { icon: <Clock size={20} />, title: "SLA de Resposta: 4h", desc: "Equipe de prontidão para diagnósticos imediatos." },
                                { icon: <ShieldCheck size={20} />, title: "Protocolo Seguro", desc: "Comunicação criptografada com os data-centers UNBUG." }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1.25rem' }}>
                                    <div style={{ color: 'var(--brand-primary)', paddingTop: '0.2rem' }}>{item.icon}</div>
                                    <div>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="panel" style={{ padding: '3rem' }}>
                        {status === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                    <ShieldCheck size={32} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Chamado Registrado</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Seu protocolo foi enviado para a fila de atendimento técnico.</p>
                                <button onClick={() => setStatus('idle')} className="btn-primary" style={{ width: '100%' }}>Abrir Novo Chamado</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>REQUISITANTE</label>
                                    <div style={{ position: 'relative' }}>
                                        <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                        <input
                                            type="text" required placeholder="Nome Completo" className="input-field" style={{ paddingLeft: '2.75rem' }}
                                            value={formData.guest_name} onChange={e => setFormData({ ...formData, guest_name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>E-MAIL</label>
                                        <input
                                            type="email" required placeholder="empresa@exemplo.com" className="input-field"
                                            value={formData.guest_email} onChange={e => setFormData({ ...formData, guest_email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>CONTATO</label>
                                        <input
                                            type="text" placeholder="(DD) 00000-0000" className="input-field"
                                            value={formData.guest_phone} onChange={e => setFormData({ ...formData, guest_phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>DADOS DA DEMANDA</label>
                                    <input
                                        type="text" required placeholder="Assunto Principal" className="input-field"
                                        value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                    />
                                </div>

                                <textarea
                                    required rows={5} placeholder="Descreva o incidente ou solicitação com o máximo de detalhes..." className="input-field"
                                    style={{ resize: 'none' }}
                                    value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'rgba(245, 158, 11, 0.05)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(245, 158, 11, 0.1)', marginBottom: '1rem' }}>
                                    <AlertCircle size={18} color="var(--warning)" />
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Chamados registrados fora do horário comercial (8h-18h) seguem regime de plantão.</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="btn-primary"
                                    style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
                                >
                                    {status === 'loading' ? 'ENVIANDO PROTOCOLO...' : <>REGISTRAR CHAMADO <Send size={18} /></>}
                                </button>

                                {status === 'error' && (
                                    <p style={{ color: 'var(--error)', fontSize: '0.8rem', textAlign: 'center', fontWeight: 600 }}>Falha na conexão. Tente novamente.</p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </main>

            <footer style={{ padding: '2rem', borderTop: '1px solid var(--border-main)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                &copy; 2026 UNBUG Technology Enterprise. Todos os direitos reservados.
            </footer>
        </div>
    );
}
