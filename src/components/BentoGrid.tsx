import { motion } from 'framer-motion';
import { LayoutDashboard, ArrowRight, ExternalLink } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function BentoGrid() {
  return (
    <section id="solucoes" className="py-24 bg-[var(--background)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
            Soluções completas para <br className="hidden md:block" /> sua gestão
          </h2>
          <p className="text-lg text-neutral-600">
            Módulos integrados para você começar pelo essencial e evoluir para análises preditivas e governança.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1 - Dashboards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="group relative bg-white p-8 md:p-10 rounded-3xl border border-neutral-100 shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500"
          >
            {/* Glow hover (estilo Landing Page) */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-3xl blur opacity-0 group-hover:opacity-15 transition duration-500" />
            
            <div className="relative z-10">
              <div className="bg-brand-primary/5 p-4 rounded-2xl w-fit mb-6">
                <LayoutDashboard className="w-7 h-7 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Dashboards Inteligentes</h3>
              <p className="text-neutral-600 text-lg mb-8 leading-relaxed">
                Indicadores confiáveis, comparáveis e atualizados em tempo real. Visualizações intuitivas que transformam números complexos em insights diretos.
              </p>
              <a href="https://mapeamento.info" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#0f3a66] transition-all shadow-lg shadow-brand-primary/20">
                Explore nossos projetos <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Card 2 - Governança */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative bg-gradient-to-br from-brand-primary to-[#0f3a66] p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500"
          >
            {/* Glow hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-accent rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">Governança Transparente</h3>
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  Integre 100% dos seus dados com rastreabilidade total de fontes e documentação auditável de cada indicador.
                </p>
              </div>
              <NavLink to="/contato" className="inline-flex items-center justify-center gap-2 w-full bg-white text-brand-primary px-6 py-4 rounded-2xl font-bold hover:bg-neutral-100 transition-colors shadow-sm">
                Agendar Reunião
                <ArrowRight className="w-5 h-5" />
              </NavLink>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
