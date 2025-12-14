import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle, Loader, Shield } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function ChatEmPulse() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: '¡Hola! Soy tu asistente de apoyo emocional sobre esclerosis múltiple. Puedes contarme cómo te sientes, tus dudas sobre la EM, o simplemente conversar. Recuerda que no sustituyo a tu médico, pero estoy aquí para escuchar y apoyarte. 💙'
    }
  ]);
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ollama_status, setOllamaStatus] = useState(null);
  const messagesEndRef = useRef(null);

  // Verificar estado de la API al cargar
  useEffect(() => {
    checkChatHealth();
  }, []);

  const checkChatHealth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/communications/chat-health/`);
      const data = await response.json();
      setOllamaStatus(data);
    } catch {
      setOllamaStatus({
        status: 'error',
        message: 'No se puede conectar con el backend'
      });
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    // Verificar que backend está disponible
    if (ollama_status?.status === 'error') {
      setError('Backend no disponible. Verifica que los servidores estén ejecutándose.');
      return;
    }

    // Añadir mensaje del usuario
    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: input
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/communications/chat-em-pulse/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al procesar tu mensaje');
        return;
      }

      // Añadir respuesta de la IA
      const assistantMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: data.reply
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError('Error de conexión. Asegúrate de que el backend está ejecutándose en ' + API_BASE_URL);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[650px] bg-dark-bg text-slate-100">
      <div className="border-b border-empulseAccent/40 bg-dark-bg/50 p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-empulsePrimary">EM-PULSE Chat</h2>
          <p className="text-xs text-slate-400">Apoyo emocional con IA</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-green-500/10 border border-green-500/30 rounded-full px-2 py-1 flex items-center gap-1">
            <Shield className="w-3 h-3 text-green-400" />
            <span className="text-xs font-semibold text-green-400">Privado</span>
          </div>
        </div>
      </div>

      {/* Status Ollama */}
      {ollama_status?.status === 'error' && (
        <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 mx-4 mt-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="text-yellow-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-yellow-400 font-semibold">⚠️ {ollama_status.message}</p>
            <p className="text-yellow-300 text-sm mt-1">{ollama_status.hint}</p>
          </div>
        </div>
      )}

      {ollama_status?.status === 'loading' && (
        <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 mx-4 mt-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-blue-400 font-semibold">ℹ️ {ollama_status.message}</p>
            <p className="text-blue-300 text-sm mt-1">{ollama_status.hint}</p>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-md md:max-w-xl lg:max-w-2xl p-4 rounded-lg ${
                message.role === 'user'
                  ? 'bg-cyan-primary/30 border border-cyan-primary/50 text-white'
                  : 'bg-cyan-medium/20 border border-cyan-dark/30 text-slate-100'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                {message.content}
              </p>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-cyan-medium/20 border border-cyan-dark/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-slate-300">
                <Loader size={16} className="animate-spin" />
                <span className="text-sm">La IA está pensando...</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-lg text-red-400 text-sm flex items-start gap-2">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Disclaimer */}
      <div className="bg-cyan-dark/10 border-t border-cyan-dark/20 p-3 md:p-4 text-xs md:text-sm text-slate-400">
        ℹ️ Este chat usa inteligencia artificial para ofrecer apoyo emocional e información general. 
        <strong className="text-slate-300"> No sustituye la atención médica profesional.</strong> 
        Siempre consulta con tu neurólogo o médico ante dudas serias.
      </div>

      {/* Input Area - Abajo */}
      <form onSubmit={handleSend} className="border-t border-cyan-dark/20 p-4 md:p-6 bg-dark-bg/50">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
            placeholder="Cuéntame cómo te sientes... (Shift+Enter para nueva línea)"
            className="flex-1 bg-empulseBg border border-cyan-dark/30 rounded-lg p-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-primary/50 resize-none max-h-24"
            rows="3"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-cyan-primary to-cyan-medium hover:shadow-lg hover:shadow-cyan-primary/40 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center"
          >
            {loading ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          💡 Tip: Presiona Shift+Enter para nueva línea
        </p>
      </form>
    </div>
  );
}
