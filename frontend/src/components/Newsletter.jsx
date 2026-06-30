import React, { useState } from 'react';
import { Send, Bell, CheckCircle2, AlertCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { success: boolean, msg: string }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();

      if (response.ok) {
        setFeedback({ success: true, msg: data.message || 'Cadastrado com sucesso!' });
        setEmail('');
      } else {
        setFeedback({ success: false, msg: data.message || 'Ocorreu um erro no cadastro.' });
      }
    } catch (error) {
      console.error('Error submitting newsletter email:', error);
      setFeedback({ success: false, msg: 'Erro de conexão com o servidor. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-dark/30 to-dark-card/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-primary/20 shadow-xl space-y-8 max-w-3xl mx-auto glow-primary">
          
          {/* Icon Header */}
          <div className="inline-flex p-3 rounded-full bg-primary/10 border border-primary/20 text-primary animate-pulse">
            <Bell className="w-6 h-6" />
          </div>

          {/* Texts */}
          <div className="space-y-3">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Quer receber novidades sobre novas turmas?
            </h3>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Inscreva-se na nossa newsletter e seja o primeiro a saber as datas das próximas mentorias preparatórias e receba dicas de Scrum.
            </p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Digite seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="flex-grow px-5 py-4 rounded-xl bg-dark/50 border border-dark-border text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all font-medium disabled:opacity-50"
            />
            
            <button
              type="submit"
              disabled={loading || !email}
              className="px-6 py-4 rounded-xl bg-primary text-dark font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-dark/20 border-t-dark rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Inscrever</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Feedback Alerts */}
          {feedback && (
            <div className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border text-sm max-w-md mx-auto ${
              feedback.success 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              {feedback.success ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span className="font-semibold">{feedback.msg}</span>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default Newsletter;
