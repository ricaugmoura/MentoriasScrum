import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-card border-t border-dark-border z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo & About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/logo-transparent.png" 
                alt="Mentorias Scrum Logo" 
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              Capacitando profissionais e times ágeis a alcançarem a excelência através de mentorias de alta performance e aprovação garantida.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Acesso Rápido</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">Início</Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-primary transition-colors">Fale Conosco</Link>
              </li>
              <li>
                <a 
                  href="https://wa.me/5511957318784?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20as%20Mentorias%20Scrum!"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors text-emerald-400"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Trust badges & Affiliation */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Termos e Isenção</h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed">
              <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p>
                As mentorias oferecidas são treinamentos preparatórios para capacitação e exames de certificação. PSM I e PSPO I são marcas registradas da Scrum.org. Este site não possui afiliação, patrocínio ou associação direta com a Scrum.org.
              </p>
            </div>
          </div>

        </div>

        <div className="border-t border-dark-border mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} Mentorias Scrum. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link to="/dashboard" className="hover:text-slate-400 transition-colors">Dashboard Operador</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
