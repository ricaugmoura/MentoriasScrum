import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { ShieldCheck, MessageSquare, Terminal, Send, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const [status, setStatus] = useState('DISCONNECTED');
  const [qrCode, setQrCode] = useState('');
  const [logs, setLogs] = useState([]);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState(null); // { success: boolean, msg: string }
  const terminalEndRef = useRef(null);

  // Add line helper
  const addLog = (text, type = 'system') => {
    const time = new Date().toLocaleTimeString('pt-BR');
    setLogs(prev => [...prev, { time, text, type }]);
  };

  // Auto-scroll log terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Connect WebSockets
  useEffect(() => {
    addLog('Inicializando conexão WebSocket com o servidor...', 'system');
    
    // Connect to WebSocket server (proxied in dev, direct path in production)
    const socket = io();

    socket.on('connect', () => {
      addLog('Conectado ao servidor de atualizações via WebSocket.', 'system');
    });

    socket.on('disconnect', () => {
      addLog('Conexão perdida com o servidor. Tentando reconectar...', 'error');
      setStatus('DISCONNECTED');
    });

    // Receive status updates from the backend WhatsApp service
    socket.on('status', (whatsappStatus) => {
      setStatus(whatsappStatus);
      addLog(`Status da conexão atualizado para: ${translateStatus(whatsappStatus)}`, 'status');
    });

    // Receive QR Code base64 data URL
    socket.on('qr', (qrBase64) => {
      setQrCode(qrBase64);
      setStatus('QR_READY');
      addLog('Novo QR Code recebido. Pronto para leitura.', 'status');
    });

    // Receive incoming WhatsApp message logs (for dashboard show-off)
    socket.on('message_received', (msg) => {
      const sender = msg.from.split('@')[0];
      addLog(`Mensagem recebida de [${sender}]: "${msg.body}"`, 'incoming');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const translateStatus = (s) => {
    switch (s) {
      case 'DISCONNECTED': return 'Desconectado';
      case 'INITIALIZING': return 'Inicializando navegador';
      case 'QR_READY': return 'Aguardando leitura do QR';
      case 'CONNECTED': return 'Conectado e Ativo';
      default: return s;
    }
  };

  const getStatusBadgeClass = () => {
    switch (status) {
      case 'CONNECTED':
        return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
      case 'QR_READY':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
      case 'INITIALIZING':
        return 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400';
      case 'DISCONNECTED':
      default:
        return 'bg-red-500/10 border-red-500/20 text-red-400';
    }
  };

  const handleSendTestMessage = async (e) => {
    e.preventDefault();
    if (!phone || !message) return;

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 8) {
      setFeedback({ success: false, msg: 'Insira um número válido com DDI e DDD (somente números).' });
      return;
    }

    if (status !== 'CONNECTED') {
      setFeedback({ success: false, msg: 'O WhatsApp precisa estar CONECTADO para realizar testes.' });
      return;
    }

    setSending(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          number: cleanPhone,
          message: message
        })
      });
      const data = await response.json();

      if (data.success) {
        setFeedback({ success: true, msg: 'Mensagem enviada com sucesso!' });
        addLog(`API: Mensagem enviada para +${cleanPhone}: "${message}"`, 'system');
        setMessage(''); // Clear message text but keep phone for easier re-testing
      } else {
        setFeedback({ success: false, msg: `Erro API: ${data.error || 'Falha ao enviar'}` });
        addLog(`Erro API: Falha ao enviar para +${cleanPhone}. Razão: ${data.error}`, 'error');
      }
    } catch (error) {
      console.error('Error sending test message:', error);
      setFeedback({ success: false, msg: 'Erro de rede ao conectar com o servidor.' });
      addLog(`Erro de Rede: Falha ao fazer requisição de envio.`, 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-dark-border mb-10">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-white">Integração do WhatsApp</h1>
          <p className="text-sm text-slate-400 mt-1">Conecte uma conta operacional do WhatsApp e teste o envio de mensagens via API.</p>
        </div>

        {/* Status Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${getStatusBadgeClass()}`}>
          <span className={`w-2.5 h-2.5 rounded-full ${
            status === 'CONNECTED' ? 'bg-emerald-500 animate-pulse' :
            status === 'QR_READY' ? 'bg-yellow-500 animate-pulse' :
            status === 'INITIALIZING' ? 'bg-cyan-500 animate-pulse' : 'bg-red-500'
          }`}></span>
          <span>{translateStatus(status)}</span>
        </div>
      </div>

      {/* Grid Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Authentication states */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-center min-h-[460px] text-center shadow-lg">
          <div className="flex justify-between items-center mb-6 border-b border-dark-border/40 pb-4">
            <h2 className="font-display font-bold text-lg text-white">Autenticação</h2>
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>

          {/* INITIALIZING / LOADING */}
          {(status === 'DISCONNECTED' || status === 'INITIALIZING') && (
            <div className="space-y-6 py-12 flex flex-col items-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-primary animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-white text-lg">Iniciando serviço do WhatsApp...</p>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed mx-auto">
                  Por favor, aguarde enquanto o servidor inicia o navegador headless em segundo plano.
                </p>
              </div>
            </div>
          )}

          {/* QR READY STATE */}
          {status === 'QR_READY' && qrCode && (
            <div className="space-y-6 flex flex-col items-center animate-fade-in">
              <div className="relative p-5 rounded-2xl bg-white border-4 border-primary/10 shadow-lg max-w-[260px]">
                <img src={qrCode} alt="WhatsApp Web QR Code" className="w-[200px] h-[200px] block rounded-lg" />
              </div>
              
              <div className="text-left bg-dark/40 border border-dark-border p-5 rounded-xl max-w-md w-full">
                <h3 className="text-sm font-bold text-slate-200 mb-2">Como conectar:</h3>
                <ol className="list-decimal list-inside text-xs text-slate-400 space-y-2 leading-relaxed">
                  <li>Abra o <strong>WhatsApp</strong> em seu celular.</li>
                  <li>Acesse <strong>Aparelhos conectados</strong> nas configurações do aplicativo.</li>
                  <li>Selecione <strong>Conectar um aparelho</strong> e aponte a câmera para ler este QR Code.</li>
                </ol>
              </div>
            </div>
          )}

          {/* CONNECTED STATE */}
          {status === 'CONNECTED' && (
            <div className="space-y-6 py-10 flex flex-col items-center animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-2xl text-white">Conexão Ativa!</h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                  O WhatsApp está integrado com sucesso. Você já pode enviar mensagens de teste ou disparar integrações externas.
                </p>
              </div>

              <div className="w-full text-left bg-dark/40 border border-dark-border p-4 rounded-xl font-mono text-xs max-w-md space-y-2">
                <span className="text-emerald-400 font-bold">API Endpoint de Disparo:</span>
                <div className="flex justify-between items-center bg-dark/80 p-2.5 rounded border border-dark-border">
                  <code className="text-slate-300 font-semibold"><span className="text-primary font-bold">POST</span> /api/send</code>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Message Tester & Terminal */}
        <div className="lg:col-span-6 space-y-8">
          
          {/* Message Tester Card */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-lg">
            <div className="flex justify-between items-center mb-6 border-b border-dark-border/40 pb-4">
              <h2 className="font-display font-bold text-lg text-white">Enviar Mensagem de Teste</h2>
              <Send className="w-5 h-5 text-primary" />
            </div>

            <form onSubmit={handleSendTestMessage} className="space-y-5">
              {/* Phone number */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-xs font-semibold text-slate-300">Número do Destinatário</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-500 font-semibold text-sm">+</span>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="5511999999999"
                    required
                    disabled={sending || status !== 'CONNECTED'}
                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-dark/40 border border-dark-border text-slate-100 placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm disabled:opacity-50"
                  />
                </div>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  Insira o código do país, DDD e número (somente dígitos). Exemplo: 5511999999999
                </span>
              </div>

              {/* Message content */}
              <div className="space-y-2">
                <label htmlFor="msgText" className="text-xs font-semibold text-slate-300">Mensagem</label>
                <textarea
                  id="msgText"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Olá! Este é um teste da integração do WhatsApp..."
                  required
                  rows="3"
                  disabled={sending || status !== 'CONNECTED'}
                  className="w-full px-4 py-3 rounded-xl bg-dark/40 border border-dark-border text-slate-100 placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm resize-none disabled:opacity-50"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={sending || status !== 'CONNECTED' || !phone || !message}
                className="w-full py-3.5 rounded-xl bg-primary text-dark font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/95 active:scale-[0.99] transition-all disabled:opacity-50 disabled:scale-100 cursor-pointer shadow-lg shadow-primary/10"
              >
                {sending ? (
                  <div className="w-5 h-5 border-2 border-dark/20 border-t-dark rounded-full animate-spin"></div>
                ) : (
                  <span>Enviar Mensagem</span>
                )}
              </button>
            </form>

            {/* Test Feedback Alerts */}
            {feedback && (
              <div className={`mt-4 flex items-center gap-2.5 px-4 py-3 rounded-xl border text-xs ${
                feedback.success 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}>
                {feedback.success ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                <span className="font-semibold">{feedback.msg}</span>
              </div>
            )}
          </div>

          {/* Real-time Logs Terminal emulator */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col">
            <div className="flex justify-between items-center mb-4 border-b border-dark-border/40 pb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-primary" />
                <h2 className="font-display font-bold text-lg text-white font-mono">Logs de Eventos</h2>
              </div>
              
              {/* Green indicator dot */}
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">live</span>
              </div>
            </div>

            {/* Simulated terminal screen */}
            <div className="h-44 bg-black border border-dark-border rounded-xl p-4 overflow-y-auto font-mono text-xs space-y-2 select-text">
              {logs.map((log, idx) => (
                <div 
                  key={idx} 
                  className={`pl-2 border-l-2 leading-relaxed ${
                    log.type === 'error' ? 'text-red-400 border-red-500' :
                    log.type === 'status' ? 'text-cyan-400 border-cyan-500' :
                    log.type === 'incoming' ? 'text-emerald-400 border-emerald-500 bg-emerald-500/5 py-0.5 rounded px-1' :
                    'text-slate-400 border-primary'
                  }`}
                >
                  <span className="text-slate-600 mr-1.5">[{log.time}]</span>
                  <span>{log.text}</span>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Dashboard;
