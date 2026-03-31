/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ConfigProvider, 
  App as AntdApp
} from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import FortuneGenerator from './components/FortuneGenerator';
import NamePicker from './components/NamePicker';
import FloatingChat from './components/FloatingChat';

type ThemeMode = 'light' | 'dark' | 'auto';

export default function App() {
  const [activeTab, setActiveTab] = useState('fortune');
  const [themeMode, setThemeMode] = useState<ThemeMode>('auto');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 检查系统时间，判断是否为夜晚
  const checkSystemTime = () => {
    const now = new Date();
    const hour = now.getHours();
    // 晚上 8 点到早上 6 点为夜晚
    return hour >= 20 || hour < 6;
  };

  // 根据主题模式和系统时间更新实际主题
  useEffect(() => {
    if (themeMode === 'auto') {
      const isNight = checkSystemTime();
      setIsDarkMode(isNight);
    } else {
      setIsDarkMode(themeMode === 'dark');
    }
  }, [themeMode]);

  // 监听系统时间变化（自动模式）
  useEffect(() => {
    if (themeMode === 'auto') {
      const interval = setInterval(() => {
        const isNight = checkSystemTime();
        setIsDarkMode(isNight);
      }, 60000); // 每分钟检查一次

      return () => clearInterval(interval);
    }
  }, [themeMode]);

  // 主题配置
  const getTheme = () => {
    return {
      token: {
        colorPrimary: '#8b5cf6',
        borderRadius: 16,
        fontFamily: '"ZCOOL KuaiLe", "Inter", sans-serif',
        colorBgContainer: isDarkMode ? '#1a1a1a' : '#ffffff',
        colorText: isDarkMode ? '#f1f5f9' : '#1e293b',
      },
      components: {
        Button: {
          controlHeightLG: 56,
          fontWeight: 700,
        },
        Input: {
          controlHeightLG: 56,
          borderRadiusLG: 16,
        },
        Select: {
          controlHeightLG: 56,
          borderRadiusLG: 16,
        },
        DatePicker: {
          controlHeightLG: 56,
          borderRadiusLG: 16,
        }
      }
    };
  };

  return (
    <ConfigProvider theme={getTheme()}>
      <AntdApp>
        <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
          <Navbar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            themeMode={themeMode}
            setThemeMode={setThemeMode}
            isDarkMode={isDarkMode}
          />
          
          <main className="flex-1 py-4 md:py-6">
            <div className="w-full max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'fortune' ? (
                    <FortuneGenerator isDarkMode={isDarkMode} />
                  ) : (
                    <NamePicker isDarkMode={isDarkMode} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>

          <footer className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-900'} border-t-4 py-4 text-center`}>
            <div className="flex flex-col items-center gap-2">
              {/*<div className="flex gap-4">
                <a href="#" className={`${isDarkMode ? 'text-slate-400 hover:text-primary' : 'text-slate-400 hover:text-primary'} transition-colors font-bold`}>隐私政策</a>
                <a href="#" className={`${isDarkMode ? 'text-slate-400 hover:text-primary' : 'text-slate-400 hover:text-primary'} transition-colors font-bold`}>服务条款</a>
                <a href="#" className={`${isDarkMode ? 'text-slate-400 hover:text-primary' : 'text-slate-400 hover:text-primary'} transition-colors font-bold`}>联系我们</a>
              </div>*/}
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-400'} font-bold text-sm`}>
                © 2026 卡通工具站. 用 ✨ 和 智慧 驱动.
              </p>
            </div>
          </footer>

          <FloatingChat isDarkMode={isDarkMode} />
        </div>
      </AntdApp>
    </ConfigProvider>
  );
}
