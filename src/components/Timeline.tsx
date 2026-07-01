import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    title: 'Diagnóstico e Mapeamento',
    description: 'Identificamos fontes de dados, necessidades específicas e objetivos estratégicos da sua organização.'
  },
  {
    title: 'Integração e Tratamento',
    description: 'Coletamos, validamos e estruturamos dados de múltiplas fontes com metodologia rigorosa.'
  },
  {
    title: 'Análise e Modelagem',
    description: 'Aplicamos técnicas estatísticas avançadas para extrair insights e projeções confiáveis.'
  },
  {
    title: 'Visualização e Entrega',
    description: 'Criamos dashboards interativos e relatórios executivos com recomendações práticas.'
  },
  {
    title: 'Monitoramento Contínuo',
    description: 'Atualizamos constantemente os dados e refinamos as análises para decisões sempre atuais.'
  }
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">Como trabalhamos</h2>
          <p className="text-xl text-neutral-600">
            Um processo estruturado que garante resultados acionáveis em cada projeto.
          </p>
        </div>

        <div ref={containerRef} className="relative">
          {/* Linha de fundo (inativa) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-neutral-200 transform md:-translate-x-1/2 rounded-full" />
          
          {/* Linha ativa animada */}
          <motion.div 
            style={{ height }}
            className="absolute left-6 md:left-1/2 top-0 w-1 bg-gradient-to-b from-brand-secondary to-brand-primary transform md:-translate-x-1/2 rounded-full origin-top"
          />

          <div className="space-y-12">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex items-center md:justify-between flex-col md:flex-row gap-8 md:gap-0">
                  
                  {/* Indicator Dot */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="absolute left-6 md:left-1/2 w-6 h-6 bg-white border-4 border-brand-primary rounded-full transform -translate-x-[10px] md:-translate-x-1/2 z-10"
                  />

                  {/* Spacer for alternating layout on desktop */}
                  <div className={`hidden md:block w-5/12 ${isEven ? 'order-1' : 'order-2'}`} />

                  {/* Content Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`w-full md:w-5/12 pl-16 md:pl-0 ${isEven ? 'order-2 md:text-left' : 'order-2 md:order-1 md:text-right'}`}
                  >
                    <div className="glass-card p-6 border-white/50 hover:border-brand-primary/20 transition-colors">
                      <span className="text-brand-secondary font-bold text-sm tracking-wider uppercase mb-2 block">Etapa 0{index + 1}</span>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">{step.title}</h3>
                      <p className="text-neutral-600">{step.description}</p>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
