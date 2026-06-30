import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden flex items-center">
      {/* Background radial accent glow */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vw] rounded-full bg-primary/10 blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-semibold text-primary animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>Acelere sua aprovação com especialistas</span>
            </div>

            {/* Title */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] animate-slide-up">
              Mentoria de Alto Impacto para <span className="text-primary glow-text-primary">Certificações Ágeis</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Não vendemos certificações. Preparamos você com didática impecável, dinâmicas reais e simulados práticos para ser aprovado nos exames da <strong>Scrum.org</strong> (PSM I, PSPO I) na primeira tentativa.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#mentorias"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-dark font-bold text-base hover:bg-primary/90 hover:scale-[1.02] shadow-lg shadow-primary/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                Conhecer Mentorias
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/contato"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-dark-card border border-dark-border hover:border-slate-500 hover:bg-dark-card/85 text-slate-100 font-semibold text-base transition-all active:scale-[0.98]"
              >
                Fale com um Mentor
              </Link>
            </div>

            {/* Trust Points */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>+95% de Aprovação</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>Simulados Exclusivos</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>Suporte via WhatsApp</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual illustration or high-end mockup card */}
          <div className="lg:col-span-5 hidden lg:block animate-fade-in">
            <div className="relative p-8 rounded-2xl bg-dark-card/45 border border-white/5 shadow-2xl backdrop-blur-sm overflow-hidden glow-primary space-y-6">
              
              {/* Card Header decoration */}
              <div className="flex justify-between items-center border-b border-dark-border/40 pb-4">
                <span className="text-xs text-primary font-bold uppercase tracking-wider">Metodologia Mentorias Scrum</span>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-semibold text-primary font-mono">Método Ativo</span>
              </div>

              {/* Graphic simulated content: checklist items instead of code */}
              <div className="space-y-5 text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary mt-0.5">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">Guia Scrum Descomplicado</h3>
                    <p className="text-xs text-slate-400 mt-1">Didática simplificada baseada no Scrum Guide 2020, focando em conceitos práticos de mercado.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">Simulados Realistas</h3>
                    <p className="text-xs text-slate-400 mt-1">Acesso a centenas de questões comentadas idênticas aos exames oficiais da Scrum.org.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary mt-0.5">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">Aulas Interativas Ao Vivo</h3>
                    <p className="text-xs text-slate-400 mt-1">Sessões online dinâmicas para debater cenários reais e tirar dúvidas em tempo real.</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-dark-border/40">
                <div>
                  <p className="text-3xl font-extrabold text-white">97%</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Média de Nota nos Exames</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-white">2.5k+</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Alunos Mentorados</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
