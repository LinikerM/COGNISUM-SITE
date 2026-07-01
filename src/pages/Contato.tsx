import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';

export function Contato() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    role: "",
    message: "",
  });

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
          role: formData.role,
          message: formData.message,
          from_name: "Cognisum Site - Lead",
          subject: `Nova Solicitação do Site: ${formData.city}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", city: "", role: "", message: "" });
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
    <div className="bg-[var(--background)] min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6"
          >
            Fale com a Cognisum
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-600"
          >
            Conte seu desafio e desenhamos uma prova de valor com indicadores e análises que aceleram a decisão. Responderemos rapidamente em horário comercial.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Informações de contato */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 space-y-8"
          >
            <div className="glass-card p-8 border-transparent">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">Informações</h2>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-medium text-neutral-900 mb-1">E-mail</span>
                    <a href="mailto:atendimento@cognisum.com.br" className="text-neutral-600 hover:text-brand-primary transition-colors">
                      atendimento@cognisum.com.br
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-medium text-neutral-900 mb-1">Telefone / WhatsApp</span>
                    <a href="tel:+5516981301147" className="text-neutral-600 hover:text-brand-primary transition-colors">
                      (16) 9 8130-1147
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-medium text-neutral-900 mb-1">Endereço</span>
                    <a href="https://maps.google.com/?q=R.+Conde+do+Pinhal,+1762,+São+Carlos+-+SP" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-brand-primary transition-colors leading-relaxed block">
                      R. Conde do Pinhal, 1762<br />São Carlos – SP, 13560-648
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-10 p-6 bg-brand-secondary/10 rounded-xl border border-brand-secondary/20">
                <p className="text-sm text-neutral-800 leading-relaxed">
                  <strong>Prefere uma conversa rápida?</strong><br /> Envie um e-mail com <em>"Quero um protótipo"</em> no assunto e retornamos com um modelo inicial.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Formulário */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-8"
          >
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-neutral-100">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-primary/10 rounded-full mb-6">
                    <CheckCircle2 className="h-10 w-10 text-brand-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-900 mb-4">
                    Solicitação enviada com sucesso!
                  </h3>
                  <p className="text-lg text-neutral-600">
                    Nossa equipe analisará sua solicitação e entrará em contato em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-neutral-900">Nome completo *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-neutral-900">E-mail corporativo *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-neutral-900">Telefone / WhatsApp *</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-sm font-medium text-neutral-900">Município / Organização *</label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                        placeholder="Sua cidade ou empresa"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium text-neutral-900">Cargo / Função *</label>
                    <input
                      id="role"
                      name="role"
                      type="text"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                      placeholder="Ex: Secretário, Gestor, Diretor..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-neutral-900">Como podemos ajudar?</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all resize-y"
                      placeholder="Quais indicadores e dados são mais relevantes para sua gestão?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-[#0f3a66] text-white px-8 py-4 rounded-xl font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/30"
                  >
                    {loading ? "Enviando..." : "Enviar Solicitação"}
                    {!loading && <Send className="w-5 h-5" />}
                  </button>
                  <p className="text-xs text-neutral-500 mt-4">
                    * Campos obrigatórios. Ao enviar, você concorda que entraremos em contato.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
