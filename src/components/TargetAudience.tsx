import { motion } from 'framer-motion';
import { Building2, Handshake, Landmark } from 'lucide-react';
import React from 'react';

function HoverCard({ title, description, icon: Icon, delay }: { title: string, description: string, icon: React.ElementType, delay: number }) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative bg-white p-8 rounded-3xl border border-neutral-100 shadow-md overflow-hidden group hover:shadow-xl transition-all duration-500"
    >
      {/* Hover glow effect (estilo Landing Page) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-3xl blur opacity-0 group-hover:opacity-10 transition duration-500" />
      
      {/* Radial cursor glow */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 166, 178, 0.06), transparent 40%)`
        }}
      />

      <div className="relative z-10">
        <div className="bg-brand-primary/5 p-4 rounded-2xl w-fit mb-6">
          <Icon className="w-6 h-6 text-brand-primary" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-3">{title}</h3>
        <p className="text-neutral-600 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function TargetAudience() {
  return (
    <section className="py-24 bg-neutral-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 tracking-tight">Ideal para sua organização</h2>
          <p className="text-lg text-neutral-600">
            Soluções personalizadas para diferentes tipos de instituições
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <HoverCard 
            title="Gestão Pública" 
            description="Prefeituras, secretarias e órgãos públicos que buscam transparência, eficiência e decisões baseadas em evidências."
            icon={Landmark}
            delay={0}
          />
          <HoverCard 
            title="Setor Produtivo" 
            description="Federações, associações comerciais e entidades que precisam de dados econômicos para estratégias e advocacy."
            icon={Handshake}
            delay={0.1}
          />
          <HoverCard 
            title="Agências de Fomento" 
            description="Instituições que investem em desenvolvimento regional e necessitam de análises territoriais precisas e monitoramento de impacto."
            icon={Building2}
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}
