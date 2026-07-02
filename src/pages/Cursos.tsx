import { useState, useRef, useEffect } from "react";
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Send,
  Target,
  TrendingUp,
  Laptop,
  Check
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { cursos } from "../data/cursos";
import { FormInteresseModal } from "../components/FormInteresseModal";

export function Cursos() {
  const mainCurso = cursos[0]; // Curso principal: Dashboards e Indicadores
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInteresseFormOpen, setIsInteresseFormOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    organization: "",
    role: "",
    message: "",
  });

  const formRef = useRef<HTMLDivElement>(null);

  const scrollToInscricao = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      
      // Mostrar se scrollou mais de 400px E não está perto do final (onde fica o formulário)
      if (scrollY > 400 && scrollY + windowHeight < totalHeight - 900) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "9616d472-9b84-4ab1-ae2c-6fc3187cf4d6",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          organization: formData.organization,
          role: formData.role,
          message: formData.message,
          curso_interesse: mainCurso.titulo,
          from_name: "Cognisum Cursos - Inscrição",
          subject: `Nova Inscrição em Curso: ${mainCurso.titulo} (${formData.city} - ${formData.organization})`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", city: "", organization: "", role: "", message: "" });
      } else {
        alert("Ocorreu um erro ao enviar. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Erro no envio:", error);
      alert("Erro de conexão. Verifique sua internet.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-neutral-900 font-sans selection:bg-brand-secondary/20 selection:text-neutral-900 pt-24 pb-16 relative overflow-hidden">
      
      {/* Elementos de Animação de Fundo / Grid de Decoração sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      
      {/* 1. Hero Section (Visual de Curso Premium Claro) */}
      <section className="relative z-10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Lado Esquerdo - Info Text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center gap-2">
                <span className="bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Curso Online
                </span>
                <span className="bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Lançamento
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
                {mainCurso.titulo.split("para Tomada de Decisão")[0]}
                <span className="text-brand-secondary block mt-1">
                  para Tomada de Decisão com Dados Públicos
                </span>
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl">
                Aprenda a transformar dados públicos em informações estratégicas para monitorar, avaliar e tomar decisões baseadas em evidências.
              </p>

              {/* Informações rápidas em linha (com bordas e fundo destacado) */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-sm text-neutral-600">
                <span className="flex items-center gap-2 px-3 py-2 bg-white border border-neutral-200 shadow-sm rounded-xl font-medium">
                  <Clock className="w-4 h-4 text-brand-secondary" />
                  <span>{mainCurso.cargaHoraria}</span>
                </span>
                <span className="flex items-center gap-2 px-3 py-2 bg-white border border-neutral-200 shadow-sm rounded-xl font-medium">
                  <Calendar className="w-4 h-4 text-brand-secondary" />
                  <span>{mainCurso.formato}</span>
                </span>
                {/* Badge do certificado 100% laranja clicável por inteiro */}
                <a 
                  href="https://i2i.org.br" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-orange-200 shadow-sm rounded-xl font-semibold text-orange-600 hover:bg-orange-50/50 hover:shadow transition-all cursor-pointer" 
                  style={{ borderColor: '#fed7aa', color: '#ea580c' }}
                >
                  <Award className="w-4 h-4 text-orange-600" style={{ color: '#ea580c' }} />
                  <span>
                    Certificado i2i
                  </span>
                </a>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button 
                  onClick={scrollToInscricao}
                  className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-[#0f3a66] text-white font-bold px-6 sm:px-8 h-14 rounded-xl text-base shadow-md hover:shadow-lg transition-all"
                >
                  Inscreva-se Já
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsInteresseFormOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-brand-secondary hover:bg-[#008d96] text-white font-bold px-6 sm:px-8 h-14 rounded-xl text-base shadow-md hover:shadow-lg transition-all"
                >
                  Responda aqui o formulário de interesse
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => document.getElementById("conteudo")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center justify-center gap-2 bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50 px-6 sm:px-8 h-14 rounded-xl text-base font-bold transition-all shadow-sm"
                >
                  Ver Programação
                </button>
              </div>
            </div>

            {/* Lado Direito - Ilustração de Curso Online */}
            <div className="lg:col-span-5 relative">
              {/* Molduras e elementos de curso flutuando */}
              <div className="absolute -top-6 -left-6 bg-white shadow-xl rounded-2xl p-4 flex items-center gap-3 border border-neutral-100 z-20 animate-bounce [animation-duration:5s]">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Aulas</span>
                  <span className="text-xs font-bold text-neutral-800">100% Práticas</span>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white shadow-xl rounded-2xl p-4 flex items-center gap-3 border border-neutral-100 z-20 animate-bounce [animation-duration:6s]">
                <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Metodologia</span>
                  <span className="text-xs font-bold text-neutral-800">Casos Reais</span>
                </div>
              </div>

              {/* Box Principal com a imagem gerada do dashboard */}
              <div className="relative rounded-3xl overflow-hidden border border-neutral-200/80 shadow-2xl bg-white p-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-3 text-xs text-neutral-500">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <span className="font-mono text-[10px]">curso-online.cognisum.com</span>
                </div>
                <img 
                  src="/cursos/notebook-dashboard.png" 
                  alt="Curso Cognisum Dashboard" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Informações em Destaque (Estrutura do Folder - Ícones Grandes/SVGs) */}
      <section id="conteudo" className="py-20 bg-white relative z-10 border-y border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Bloco 1: Para quem é */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center border border-brand-primary/10">
                <Target className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">
                Para quem é
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Gestores públicos, servidores, profissionais de planejamento, pesquisadores, estudantes e todos que trabalham com dados e indicadores.
              </p>
            </div>

            {/* Bloco 2: O que vai aprender */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center border border-brand-primary/10">
                <BookOpen className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">
                O que vai aprender
              </h3>
              <ul className="space-y-2.5 text-sm text-neutral-600">
                {mainCurso.aprendizado.map((a, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bloco 3: Resultados */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center border border-brand-primary/10">
                <TrendingUp className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">
                Resultados para você
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Mais clareza, agilidade e embasamento nas decisões. Transforme dados em impacto real para sua instituição e para a sociedade.
              </p>
            </div>

            {/* Bloco 4: Certificado */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center border border-brand-primary/10">
                <Award className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">
                Certificado
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Certificado de participação emitido em parceria pelo <a href="https://i2i.org.br" target="_blank" rel="noopener noreferrer" className="text-[#ea580c] hover:underline font-semibold">Instituto de Informação para Inovação - i2i</a> ao final da carga horária concluída.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Diferenciais (Círculos verdes/azuis no estilo da imagem) */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-neutral-900">
              Por que este curso é para você?
            </h2>
            <p className="text-sm text-neutral-500 mt-2">
              Diferenciais pensados para entregar o máximo de conhecimento prático.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#00A6B2] text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                1
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 text-sm">Dados reais, decisões reais</h4>
                <p className="text-xs text-neutral-600 leading-relaxed mt-1">Trabalhe com dados públicos atualizados e aplicáveis à realidade.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#00A6B2] text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                2
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 text-sm">Aprendizado Prático</h4>
                <p className="text-xs text-neutral-600 leading-relaxed mt-1">Aulas 100% práticas com construção de dashboards e análise de indicadores.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#00A6B2] text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                3
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 text-sm">Aplicação Imediata</h4>
                <p className="text-xs text-neutral-600 leading-relaxed mt-1">Ferramentas e métodos estruturados que você pode aplicar no seu dia a dia.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#00A6B2] text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                4
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 text-sm">Online e Interativo</h4>
                <p className="text-xs text-neutral-600 leading-relaxed mt-1">Participe de onde estiver, interaja com especialistas e tire dúvidas na hora.</p>
              </div>
            </div>
          </div>

          {/* Seção das ferramentas a serem utilizadas */}
          <div className="mt-20 p-8 rounded-3xl border border-neutral-200 bg-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest">Ferramentas de mercado</span>
              <h3 className="text-lg font-bold text-neutral-900 mt-1">Você vai utilizar na prática</h3>
            </div>
            <div className="flex flex-wrap items-center gap-6 justify-center">
              <span className="font-bold text-neutral-800 text-sm bg-neutral-50 px-4 py-2.5 border border-neutral-200/50 rounded-xl">Power BI</span>
              <span className="font-bold text-neutral-800 text-sm bg-neutral-50 px-4 py-2.5 border border-neutral-200/50 rounded-xl">Python</span>
              <span className="font-bold text-neutral-800 text-sm bg-neutral-50 px-4 py-2.5 border border-neutral-200/50 rounded-xl">Google Dataset Search</span>
              <span className="font-bold text-neutral-800 text-sm bg-neutral-50 px-4 py-2.5 border border-neutral-200/50 rounded-xl">Fontes Oficiais</span>
            </div>
          </div>

        </div>
      </section>

      {/* Banner de Pesquisa de Interesse */}
      <section className="py-8 bg-neutral-50/50 border-y border-neutral-200/50 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="p-8 rounded-3xl border border-brand-secondary/20 bg-brand-secondary/5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="space-y-1">
              <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest block">Futuras Capacitações</span>
              <h3 className="text-lg font-bold text-neutral-900">Tem interesse em outros temas ou formatos?</h3>
              <p className="text-xs text-neutral-600">Ajude-nos a criar os melhores treinamentos respondendo à nossa pesquisa rápida.</p>
            </div>
            <button
              onClick={() => setIsInteresseFormOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-brand-secondary hover:bg-[#008d96] text-white font-bold px-6 h-12 rounded-xl text-xs shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer"
            >
              Responda aqui o formulário de interesse
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Formulário de Inscrição (Visual Limpo e Dividido) */}
      <section ref={formRef} id="inscricao" className="py-20 bg-white border-t border-neutral-200/80 relative z-10">
        <div className="max-w-2xl mx-auto px-6">
          <Card className="shadow-xl border border-neutral-200/60 rounded-3xl">
            <CardContent className="p-8 md:p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full mb-6">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    Inscrição Solicitada!
                  </h3>
                  <p className="text-neutral-600 text-sm max-w-sm mx-auto leading-relaxed">
                    Agradecemos seu interesse. Nossa equipe de relacionamento da Cognisum entrará em contato em breve.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 border-neutral-300 hover:bg-neutral-50 text-neutral-700 rounded-xl"
                  >
                    Enviar outra resposta
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-neutral-900">Garanta sua Vaga</h3>
                    <p className="text-sm text-neutral-500 mt-1">Preencha o formulário e nossa equipe entrará em contato.</p>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="name">Nome *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Seu nome"
                      className="rounded-xl border-neutral-300 py-5 bg-neutral-50/20"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="seu@email.com"
                        className="rounded-xl border-neutral-300 py-5 bg-neutral-50/20"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">WhatsApp *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="(00) 00000-0000"
                        className="rounded-xl border-neutral-300 py-5 bg-neutral-50/20"
                      />
                    </div>
                  </div>

                  {/* Município e Organização devidamente divididos em inputs individuais */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="organization">Organização *</Label>
                      <Input
                        id="organization"
                        name="organization"
                        type="text"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                        placeholder="Ex: Prefeitura, Empresa X"
                        className="rounded-xl border-neutral-300 py-5 bg-neutral-50/20"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="city">Município *</Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="Cidade e Estado"
                        className="rounded-xl border-neutral-300 py-5 bg-neutral-50/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="role">Cargo *</Label>
                    <Input
                      id="role"
                      name="role"
                      type="text"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      placeholder="Ex: Secretário, Analista"
                      className="rounded-xl border-neutral-300 py-5 bg-neutral-50/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message">Mensagem (opcional)</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Diga se possui alguma dúvida ou observação sobre sua inscrição..."
                      className="rounded-xl border-neutral-300 bg-neutral-50/20"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-primary hover:bg-[#0f3a66] text-white py-6 rounded-xl font-bold transition-all disabled:opacity-70 text-sm shadow-md"
                  >
                    {loading ? "Enviando solicitação..." : "Enviar Inscrição"}
                    {!loading && <Send className="w-4 h-4 ml-2" />}
                  </Button>

                  <p className="text-[11px] text-neutral-400 text-center">
                    * Campos obrigatórios. Ao enviar, você concorda que entraremos em contato.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Próximos lançamentos - discreto no final */}
      <section className="py-12 max-w-4xl mx-auto px-6 text-center border-t border-neutral-200">
        <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest block mb-4">
          Próximos Lançamentos em Desenvolvimento
        </span>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-neutral-500">
          <span>Análise de Dados com Python para Gestão Pública</span>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 self-center hidden sm:inline" />
          <span>Power BI Avançado para o Setor Público</span>
        </div>
      </section>

      {/* Card Flutuante de Inscrição */}
      <button
        onClick={scrollToInscricao}
        className={`fixed bottom-6 left-6 z-40 bg-white border border-neutral-100 shadow-xl rounded-2xl p-4 flex items-center gap-3 cursor-pointer text-left transition-all duration-300 ease-out transform ${
          showFloatingButton 
            ? "translate-x-0 opacity-100 animate-float-pulse" 
            : "-translate-x-20 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Inscrições Abertas</span>
          <span className="text-xs font-extrabold text-neutral-800 flex items-center gap-1">
            Garanta sua Vaga
            <ArrowRight className="w-3.5 h-3.5 text-brand-secondary" />
          </span>
        </div>
      </button>

      {/* Modal de Formulário de Interesse */}
      <FormInteresseModal 
        isOpen={isInteresseFormOpen} 
        onClose={() => setIsInteresseFormOpen(false)} 
      />
      
    </div>
  );
}
