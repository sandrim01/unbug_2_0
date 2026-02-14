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
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                <Cpu size={24} color="black" />
                            </div>
                            <h1 className="text-2xl font-black text-white italic tracking-tighter">UNBUG <span className="text-gray-500 font-bold not-italic text-sm tracking-widest ml-1 uppercase">Support</span></h1>
                        </div>
                        <h2 className="text-5xl font-black text-white mb-6 leading-tight">SUPORTE DE <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">ÚLTIMA GERAÇÃO</span></h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Abra seu chamado agora para assistência técnica especializada. Nosso sistema ERP Unbug garante que sua solicitação chegue instantaneamente aos nossos técnicos.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                                    <CheckCircle size={16} className="text-blue-400" />
                                </div>
                                <span>Monitoramento Real-time</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                                    <CheckCircle size={16} className="text-blue-400" />
                                </div>
                                <span>Técnicos Certificados</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                                    <CheckCircle size={16} className="text-blue-400" />
                                </div>
                                <span>Histórico de Manutenção</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bento-panel p-8"
                    style={{ backgroundColor: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '2.5rem' }}
                >
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-5">
                            <div className="relative">
                                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input 
                                    type="text" 
                                    required
                                    placeholder="SEU NOME"
                                    className="glass-input w-full pl-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-xs font-bold tracking-widest outline-none focus:border-blue-500 transition-colors"
                                    value={formData.guest_name}
                                    onChange={(e) => setFormData({...formData, guest_name: e.target.value})}
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input 
                                        type="email" 
                                        required
                                        placeholder="EMAIL"
                                        className="glass-input w-full pl-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-xs font-bold tracking-widest outline-none focus:border-blue-500 transition-colors"
                                        value={formData.guest_email}
                                        onChange={(e) => setFormData({...formData, guest_email: e.target.value})}
                                    />
                                </div>
                                <div className="relative">
                                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="CONTATO"
                                        className="glass-input w-full pl-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-xs font-bold tracking-widest outline-none focus:border-blue-500 transition-colors"
                                        value={formData.guest_phone}
                                        onChange={(e) => setFormData({...formData, guest_phone: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <MessageSquare size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input 
                                    type="text" 
                                    required
                                    placeholder="ASSUNTO DO CHAMADO"
                                    className="glass-input w-full pl-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-xs font-bold tracking-widest outline-none focus:border-blue-500 transition-colors"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                />
                            </div>

                            <div className="relative">
                                <textarea 
                                    required
                                    rows={4}
                                    placeholder="DESCRIÇÃO DO PROBLEMA..."
                                    className="glass-input w-full p-6 bg-white/5 border border-white/10 rounded-3xl text-white text-xs font-bold tracking-widest outline-none focus:border-blue-500 transition-colors resize-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={status === 'loading'}
                            className="btn-primary w-full py-5 flex items-center justify-center gap-3"
                        >
                            {status === 'loading' ? (
                                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            ) : (
                                <>ENVIAR CHAMADO <Send size={18} /></>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>

            <style jsx>{`
                .mesh-bg {
                    background: radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
                                radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
                                radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
                }
                .btn-primary {
                    background: white;
                    color: black;
                    font-weight: 900;
                    text-transform: uppercase;
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
