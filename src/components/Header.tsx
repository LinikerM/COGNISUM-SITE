import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha menu mobile ao mudar de rota
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const isDarkSection = isHome && !isScrolled;

  const headerClass = twMerge(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    isScrolled ? 'glass-header' : 'bg-transparent py-4',
    isDarkSection && !isScrolled ? 'text-white' : 'text-neutral-900',
    isMobileMenuOpen && 'bg-white text-neutral-900' // Menu aberto fica sempre claro
  );

  const logoSrc = isDarkSection && !isScrolled && !isMobileMenuOpen
    ? '/logos/logo-cognisum-sem-textura.png' // versão que fique boa no escuro (se existir versão invertida, colocar aqui, senão usar original. Vamos usar original por enquanto, mas aplicar brilho)
    : '/logos/logo-cognisum-sem-textura.png';

  const linkClass = (isActive: boolean) => twMerge(
    'px-3 py-2 rounded-lg transition-colors font-medium text-sm',
    isActive ? (isDarkSection && !isScrolled && !isMobileMenuOpen ? 'bg-white/10' : 'bg-brand-primary/10 text-brand-primary') : 'hover:bg-brand-primary/5'
  );

  return (
    <header className={headerClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/">
              <img
                className={clsx("h-10 sm:h-12 w-auto object-contain transition-all", isDarkSection && !isScrolled && !isMobileMenuOpen ? "brightness-0 invert" : "")}
                src={logoSrc}
                alt="Cognisum"
              />
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink to="/" className={({ isActive }) => linkClass(isActive)}>Home</NavLink>
            <NavLink to="/cursos" className={({ isActive }) => linkClass(isActive)}>Cursos</NavLink>
            <NavLink to="/contato" className={clsx(
              "ml-4 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300",
              isDarkSection && !isScrolled
                ? "bg-white text-brand-primary hover:bg-white/90"
                : "bg-brand-primary text-white hover:bg-[#0f3a66] shadow-sm hover:shadow-md"
            )}>
              Contato
            </NavLink>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={clsx(
        "md:hidden fixed inset-0 top-16 bg-white z-40 transition-transform duration-300 ease-in-out transform",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="px-4 pt-4 pb-6 space-y-2 flex flex-col h-full bg-white text-neutral-900 shadow-xl border-t border-gray-100">
          <NavLink to="/" className={({ isActive }) => twMerge("block px-4 py-4 rounded-xl text-lg font-medium", isActive ? "bg-brand-primary/5 text-brand-primary" : "text-neutral-700")}>
            Home
          </NavLink>
          <NavLink to="/cursos" className={({ isActive }) => twMerge("block px-4 py-4 rounded-xl text-lg font-medium", isActive ? "bg-brand-primary/5 text-brand-primary" : "text-neutral-700")}>
            Cursos
          </NavLink>
          <div className="mt-auto pb-8 pt-4">
            <NavLink to="/contato" className="block w-full text-center px-6 py-4 rounded-xl font-bold text-lg bg-brand-primary text-white shadow-md">
              Fale Conosco
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
