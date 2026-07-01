import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function CallToAction() {
  return (
    <section className="relative bg-[#020817] text-white py-32 overflow-hidden">
      {/* Background Glows (estilo Landing Page) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Background Text Watermark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none flex items-center justify-center opacity-[0.02] z-0">
        <div className="text-[15vw] font-black tracking-tighter text-white whitespace-nowrap">
          COGNISUM
        </div>
      </div>
      
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Pronto para transformar <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-accent">seus dados em ação?</span>
          </h2>
          
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Descubra como nossa plataforma pode revolucionar a gestão da sua organização com insights precisos e acionáveis.
          </p>
          
          <NavLink 
            to="/contato" 
            className="group relative inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-[#0f3a66] text-white px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 shadow-lg shadow-brand-primary/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            Solicitar demonstração
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </NavLink>
        </motion.div>
      </div>
    </section>
  );
}
