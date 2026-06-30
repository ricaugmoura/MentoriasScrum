import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Contato', path: '/contato' },
    { name: 'Painel WhatsApp', path: '/dashboard', accent: true }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-dark/80 backdrop-blur-md border-b border-dark-border' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Area */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/logo-transparent.png" 
                alt="Mentorias Scrum Logo" 
                className="h-10 sm:h-12 w-auto object-contain"
                onError={(e) => {
                  // Fallback if logo transparent doesn't load or is empty
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden font-display font-extrabold text-xl tracking-tight text-white uppercase">
                Mentorias <span className="text-primary">Scrum</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              if (link.accent) {
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-dark font-semibold text-sm transition-all duration-200"
                  >
                    {link.name}
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                );
              }
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-semibold text-sm transition-colors duration-200 ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-dark-card focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 h-6" /> : <Menu className="h-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen 
          ? 'max-h-screen opacity-100 border-b border-dark-border bg-dark-card/95 backdrop-blur-lg' 
          : 'max-h-0 opacity-0 pointer-events-none overflow-hidden'
      }`}>
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-3 rounded-md font-semibold text-base transition-colors ${
                  link.accent
                    ? 'mt-4 text-center bg-primary text-dark hover:bg-primary/90'
                    : isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-slate-300 hover:bg-dark/50 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Header;
