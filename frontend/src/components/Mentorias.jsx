import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Users, MessageCircle, ArrowRight } from 'lucide-react';

const courses = [
  {
    slug: 'psm-i',
    title: 'Preparatório PSM I',
    subtitle: 'Professional Scrum Master I',
    description: 'Domine o framework Scrum, os papéis, eventos, artefatos e as regras descritas no Scrum Guide. Desenvolva postura de líder servil e prepare-se para gabaritar a certificação mais desejada do mercado ágil.',
    duration: '12h ao vivo + Gravações',
    audience: 'Scrum Masters, Gestores, Líderes e Desenvolvedores',
    color: 'border-primary/30 hover:border-primary',
    tag: 'Mais Procurado',
    whatsappMsg: 'Olá! Gostaria de saber mais sobre a Mentoria Preparatória para o PSM I.'
  },
  {
    slug: 'pspo-i',
    title: 'Preparatório PSPO I',
    subtitle: 'Professional Scrum Product Owner I',
    description: 'Aprenda como maximizar o valor de negócios de produtos e sistemas de software. Foco em gestão do Product Backlog, release planning, métricas de valor e colaboração com stakeholders.',
    duration: '12h ao vivo + Gravações',
    audience: 'Product Owners, Product Managers, Empreendedores e Analistas',
    color: 'border-cyan-500/20 hover:border-cyan-400',
    tag: 'Especialização',
    whatsappMsg: 'Olá! Gostaria de saber mais sobre a Mentoria Preparatória para o PSPO I.'
  },
  {
    slug: 'sps-nexus',
    title: 'Scaled Professional Scrum (SPS)',
    subtitle: 'Nexus Framework',
    description: 'Descubra como escalar o Scrum usando o framework Nexus para coordenar o trabalho de múltiplos times Scrum trabalhando em um único produto. Ideal para desatar nós de dependências e acelerar entregas.',
    duration: '8h ao vivo + Gravações',
    audience: 'Agile Coaches, Scrum Masters experientes e Agile Leaders',
    color: 'border-purple-500/20 hover:border-purple-400',
    tag: 'Escalado',
    whatsappMsg: 'Olá! Gostaria de saber mais sobre a Mentoria para SPS (Nexus).'
  }
];

const Mentorias = () => {
  return (
    <section id="mentorias" className="relative py-20 bg-dark-card/30 border-y border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Nossas <span className="text-primary glow-text-primary">Mentorias Preparatórias</span>
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Selecione a mentoria ideal para os seus objetivos profissionais. Nossos encontros são interativos, com resolução de questões comentadas em tempo real.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div 
              key={course.slug} 
              className={`flex flex-col h-full p-8 rounded-2xl bg-dark-card border backdrop-blur-sm hover:-translate-y-1 transition-all duration-300 ${course.color}`}
            >
              {/* Card Badge */}
              <div className="flex justify-between items-start mb-6">
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-semibold text-slate-400">
                  {course.tag}
                </span>
                <BookOpen className="w-5 h-5 text-primary" />
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1 mb-4">
                <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">{course.title}</h3>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">{course.subtitle}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow">
                {course.description}
              </p>

              {/* Info Items */}
              <div className="space-y-3 pt-6 border-t border-dark-border/60 mb-6 text-xs text-slate-400 font-medium">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="truncate">{course.audience}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/5511957318784?text=${encodeURIComponent(course.whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-dark font-bold text-sm transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Falar com Mentor
                </a>
                <Link
                  to={`/mentoria/${course.slug}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-dark-card border border-dark-border hover:border-slate-600 hover:bg-dark-card/90 text-slate-300 font-semibold text-sm transition-all"
                >
                  Ver Conteúdo Programático
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Mentorias;
