import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { Sparkles, UserCheck, Menu, Sun, Moon, Clock, ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

type ThemeMode = 'light' | 'dark' | 'auto';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDarkMode: boolean;
}

const Navbar = ({ activeTab, setActiveTab, themeMode, setThemeMode, isDarkMode }: NavbarProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const navItems = [
    { id: 'fortune', label: '神秘运势', icon: Sparkles },
    { id: 'picker', label: '随机点名', icon: UserCheck },
    // 后期可以在这里添加更多功能
  ];

  const themeOptions = [
    { value: 'auto', label: '自动', icon: Clock },
    { value: 'light', label: '白天', icon: Sun },
    { value: 'dark', label: '黑夜', icon: Moon },
  ];


  return (
    <>
      <header className={`${isDarkMode ? 'bg-slate-900/80 backdrop-blur-md border-slate-700' : 'bg-white/80 backdrop-blur-md border-slate-900'} border-b-4 h-16 md:h-20 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50`}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('fortune')}>
          <div className="w-12 h-12 bg-primary rounded-2xl border-4 border-slate-900 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <span className={`text-2xl font-black tracking-tighter hidden sm:block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>卡通工具站</span>
        </div>
        
        {/* 桌面端：显示功能按钮 */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all border-4",
                activeTab === tab.id 
                  ? "bg-primary text-white border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]" 
                  : `${isDarkMode ? 'bg-transparent text-slate-300 border-transparent hover:bg-slate-800' : 'bg-transparent text-slate-600 border-transparent hover:bg-slate-100'}`
              )}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
          
          {/* 主题切换 */}
          <div className="ml-4 relative">
            <button
              className={`w-32 h-10 flex items-center justify-between px-3 rounded-xl border-4 ${isDarkMode ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-900 border-slate-200'}`}
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            >
              <span>{themeOptions.find(option => option.value === themeMode)?.label}</span>
              <ChevronDown size={16} />
            </button>
            
            {isThemeMenuOpen && (
              <div className={`absolute top-full left-0 mt-2 w-32 rounded-xl border-4 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-lg z-10`}>
                {themeOptions.map(option => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setThemeMode(option.value as ThemeMode);
                      setIsThemeMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 cursor-pointer ${themeMode === option.value ? 'bg-primary/10 text-primary' : isDarkMode ? 'text-white hover:bg-slate-700' : 'text-slate-900 hover:bg-slate-100'}`}
                  >
                    <option.icon size={16} />
                    <span>{option.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* 移动端：显示菜单按钮 */}
        <div className="md:hidden flex items-center">
          <Button
            aria-label="打开菜单"
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-xl font-bold transition-all border-4",
              isDarkMode 
                ? "bg-transparent text-slate-300 border-transparent hover:bg-slate-800"
                : "bg-transparent text-slate-600 border-transparent hover:bg-slate-100"
            )}
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu size={20} />
            <span className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>菜单</span>
          </Button>
        </div>
      </header>
      
      {/* 移动端抽屉菜单 */}
      <Drawer
        title={<span className={isDarkMode ? 'text-white' : 'text-slate-900'}>功能菜单</span>}
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        bodyStyle={{ padding: 0, backgroundColor: isDarkMode ? '#1e293b' : '#ffffff' }}
        headerStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}` }}
        width={280}
      >
        <div className="p-4">
          {navItems.map((tab) => (
            <div
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsDrawerOpen(false);
              }}
              className={cn(
                "flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg mb-2",
                activeTab === tab.id ? "bg-primary/10 text-primary" : `${isDarkMode ? 'text-white hover:bg-slate-800' : 'text-slate-900 hover:bg-slate-100'}`
              )}
            >
              <tab.icon size={20} />
              <span className="font-bold">{tab.label}</span>
            </div>
          ))}
          
          {/* 主题切换 */}
          <div className={`mt-6 pt-4 border-t-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <p className={`text-sm font-black uppercase tracking-widest mb-3 ${isDarkMode ? 'text-slate-300' : 'text-slate-400'}`}>主题设置</p>
            <div className="space-y-2">
              {themeOptions.map(option => (
                <div
                  key={option.value}
                  onClick={() => {
                    setThemeMode(option.value as ThemeMode);
                  }}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg",
                    themeMode === option.value ? "bg-primary/10 text-primary" : `${isDarkMode ? 'text-white hover:bg-slate-800' : 'text-slate-900 hover:bg-slate-100'}`
                  )}
                >
                  <option.icon size={20} />
                  <span className="font-bold">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
