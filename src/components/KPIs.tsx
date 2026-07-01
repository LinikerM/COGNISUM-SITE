import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { BarChart3, Building2, TrendingUp } from 'lucide-react';

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) => Math.floor(current));

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, spring, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const stats = [
  {
    icon: Building2,
    label: "Municípios de SP",
    value: 645,
    isNumber: true,
    subtitle: "cobertura estadual completa",
  },
  {
    icon: BarChart3,
    label: "Indicadores",
    value: 100,
    suffix: "+",
    isNumber: true,
    subtitle: "métricas socioeconômicas",
  },
  {
    icon: TrendingUp,
    label: "Transparência Total",
    value: 100,
    suffix: "%",
    isNumber: true,
    subtitle: "dados auditáveis e precisos",
  },
];

export function KPIs() {
  return (
    <section className="bg-brand-primary/5 border-y border-brand-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="bg-brand-primary p-3 rounded-full">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-neutral-900 mb-1 flex items-baseline justify-center gap-0.5">
                  <AnimatedCounter value={stat.value} />
                  {stat.suffix && <span>{stat.suffix}</span>}
                </div>
                <div className="text-sm font-medium text-neutral-700">{stat.label}</div>
                <div className="text-xs text-neutral-500 mt-1">{stat.subtitle}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
