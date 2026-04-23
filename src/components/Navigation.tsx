import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { navigationData, NavCategory } from '../data/navigation';

interface NavigationProps {
  isDarkMode: boolean;
}

export default function Navigation({ isDarkMode }: NavigationProps) {
  const [activeCategory, setActiveCategory] = useState<string>(navigationData[0].id);

  const activeCategoryData = navigationData.find((category) => category.id === activeCategory);

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* 移动端分类导航 - 水平滚动 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`mb-4 overflow-x-auto pb-2 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}
      >
        <div className="flex gap-2 min-w-max">
          {navigationData.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${activeCategory === category.id
                ? 'bg-purple-600 text-white'
                : isDarkMode
                ? 'text-slate-300 hover:bg-slate-800'
                : 'text-slate-700 hover:bg-slate-100'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* 桌面端分类导航 */}
      <div className="hidden md:block">
        <div className="flex flex-row gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:w-64 lg:w-72 p-4 rounded-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'} sticky top-4 self-start`}
          >
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>分类导航</h2>
            <ul className="space-y-2">
              {navigationData.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-4 py-2 rounded-xl transition-colors ${activeCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : isDarkMode
                      ? 'text-slate-300 hover:bg-slate-700'
                      : 'text-slate-700 hover:bg-slate-200'
                      }`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 右侧网站列表 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {activeCategoryData && (
              <div>
                <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {activeCategoryData.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeCategoryData.items.map((item, index) => {
                    return (
                      <motion.a
                        key={index}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-2xl flex items-center gap-4 ${isDarkMode
                          ? 'bg-slate-800 hover:bg-slate-700'
                          : 'bg-white hover:bg-slate-50 shadow-sm'
                          } transition-colors`}
                      >
                        {item.icon && (
                          <div className="w-10 h-10 flex-shrink-0">
                            <img
                              src={item.icon}
                              alt={`${item.name} icon`}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {item.name}
                          </h3>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* 移动端网站列表 */}
      <div className="block md:hidden">
        {activeCategoryData && (
          <div>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {activeCategoryData.name}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {activeCategoryData.items.map((item, index) => {
                return (
                  <motion.a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 rounded-xl flex items-center gap-3 ${isDarkMode
                      ? 'bg-slate-800 hover:bg-slate-700'
                      : 'bg-white hover:bg-slate-50 shadow-sm'
                      } transition-colors`}
                  >
                    {item.icon && (
                      <div className="w-8 h-8 flex-shrink-0">
                        <img
                          src={item.icon}
                          alt={`${item.name} icon`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {item.name}
                      </h3>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
