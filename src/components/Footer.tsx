import { NavLink } from 'react-router-dom';
import { Globe, PlayCircle, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <img 
              src="/logos/logo-cognisum-sem-textura.png" 
              alt="Cognisum" 
              className="h-12 w-auto object-contain self-start brightness-0 invert" 
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Soluções em inteligência de dados para gestão pública e institucional. Dados que viram decisão sustentável.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary transition-colors border border-white/10">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary transition-colors border border-white/10">
                <PlayCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links e Contato */}
          <div>
            <h4 className="font-bold text-lg mb-4">Navegação</h4>
            <div className="flex gap-6 text-sm text-gray-400 mb-6">
              <NavLink to="/" className="hover:text-brand-secondary transition-colors">Home</NavLink>
              <NavLink to="/cursos" className="hover:text-brand-secondary transition-colors">Cursos</NavLink>
              <NavLink to="/contato" className="hover:text-brand-secondary transition-colors">Contato</NavLink>
            </div>
            
            <h4 className="font-bold text-lg mb-4">Fale Conosco</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <a href="mailto:atendimento@cognisum.com.br" className="flex items-center gap-3 hover:text-brand-secondary transition-colors">
                <Mail className="h-4 w-4" />
                atendimento@cognisum.com.br
              </a>
              <a href="tel:+5516981301147" className="flex items-center gap-3 hover:text-brand-secondary transition-colors">
                <Phone className="h-4 w-4" />
                (16) 9 8130-1147
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                São Carlos – SP
              </div>
            </div>
          </div>

          {/* Powered by / Projects */}
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Projetos</span>
            <a
              href="https://mapeamento.info"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            >
              mapeamento.info
              <ExternalLink className="h-4 w-4" />
            </a>
            <p className="text-gray-500 text-xs text-center mt-2">
              Plataforma de visualização de dados e inteligência municipal
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Cognisum. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
