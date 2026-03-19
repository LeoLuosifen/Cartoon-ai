import React, { useState, useEffect, useRef } from 'react';
import { 
  Button, 
  Input, 
} from 'antd';
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot,
  User,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { chatWithAI } from '../services/ai';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user', text: string }[]>([
    { role: 'bot', text: '你好呀！我是小图。今天有什么我可以帮你的吗？🤖' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSend = async () => {
    if (!inputValue.trim() || loading || cooldown > 0) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const botResponse = await chatWithAI(userMsg, messages.map(m => ({ role: m.role === 'bot' ? 'model' : 'user', text: m.text })));
    
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    setLoading(false);
    setCooldown(3); // 3 seconds cooldown
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] cartoon-card flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-primary p-4 border-b-4 border-slate-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl border-2 border-slate-900 flex items-center justify-center">
                  <Bot className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-white font-black text-sm leading-none">小图机器人</p>
                  <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">在线并准备就绪</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50"
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'bot' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex gap-2 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg border-2 border-slate-900 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]",
                    msg.role === 'bot' ? "bg-white" : "bg-accent"
                  )}>
                    {msg.role === 'bot' ? <Bot size={16} className="text-primary" /> : <User size={16} className="text-white" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl border-2 border-slate-900 text-sm font-medium shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]",
                    msg.role === 'bot' ? "bg-white text-slate-700" : "bg-primary text-white"
                  )}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex gap-2 max-w-[85%]">
                  <div className="w-8 h-8 rounded-lg border-2 border-slate-900 flex items-center justify-center shrink-0 bg-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    <Bot size={16} className="text-primary" />
                  </div>
                  <div className="p-3 rounded-2xl border-2 border-slate-900 bg-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    <div className="flex gap-1">
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t-4 border-slate-900">
              <div className="flex gap-2">
                <Input 
                  placeholder="输入消息..." 
                  className="cartoon-input flex-1 h-10 text-sm"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onPressEnter={handleSend}
                />
                <Button 
                  type="primary" 
                  icon={cooldown > 0 ? undefined : <Send size={18} />} 
                  className="cartoon-button p-0 w-10 h-10 flex items-center justify-center shrink-0"
                  onClick={handleSend}
                  disabled={!inputValue.trim() || loading || cooldown > 0}
                >
                  {cooldown > 0 ? cooldown : null}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary rounded-full border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center text-white transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
      </motion.button>
    </div>
  );
};

export default FloatingChat;
