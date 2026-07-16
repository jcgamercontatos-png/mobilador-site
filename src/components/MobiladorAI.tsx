"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, MessageCircle, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const aiResponses: Record<string, string> = {
  sensibilidade:
    "Para configuração de sensibilidade em mobilador, recomendo:\n\n• Sensibilidade Geral: 80-90%\n• Red Dot: 70-80%\n• 2x Scope: 60-70%\n• 4x Scope: 40-50%\n• Free Look: 100%\n\nEsses são valores base. Ajuste gradualmente até encontrar o que funciona melhor pra você!",
  dpi:
    "O DPI ideal para mobilador depende do seu mouse e estilo:\n\n• Para precisão: 400-800 DPI\n• Para agilidade: 800-1600 DPI\n• Para equilíbrio: 800 DPI\n\nCombine com a sensibilidade do jogo para melhores resultados!",
  teclado:
    "Para jogar Free Fire com teclado e mouse no celular:\n\n1. Baixe um app como Panda Mouse Pro ou Mantis\n2. Conecte o mouse e teclado via USB ou Bluetooth\n3. Configure o mapeamento de teclas\n4. Ajuste a sensibilidade\n5. Pratique no treinamento antes de jogar ranqueada!",
  perifericos:
    "Melhores periféricos para mobilador:\n\n• Mouse: Logitech G203 ou Redragon Cobra\n• Teclado: Redragon Kumara ou HyperX Alloy\n• Mouse Pad: XL com superfície controlada\n• Hub USB: Para conectar tudo no celular\n\nInvestir em bons perifericos faz diferença na performance!",
  default:
    "Olá! Sou o Mobilador AI. Posso te ajudar com:\n\n• Configuração de sensibilidade\n• Ajuste de DPI\n• Teclado e mouse no celular\n• Melhores periféricos\n• Dicas de gameplay\n\nO que você quer saber?",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("sensibilidade") || lower.includes("sens"))
    return aiResponses.sensibilidade;
  if (lower.includes("dpi")) return aiResponses.dpi;
  if (lower.includes("teclado") || lower.includes("mouse") || lower.includes("como jogar"))
    return aiResponses.teclado;
  if (lower.includes("periférico") || lower.includes("comprar") || lower.includes("melhor mouse"))
    return aiResponses.perifericos;
  return aiResponses.default;
}

export function MobiladorAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: aiResponses.default,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(input),
      };
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)]"
          >
            <div className="glass-card overflow-hidden neon-border">
              <div className="bg-gradient-neon p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-dark-900 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-neon-blue" />
                  </div>
                  <div>
                    <h3 className="font-orbitron font-bold text-dark-900 text-sm">
                      MOBILADOR AI
                    </h3>
                    <p className="text-dark-900/70 text-xs">
                      Assistente Virtual
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-dark-900 hover:text-dark-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="h-80 overflow-y-auto p-4 space-y-4 bg-dark-900/95">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-line ${
                        msg.role === "user"
                          ? "bg-neon-blue/20 text-white rounded-br-sm"
                          : "glass text-gray-300 rounded-bl-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="glass p-3 rounded-2xl rounded-bl-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" />
                        <span
                          className="w-2 h-2 bg-neon-blue rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <span
                          className="w-2 h-2 bg-neon-blue rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-white/5 bg-dark-900/95">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Pergunte sobre sensibilidade, DPI..."
                    className="flex-1 bg-dark-700 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="w-10 h-10 rounded-xl bg-gradient-neon flex items-center justify-center text-dark-900 disabled:opacity-50 transition-opacity"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-neon flex items-center justify-center shadow-lg"
        style={{
          boxShadow: "0 0 30px rgba(0, 212, 255, 0.4)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-dark-900" />
        ) : (
          <Sparkles className="w-6 h-6 text-dark-900" />
        )}
      </motion.button>
    </>
  );
}
