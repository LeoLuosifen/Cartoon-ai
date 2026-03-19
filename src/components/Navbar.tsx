import React from 'react';
import { Layout } from 'antd';
import { Sparkles, UserCheck } from 'lucide-react';
import { cn } from '../utils/cn';

const { Header } = Layout;

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar = ({ activeTab, setActiveTab }: NavbarProps) => {
  return (
    <Header className="bg-white/80 backdrop-blur-md border-b-4 border-slate-900 h-20 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('fortune')}>
        <div className="w-12 h-12 bg-primary rounded-2xl border-4 border-slate-900 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
          <Sparkles className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-black tracking-tighter text-slate-900 hidden sm:block">卡通工具站</span>
      </div>
      
      <div className="flex gap-2 md:gap-4">
        {[
          { id: 'fortune', label: '神秘运势', icon: Sparkles },
          { id: 'picker', label: '随机点名', icon: UserCheck },
        ].map((tab) => (
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
            <span className="hidden md:inline">{tab.label}</span>
          </button>
        ))}
      </div>
    </Header>
  );
};

export default Navbar;
