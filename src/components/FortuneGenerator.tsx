import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Select, 
  Progress 
} from 'antd';
import { 
  Sparkles, 
  RefreshCw, 
  Star, 
  Palette, 
  Hash, 
  Lightbulb,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import { generateFortune } from '../services/ai';

const FortuneGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [form, setForm] = useState({
    type: 'today'
  });

  const [history, setHistory] = useState<any[]>([]);
  const [cooldown, setCooldown] = useState(0); // Cooldown in seconds

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('fortune_history') || '[]');
    setHistory(savedHistory);
  }, [result]);

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleGenerate = async () => {
    // 1. Check Caching (Simple same-day same-type cache)
    const todayStr = dayjs().format('YYYY-MM-DD');
    const cacheKey = `fortune_cache_${form.type}_${todayStr}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      setResult(JSON.parse(cachedData));
      return;
    }

    if (cooldown > 0) return;

    setLoading(true);
    try {
      const data = await generateFortune(form.type);
      setResult(data);
      
      // 2. Save to Cache (today only)
      localStorage.setItem(cacheKey, JSON.stringify(data));
      
      // 3. Save to history (Limit to 2)
      const savedHistory = JSON.parse(localStorage.getItem('fortune_history') || '[]');
      const newHistory = [{ ...data, date: new Date().toISOString(), type: form.type }, ...savedHistory].slice(0, 2);
      localStorage.setItem('fortune_history', JSON.stringify(newHistory));
      
      // 4. Set Cooldown (e.g., 5 seconds)
      setCooldown(5);
    } catch (error) {
      console.error("Generate error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-4 md:py-6 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 md:mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">神秘运势生成器 🔮</h1>
        <p className="text-base md:text-lg text-slate-600 font-medium">让卡通精灵揭示你的命运！</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-start">
        {/* Form */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="cartoon-card p-6"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-black text-slate-900 uppercase tracking-wider mb-2">运势类型</label>
                <Select 
                  className="w-full h-12"
                  defaultValue="today"
                  onChange={(val) => setForm({ ...form, type: val })}
                  options={[
                    { value: 'today', label: '今日运势' },
                    { value: 'love', label: '爱情与浪漫' },
                    { value: 'career', label: '事业与成功' },
                    { value: 'wealth', label: '财富与金钱' },
                  ]}
                />
              </div>
              <Button 
                type="primary" 
                size="large" 
                block 
                className="cartoon-button h-14 text-lg"
                loading={loading}
                disabled={cooldown > 0}
                onClick={handleGenerate}
              >
                {loading ? '正在请示神灵...' : cooldown > 0 ? `CD中 (${cooldown}s)` : '生成我的运势！'}
              </Button>
            </div>
          </motion.div>

          {/* History */}
          {history.length > 0 && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="cartoon-card p-4 bg-slate-50/50"
              >
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">最近的命运</h3>
              <div className="space-y-3">
                {history.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-slate-200 cursor-pointer hover:border-primary transition-all"
                    onClick={() => setResult(item)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-primary">
                        <Star size={14} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-700 truncate max-w-[150px]">{item.fortune}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{item.type === 'today' ? '今日' : item.type === 'love' ? '爱情' : item.type === 'career' ? '事业' : '财富'} • {dayjs(item.date).format('M月D日')}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-300" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Result */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-24 h-24 relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 border-8 border-primary border-t-transparent rounded-full"
                  />
                  <Sparkles className="absolute inset-0 m-auto text-primary w-8 h-8" />
                </div>
                <p className="font-bold text-slate-500 animate-pulse">正在混合星尘与像素...</p>
              </motion.div>
            ) : result ? (
              <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  className="cartoon-card p-6 bg-gradient-to-br from-white to-purple-50"
                >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-black text-slate-900">命运已揭晓！</h2>
                  <div className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold border-2 border-slate-900">
                    {form.type === 'today' ? '今日' : form.type === 'love' ? '爱情' : form.type === 'career' ? '事业' : '财富'}
                  </div>
                </div>

                <p className="text-base font-medium text-slate-700 italic mb-6 leading-relaxed">
                  “{result.fortune}”
                </p>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-black text-xs uppercase tracking-widest text-slate-500">幸运指数</span>
                      <span className="font-black text-primary">{result.score}%</span>
                    </div>
                    <Progress 
                      percent={result.score} 
                      showInfo={false} 
                      strokeColor="#8b5cf6" 
                      trailColor="#e2e8f0"
                      strokeWidth={12}
                      className="rounded-full overflow-hidden border-2 border-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl border-2 border-slate-900 flex items-center gap-3">
                      <Palette className="text-blue-500" size={20} />
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400">幸运色</p>
                        <p className="font-bold text-sm">{result.luckyColor}</p>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border-2 border-slate-900 flex items-center gap-3">
                      <Hash className="text-orange-500" size={20} />
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400">幸运数字</p>
                        <p className="font-bold text-sm">{result.luckyNumber}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-2xl border-2 border-dashed border-yellow-400 flex items-start gap-3">
                    <Lightbulb className="text-yellow-500 shrink-0" size={20} />
                    <p className="text-sm font-medium text-yellow-800">
                      <span className="font-black">大师建议：</span> {result.advice}
                    </p>
                  </div>
                </div>

                <Button 
                  icon={<RefreshCw size={16} />} 
                  className="mt-8 border-2 border-slate-900 font-bold rounded-xl h-10"
                  onClick={() => setResult(null)}
                >
                  再试一次
                </Button>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                  <Sparkles size={48} className="text-slate-400" />
                </div>
                <p className="font-bold text-slate-500">选择运势类型，开启你的命运之旅！</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FortuneGenerator;
