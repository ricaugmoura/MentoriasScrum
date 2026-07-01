import React from 'react';
import { Award, Briefcase, Users, Star } from 'lucide-react';

const mentors = [
  {
    name: 'Ricardo Augusto de Moura',
    role: 'Mentor Principal & Agile Coach',
    bio: 'Profissional com vasta vivência prática no mercado corporativo, liderando transformações ágeis e escalando times de alta performance. Especialista certificado na preparação de exames da Scrum.org, já tendo mentorado milhares de profissionais a obterem suas credenciais com sucesso.',
    certifications: [
      'Professional Scrum Master I & II (PSM I, PSM II)',
      'Professional Scrum Product Owner I & II (PSPO I, PSPO II)',
      'Scaled Professional Scrum (SPS / Nexus)',
      'Professional Agile Leadership (PAL I)'
    ],
    stats: [
      { label: 'Projetos Ágeis', val: '15+' },
      { label: 'Alunos Aprovados', val: '2.5k+' },
      { label: 'Nota Média Exame', val: '97%' }
    ],
    // Local photo asset uploaded by user
    avatar: '/assets/ricardo-avatar.jpeg'
  }
];

const Mentores = () => {
  return (
    <section id="mentores" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Nossos <span className="text-primary glow-text-primary">Mentores</span>
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Aprenda com profissionais atuantes no mercado. Nossos mentores não ensinam apenas teoria, mas compartilham bagagem real e casos reais de sucesso.
          </p>
        </div>

        {/* Mentor Presentation */}
        {mentors.map((mentor, index) => (
          <div 
            key={index}
            className="p-8 lg:p-12 rounded-3xl bg-dark-card/50 border border-dark-border/80 backdrop-blur-sm shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Mentor Avatar & Stats */}
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-6">
                <div className="relative p-1.5 rounded-full border-2 border-primary bg-dark/40 overflow-hidden shadow-lg shadow-primary/10">
                  <img 
                    src={mentor.avatar} 
                    alt={mentor.name} 
                    className="w-48 h-48 rounded-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 p-2 rounded-full bg-emerald-500 text-dark border border-dark-card shadow">
                    <Star className="w-5 h-5 fill-dark" />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">{mentor.name}</h3>
                  <p className="text-sm font-semibold text-primary">{mentor.role}</p>
                </div>

                {/* Micro stats inside image column */}
                <div className="grid grid-cols-3 gap-6 w-full pt-4 border-t border-dark-border/40 font-sans">
                  {mentor.stats.map((st, i) => (
                    <div key={i} className="text-center">
                      <p className="text-lg font-extrabold text-white">{st.val}</p>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{st.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentor Bio & Certifications list */}
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Sobre o Mentor
                  </h4>
                  <p className="text-slate-300 leading-relaxed text-base">
                    {mentor.bio}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-dark-border/40">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Principais Certificações Scrum.org
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {mentor.certifications.map((cert, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-dark-card border border-dark-border text-slate-300 font-semibold"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Mentores;
