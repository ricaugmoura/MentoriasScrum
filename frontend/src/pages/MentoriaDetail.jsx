import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, MessageCircle, Calendar, Users, Award, ShieldAlert } from 'lucide-react';

const coursesData = {
  'psm-i': {
    title: 'Preparatório PSM I',
    subtitle: 'Professional Scrum Master I',
    description: 'A mentoria definitiva para você conquistar a certificação Scrum Master da Scrum.org. Focamos no entendimento profundo da teoria empírica e dos pilares do Scrum, garantindo a sua aprovação e conhecimento prático.',
    duration: '12 horas de conteúdo ao vivo + Acesso a gravações por 1 ano',
    audience: 'Scrum Masters atuais ou aspirantes, Product Owners, Agile Coaches, Gerentes de Projetos, Desenvolvedores e membros de times ágeis.',
    investment: 'Consulte as próximas turmas e condições facilitadas',
    whatsappMsg: 'Olá! Gostaria de mais informações sobre as datas e valores do Preparatório PSM I.',
    syllabus: [
      {
        title: 'Módulo 1: Teoria do Scrum e Empirismo',
        items: ['Definição de Scrum e Empirismo', 'Os 3 pilares empíricos: Transparência, Inspeção e Adaptação', 'Os 5 valores do Scrum: Compromisso, Foco, Abertura, Respeito e Coragem']
      },
      {
        title: 'Módulo 2: O Scrum Team e Responsabilidades',
        items: ['O papel do Scrum Master e a liderança servil/facilitadora', 'O papel do Product Owner e a maximização de valor', 'Os Developers e a autogestão e foco na entrega técnica']
      },
      {
        title: 'Módulo 3: Eventos do Scrum',
        items: ['Sprint como container dos eventos', 'Sprint Planning: O quê, Como e Por quê', 'Daily Scrum: Sincronização diária e foco no Sprint Goal', 'Sprint Review: Inspeção do incremento e colaboração', 'Sprint Retrospective: Melhoria contínua de processos e pessoas']
      },
      {
        title: 'Módulo 4: Artefatos e Compromissos',
        items: ['Product Backlog e a Meta do Produto (Product Goal)', 'Sprint Backlog e a Meta da Sprint (Sprint Goal)', 'Incremento e a Definição de Concluído (Definition of Done)']
      },
      {
        title: 'Módulo 5: Estratégia de Prova & Simulados',
        items: ['Como funciona a prova do PSM I da Scrum.org (80 questões, 60 min, 85% para passar)', 'Gerenciamento de tempo no exame', 'Resolução de mais de 100 questões comentadas e simulados realistas']
      }
    ],
    features: [
      'Didática simplificada baseada no Scrum Guide 2020.',
      'Encontros dinâmicos e altamente participativos (nada de slides maçantes).',
      'Grupo de estudos fechado no WhatsApp diretamente com os mentores.',
      'Acesso a simulados exclusivos idênticos aos cobrados no exame.'
    ]
  },
  'pspo-i': {
    title: 'Preparatório PSPO I',
    subtitle: 'Professional Scrum Product Owner I',
    description: 'Desenvolva as habilidades cruciais para atuar na gestão de produtos com Scrum. Esta mentoria ensina você a tomar decisões baseadas em valor, gerenciar backlogs complexos e obter a certificação PSPO I da Scrum.org.',
    duration: '12 horas de conteúdo ao vivo + Acesso a gravações por 1 ano',
    audience: 'Product Owners, Product Managers, Analistas de Negócios, Donos de Produto, UX Designers e Agile Coaches que desejam maximizar valor.',
    investment: 'Consulte as próximas turmas e condições facilitadas',
    whatsappMsg: 'Olá! Gostaria de mais informações sobre as datas e valores do Preparatório PSPO I.',
    syllabus: [
      {
        title: 'Módulo 1: Gestão de Produtos com Scrum',
        items: ['Diferença entre Gerenciamento de Projetos e Gestão de Produtos', 'O ciclo de vida do produto', 'Como o Product Owner atua no framework Scrum']
      },
      {
        title: 'Módulo 2: Entrega Baseada em Valor',
        items: ['O que é valor para o negócio e para o cliente?', 'Métricas de valor: Evidence-Based Management (EBM)', 'Lançamentos (Releases) de Produto e ROI']
      },
      {
        title: 'Módulo 3: Product Backlog & Stakeholders',
        items: ['Ordenação e refinamento do Product Backlog', 'Escrevendo Meta do Produto (Product Goal) clara', 'Colaboração com Stakeholders e blindagem do time de desenvolvimento']
      },
      {
        title: 'Módulo 4: Planejamento de Sprints & Release',
        items: ['Release Planning sob incertezas', 'Colaboração no Sprint Planning e definição do Sprint Goal', 'Validação de hipóteses e MVP (Minimum Viable Product)']
      },
      {
        title: 'Módulo 5: Simulados e Dicas de Certificação',
        items: ['Detalhes do exame PSPO I da Scrum.org (80 questões, 60 min, 85% aprovação)', 'Foco nas pegadinhas comuns da prova', 'Discussão e resolução de simulados completos']
      }
    ],
    features: [
      'Foco em maximização de valor de negócios prático.',
      'Modelos e ferramentas de priorização de backlog aplicáveis.',
      'Explicação aprofundada de Evidence-Based Management (EBM).',
      'Simulados atualizados com explicações lógicas em português.'
    ]
  },
  'sps-nexus': {
    title: 'Scaled Professional Scrum (SPS)',
    subtitle: 'Nexus Framework',
    description: 'Aprenda a escalar o desenvolvimento de produtos complexos integrando múltiplos times Scrum. Esta mentoria prepara você para aplicar o Nexus Framework e obter a certificação SPS da Scrum.org.',
    duration: '8 horas de conteúdo ao vivo + Acesso a gravações por 1 ano',
    audience: 'Agile Coaches, Scrum Masters experientes, Agile Leaders, PMOs e profissionais envolvidos em escalar Scrum na organização.',
    investment: 'Consulte as próximas turmas e condições facilitadas',
    whatsappMsg: 'Olá! Gostaria de mais informações sobre as datas e valores da Mentoria SPS (Nexus).',
    syllabus: [
      {
        title: 'Módulo 1: Introdução ao Scrum em Escala',
        items: ['Quando e por que escalar o Scrum?', 'Desafios do Scrum em larga escala: Dependências e integração', 'Diferença entre escalar processos e escalar o framework']
      },
      {
        title: 'Módulo 2: O Nexus Framework',
        items: ['O que é o Nexus? (De 3 a 9 times trabalhando em um único backlog)', 'A função do Nexus Integration Team (NIT)', 'Novas responsabilidades e papéis no Nexus']
      },
      {
        title: 'Módulo 3: Eventos e Artefatos do Nexus',
        items: ['Refinamento Cross-Team (Cross-Team Refinement)', 'Nexus Sprint Planning, Nexus Daily Scrum, Nexus Sprint Review', 'Nexus Sprint Retrospective e a melhoria em escala', 'Meta do Nexus (Nexus Sprint Goal) e Incremento Integrado']
      },
      {
        title: 'Módulo 4: Gerenciamento de Dependências e Integração',
        items: ['Técnicas de mapeamento e eliminação de dependências', 'Integração contínua e a Definição de Concluído integrada', 'Prevenção de conflitos arquiteturais e de código']
      },
      {
        title: 'Módulo 5: Preparação para a Certificação SPS',
        items: ['Estrutura da prova SPS da Scrum.org (40 questões, 60 min, 85% aprovação)', 'Questões complexas de cenários reais em escala', 'Resolução comentada de simulados']
      }
    ],
    features: [
      'Instrução voltada a arquitetura organizacional e redução de ruídos.',
      'Análise de cenários reais de engenharia de software em escala.',
      'Acesso direto a mentores certificados em SPS pela Scrum.org.',
      'Simulados com feedback imediato.'
    ]
  }
};

const MentoriaDetail = () => {
  const { slug } = useParams();
  const course = coursesData[slug];

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
          <div className="max-w-4xl space-y-6">
            <span className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-wider">
              {course.subtitle}
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Mentoria {course.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {course.description}
            </p>
            
            {/* Quick stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-dark-border/60">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <h4 className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Duração</h4>
                  <p className="text-xs font-semibold text-slate-200 mt-0.5">{course.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <h4 className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Público-Alvo</h4>
                  <p className="text-xs font-semibold text-slate-200 mt-0.5 truncate max-w-[200px]">{course.audience}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <h4 className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Investimento</h4>
                  <p className="text-xs font-semibold text-slate-200 mt-0.5">{course.investment}</p>
                </div>
              </div>
            </div>

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

        {/* Content Breakdown grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Syllabus Outline Column */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-display font-extrabold text-2xl text-white">Conteúdo Programático</h2>
            
            <div className="space-y-4">
              {course.syllabus.map((module, i) => (
                <div key={i} className="p-6 rounded-2xl bg-dark-card border border-dark-border/80">
                  <h3 className="font-display font-bold text-base sm:text-lg text-white mb-4">{module.title}</h3>
                  <ul className="space-y-2.5">
                    {module.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
