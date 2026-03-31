import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { Sparkles, UserCheck, Menu } from 'lucide-react';
import { cn } from '../utils/cn';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar = ({ activeTab, setActiveTab }: NavbarProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navItems = [
    { id: 'fortune', label: '神秘运势', icon: Sparkles },
    { id: 'picker', label: '随机点名', icon: UserCheck },
    // 后期可以在这里添加更多功能
  ];


  return (
    <>
      <header className="bg-white/80 backdrop-blur-md border-b-4 border-slate-900 h-16 md:h-20 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('fortune')}>
          <div className="w-12 h-12 bg-primary rounded-2xl border-4 border-slate-900 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 hidden sm:block">卡通工具站</span>
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
                  : "bg-transparent text-slate-600 border-transparent hover:bg-slate-100"
              )}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        
        {/* 移动端：显示菜单按钮 */}
        <div className="md:hidden flex items-center">
          <Button
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-xl font-bold transition-all border-4",
              "bg-transparent text-slate-600 border-transparent hover:bg-slate-100"
            )}
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu size={20} />
            <span className="text-xs">菜单</span>
          </Button>
        </div>
      </header>
      
      {/* 移动端抽屉菜单 */}
      <Drawer
        title="功能菜单"
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        bodyStyle={{ padding: 0 }}
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
                activeTab === tab.id ? "bg-primary/10 text-primary" : "hover:bg-slate-100"
              )}
            >
              <tab.icon size={20} />
              <span className="font-bold">{tab.label}</span>
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
