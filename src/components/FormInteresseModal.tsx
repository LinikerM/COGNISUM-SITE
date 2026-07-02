import React, { useState, useEffect } from "react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Loader2, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface FormInteresseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", 
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", 
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const INITIAL_FORM_DATA = {
  // Bloco 1
  areaAtuacao: "",
  areaAtuacaoOutro: "",
  tipoInstituicao: "",
  tipoInstituicaoOutro: "",
  estadoUf: "",
  expPesquisa: "",
  expTrabalho: "",
  
  // Bloco 2
  dificuldades: [] as string[],
  dificuldadesOutro: "",
  frequenciaUso: "",
  ferramentas: [] as string[],
  ferramentasOutro: "",
  
  // Bloco 3
  tema_ia: "",
  tema_dashboards: "",
  tema_python: "",
  tema_powerbi: "",
  tema_ibge: "",
  tema_educacionais: "",
  tema_caged: "",
  tema_capes: "",
  tema_editais: "",
  tema_territorial: "",
  tema_qualidade: "",
  tema_nenhum: "",
  
  objetivo: "",
  objetivoOutro: "",
  
  // Bloco 4
  formatoPref: "",
  cargaIdeal: "",
  tipoAulas: "",
  tipoAulasOutro: "",
  
  // Bloco 5
  investimento: "",
  influenciaCompra: [] as string[],
  probabilidadeInscricao: "",
  
  // Bloco 6
  instInveste: "",
  orcamentoTreinamento: "",
  
  // Bloco 7
  receberInfo: "",
  contatoNome: "",
  contatoEmail: "",
  contatoWhatsapp: "",
  problemaResolver: ""
};

export function FormInteresseModal({ isOpen, onClose }: FormInteresseModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSingleSelect = (field: keyof typeof INITIAL_FORM_DATA, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field: 'dificuldades' | 'ferramentas' | 'influenciaCompra', value: string, limit?: number) => {
    setFormData(prev => {
      const current = prev[field] as string[];
      if (current.includes(value)) {
        return {
          ...prev,
          [field]: current.filter(item => item !== value)
        };
      } else {
        if (limit && current.length >= limit) {
          return prev;
        }
        return {
          ...prev,
          [field]: [...current, value]
        };
      }
    });
  };

  const handleInputChange = (field: keyof typeof INITIAL_FORM_DATA, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (): boolean => {
    switch (step) {
      case 1:
        const hasArea = formData.areaAtuacao && (formData.areaAtuacao !== "Outro" || formData.areaAtuacaoOutro.trim() !== "");
        const hasInst = formData.tipoInstituicao && (formData.tipoInstituicao !== "Outro" || formData.tipoInstituicaoOutro.trim() !== "");
        const hasUf = formData.estadoUf !== "";
        const hasExp = formData.expPesquisa !== "" && formData.expTrabalho !== "";
        return !!(hasArea && hasInst && hasUf && hasExp);
      
      case 2:
        const hasDif = formData.dificuldades.length > 0 || formData.dificuldadesOutro.trim() !== "";
        const hasFreq = formData.frequenciaUso !== "";
        const hasFerr = formData.ferramentas.length > 0 || formData.ferramentasOutro.trim() !== "";
        return !!(hasDif && hasFreq && hasFerr);
      
      case 3:
        const hasTemas = 
          formData.tema_ia && formData.tema_dashboards && formData.tema_python && 
          formData.tema_powerbi && formData.tema_ibge && formData.tema_educacionais && 
          formData.tema_caged && formData.tema_capes && formData.tema_editais && 
          formData.tema_territorial && formData.tema_qualidade && formData.tema_nenhum;
        const hasObj = formData.objetivo && (formData.objetivo !== "Outro" || formData.objetivoOutro.trim() !== "");
        return !!(hasTemas && hasObj);
      
      case 4:
        const hasFormato = formData.formatoPref !== "";
        const hasCarga = formData.cargaIdeal !== "";
        const hasAulas = formData.tipoAulas && (formData.tipoAulas !== "Outro" || formData.tipoAulasOutro.trim() !== "");
        return !!(hasFormato && hasCarga && hasAulas);
      
      case 5:
        const hasInvest = formData.investimento !== "";
        const hasInf = formData.influenciaCompra.length > 0;
        const hasProb = formData.probabilidadeInscricao !== "";
        return !!(hasInvest && hasInf && hasProb);
      
      case 6:
        const hasInstInv = formData.instInveste !== "";
        const hasOrc = formData.orcamentoTreinamento !== "";
        return !!(hasInstInv && hasOrc);
      
      case 7:
        if (formData.receberInfo === "") return false;
        if (formData.receberInfo === "Não") return true;
        return !!(
          formData.contatoNome.trim() !== "" && 
          formData.contatoEmail.trim() !== "" && 
          formData.contatoWhatsapp.trim() !== ""
        );
      
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep() && step < 7) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);
    setErrorMessage("");

    try {
      await fetch("https://script.google.com/macros/s/AKfycbxnsNBOetM602pko-5vxcOmGfdNF4PpYT_l82em8FmTt0S4PR365gSpdFiuySazOt-ZrA/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      await new Promise(resolve => setTimeout(resolve, 800));
      setSubmitted(true);
    } catch (error) {
      console.error("Erro no envio:", error);
      setErrorMessage("Ocorreu um erro ao enviar suas respostas. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setStep(1);
    setSubmitted(false);
    setErrorMessage("");
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Pergunta 1 */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-neutral-900">
                1. Qual sua principal área de atuação? <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  "Professor(a) universitário(a)", "Pesquisador(a)", "Pós graduando(a)",
                  "Servidor(a) público(a)", "Gestor(a) público(a)", "Bibliotecário(a)",
                  "Consultor(a)", "Profissional de Tecnologia", "Empreendedor(a)"
                ].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSingleSelect("areaAtuacao", opt)}
                    className={`p-3 text-xs font-semibold rounded-xl text-left border transition-all ${
                      formData.areaAtuacao === opt
                        ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => handleSingleSelect("areaAtuacao", "Outro")}
                  className={`p-3 text-xs font-semibold rounded-xl text-left border transition-all ${
                    formData.areaAtuacao === "Outro"
                      ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50/50"
                  }`}
                >
                  Outro (aberto)
                </button>
              </div>
              {formData.areaAtuacao === "Outro" && (
                <Input
                  type="text"
                  placeholder="Por favor, especifique..."
                  value={formData.areaAtuacaoOutro}
                  onChange={(e) => handleInputChange("areaAtuacaoOutro", e.target.value)}
                  className="mt-2 rounded-xl border-neutral-300 bg-neutral-50/20"
                />
              )}
            </div>

            {/* Pergunta 2 */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-neutral-900">
                2. Em qual tipo de instituição você atua? <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  "Universidade pública", "Universidade privada", "Prefeitura",
                  "Governo estadual", "Governo federal", "Empresa privada", "Autônomo/Consultor"
                ].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSingleSelect("tipoInstituicao", opt)}
                    className={`p-3 text-xs font-semibold rounded-xl text-left border transition-all ${
                      formData.tipoInstituicao === opt
                        ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => handleSingleSelect("tipoInstituicao", "Outro")}
                  className={`p-3 text-xs font-semibold rounded-xl text-left border transition-all ${
                    formData.tipoInstituicao === "Outro"
                      ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50/50"
                  }`}
                >
                  Outro (aberto)
                </button>
              </div>
              {formData.tipoInstituicao === "Outro" && (
                <Input
                  type="text"
                  placeholder="Por favor, especifique..."
                  value={formData.tipoInstituicaoOutro}
                  onChange={(e) => handleInputChange("tipoInstituicaoOutro", e.target.value)}
                  className="mt-2 rounded-xl border-neutral-300 bg-neutral-50/20"
                />
              )}
            </div>

            {/* Pergunta 3 */}
            <div className="space-y-2">
              <Label htmlFor="estadoUf" className="text-base font-bold text-neutral-900">
                3. Estado <span className="text-red-500">*</span>
              </Label>
              <select
                id="estadoUf"
                value={formData.estadoUf}
                onChange={(e) => handleInputChange("estadoUf", e.target.value)}
                className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-800 focus:border-brand-secondary focus:outline-none"
              >
                <option value="">Selecione o Estado...</option>
                {UFS.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>

            {/* Pergunta 4 */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-neutral-900">
                4. Há quanto tempo trabalha ou pesquisa com dados públicos? <span className="text-red-500">*</span>
              </Label>
              <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white">
                <div className="hidden md:grid grid-cols-6 bg-neutral-50 border-b border-neutral-200 text-center py-2.5 text-xs font-bold text-neutral-500">
                  <div className="text-left px-4">Atividade</div>
                  <div>até 1 ano</div>
                  <div>2 a 4 anos</div>
                  <div>5 a 6 anos</div>
                  <div>7 a 8 anos</div>
                  <div>9+ anos</div>
                </div>

                {/* Linha Pesquisa */}
                <div className="border-b border-neutral-100 md:grid md:grid-cols-6 items-center text-center py-3">
                  <div className="text-left font-bold text-xs text-neutral-800 px-4 mb-2 md:mb-0">Pesquisa</div>
                  <div className="grid grid-cols-5 md:contents gap-1 px-4 md:px-0">
                    {["até 1", "2 a 4", "5 a 6", "7 a 8", "9+"].map(col => (
                      <button
                        key={`pesq-${col}`}
                        type="button"
                        onClick={() => handleSingleSelect("expPesquisa", col)}
                        className={`py-2 px-1 text-[11px] rounded-lg border md:border-0 transition-all ${
                          formData.expPesquisa === col
                            ? "bg-brand-primary text-white md:bg-brand-primary/10 md:text-brand-primary md:font-bold border-brand-primary"
                            : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                        }`}
                      >
                        <span className="md:hidden block text-[9px] text-neutral-400 font-normal">
                          {col} {col === "até 1" ? "ano" : "anos"}
                        </span>
                        {col}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Linha Trabalha com Dados */}
                <div className="md:grid md:grid-cols-6 items-center text-center py-3">
                  <div className="text-left font-bold text-xs text-neutral-800 px-4 mb-2 md:mb-0">Trabalha com Dados (públicos ou não)</div>
                  <div className="grid grid-cols-5 md:contents gap-1 px-4 md:px-0">
                    {["até 1", "2 a 4", "5 a 6", "7 a 8", "9+"].map(col => (
                      <button
                        key={`trab-${col}`}
                        type="button"
                        onClick={() => handleSingleSelect("expTrabalho", col)}
                        className={`py-2 px-1 text-[11px] rounded-lg border md:border-0 transition-all ${
                          formData.expTrabalho === col
                            ? "bg-brand-primary text-white md:bg-brand-primary/10 md:text-brand-primary md:font-bold border-brand-primary"
                            : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                        }`}
                      >
                        <span className="md:hidden block text-[9px] text-neutral-400 font-normal">
                          {col} {col === "até 1" ? "ano" : "anos"}
                        </span>
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Pergunta 5 */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-neutral-900 block">
                5. Qual sua maior dificuldade ao trabalhar com dados públicos? <span className="text-red-500">*</span>
                <span className="text-xs font-normal text-neutral-500 block mt-1">(Selecione todas que se aplicam)</span>
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Encontrar e acessar os dados",
                  "Limpar e organizar os dados",
                  "Analisar e interpretar",
                  "Criar visualizações e dashboards",
                  "Falta de ferramentas adequadas",
                  "Falta de capacitação/formação"
                ].map(opt => {
                  const isChecked = formData.dificuldades.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleMultiSelect("dificuldades", opt)}
                      className={`p-3 text-xs font-semibold rounded-xl text-left border flex items-center gap-3 transition-all ${
                        isChecked
                          ? "bg-brand-primary/5 text-brand-primary border-brand-primary shadow-sm"
                          : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50/50"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        isChecked ? "bg-brand-primary border-brand-primary text-white" : "border-neutral-300 bg-white"
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
              <div className="space-y-2 mt-2">
                <Label className="text-xs font-semibold text-neutral-600">Outro (aberto):</Label>
                <Input
                  type="text"
                  placeholder="Descreva outra dificuldade..."
                  value={formData.dificuldadesOutro}
                  onChange={(e) => handleInputChange("dificuldadesOutro", e.target.value)}
                  className="rounded-xl border-neutral-300 bg-neutral-50/20"
                />
              </div>
            </div>

            {/* Pergunta 6 */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-neutral-900">
                6. Com que frequência você utiliza dados públicos? <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {["Diariamente", "Semanalmente", "Mensalmente", "Raramente", "Nunca"].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSingleSelect("frequenciaUso", opt)}
                    className={`p-3 text-xs font-semibold rounded-xl text-center border transition-all ${
                      formData.frequenciaUso === opt
                        ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Pergunta 7 */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-neutral-900 block">
                7. Quais ferramentas você utiliza atualmente? <span className="text-red-500">*</span>
                <span className="text-xs font-normal text-neutral-500 block mt-1">(Marque todas que se aplicam)</span>
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  "Excel/Google Sheets", "Power BI", "Python", 
                  "R", "Tableau", "QGIS", "Nenhuma ferramenta específica"
                ].map(opt => {
                  const isChecked = formData.ferramentas.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleMultiSelect("ferramentas", opt)}
                      className={`p-3 text-xs font-semibold rounded-xl text-left border flex items-center gap-2.5 transition-all ${
                        isChecked
                          ? "bg-brand-primary/5 text-brand-primary border-brand-primary shadow-sm"
                          : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50/50"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        isChecked ? "bg-brand-primary border-brand-primary text-white" : "border-neutral-300 bg-white"
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
              <div className="space-y-2 mt-2">
                <Label className="text-xs font-semibold text-neutral-600">Outro (aberto):</Label>
                <Input
                  type="text"
                  placeholder="Escreva outra ferramenta..."
                  value={formData.ferramentasOutro}
                  onChange={(e) => handleInputChange("ferramentasOutro", e.target.value)}
                  className="rounded-xl border-neutral-300 bg-neutral-50/20"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        const TEMAS_CURSOS = [
          { key: "tema_ia", label: "IA aplicada à Gestão Pública" },
          { key: "tema_dashboards", label: "Dashboards e visualização de dados" },
          { key: "tema_python", label: "Python para dados públicos" },
          { key: "tema_powerbi", label: "Power BI" },
          { key: "tema_ibge", label: "Dados do IBGE" },
          { key: "tema_educacionais", label: "Dados Educacionais (INEP/Censo)" },
          { key: "tema_caged", label: "CAGED e mercado de trabalho" },
          { key: "tema_capes", label: "Indicadores CAPES" },
          { key: "tema_editais", label: "Projetos para Editais (FAPESP, CNPq)" },
          { key: "tema_territorial", label: "Inteligência Territorial" },
          { key: "tema_qualidade", label: "Organização e qualidade de dados" },
          { key: "tema_nenhum", label: "Não tenho interesse em nenhum" },
        ];

        return (
          <div className="space-y-6">
            {/* Pergunta 8 */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-neutral-900 block leading-snug">
                8. Abaixo estão temas de possíveis cursos. Avalie de 1 a 5 o quanto você investiria tempo e dinheiro em cada um: <span className="text-red-500">*</span>
                <span className="text-xs font-normal text-neutral-500 block mt-1">(1 = Nenhum interesse, 5 = Investiria com certeza)</span>
              </Label>
              <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white max-h-[350px] overflow-y-auto shadow-sm">
                <div className="hidden md:grid grid-cols-7 bg-neutral-50 border-b border-neutral-200 text-center py-2.5 text-xs font-bold text-neutral-500 sticky top-0 z-10">
                  <div className="text-left px-4 col-span-2">Tema</div>
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                  <div>4</div>
                  <div>5</div>
                </div>

                {TEMAS_CURSOS.map(({ key, label }) => {
                  const currentValue = formData[key as keyof typeof INITIAL_FORM_DATA] as string;
                  return (
                    <div key={key} className="border-b border-neutral-100 md:grid md:grid-cols-7 items-center text-center py-3">
                      <div className="text-left font-semibold text-xs text-neutral-800 px-4 col-span-2 mb-2 md:mb-0 leading-normal">{label}</div>
                      <div className="grid grid-cols-5 md:contents gap-1 px-4 md:px-0">
                        {["1", "2", "3", "4", "5"].map(score => (
                          <button
                            key={`${key}-${score}`}
                            type="button"
                            onClick={() => handleSingleSelect(key as any, score)}
                            className={`py-2 text-xs rounded-lg border md:border-0 transition-all ${
                              currentValue === score
                                ? "bg-brand-primary text-white md:bg-brand-primary/10 md:text-brand-primary md:font-bold border-brand-primary"
                                : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                            }`}
                          >
                            <span className="md:hidden block text-[9px] text-neutral-400 font-normal">Nota</span>
                            {score}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pergunta 9 */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-neutral-900">
                9. Qual seu principal objetivo ao buscar um curso nessa área? <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Aplicar diretamente no meu trabalho atual",
                  "Desenvolver uma nova competência",
                  "Obter certificação",
                  "Fazer transição de carreira",
                  "Melhorar minha pesquisa acadêmica"
                ].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSingleSelect("objetivo", opt)}
                    className={`p-3 text-xs font-semibold rounded-xl text-left border transition-all ${
                      formData.objetivo === opt
                        ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => handleSingleSelect("objetivo", "Outro")}
                  className={`p-3 text-xs font-semibold rounded-xl text-left border transition-all ${
                    formData.objetivo === "Outro"
                      ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50/50"
                  }`}
                >
                  Outro (aberto)
                </button>
              </div>
              {formData.objetivo === "Outro" && (
                <Input
                  type="text"
                  placeholder="Por favor, especifique..."
                  value={formData.objetivoOutro}
                  onChange={(e) => handleInputChange("objetivoOutro", e.target.value)}
                  className="mt-2 rounded-xl border-neutral-300 bg-neutral-50/20"
                />
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {/* Pergunta 10 */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-neutral-900">
                10. Qual formato de curso você prefere? <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  "Online ao vivo", "Online gravado", 
                  "Híbrido (gravado + encontros ao vivo)", "Presencial"
                ].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSingleSelect("formatoPref", opt)}
                    className={`p-3 text-xs font-semibold rounded-xl text-center border flex items-center justify-center transition-all ${
                      formData.formatoPref === opt
                        ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50/50"
                    }`}
                  >
                    <span className="leading-snug">{opt}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pergunta 11 */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-neutral-900">
                11. Qual a carga horária ideal? <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  "Até 4h (workshop)", 
                  "8h a 12h (curso curto)", 
                  "20h ou mais (formação completa)"
                ].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSingleSelect("cargaIdeal", opt)}
                    className={`p-3 text-xs font-semibold rounded-xl text-center border transition-all ${
                      formData.cargaIdeal === opt
                        ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Pergunta 12 */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-neutral-900">
                12. Você prefere aulas com: <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Atividades práticas com dados reais",
                  "Estudos de caso comentados",
                  "Aulas expositivas com teoria",
                  "Mix de prática e teoria"
                ].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSingleSelect("tipoAulas", opt)}
                    className={`p-3 text-xs font-semibold rounded-xl text-left border transition-all ${
                      formData.tipoAulas === opt
                        ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => handleSingleSelect("tipoAulas", "Outro")}
                  className={`p-3 text-xs font-semibold rounded-xl text-left border transition-all col-span-1 sm:col-span-2 ${
                    formData.tipoAulas === "Outro"
                      ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50/50"
                  }`}
                >
                  Outro (aberto)
                </button>
              </div>
              {formData.tipoAulas === "Outro" && (
                <Input
                  type="text"
                  placeholder="Por favor, especifique..."
                  value={formData.tipoAulasOutro}
                  onChange={(e) => handleInputChange("tipoAulasOutro", e.target.value)}
                  className="mt-2 rounded-xl border-neutral-300 bg-neutral-50/20"
                />
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            {/* Pergunta 13 */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-neutral-900 block">
                13. Quanto você investiria em um curso online sobre esses temas? <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                {["Até R$29", "Até R$49", "Até R$97", "Até R$147", "Até R$197", "Acima de R$197"].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSingleSelect("investimento", opt)}
                    className={`p-3 text-xs font-semibold rounded-xl text-center border transition-all ${
                      formData.investimento === opt
                        ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Pergunta 14 */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-neutral-900 block">
                14. O que mais influencia sua decisão de compra? <span className="text-red-500">*</span>
                <span className="text-xs font-normal text-neutral-500 block mt-1">(Selecione até 3 opções)</span>
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  "Conteúdo prático e aplicável", "Certificado reconhecido", "Qualidade do professor",
                  "Casos reais e exemplos", "Exercícios e atividades", "Material de apoio",
                  "Networking com outros profissionais", "Ferramentas incluídas", "Preço acessível"
                ].map(opt => {
                  const isChecked = formData.influenciaCompra.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleMultiSelect("influenciaCompra", opt, 3)}
                      className={`p-3 text-xs font-semibold rounded-xl text-left border flex items-center gap-2.5 transition-all ${
                        isChecked
                          ? "bg-brand-primary/5 text-brand-primary border-brand-primary shadow-sm"
                          : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50/50"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        isChecked ? "bg-brand-primary border-brand-primary text-white" : "border-neutral-300 bg-white"
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pergunta 15 */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-neutral-900 block leading-snug">
                15. Se abrirmos inscrições nos próximos 30 dias para um curso sobre os temas que você indicou acima, qual a probabilidade de você se inscrever? <span className="text-red-500">*</span>
                <span className="text-xs font-normal text-neutral-500 block mt-1">(1 = Muito improvável, 5 = Com certeza me inscreveria)</span>
              </Label>
              <div className="flex justify-between items-center gap-2 max-w-md mx-auto pt-2">
                {["1", "2", "3", "4", "5"].map(score => (
                  <button
                    key={`prob-${score}`}
                    type="button"
                    onClick={() => handleSingleSelect("probabilidadeInscricao", score)}
                    className={`w-12 h-12 text-sm rounded-full border font-bold flex items-center justify-center transition-all ${
                      formData.probabilidadeInscricao === score
                        ? "bg-brand-primary text-white border-brand-primary shadow-md scale-110"
                        : "bg-white text-neutral-600 border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50"
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[11px] text-neutral-400 max-w-md mx-auto px-1">
                <span>Muito Improvável</span>
                <span>Com Certeza</span>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            {/* Pergunta 16 */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-neutral-900">
                16. Sua instituição costuma investir em capacitação de servidores/colaboradores? <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  "Sim, regularmente", "Sim, eventualmente", 
                  "Não", "Não sei informar"
                ].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSingleSelect("instInveste", opt)}
                    className={`p-3 text-xs font-semibold rounded-xl text-center border flex items-center justify-center transition-all ${
                      formData.instInveste === opt
                        ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50/50"
                    }`}
                  >
                    <span className="leading-snug">{opt}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pergunta 17 */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-neutral-900 block">
                17. Há orçamento ou processo de aprovação para treinamentos na sua instituição? <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Sim, há orçamento definido", 
                  "Depende de aprovação da chefia", 
                  "Não há orçamento para isso", 
                  "Não se aplica"
                ].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSingleSelect("orcamentoTreinamento", opt)}
                    className={`p-3 text-xs font-semibold rounded-xl text-left border transition-all ${
                      formData.orcamentoTreinamento === opt
                        ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            {/* Pergunta 18 */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-neutral-900 block">
                18. Deseja receber informações sobre os primeiros cursos da Cognisum Analytics? <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-4">
                {["Sim", "Não"].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSingleSelect("receberInfo", opt)}
                    className={`px-8 py-3 text-sm font-bold rounded-xl border transition-all ${
                      formData.receberInfo === opt
                        ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {formData.receberInfo === "Sim" && (
              <div className="space-y-4 p-5 rounded-2xl border border-brand-primary/10 bg-brand-primary/5">
                <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                  Dados de Contato para receber as novidades
                </h4>
                
                {/* Nome */}
                <div className="space-y-1.5">
                  <Label htmlFor="contatoNome" className="text-xs font-semibold text-neutral-700">Nome *</Label>
                  <Input
                    id="contatoNome"
                    type="text"
                    required
                    placeholder="Seu nome completo"
                    value={formData.contatoNome}
                    onChange={(e) => handleInputChange("contatoNome", e.target.value)}
                    className="rounded-xl border-neutral-300 py-5 bg-white"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* E-mail */}
                  <div className="space-y-1.5">
                    <Label htmlFor="contatoEmail" className="text-xs font-semibold text-neutral-700">E-mail *</Label>
                    <Input
                      id="contatoEmail"
                      type="email"
                      required
                      placeholder="seu@email.com"
                      value={formData.contatoEmail}
                      onChange={(e) => handleInputChange("contatoEmail", e.target.value)}
                      className="rounded-xl border-neutral-300 py-5 bg-white"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-1.5">
                    <Label htmlFor="contatoWhatsapp" className="text-xs font-semibold text-neutral-700">WhatsApp *</Label>
                    <Input
                      id="contatoWhatsapp"
                      type="tel"
                      required
                      placeholder="(00) 00000-0000"
                      value={formData.contatoWhatsapp}
                      onChange={(e) => handleInputChange("contatoWhatsapp", e.target.value)}
                      className="rounded-xl border-neutral-300 py-5 bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Pergunta 22 */}
            {formData.receberInfo !== "" && (
              <div className="space-y-1.5">
                <Label htmlFor="problemaResolver" className="text-base font-bold text-neutral-900 block leading-snug">
                  22. Qual problema você mais gostaria de resolver utilizando dados públicos, inteligência artificial ou indicadores?
                  <span className="text-xs font-normal text-neutral-500 block mt-1">(Resposta aberta, opcional)</span>
                </Label>
                <Textarea
                  id="problemaResolver"
                  rows={3}
                  placeholder="Descreva o seu principal desafio ou o que gostaria de ver resolvido com dados..."
                  value={formData.problemaResolver}
                  onChange={(e) => handleInputChange("problemaResolver", e.target.value)}
                  className="rounded-xl border-neutral-300 bg-white"
                />
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-md transition-all">
      <div className="bg-white max-w-3xl w-full rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header do Modal */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 font-display">
              Pesquisa de Interesse - Novos Cursos
            </h3>
            <p className="text-xs text-neutral-500 font-medium">
              Bloco {step} de 7: {
                step === 1 ? "Perfil" :
                step === 2 ? "Contexto e Dores" :
                step === 3 ? "Interesse por Tema" :
                step === 4 ? "Formato e Metodologia" :
                step === 5 ? "Valor e Intenção de Compra" :
                step === 6 ? "Compra Institucional" :
                "Contato e Abertura"
              }
            </p>
          </div>
          
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-neutral-200 hover:border-brand-secondary hover:bg-neutral-50 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Barra de Progresso */}
        <div className="w-full h-1.5 bg-neutral-100 shrink-0">
          <div 
            className="h-full bg-brand-secondary transition-all duration-500 ease-out" 
            style={{ width: `${(step / 7) * 100}%` }}
          />
        </div>

        {/* Corpo do Modal - Conteúdo Rolável se necessário */}
        <div className="p-6 overflow-y-auto flex-grow bg-neutral-50/30">
          {submitted ? (
            <div className="text-center py-12 px-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full mb-6">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                Respostas registradas com sucesso!
              </h3>
              <p className="text-neutral-600 text-sm max-w-sm mx-auto leading-relaxed">
                Muito obrigado por dedicar o seu tempo para responder à nossa pesquisa. Suas respostas serão fundamentais na modelagem das nossas capacitações.
              </p>
              <div className="mt-8 flex justify-center">
                <Button 
                  onClick={() => {
                    onClose();
                    resetForm();
                  }}
                  className="bg-brand-primary hover:bg-[#0f3a66] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md text-xs"
                >
                  Fechar Janela
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {renderStepContent()}
              
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 mt-4">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Footer do Modal */}
        {!submitted && (
          <div className="p-6 border-t border-neutral-100 flex items-center justify-between bg-neutral-50/50 shrink-0">
            {/* Botão Voltar */}
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1 || loading}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                step === 1 
                  ? "opacity-0 pointer-events-none" 
                  : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 cursor-pointer"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar
            </button>

            {/* Botão Avançar / Enviar */}
            {step < 7 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!validateStep()}
                className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  validateStep()
                    ? "bg-brand-primary hover:bg-[#0f3a66] text-white cursor-pointer hover:shadow"
                    : "bg-neutral-200 text-neutral-400 border border-transparent cursor-not-allowed"
                }`}
              >
                Próximo
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!validateStep() || loading}
                className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                  validateStep() && !loading
                    ? "bg-brand-secondary hover:bg-[#008d96] text-white cursor-pointer hover:shadow-lg"
                    : "bg-neutral-200 text-neutral-400 border border-transparent cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Respostas
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
