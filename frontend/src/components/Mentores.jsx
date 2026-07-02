import React from 'react';
import { Award, Briefcase, Users, Star } from 'lucide-react';

const mentors = [
  {
    name: 'Ricardo Augusto de Moura',
    role: 'Mentor Principal & Agile Coach',
    bio: 'Minha jornada no ecossistema de tecnologia me transformou em um especialista em conectar processos ágeis a resultados de mercado. Atuando como Agile Coach, Scrum Master e consultor sênior, trago a bagagem prática de quem enfrenta e resolve os desafios reais da gestão de projetos e da inovação no dia a dia. Na MentoriasScrum, traduzo metodologias complexas em ferramentas simples e poderosas para potencializar a sua carreira ou a sua empresa. Meu compromisso é com o seu crescimento contínuo e com uma agilidade que faz sentido e funciona na prática.',
    certifications: [
      'Scrum Master--I e II',
      'Product Owner I',
      'Scrum With Kanban',
      'Scrum Scaled',
      'User Experience'
    ],
    stats: [
      { label: 'Projetos Ágeis', val: '15+' },
      { label: 'Alunos Aprovados', val: '2.5k+' },
      { label: 'Nota Média Exame', val: '97%' }
    ],
    // Local photo asset uploaded by user
    avatar: '/assets/ricardo-avatar.jpeg'
  },
  {
    name: 'Ana Souza (Exemplo)',
    role: 'Mentora Convidada & Agile Master',
    bio: 'Profissional dedicada a otimizar fluxos de trabalho e escalar equipes ágeis com base em evidências. Com uma carreira consolidada em startups e grandes corporações, Ana traz uma perspectiva moderna de gestão de produtos. Na MentoriasScrum, seu foco é capacitar novos líderes a implementarem o Scrum na essência, indo muito além das regras do guia.',
    certifications: [
      'Scrum Master II',
      'Product Owner I'
    ],
    stats: [
      { label: 'Times Escalados', val: '10+' },
      { label: 'Sessões Mentoria', val: '800+' },
      { label: 'Nota Média Exame', val: '94%' }
    ],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80'
  }
];

const Mentores = () => {
  return (
    <section id="mentores" className="relative pt-8 pb-8 lg:pt-10 lg:pb-10 overflow-hidden">
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
                  <p className="text-slate-300 leading-relaxed text-base whitespace-pre-line">
                    {mentor.bio}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-dark-border/40">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Mentor das certificações
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
