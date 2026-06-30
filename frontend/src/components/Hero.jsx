import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, BookOpen, Users, Award, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative py-24 lg:py-36 overflow-hidden flex items-center min-h-[85vh]">
      {/* Background radial accent glow */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vw] rounded-full bg-primary/10 blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Spacious 50/50 split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="space-y-8 text-center lg:text-left">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-semibold text-primary animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>Acelere sua aprovação com especialistas</span>
            </div>

            {/* Title */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl xl:text-6xl text-white tracking-tight leading-[1.1] animate-slide-up">
              Mentorias de Alto Impacto para <span className="block lg:inline bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent glow-text-primary">Certificações Ágeis</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Preparamos você com didática impecável, dinâmicas reais e simulados práticos para ser aprovado nos exames da <strong>Scrum.org</strong> (PSM I, PSPO I) na primeira tentativa.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
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



          </div>

          {/* Right Column: Premium Visual Card */}
          <div className="hidden lg:block animate-fade-in">
            {/* Limit max-w to align nicely on right side with proper spacing */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-b from-[#131926]/90 to-[#0e1320]/95 border border-white/10 shadow-2xl shadow-black/40 overflow-hidden glow-primary space-y-8 max-w-lg ml-auto hover:scale-[1.01] hover:border-primary/20 transition-all duration-300">
              
              {/* Card Header decoration */}
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-xs text-primary font-bold uppercase tracking-wider">Metodologia Mentorias Scrum</span>
                <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-semibold text-primary font-mono">Método Ativo</span>
              </div>

              {/* Checklist items with flex-shrink-0 to prevent icon clipping */}
              <div className="space-y-6 text-slate-300">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary mt-0.5 flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-white text-base">Os Melhores Mentores</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      Profissionais experientes e certificados para guiar você passo a passo rumo à aprovação.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary mt-0.5 flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-white text-base">Simulados Realistas</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      Acesso a centenas de questões comentadas idênticas aos exames oficiais da Scrum.org.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary mt-0.5 flex-shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-white text-base">Atendimento Individual e Personalizado</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      Sessões exclusivas focadas no seu ritmo e nos seus objetivos, eliminando todas as suas dúvidas.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative Stats */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                <div className="space-y-1">
                  <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">97%</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-snug mt-1">
                    Média de Nota nos Exames
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">2.5k+</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-snug mt-1">
                    Alunos Mentorados
                  </p>
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
