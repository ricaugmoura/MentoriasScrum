import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
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
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative p-8 rounded-2xl bg-dark-card/40 border border-white/5 shadow-2xl backdrop-blur-sm overflow-hidden glow-primary">
              
              {/* Card Header decoration */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-xs text-slate-500 font-mono">scrum_guide_v2020.sh</span>
              </div>

              {/* Graphic Code/Simulated content */}
              <div className="space-y-4 font-mono text-sm text-slate-400">
                <p className="text-primary font-bold"># Preparatório Exclusivo</p>
                <div className="pl-4 border-l border-primary/20 space-y-2">
                  <p><span className="text-slate-500">class</span> <span className="text-white">MentoriaScrum</span> &#123;</p>
                  <p className="pl-4"><span className="text-slate-500">constructor</span>() &#123;</p>
                  <p className="pl-8 text-cyan-400">this.didatica = "Mercado & Prática";</p>
                  <p className="pl-8 text-cyan-400">this.foco = "Aprovação Scrum.org";</p>
                  <p className="pl-8 text-cyan-400">this.metodologia = "Ativa";</p>
                  <p className="pl-4">&#125;</p>
                  <p className="pl-4"><span className="text-slate-500">async</span> <span className="text-emerald-400">obterSucesso</span>(aluno) &#123;</p>
                  <p className="pl-8 text-cyan-400"><span className="text-slate-500">await</span> aluno.estudarSimulados();</p>
                  <p className="pl-8 text-cyan-400"><span className="text-slate-500">return</span> "CERTIFICADO_EMITIDO";</p>
                  <p className="pl-4">&#125;</p>
                  <p>&#125;</p>
                </div>
                
                {/* Decorative Stats */}
                <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-dark-border font-sans">
                  <div>
                    <p className="text-2xl font-extrabold text-white">97%</p>
                    <p className="text-xs text-slate-500">Média de Nota nos Exames</p>
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-white">2.5k+</p>
                    <p className="text-xs text-slate-500">Alunos Mentorados</p>
                  </div>
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
