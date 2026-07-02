import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, Users, MessageCircle, ArrowRight } from 'lucide-react';
import { courses } from '../data/courses';

const Mentorias = () => {
  const navigate = useNavigate();

  return (
    <section id="mentorias" className="relative pt-10 pb-8 lg:pt-12 lg:pb-10 bg-dark-card/30 border-y border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Nossas <span className="text-primary glow-text-primary">Mentorias</span>
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Conquiste sua certificação com uma mentoria feita exclusivamente para você. Atendimento individual, plano de estudos personalizado e acompanhamento contínuo até a sua aprovação.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div 
              key={course.slug} 
              onClick={() => navigate(`/mentoria/${course.slug}`)}
              className={`flex flex-col h-full p-8 rounded-2xl bg-dark-card border backdrop-blur-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer ${course.color}`}
            >
              {/* Card Badge */}
              <div className="flex justify-between items-start mb-6">
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-semibold text-slate-400">
                  {course.tag}
                </span>
                <BookOpen className="w-5 h-5 text-primary" />
              </div>

              {/* Title & Subtitle with Shield Icon */}
              <div className="flex items-start gap-4 mb-4">
                {course.shield && (
                  <img 
                    src={course.shield} 
                    alt={`Escudo ${course.title.replace('\n', ' ')}`} 
                    className="w-16 h-16 object-contain flex-shrink-0"
                  />
                )}
                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-xl text-white tracking-tight whitespace-pre-line leading-tight">{course.title}</h3>
                  {course.subtitle && (
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">{course.subtitle}</p>
                  )}
                </div>
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
              <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
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
                  Verificar detalhes
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
