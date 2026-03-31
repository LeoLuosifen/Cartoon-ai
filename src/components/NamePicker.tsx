import React, { useState, useEffect, useRef } from 'react';
import { 
  Button, 
  Upload, 
  App as AntdApp
} from 'antd';
import { 
  FileText, 
  Trash2, 
  Play, 
  Square, 
  UserCheck,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface NamePickerProps {
  isDarkMode: boolean;
}

const NamePicker = ({ isDarkMode }: NamePickerProps) => {
  const { message } = AntdApp.useApp();
  const [names, setNames] = useState<string[]>([]);
  const [isPicking, setIsPicking] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finalName, setFinalName] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      // Split by newline, comma, or space, and filter out empty strings
      const parsedNames = text
        .split(/[\n,\s]+/)
        .map(n => n.trim())
        .filter(n => n.length > 0);
      
      if (parsedNames.length > 0) {
        setNames(parsedNames);
        message.success(`成功读取了 ${parsedNames.length} 个姓名！✨`);
      } else {
        message.error('文件中没有找到有效的姓名。');
      }
    };
    reader.readAsText(file);
    return false;
  };

  const startPicking = () => {
    if (names.length < 2) {
      message.warning('请至少上传 2 个姓名进行点名！');
      return;
    }
    setIsPicking(true);
    setFinalName(null);
    
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % names.length);
    }, 50);
  };

  const stopPicking = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPicking(false);
    setFinalName(names[currentIndex]);
  };

  const clearNames = () => {
    setNames([]);
    setFinalName(null);
    setCurrentIndex(0);
  };

  return (
    <div className={`w-full py-4 md:py-6 px-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 md:mb-8"
      >
        <h1 className={`text-3xl md:text-4xl font-black mb-3 tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>随机点名器 🎲</h1>
        <p className={`text-base md:text-lg font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>上传名单，让命运决定谁是幸运儿！</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-start">
        {/* List Management */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`cartoon-card p-6 flex flex-col min-h-[350px] ${isDarkMode ? 'bg-slate-800' : ''}`}
        >
          <div className="flex justify-between items-center mb-4">
            <label className={`text-sm font-black uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>姓名名单 ({names.length})</label>
            {names.length > 0 && (
              <Button 
                danger 
                type="text" 
                icon={<Trash2 size={16} />} 
                onClick={clearNames}
                className={`font-bold ${isDarkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-50'}`}
              >
                清空
              </Button>
            )}
          </div>

          {names.length === 0 ? (
            <Upload.Dragger
              accept=".txt,.csv"
              showUploadList={false}
              beforeUpload={handleFileUpload}
              className={`flex-1 rounded-2xl border-4 border-dashed transition-colors ${isDarkMode ? 'border-slate-600 hover:border-primary bg-slate-700' : 'border-slate-300 hover:border-primary bg-slate-50'}`}
            >
              <div className="py-8 flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 bg-white rounded-2xl border-4 border-slate-900 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                  <FileText className="text-primary" size={20} />
                </div>
                <div>
                  <p className={`font-black text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>点击或拖拽上传名单</p>
                  <p className="text-xs font-bold text-slate-400">支持 .txt 或 .csv 文件</p>
                </div>
              </div>
            </Upload.Dragger>
          ) : (
            <div 
              ref={listRef}
              className={`flex-1 rounded-2xl border-2 border-slate-900 p-4 overflow-y-auto max-h-[300px] space-y-2 scroll-smooth ${isDarkMode ? 'bg-slate-700' : 'bg-slate-50'}`}
            >
              {names.map((name, idx) => (
                <div 
                  key={idx} 
                  data-index={idx}
                  className={`px-3 py-2 rounded-xl border-2 font-bold transition-all flex items-center gap-2 ${isDarkMode ? 'bg-slate-600 text-white border-slate-500' : 'bg-white text-slate-700 border-slate-200'}`}
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {name}
                </div>
              ))}
            </div>
          )}

          <div className={`mt-6 p-4 rounded-2xl border-2 border-dashed flex items-start gap-3 ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-purple-50 border-primary/30'}`}>
            <Lightbulb className="text-primary shrink-0" size={20} />
            <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-primary/80'}`}>
              提示：文件中的姓名可以用换行、逗号或空格分隔。
            </p>
          </div>
        </motion.div>

        {/* Picking Area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {names.length > 0 ? (
              <motion.div 
                  key="picking-area"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`cartoon-card p-6 h-full flex flex-col items-center justify-center text-center ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
                >
                  <div className="mb-8 w-full">
                    <div className="text-sm font-black uppercase tracking-widest mb-3 text-slate-400">
                      {isPicking ? '正在疯狂挑选...' : finalName ? '中奖者是！🎉' : '准备好了吗？'}
                    </div>
                    
                    <div className="h-24 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={isPicking ? 'picking' : (finalName ? 'result' : 'idle')}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.2 }}
                          className={cn(
                            "text-4xl md:text-5xl font-black tracking-tighter text-center",
                            isPicking ? (isDarkMode ? "text-white" : "text-slate-900") : finalName ? "text-primary scale-110" : (isDarkMode ? "text-slate-700" : "text-slate-200")
                          )}
                        >
                          {isPicking ? names[currentIndex] : (finalName || '???')}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="w-full space-y-3">
                    {!isPicking ? (
                      <Button 
                        type="primary" 
                        size="large" 
                        block 
                        icon={<Play size={20} />}
                        className="cartoon-button h-14 text-lg"
                        onClick={startPicking}
                      >
                        开始点名
                      </Button>
                    ) : (
                      <Button 
                        danger
                        size="large" 
                        block 
                        icon={<Square size={20} />}
                        className="cartoon-button bg-red-500 hover:bg-red-600 h-14 text-lg"
                        onClick={stopPicking}
                      >
                        停止点名
                      </Button>
                    )}
                    
                    {finalName && !isPicking && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-primary font-black animate-bounce text-sm"
                      >
                        恭喜这位幸运儿！✨
                      </motion.div>
                    )}
                  </div>
                </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                  <UserCheck size={48} className={isDarkMode ? 'text-slate-500' : 'text-slate-400'} />
                </div>
                <p className={`font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>上传名单后即可开始点名！</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default NamePicker;
