import { motion } from 'framer-motion';
import { ArrowRight, BarChart2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative bg-[#020817] text-white min-h-[90vh] flex items-center overflow-hidden pt-20">
      {/* Background Text Watermark (inspirado na Landing Page) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none flex flex-col items-center justify-center opacity-[0.03] z-0">
        <div className="transform -rotate-6 scale-150 whitespace-nowrap">
          <div className="text-[12vw] font-black leading-none tracking-tighter text-center">
            <span className="text-brand-secondary">dados</span><span className="text-white"> que</span>
          </div>
          <div className="text-[12vw] font-black leading-none tracking-tighter text-center ml-[10vw]">
            <span className="text-white">viram </span><span className="text-brand-primary">decisão</span>
          </div>
        </div>
      </div>

      {/* Glows Decorativos (estilo Landing Page - mais intensos) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Lado Esquerdo - Texto */}
          <div className="text-left">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-brand-secondary/10 border border-brand-secondary/20 px-4 py-2 rounded-full mb-8">
              <BarChart2 className="w-4 h-4 text-brand-secondary" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary">Inteligência Territorial</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Dados que viram <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-accent">decisão sustentável.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-400 mb-8 max-w-2xl"
            >
              Transformamos bases complexas em painéis interativos e relatórios executivos para gestores públicos e institucionais.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-fit"
            >
              <button
                onClick={() => document.getElementById('solucoes')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-[#0f3a66] text-white px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 shadow-lg shadow-brand-primary/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                Ver Soluções
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <NavLink
                to="/contato"
                className="inline-flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 hover:bg-white/10 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 backdrop-blur-sm hover:border-white/20"
              >
                Falar com Especialista
              </NavLink>
            </motion.div>
          </div>

          {/* Lado Direito - Preview visual (estilo Landing Page) */}
          <motion.div variants={itemVariants} className="relative group hidden lg:block">
            {/* Glow do card (estilo Landing Page) */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

            <div className="relative bg-gray-900/80 rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-6">
              {/* Mockup de Dashboard */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-3 text-xs text-gray-500 font-mono">dashboard.cognisum.io</span>
              </div>
              <div className="space-y-4">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Emprego Formal</div>
                    <div className="text-xl font-bold text-brand-secondary">+12.4%</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Empresas Ativas</div>
                    <div className="text-xl font-bold text-brand-accent">3.847</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">IDH Municipal</div>
                    <div className="text-xl font-bold text-white">0.805</div>
                  </div>
                </div>
                {/* Chart mockup */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 h-32 flex items-end justify-between gap-1">
                  {[40, 55, 45, 70, 60, 80, 65, 90, 75, 95, 85, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-brand-primary/60 to-brand-secondary/60"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                {/* Bottom row */}
                <div className="flex gap-3">
                  <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Atualizado em</div>
                    <div className="text-sm font-medium text-white">Julho 2026</div>
                  </div>
                  <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Municípios</div>
                    <div className="text-sm font-medium text-white">645 cidades</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
