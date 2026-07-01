export interface Curso {
  id: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  formato: string;
  cargaHoraria: string;
  encontros: string;
  material: string;
  certificado: string;
  ferramentas: string[];
  publicoAlvo: string[];
  aprendizado: string[];
  resultados: string;
  status: 'disponivel' | 'em-breve';
  imagem: string;
}

export const cursos: Curso[] = [
  {
    id: "dashboards-e-indicadores",
    titulo: "Dashboards e Indicadores para Tomada de Decisão com Dados Públicos",
    subtitulo: "Lançamento de Curso Online",
    descricao: "Aprenda a transformar dados públicos em informações estratégicas para monitorar, avaliar e tomar decisões baseadas em evidências.",
    formato: "100% online (ao vivo) com aulas práticas",
    cargaHoraria: "12 horas",
    encontros: "4 encontros de 3 horas (ao vivo)",
    material: "Apostila digital, datasets e modelos",
    certificado: "Certificado de participação emitido pelo Instituto de Informação para Inovação - i2i.",
    ferramentas: [
      "Power BI",
      "Python",
      "Google Dataset Search",
      "Fontes oficiais (IBGE, INEP, CAGED, etc.)"
    ],
    publicoAlvo: [
      "Gestores públicos",
      "Servidores públicos",
      "Profissionais de planejamento",
      "Pesquisadores",
      "Estudantes",
      "Todos que trabalham com dados e indicadores"
    ],
    aprendizado: [
      "Conectar e tratar dados públicos",
      "Construir indicadores relevantes",
      "Criar dashboards interativos",
      "Visualizar e comunicar resultados",
      "Tomar decisões baseadas em evidências"
    ],
    resultados: "Mais clareza, agilidade e embasamento nas decisões. Transforme dados em impacto real para sua instituição e para a sociedade.",
    status: "disponivel",
    imagem: "/cursos/dashboards-indicadores.png"
  },
  {
    id: "python-gestao-publica",
    titulo: "Análise de Dados com Python para Gestão Pública",
    subtitulo: "Em Desenvolvimento",
    descricao: "Domine programação aplicada a dados públicos. Aprenda a automatizar a coleta, limpeza e análise de dados de portais da transparência e bases governamentais.",
    formato: "100% online com vídeo aulas e mentorias",
    cargaHoraria: "20 horas",
    encontros: "Aulas gravadas + plantões de dúvidas quinzenais",
    material: "Notebooks Jupyter, scripts de automação e apostila",
    certificado: "Certificado de conclusão emitido pelo Instituto de Informação para Inovação - i2i.",
    ferramentas: ["Python", "Pandas & Numpy", "Jupyter Notebooks", "APIs Governamentais"],
    publicoAlvo: ["Gestores públicos", "Analistas de dados", "Auditores", "Pesquisadores"],
    aprendizado: [
      "Fundamentos de Python para dados",
      "Coleta automatizada de dados",
      "Tratamento de grandes volumes de informações",
      "Criação de relatórios automatizados"
    ],
    resultados: "Automatize tarefas repetitivas e ganhe velocidade na análise de dados complexos do setor público.",
    status: "em-breve",
    imagem: ""
  },
  {
    id: "powerbi-avancado-publico",
    titulo: "Power BI Avançado para o Setor Público",
    subtitulo: "Em Desenvolvimento",
    descricao: "Vá além dos gráficos básicos. Aprenda a implementar inteligência de dados, modelagem complexa (DAX) e governança de dashboards em órgãos públicos.",
    formato: "100% online (ao vivo) com aulas práticas",
    cargaHoraria: "16 horas",
    encontros: "4 encontros de 4 horas",
    material: "Templates de dashboards, guia DAX e exercícios práticos",
    certificado: "Certificado emitido pelo Instituto de Informação para Inovação - i2i.",
    ferramentas: ["Power BI Desktop", "Linguagem DAX", "Power Query", "Power BI Service"],
    publicoAlvo: ["Analistas que já utilizam Power BI", "Coordenadores de TI", "Gestores de BI"],
    aprendizado: [
      "Modelagem de dados complexos",
      "Fórmulas DAX avançadas para cálculo de indicadores",
      "Design de dashboards voltado a UX",
      "Segurança e compartilhamento de relatórios"
    ],
    resultados: "Desenvolva painéis altamente performáticos, seguros e que realmente guiem a tomada de decisão da alta liderança.",
    status: "em-breve",
    imagem: ""
  }
];
