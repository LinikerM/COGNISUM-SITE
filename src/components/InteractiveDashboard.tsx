import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, TrendingUp, TrendingDown, Minus, Database, Play, X, ChevronRight } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type TrendDirection = 'up-good' | 'down-good' | 'neutral';

interface Metric {
  id: string;
  label: string;
  unit: string;
  format: (v: number) => string;
  trendDirection: TrendDirection;
  source: string;
}

interface AxisDef {
  id: string;
  label: string;
  shortLabel: string;
  metrics: Metric[];
}

type LocationKey = 'sp_estado' | 'sp_cidade' | 'campinas' | 'sao_carlos';

interface Location {
  key: LocationKey;
  label: string;
}

// ─── Locations ───────────────────────────────────────────────────────────────

const LOCATIONS: Location[] = [
  { key: 'sp_estado', label: 'Estado de São Paulo' },
  { key: 'sp_cidade', label: 'São Paulo (Município)' },
  { key: 'campinas', label: 'Campinas (SP)' },
  { key: 'sao_carlos', label: 'São Carlos (SP)' },
];

const YEARS = [2020, 2021, 2022, 2023, 2024];

// ─── Formatters ──────────────────────────────────────────────────────────────

const fmtAge = (v: number) => `${v.toFixed(1)} anos`;
const fmtPctTwo = (v: number) => `${v.toFixed(2)}%`;
const fmtPctOne = (v: number) => `${v.toFixed(1)}%`;
const fmtBRL = (v: number) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtSM = (v: number) => `${v.toFixed(1)} SM`;

// ─── Metrics Definitions ─────────────────────────────────────────────────────

const METRICS: Record<string, Metric> = {
  idade_mediana: {
    id: 'idade_mediana',
    label: 'Idade Mediana',
    unit: 'anos',
    format: fmtAge,
    trendDirection: 'neutral',
    source: 'IBGE Censo 2022',
  },
  taxa_alfabetizacao: {
    id: 'taxa_alfabetizacao',
    label: 'Alfabetização',
    unit: '%',
    format: fmtPctTwo,
    trendDirection: 'up-good',
    source: 'IBGE Censo 2022',
  },
  renda_pc: {
    id: 'renda_pc',
    label: 'Renda per Capita',
    unit: 'R$',
    format: fmtBRL,
    trendDirection: 'up-good',
    source: 'Atlas ADH / ONU',
  },
  taxa_mei: {
    id: 'taxa_mei',
    label: 'Representatividade MEI',
    unit: '%',
    format: fmtPctOne,
    trendDirection: 'up-good',
    source: 'Receita Federal',
  },
  simples_nacional: {
    id: 'simples_nacional',
    label: 'Optantes Simples',
    unit: '%',
    format: fmtPctOne,
    trendDirection: 'up-good',
    source: 'Receita Federal',
  },
  escolaridade_gestores: {
    id: 'escolaridade_gestores',
    label: 'Escolaridade Gestores',
    unit: '%',
    format: fmtPctOne,
    trendDirection: 'up-good',
    source: 'IBGE MUNIC',
  },
  remuneracao_media: {
    id: 'remuneracao_media',
    label: 'Remuneração Média',
    unit: 'SM',
    format: fmtSM,
    trendDirection: 'up-good',
    source: 'RAIS / MTE',
  },
  taxa_informalidade: {
    id: 'taxa_informalidade',
    label: 'Informalidade',
    unit: '%',
    format: fmtPctOne,
    trendDirection: 'down-good',
    source: 'Atlas ADH / ONU',
  },
  sem_agua_esgoto: {
    id: 'sem_agua_esgoto',
    label: 'Sem Água/Esgoto',
    unit: '%',
    format: fmtPctTwo,
    trendDirection: 'down-good',
    source: 'Atlas ADH / ONU',
  },
};

// ─── Axes ────────────────────────────────────────────────────────────────────

const AXES: AxisDef[] = [
  {
    id: 'demo',
    label: 'Demografia & Renda',
    shortLabel: 'Demografia',
    metrics: [METRICS.idade_mediana, METRICS.taxa_alfabetizacao, METRICS.renda_pc],
  },
  {
    id: 'empresas',
    label: 'Cadastro de Empresas',
    shortLabel: 'Empresas',
    metrics: [METRICS.taxa_mei, METRICS.simples_nacional],
  },
  {
    id: 'gestao',
    label: 'Gestão & Trabalho',
    shortLabel: 'Gestão',
    metrics: [METRICS.escolaridade_gestores, METRICS.remuneracao_media, METRICS.taxa_informalidade],
  },
  {
    id: 'infra',
    label: 'Infraestrutura',
    shortLabel: 'Infra',
    metrics: [METRICS.sem_agua_esgoto],
  },
];

// ─── Data: [location][metric] = [2020, 2021, 2022, 2023, 2024] ──────────────

const DATA: Record<LocationKey, Record<string, number[]>> = {
  sp_estado: {
    idade_mediana: [35.2, 35.6, 36.0, 36.4, 36.8],
    taxa_alfabetizacao: [96.65, 96.80, 96.90, 96.95, 97.00],
    renda_pc: [1910, 2010, 2120, 2230, 2350],
    taxa_mei: [55.4, 58.2, 60.5, 62.8, 64.5],
    simples_nacional: [78.9, 80.1, 81.0, 81.5, 81.8],
    escolaridade_gestores: [80.0, 82.0, 84.0, 85.5, 87.0],
    remuneracao_media: [3.1, 3.2, 3.1, 3.2, 3.3],
    taxa_informalidade: [29.8, 29.1, 28.2, 27.5, 26.8],
    sem_agua_esgoto: [0.58, 0.55, 0.52, 0.48, 0.45],
  },
  sp_cidade: {
    idade_mediana: [36.3, 36.7, 37.0, 37.3, 37.6],
    taxa_alfabetizacao: [97.20, 97.31, 97.42, 97.45, 97.48],
    renda_pc: [2680, 2810, 2950, 3100, 3250],
    taxa_mei: [48.9, 52.3, 55.4, 58.2, 60.5],
    simples_nacional: [76.2, 77.8, 78.9, 79.5, 79.8],
    escolaridade_gestores: [82.0, 84.5, 86.0, 87.5, 90.0],
    remuneracao_media: [3.8, 3.9, 3.8, 3.9, 4.0],
    taxa_informalidade: [26.5, 25.9, 24.8, 23.9, 23.1],
    sem_agua_esgoto: [0.41, 0.38, 0.34, 0.31, 0.28],
  },
  campinas: {
    idade_mediana: [36.2, 36.6, 37.0, 37.4, 37.8],
    taxa_alfabetizacao: [97.40, 97.49, 97.59, 97.62, 97.65],
    renda_pc: [2450, 2580, 2700, 2840, 2980],
    taxa_mei: [52.3, 56.4, 59.8, 62.1, 64.2],
    simples_nacional: [78.4, 80.1, 81.3, 82.0, 82.4],
    escolaridade_gestores: [78.5, 80.0, 82.4, 85.0, 88.2],
    remuneracao_media: [3.4, 3.5, 3.4, 3.5, 3.6],
    taxa_informalidade: [24.2, 23.8, 22.5, 21.8, 21.2],
    sem_agua_esgoto: [0.28, 0.25, 0.21, 0.18, 0.15],
  },
  sao_carlos: {
    idade_mediana: [36.2, 36.6, 37.0, 37.3, 37.7],
    taxa_alfabetizacao: [97.30, 97.40, 97.50, 97.53, 97.56],
    renda_pc: [1900, 2010, 2100, 2210, 2320],
    taxa_mei: [50.1, 53.8, 56.5, 58.9, 61.2],
    simples_nacional: [79.1, 80.5, 81.6, 82.2, 82.5],
    escolaridade_gestores: [84.0, 85.5, 87.0, 88.5, 91.0],
    remuneracao_media: [3.2, 3.3, 3.2, 3.3, 3.4],
    taxa_informalidade: [25.1, 24.6, 23.5, 22.8, 22.1],
    sem_agua_esgoto: [0.09, 0.08, 0.07, 0.06, 0.05],
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getTrendInfo(
  series: number[],
  direction: TrendDirection
): { delta: number; isPositive: boolean; label: string } {
  const first = series[0];
  const last = series[series.length - 1];
  const delta = last - first;
  const pctChange = ((delta / first) * 100);

  let isPositive: boolean;
  if (direction === 'neutral') {
    isPositive = true; // always neutral color
  } else if (direction === 'up-good') {
    isPositive = delta >= 0;
  } else {
    isPositive = delta <= 0; // down-good
  }

  const sign = delta >= 0 ? '+' : '';
  const label = `${sign}${pctChange.toFixed(1)}%`;

  return { delta, isPositive, label };
}

// ─── City Selector Dropdown ──────────────────────────────────────────────────

function CitySelector({
  selected,
  onChange,
}: {
  selected: LocationKey;
  onChange: (key: LocationKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const current = LOCATIONS.find((l) => l.key === selected)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg px-3 py-1.5 text-xs text-gray-300 transition-all duration-200 cursor-pointer"
      >
        <span className="truncate max-w-[130px]">{current.label}</span>
        <ChevronDown
          className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-1 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 min-w-[200px] overflow-hidden"
          >
            {LOCATIONS.map((loc) => (
              <button
                key={loc.key}
                onClick={() => {
                  onChange(loc.key);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-xs transition-colors cursor-pointer ${
                  loc.key === selected
                    ? 'bg-brand-secondary/15 text-brand-secondary'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {loc.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Axis Tabs ───────────────────────────────────────────────────────────────

function AxisTabs({
  activeAxis,
  onChange,
}: {
  activeAxis: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-1 overflow-x-auto scrollbar-none">
      {AXES.map((axis) => (
        <button
          key={axis.id}
          onClick={() => onChange(axis.id)}
          className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-200 cursor-pointer ${
            axis.id === activeAxis
              ? 'bg-brand-secondary/20 border border-brand-secondary/40 text-brand-secondary shadow-[0_0_12px_rgba(0,166,178,0.15)]'
              : 'bg-white/5 border border-white/10 text-gray-500 hover:text-gray-300 hover:bg-white/8'
          }`}
        >
          {axis.shortLabel}
        </button>
      ))}
    </div>
  );
}

// ─── KPI Card ────────────────────────────────────────────────────────────────

function KPICard({
  metric,
  series,
  isSelected,
  onClick,
}: {
  metric: Metric;
  series: number[];
  isSelected: boolean;
  onClick: () => void;
}) {
  const currentValue = series[series.length - 1];
  const trend = getTrendInfo(series, metric.trendDirection);

  return (
    <motion.button
      layout
      onClick={onClick}
      className={`relative text-left bg-white/5 rounded-xl p-3 border transition-all duration-300 cursor-pointer group ${
        isSelected
          ? 'border-brand-secondary/50 ring-1 ring-brand-secondary/30 shadow-[0_0_20px_rgba(0,166,178,0.1)]'
          : 'border-white/5 hover:border-white/15 hover:bg-white/8'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="text-[10px] text-gray-500 mb-1 truncate">{metric.label}</div>
      <div className="text-lg font-bold text-white leading-tight mb-1">
        {metric.format(currentValue)}
      </div>
      <div className="flex items-center gap-1">
        {metric.trendDirection === 'neutral' ? (
          <Minus className="w-3 h-3 text-gray-500" />
        ) : trend.isPositive ? (
          <TrendingUp className="w-3 h-3 text-emerald-400" />
        ) : (
          <TrendingDown className="w-3 h-3 text-red-400" />
        )}
        <span
          className={`text-[10px] font-medium ${
            metric.trendDirection === 'neutral'
              ? 'text-gray-500'
              : trend.isPositive
              ? 'text-emerald-400'
              : 'text-red-400'
          }`}
        >
          {trend.label}
        </span>
        <span className="text-[9px] text-gray-600 ml-auto">vs 2020</span>
      </div>
      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          layoutId="kpi-indicator"
          className="absolute -bottom-px left-3 right-3 h-0.5 bg-brand-secondary rounded-full"
        />
      )}
    </motion.button>
  );
}

// ─── Area Chart (Eixo 1: Demografia & Renda) ────────────────────────────────

function AreaChart({
  series,
  metric,
}: {
  series: number[];
  metric: Metric;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const CHART_W = 380;
  const CHART_H = 100;
  const PADDING_X = 10;
  const PADDING_TOP = 8;
  const PADDING_BOTTOM = 4;
  const plotW = CHART_W - PADDING_X * 2;
  const plotH = CHART_H - PADDING_TOP - PADDING_BOTTOM;

  const min = Math.min(...series) * 0.995;
  const max = Math.max(...series) * 1.005;
  const range = max - min || 1;

  const points = series.map((v, i) => ({
    x: PADDING_X + (i / (series.length - 1)) * plotW,
    y: PADDING_TOP + plotH - ((v - min) / range) * plotH,
    value: v,
  }));

  // SVG path for the line
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  // SVG path for the filled area
  const areaPath = `${linePath} L${points[points.length - 1].x},${CHART_H - PADDING_BOTTOM} L${points[0].x},${CHART_H - PADDING_BOTTOM} Z`;

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
      <svg viewBox={`0 0 ${CHART_W} ${CHART_H + 20}`} className="w-full" style={{ height: 112 }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(0, 166, 178)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgb(23, 74, 126)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(23, 74, 126)" />
            <stop offset="100%" stopColor="rgb(0, 166, 178)" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 1, 2].map((i) => {
          const y = PADDING_TOP + (plotH / 2) * i;
          return (
            <line key={i} x1={PADDING_X} y1={y} x2={CHART_W - PADDING_X} y2={y}
              stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          );
        })}

        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill="url(#areaGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Data points & hit areas */}
        {points.map((p, i) => (
          <g key={i}>
            {/* Hit area */}
            <rect
              x={p.x - plotW / series.length / 2}
              y={0}
              width={plotW / series.length}
              height={CHART_H}
              fill="transparent"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ cursor: 'pointer' }}
            />
            {/* Vertical guide line on hover */}
            {hoveredIdx === i && (
              <line x1={p.x} y1={PADDING_TOP} x2={p.x} y2={CHART_H - PADDING_BOTTOM}
                stroke="rgba(0,166,178,0.3)" strokeWidth="1" strokeDasharray="3,3" />
            )}
            {/* Dot */}
            <motion.circle
              cx={p.x} cy={p.y} r={hoveredIdx === i ? 5 : 3}
              fill={hoveredIdx === i ? '#00A6B2' : '#174A7E'}
              stroke={hoveredIdx === i ? '#00A6B2' : 'transparent'}
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            />
            {/* Tooltip */}
            {hoveredIdx === i && (
              <g>
                <rect x={p.x - 40} y={p.y - 24} width={80} height={18} rx={6}
                  fill="#1f2937" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <text x={p.x} y={p.y - 12} textAnchor="middle" fill="white"
                  fontSize="9" fontWeight="600" fontFamily="Outfit, system-ui">
                  {metric.format(p.value)}
                </text>
              </g>
            )}
            {/* Year label */}
            <text x={p.x} y={CHART_H + 12} textAnchor="middle" fill={hoveredIdx === i ? '#00A6B2' : 'rgba(255,255,255,0.3)'}
              fontSize="9" fontFamily="Outfit, system-ui" fontWeight={hoveredIdx === i ? '600' : '400'}>
              {YEARS[i]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── Ring Chart (Eixo 2: Empresas) ───────────────────────────────────────────

function RingChart({
  metrics: axisMetrics,
  location,
}: {
  metrics: Metric[];
  location: LocationKey;
}) {
  const [hoveredRing, setHoveredRing] = useState<number | null>(null);

  const R = 36;
  const STROKE = 7;
  const circumference = 2 * Math.PI * R;

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
      <div className="flex items-center justify-around" style={{ height: 112 }}>
        {axisMetrics.map((metric, idx) => {
          const series = DATA[location][metric.id];
          const value = series[series.length - 1];
          const prevValue = series[series.length - 2];
          const pct = value / 100;
          const dashLen = circumference * pct;
          const gapLen = circumference * (1 - pct);
          const isHovered = hoveredRing === idx;
          const colors = [
            { track: 'rgba(0,166,178,0.12)', fill: '#00A6B2', glow: 'rgba(0,166,178,0.3)' },
            { track: 'rgba(255,178,0,0.12)', fill: '#FFB200', glow: 'rgba(255,178,0,0.3)' },
          ];
          const c = colors[idx] || colors[0];

          return (
            <div
              key={metric.id}
              className="flex flex-col items-center gap-1 cursor-pointer"
              onMouseEnter={() => setHoveredRing(idx)}
              onMouseLeave={() => setHoveredRing(null)}
            >
              <div className="relative">
                <svg width={R * 2 + STROKE + 8} height={R * 2 + STROKE + 8}>
                  {/* Glow on hover */}
                  {isHovered && (
                    <circle
                      cx={R + STROKE / 2 + 4} cy={R + STROKE / 2 + 4} r={R}
                      fill="none" stroke={c.glow} strokeWidth={STROKE + 6}
                      opacity={0.3}
                    />
                  )}
                  {/* Track */}
                  <circle
                    cx={R + STROKE / 2 + 4} cy={R + STROKE / 2 + 4} r={R}
                    fill="none" stroke={c.track} strokeWidth={STROKE}
                  />
                  {/* Fill */}
                  <motion.circle
                    cx={R + STROKE / 2 + 4} cy={R + STROKE / 2 + 4} r={R}
                    fill="none" stroke={c.fill} strokeWidth={STROKE}
                    strokeLinecap="round"
                    strokeDasharray={`${dashLen} ${gapLen}`}
                    strokeDashoffset={circumference * 0.25}
                    initial={{ strokeDasharray: `0 ${circumference}` }}
                    animate={{ strokeDasharray: `${dashLen} ${gapLen}` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.15 }}
                    style={{ filter: isHovered ? `drop-shadow(0 0 6px ${c.glow})` : 'none' }}
                  />
                  {/* Center text */}
                  <text
                    x={R + STROKE / 2 + 4} y={R + STROKE / 2 + 2}
                    textAnchor="middle" dominantBaseline="middle"
                    fill="white" fontSize="13" fontWeight="700" fontFamily="Outfit, system-ui"
                  >
                    {value.toFixed(1)}%
                  </text>
                </svg>
              </div>
              <span className={`text-[9px] font-medium transition-colors ${isHovered ? 'text-white' : 'text-gray-500'}`}>
                {metric.label.length > 18 ? metric.label.slice(0, 16) + '…' : metric.label}
              </span>
              <span className="text-[8px] text-gray-600">
                {value > prevValue ? '↑' : '↓'} vs {YEARS[YEARS.length - 2]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Horizontal Bar Chart (Eixo 3: Gestão & Trabalho) ───────────────────────

function HorizontalBarChart({
  metrics: axisMetrics,
  location,
}: {
  metrics: Metric[];
  location: LocationKey;
}) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Normalize all values to a 0-100 visual scale
  // Escolaridade and Informalidade are already %, Remuneração is in SM (multiply by 25 for visual scale)
  const getVisualWidth = (metric: Metric, value: number): number => {
    if (metric.unit === 'SM') return Math.min((value / 5) * 100, 100);
    return Math.min(value, 100);
  };

  const barColors = [
    { bg: 'rgba(0,166,178,0.12)', fill: 'linear-gradient(90deg, #174A7E, #00A6B2)' },
    { bg: 'rgba(255,178,0,0.12)', fill: 'linear-gradient(90deg, #174A7E, #FFB200)' },
    { bg: 'rgba(99,102,241,0.12)', fill: 'linear-gradient(90deg, #174A7E, #818CF8)' },
  ];

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
      <div className="space-y-3" style={{ height: 112, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {axisMetrics.map((metric, idx) => {
          const series = DATA[location][metric.id];
          const value = series[series.length - 1];
          const width = getVisualWidth(metric, value);
          const isHovered = hoveredBar === idx;
          const c = barColors[idx];

          return (
            <div
              key={metric.id}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredBar(idx)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[9px] font-medium transition-colors ${isHovered ? 'text-white' : 'text-gray-400'}`}>
                  {metric.label}
                </span>
                <span className={`text-[10px] font-bold transition-colors ${isHovered ? 'text-white' : 'text-gray-300'}`}>
                  {metric.format(value)}
                </span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: c.bg }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: c.fill,
                    boxShadow: isHovered ? '0 0 12px rgba(0,166,178,0.4)' : 'none',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{ duration: 0.7, delay: idx * 0.1, type: 'spring', bounce: 0.15 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Gauge Chart (Eixo 4: Infraestrutura) ────────────────────────────────────

function GaugeChart({
  series,
  metric,
}: {
  series: number[];
  metric: Metric;
}) {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const currentValue = series[series.length - 1];
  const firstValue = series[0];

  // Gauge goes from 0 to firstValue * 2 (so current position is clearly visible)
  const gaugeMax = Math.max(firstValue * 2.5, 1);
  const pct = Math.min(currentValue / gaugeMax, 1);

  // Arc parameters (semicircle)
  const CX = 190;
  const CY = 80;
  const R = 65;
  const startAngle = Math.PI;
  const endAngle = 0;
  const totalArc = Math.PI;

  const polarToCart = (angle: number) => ({
    x: CX + R * Math.cos(angle),
    y: CY - R * Math.sin(angle),
  });

  // Full arc path
  const arcStart = polarToCart(startAngle);
  const arcEnd = polarToCart(endAngle);
  const fullArcD = `M${arcStart.x},${arcStart.y} A${R},${R} 0 0,1 ${arcEnd.x},${arcEnd.y}`;

  // Value arc path
  const valueAngle = startAngle - pct * totalArc;
  const valueEnd = polarToCart(valueAngle);
  const largeArc = pct > 0.5 ? 1 : 0;
  const valueArcD = `M${arcStart.x},${arcStart.y} A${R},${R} 0 ${largeArc},1 ${valueEnd.x},${valueEnd.y}`;

  // Reduction percentage
  const reduction = ((firstValue - currentValue) / firstValue * 100).toFixed(0);

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
      <div className="flex flex-col items-center" style={{ height: 112 }}>
        <svg viewBox="0 0 380 100" className="w-full" style={{ maxHeight: 85 }}>
          <defs>
            <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#FFB200" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>

          {/* Track */}
          <path d={fullArcD} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" strokeLinecap="round" />

          {/* Value arc (reversed - from green to current position) */}
          <motion.path
            d={valueArcD}
            fill="none"
            stroke="url(#gaugeGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ strokeDasharray: '0 500' }}
            animate={{ strokeDasharray: '500 0' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* Needle dot */}
          <motion.circle
            cx={valueEnd.x} cy={valueEnd.y} r={6}
            fill="#10b981"
            stroke="#020817"
            strokeWidth="3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
            style={{ filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.6))' }}
          />

          {/* Center value */}
          <text x={CX} y={CY - 8} textAnchor="middle" fill="white"
            fontSize="20" fontWeight="700" fontFamily="Outfit, system-ui">
            {metric.format(currentValue)}
          </text>
          <text x={CX} y={CY + 10} textAnchor="middle" fill="#10b981"
            fontSize="10" fontWeight="600" fontFamily="Outfit, system-ui">
            ↓ {reduction}% desde 2020
          </text>

          {/* Scale labels */}
          <text x={arcStart.x - 5} y={arcStart.y + 14} textAnchor="middle"
            fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="Outfit, system-ui">
            {metric.format(gaugeMax)}
          </text>
          <text x={arcEnd.x + 5} y={arcEnd.y + 14} textAnchor="middle"
            fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="Outfit, system-ui">
            0%
          </text>
        </svg>

        {/* Year timeline pills */}
        <div className="flex gap-1.5 mt-auto">
          {series.map((v, i) => (
            <div
              key={i}
              className={`px-2 py-0.5 rounded-full text-[8px] font-medium transition-all cursor-pointer ${
                hoveredYear === i
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-white/5 text-gray-500 border border-transparent'
              }`}
              onMouseEnter={() => setHoveredYear(i)}
              onMouseLeave={() => setHoveredYear(null)}
            >
              {hoveredYear === i ? `${YEARS[i]}: ${metric.format(v)}` : YEARS[i]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Chart Dispatcher ────────────────────────────────────────────────────────

function ChartForAxis({
  axisId,
  series,
  metric,
  metrics,
  location,
}: {
  axisId: string;
  series: number[];
  metric: Metric;
  metrics: Metric[];
  location: LocationKey;
}) {
  switch (axisId) {
    case 'demo':
      return <AreaChart series={series} metric={metric} />;
    case 'empresas':
      return <RingChart metrics={metrics} location={location} />;
    case 'gestao':
      return <HorizontalBarChart metrics={metrics} location={location} />;
    case 'infra':
      return <GaugeChart series={series} metric={metric} />;
    default:
      return <AreaChart series={series} metric={metric} />;
  }
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function InteractiveDashboard() {
  const [location, setLocation] = useState<LocationKey>('sao_carlos');
  const [activeAxisId, setActiveAxisId] = useState('demo');
  const [selectedMetricId, setSelectedMetricId] = useState<string | null>(null);

  const activeAxis = AXES.find((a) => a.id === activeAxisId)!;
  const metrics = activeAxis.metrics;

  // Reset selected metric when axis changes
  useEffect(() => {
    setSelectedMetricId(metrics[0].id);
  }, [activeAxisId]);

  const selectedMetric = metrics.find((m) => m.id === selectedMetricId) || metrics[0];
  const chartSeries = DATA[location][selectedMetric.id];

  // Determine KPI grid class based on number of metrics
  const kpiGridClass =
    metrics.length === 3
      ? 'grid-cols-3'
      : metrics.length === 2
      ? 'grid-cols-2'
      : 'grid-cols-1 max-w-[200px] mx-auto';

  // ── Tour State ──
  const [tourStep, setTourStep] = useState<number | null>(null);
  const [showTourCTA, setShowTourCTA] = useState(true);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const TOUR_STEPS = [
    {
      target: 'city-selector',
      title: 'Selecione o Município',
      description: 'Alterne entre 4 localidades para comparar indicadores regionais.',
      action: () => setLocation('campinas'),
      icon: '📍',
    },
    {
      target: 'axis-tabs',
      title: 'Explore os Eixos',
      description: '4 eixos temáticos com gráficos únicos: área, rings, barras e gauge.',
      action: () => setActiveAxisId('empresas'),
      icon: '📊',
    },
    {
      target: 'kpi-cards',
      title: 'Clique nos Indicadores',
      description: 'Cada card é clicável — o gráfico se adapta ao indicador selecionado.',
      action: () => {
        setActiveAxisId('gestao');
        setTimeout(() => setSelectedMetricId('taxa_informalidade'), 300);
      },
      icon: '🔢',
    },
    {
      target: 'chart-area',
      title: 'Visualize os Dados',
      description: 'Dados reais de 2020 a 2024 com gráficos animados e tooltips interativos.',
      action: () => setActiveAxisId('infra'),
      icon: '📈',
    },
  ];

  const startTour = () => {
    setShowTourCTA(false);
    setTourStep(0);
    TOUR_STEPS[0].action();
  };

  const nextTourStep = () => {
    if (tourStep === null) return;
    const next = tourStep + 1;
    if (next < TOUR_STEPS.length) {
      setTourStep(next);
      TOUR_STEPS[next].action();
    } else {
      // End tour — reset to default state
      setTourStep(null);
      setLocation('sao_carlos');
      setActiveAxisId('demo');
    }
  };

  const skipTour = () => {
    setTourStep(null);
    setShowTourCTA(false);
    setLocation('sao_carlos');
    setActiveAxisId('demo');
  };

  return (
    <div ref={dashboardRef} className="relative bg-gray-900/80 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* ── Desktop: full interactive dashboard ── */}
      <div className="hidden lg:block p-5 space-y-3">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            <span className="ml-2 text-[10px] text-gray-500 font-mono">
              dashboard.cognisum.io
            </span>
          </div>
          <div data-tour-step="city-selector" className="relative z-20">
            <CitySelector selected={location} onChange={setLocation} />
          </div>
        </div>

        {/* Axis tabs */}
        <div data-tour-step="axis-tabs" className="relative">
          <AxisTabs activeAxis={activeAxisId} onChange={setActiveAxisId} />
        </div>

        {/* KPI cards */}
        <div data-tour-step="kpi-cards" className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAxisId}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className={`grid gap-2 ${kpiGridClass}`}
            >
              {metrics.map((metric) => (
                <KPICard
                  key={metric.id}
                  metric={metric}
                  series={DATA[location][metric.id]}
                  isSelected={selectedMetric.id === metric.id}
                  onClick={() => setSelectedMetricId(metric.id)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Chart — type varies per axis */}
        <div data-tour-step="chart-area" className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeAxisId}-${location}-${selectedMetric.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChartForAxis
                axisId={activeAxisId}
                series={chartSeries}
                metric={selectedMetric}
                metrics={metrics}
                location={location}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <Database className="w-3 h-3" />
            <span>Fonte: {selectedMetric.source}</span>
          </div>
          <span className="text-[10px] text-gray-600">Atualizado em Jul 2026</span>
        </div>

        {/* ── Tour CTA Button ── */}
        <AnimatePresence>
          {showTourCTA && tourStep === null && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 1.5, duration: 0.4 }}
              onClick={startTour}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-brand-secondary/90 hover:bg-brand-secondary text-white px-4 py-2 rounded-full text-[11px] font-bold shadow-lg shadow-brand-secondary/30 cursor-pointer transition-all duration-200 hover:scale-105 group"
            >
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40" />
                <Play className="w-3 h-3 fill-white relative z-10" />
              </span>
              Explorar Dashboard
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* ── Tour Overlay ── */}
        <AnimatePresence>
          {tourStep !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-40"
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/60 rounded-2xl" />

              {/* Spotlight on active element */}
              {(() => {
                const step = TOUR_STEPS[tourStep];
                const target = dashboardRef.current?.querySelector(`[data-tour-step="${step.target}"]`);
                if (!target || !dashboardRef.current) return null;

                const parentRect = dashboardRef.current.getBoundingClientRect();
                const targetRect = target.getBoundingClientRect();
                const spotlightStyle = {
                  top: targetRect.top - parentRect.top - 4,
                  left: targetRect.left - parentRect.left - 4,
                  width: targetRect.width + 8,
                  height: targetRect.height + 8,
                };

                return (
                  <>
                    {/* Spotlight cutout */}
                    <motion.div
                      key={tourStep}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute rounded-xl border-2 border-brand-secondary/60 z-50"
                      style={{
                        ...spotlightStyle,
                        boxShadow: '0 0 0 9999px rgba(0,0,0,0.55), 0 0 20px rgba(0,166,178,0.4)',
                      }}
                    />

                    {/* Tooltip */}
                    <motion.div
                      key={`tip-${tourStep}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                      className="absolute z-50"
                      style={{
                        top: step.target === 'chart-area'
                          ? spotlightStyle.top - 135
                          : spotlightStyle.top + spotlightStyle.height + 10,
                        left: Math.max(8, Math.min(spotlightStyle.left, 220)),
                        maxWidth: 260,
                      }}
                    >
                      <div className="bg-gray-900/95 backdrop-blur-xl border border-brand-secondary/30 rounded-xl p-3 shadow-2xl">
                        {/* Step counter */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">{step.icon}</span>
                            <span className="text-brand-secondary text-[10px] font-bold">
                              {tourStep + 1}/{TOUR_STEPS.length}
                            </span>
                          </div>
                          <button
                            onClick={skipTour}
                            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <h4 className="text-white text-xs font-bold mb-1">{step.title}</h4>
                        <p className="text-gray-400 text-[10px] leading-relaxed mb-3">{step.description}</p>
                        {/* Progress dots + Next button */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            {TOUR_STEPS.map((_, i) => (
                              <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                  i === tourStep ? 'bg-brand-secondary' : i < tourStep ? 'bg-brand-secondary/40' : 'bg-white/15'
                                }`}
                              />
                            ))}
                          </div>
                          <button
                            onClick={nextTourStep}
                            className="flex items-center gap-1 bg-brand-secondary/20 hover:bg-brand-secondary/30 text-brand-secondary px-3 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                          >
                            {tourStep === TOUR_STEPS.length - 1 ? 'Concluir' : 'Próximo'}
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Mobile: compact KPIs only (Eixo 1 showcase) ── */}
      <div className="lg:hidden p-4 space-y-3">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
            <span className="ml-1.5 text-[9px] text-gray-500 font-mono">
              dashboard.cognisum.io
            </span>
          </div>
          <CitySelector selected={location} onChange={setLocation} />
        </div>

        {/* Mobile KPI cards — always show Eixo 1 (Demo & Renda) */}
        <div className="grid grid-cols-3 gap-2">
          {AXES[0].metrics.map((metric) => {
            const series = DATA[location][metric.id];
            const currentValue = series[series.length - 1];
            const trend = getTrendInfo(series, metric.trendDirection);
            return (
              <div
                key={metric.id}
                className="bg-white/5 rounded-xl p-2.5 border border-white/5"
              >
                <div className="text-[9px] text-gray-500 mb-1 truncate">
                  {metric.label}
                </div>
                <div className="text-sm font-bold text-white leading-tight">
                  {metric.format(currentValue)}
                </div>
                <div className="flex items-center gap-0.5 mt-1">
                  {metric.trendDirection === 'neutral' ? (
                    <Minus className="w-2.5 h-2.5 text-gray-500" />
                  ) : trend.isPositive ? (
                    <TrendingUp className="w-2.5 h-2.5 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-2.5 h-2.5 text-red-400" />
                  )}
                  <span
                    className={`text-[9px] font-medium ${
                      metric.trendDirection === 'neutral'
                        ? 'text-gray-500'
                        : trend.isPositive
                        ? 'text-emerald-400'
                        : 'text-red-400'
                    }`}
                  >
                    {trend.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact bar preview */}
        <div className="bg-white/5 rounded-xl p-3 border border-white/5 h-16 flex items-end justify-between gap-1">
          {DATA[location].renda_pc.map((v, i) => {
            const min = Math.min(...DATA[location].renda_pc);
            const max = Math.max(...DATA[location].renda_pc);
            const range = max - min || 1;
            const height = 30 + ((v - min) / range) * 70;
            return (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-brand-primary/60 to-brand-secondary/60"
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-gray-600">Fonte: IBGE / Atlas ADH</span>
          <span className="text-[9px] text-gray-600">Jul 2026</span>
        </div>
      </div>
    </div>
  );
}
