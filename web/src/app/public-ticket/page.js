'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Cpu, Mail, Phone, User, MessageSquare } from 'lucide-react';

export default function PublicTicket() {
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [formData, setFormData] = useState({
        subject: '',
        description: '',
        priority: 'medium',
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
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ subject: '', description: '', priority: 'medium', guest_name: '', guest_email: '', guest_phone: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6">
                <div className="mesh-bg fixed inset-0 opacity-50" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bento-panel max-w-md w-full p-10 text-center relative z-10"
                    style={{ backgroundColor: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2rem' }}
                >
                    <div className="mx-auto w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h2 className="text-3xl font-black text-white italic mb-4">CHAMADO ABERTO</h2>
                    <p className="text-gray-400 mb-8">Seu chamado foi registrado com sucesso em nosso sistema Unbug ERP. Em breve um de nossos técnicos entrará em contato.</p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="btn-primary w-full"
                    >
                        Abrir Novo Chamado
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 font-sans">
            <div className="mesh-bg fixed inset-0 opacity-40" />

            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                {/* Info Section */}
                <div className="flex flex-col justify-center">
                    <motion.div
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent-blue)', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                            <LifeBuoy size={18} /> Central de Suporte UNBUG
                        </div>
                        <h1 className="font-heading" style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '2rem' }}>
                            Serviços de Tecnologia <span style={{ color: 'var(--accent-blue)' }}>Nível Enterprise.</span>
                        </h1>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '3rem' }}>
                            Nossa equipe técnica especializada está pronta para resolver suas demandas críticas. Registre seu chamado e acompanhe a resolução em tempo real.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                { icon: <Clock size={20} />, title: "Resposta em até 4h", desc: "Prioridade para paradas críticas de sistema." },
                                { icon: <ShieldCheck size={20} />, title: "Segurança Certificada", desc: "Todos os dados são criptografados e protegidos." }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1.25rem' }}>
                                    <div style={{ color: 'var(--accent-blue)' }}>{item.icon}</div>
                                    <div>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{item.title}</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bento-panel"
                        style={{ padding: '3.5rem' }}
                    >
                        {status === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                    <ShieldCheck size={40} />
                                </div>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>Chamado Recebido</h2>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Um analista técnico foi notificado e entrará em contato em breve.</p>
                                <button onClick={() => setStatus('idle')} className="btn-primary" style={{ width: '100%' }}>Novo chamado</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div style={{ position: 'relative' }}>
                                        <User size={16} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-muted)' }} />
                                        <input
                                            type="text" required placeholder="Seu Nome Full" className="glass-input" style={{ paddingLeft: '3rem' }}
                                            value={formData.guest_name} onChange={e => setFormData({ ...formData, guest_name: e.target.value })}
                                        />
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-muted)' }} />
                                        <input
                                            type="email" required placeholder="E-mail Corporativo" className="glass-input" style={{ paddingLeft: '3rem' }}
                                            value={formData.guest_email} onChange={e => setFormData({ ...formData, guest_email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <Phone size={16} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-muted)' }} />
                                    <input
                                        type="text" placeholder="Telefone de Contato" className="glass-input" style={{ paddingLeft: '3rem' }}
                                        value={formData.guest_phone} onChange={e => setFormData({ ...formData, guest_phone: e.target.value })}
                                    />
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <MessageSquare size={16} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-muted)' }} />
                                    <input
                                        type="text" required placeholder="Assunto da Demanda" className="glass-input" style={{ paddingLeft: '3rem' }}
                                        value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                    />
                                </div>

                                <textarea
                                    required rows={4} placeholder="Descreva o problema ou solicitação técnica detalhadamente..." className="glass-input"
                                    style={{ resize: 'none' }}
                                    value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="btn-primary"
                                    style={{ width: '100%', padding: '1.25rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
                                >
                                    {status === 'loading' ? 'PROCESSANDO...' : <>REGISTRAR CHAMADO <Send size={18} /></>}
                                </button>

                                {status === 'error' && (
                                    <p style={{ color: 'var(--danger)', fontSize: '0.85rem', textAlign: 'center', fontWeight: 600 }}>Erro ao enviar. Verifique sua conexão e tente novamente.</p>
                                )}
                                letter-spacing: 0.1em;
                                border-radius: 1.5rem;
                                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                                font-style: italic;
                                box-shadow: 0 10px 30px rgba(255,255,255,0.1);
                }
                                .btn-primary:hover {
                                    transform: translateY(-2px);
                                box-shadow: 0 15px 40px rgba(255,255,255,0.2);
                }
                                .btn-primary:active {
                                    transform: translateY(0);
                }
            `}</style>
        </div>
                );
}
