import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, MessageCircle, Calendar, Users, Award, ShieldAlert } from 'lucide-react';
import { coursesData } from '../data/courses';

const MentoriaDetail = () => {
  const { slug } = useParams();
  const course = coursesData[slug];

  React.useEffect(() => {
    if (course) {
      document.title = `Mentoria ${course.title.replace('\n', ' ')}${course.subtitle ? ` | ${course.subtitle}` : ''} - Mentorias Scrum`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', course.description);
      }
    }
    return () => {
      // Restore default title on unmount
      document.title = 'Mentorias Scrum | Preparatórios para Certificação Ágil';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Prepare-se para as certificações ágeis da Scrum.org with nossos mentores especialistas. Mentorias Scrum focadas na sua aprovação.');
      }
    };
  }, [course]);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <ShieldAlert className="w-16 h-16 text-primary mx-auto" />
        <h2 className="text-2xl font-bold text-white">Mentoria não encontrada</h2>
        <p className="text-slate-400">A mentoria solicitada não existe ou foi removida.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-dark font-bold">
          <ArrowLeft className="w-5 h-5" /> Voltar ao Início
        </Link>
      </div>
    );
  }

  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-8 font-semibold text-sm">
          <ArrowLeft className="w-4 h-4" /> Voltar para o Início
        </Link>

        {/* Course Header Hero card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-dark-card border border-dark-border glow-primary mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {course.shield && (
              <img 
                src={course.shield} 
                alt={`Escudo ${course.title.replace('\n', ' ')}`} 
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain flex-shrink-0"
              />
            )}
            <div className="flex-grow space-y-6 text-center md:text-left">
              {course.subtitle && (
                <span className="inline-block px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-wider">
                  {course.subtitle}
                </span>
              )}
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight whitespace-pre-line">
                Mentoria {course.title}
              </h1>
            

            {/* Direct CTA */}
            <div className="pt-4">
              <a
                href={`https://wa.me/5511957318784?text=${encodeURIComponent(course.whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 text-dark font-extrabold text-base hover:bg-emerald-600 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
              >
                <MessageCircle className="w-5 h-5" />
                Verificar Vagas e Datas no WhatsApp
              </a>
            </div>

          </div>
        </div>
      </div>

        {/* Content Breakdown grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Syllabus Outline Column */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-display font-extrabold text-2xl text-white">Conteúdo Programático</h2>
            
            <div className="p-6 rounded-2xl bg-dark-card border border-dark-border/80">
              <ul className="space-y-3">
                {course.syllabus.flatMap(module => module.items).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-400">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Differential list sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="p-6 rounded-2xl bg-dark-card/50 border border-dark-border/80 space-y-6">
              <h3 className="font-display font-bold text-lg text-white">O que está incluso?</h3>
              
              <ul className="space-y-4">
                {course.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default MentoriaDetail;
