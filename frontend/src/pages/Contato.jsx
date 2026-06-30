import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const Contato = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { success: boolean, msg: string }

  React.useEffect(() => {
    document.title = 'Fale com um Mentor | Contato - Mentorias Scrum';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Entre em contato com nossos especialistas em agilidade e tire suas dúvidas sobre nossos cursos preparatórios e agendas de mentorias Scrum.');
    }
    return () => {
      document.title = 'Mentorias Scrum | Preparatórios para Certificação Ágil';
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Prepare-se para as certificações ágeis da Scrum.org com nossos mentores especialistas. Mentorias Scrum focadas na sua aprovação.');
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    setLoading(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        setFeedback({ success: true, msg: data.message || 'Mensagem enviada com sucesso!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFeedback({ success: false, msg: data.message || 'Ocorreu um erro ao enviar.' });
      }
    } catch (error) {
      console.error('Error submitting contact email:', error);
      setFeedback({ success: false, msg: 'Erro de rede. Verifique sua conexão e tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Entre em <span className="text-primary glow-text-primary">Contato</span>
          </h1>
          <p className="text-slate-400 leading-relaxed text-base">
            Tem dúvidas sobre o formato das mentorias, formas de pagamento ou agendas? Envie-nos uma mensagem e responderemos o mais rápido possível.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="p-8 rounded-2xl bg-dark-card border border-dark-border space-y-8">
              <h2 className="font-display font-bold text-xl text-white">Canais de Atendimento</h2>
              
              <div className="space-y-6">
                {/* Email detail */}
                <div className="flex gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 font-semibold uppercase tracking-wider">E-mail</h4>
                    <p className="text-sm font-semibold text-slate-200 mt-1">contato@mentoriasscrum.com.br</p>
                  </div>
                </div>

                {/* WhatsApp detail */}
                <div className="flex gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 font-semibold uppercase tracking-wider">WhatsApp</h4>
                    <a 
                      href="https://wa.me/5511957318784?text=Olá!%20Gostaria%20de%20conversar%20sobre%20as%20mentorias." 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm font-semibold text-slate-200 mt-1 hover:text-primary transition-colors block"
                    >
                      +55 11 95731-8784
                    </a>
                  </div>
                </div>

                {/* Response time */}
                <div className="flex gap-4">
                  <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Tempo de resposta</h4>
                    <p className="text-sm font-semibold text-slate-200 mt-1">Geralmente em menos de 2 horas em dias úteis.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Direct chat card */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-center space-y-4">
              <MessageSquare className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="font-display font-bold text-lg text-white">Precisa de resposta imediata?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Você pode pular o formulário de e-mail e iniciar uma conversa direta com um mentor agora mesmo no WhatsApp.
              </p>
              <a
                href="https://wa.me/5511957318784?text=Olá,%20gostaria%20de%20tirar%20dúvidas%20sobre%20as%20mentorias."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 text-dark font-bold text-sm hover:bg-emerald-600 transition-all cursor-pointer"
              >
                Chamar no WhatsApp
              </a>
            </div>

          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-dark-card border border-dark-border glow-primary">
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs sm:text-sm font-semibold text-slate-300">Seu Nome</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nome completo"
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl bg-dark/40 border border-dark-border text-slate-100 placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm sm:text-base disabled:opacity-50"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs sm:text-sm font-semibold text-slate-300">Seu E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="exemplo@dominio.com"
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl bg-dark/40 border border-dark-border text-slate-100 placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm sm:text-base disabled:opacity-50"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs sm:text-sm font-semibold text-slate-300">Assunto</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Qual o motivo do contato?"
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl bg-dark/40 border border-dark-border text-slate-100 placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm sm:text-base disabled:opacity-50"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs sm:text-sm font-semibold text-slate-300">Mensagem</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Escreva sua dúvida ou mensagem detalhadamente..."
                    required
                    disabled={loading}
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl bg-dark/40 border border-dark-border text-slate-100 placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm sm:text-base resize-none disabled:opacity-50"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-primary text-dark font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-primary/95 active:scale-[0.99] transition-all disabled:opacity-50 disabled:scale-100 cursor-pointer shadow-lg shadow-primary/10"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-dark/20 border-t-dark rounded-full animate-spin"></div>
                  ) : (
                    <span>Enviar Mensagem</span>
                  )}
                </button>
              </form>

              {/* Feedback Message */}
              {feedback && (
                <div className={`mt-6 flex items-center gap-2.5 px-4 py-3.5 rounded-xl border text-sm ${
                  feedback.success 
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}>
                  {feedback.success ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                  <span className="font-semibold">{feedback.msg}</span>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contato;
