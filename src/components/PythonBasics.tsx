import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Variable,
  Type,
  GitBranch,
  Repeat,
  Box,
  ChevronRight,
  Info,
  Calculator,
  Database,
  Layers,
} from 'lucide-react';
import { cn } from '../utils/cn';

type Topic = {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  code: string;
  animation: React.ReactNode;
};

const LoopAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [loopType, setLoopType] = useState<'for' | 'while'>('for');

  return (
    <div className={`relative w-full h-56 flex flex-col items-center justify-center rounded-xl border p-4 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
      <div className={`absolute top-3 right-3 flex rounded-lg p-1 gap-1 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
        <button
          onClick={() => setLoopType('for')}
          className={cn(
            "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
            loopType === 'for' ? (isDarkMode ? "bg-slate-700 text-indigo-400" : "bg-white text-indigo-600 shadow-sm") : (isDarkMode ? "text-slate-300 hover:text-slate-100" : "text-slate-500 hover:text-slate-700")
          )}
        >
          FOR
        </button>
        <button
          onClick={() => setLoopType('while')}
          className={cn(
            "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
            loopType === 'while' ? (isDarkMode ? "bg-slate-700 text-indigo-400" : "bg-white text-indigo-600 shadow-sm") : (isDarkMode ? "text-slate-300 hover:text-slate-100" : "text-slate-500 hover:text-slate-700")
          )}
        >
          WHILE
        </button>
      </div>

      <AnimatePresence mode="wait">
        {loopType === 'for' ? (
          <motion.div
            key="for"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-4 mt-4"
          >
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    backgroundColor: [isDarkMode ? "#334155" : "#e2e8f0", "#6366f1", isDarkMode ? "#334155" : "#e2e8f0"],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    delay: i * 1,
                    times: [0, 0.2, 0.4]
                  }}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center font-mono text-sm font-bold border ${isDarkMode ? 'border-slate-600 text-slate-100' : 'border-slate-300'}`}
                >
                  {i}
                </motion.div>
              ))}
            </div>
            <p className={`text-xs font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>遍历序列中的每个元素</p>
          </motion.div>
        ) : (
          <motion.div
            key="while"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-4 mt-4"
          >
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <div className={`text-xs font-bold mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>条件: count &lt; 3</div>
                <motion.div
                  animate={{
                    borderColor: [isDarkMode ? "#475569" : "#94a3b8", "#10b981", isDarkMode ? "#475569" : "#94a3b8"],
                    backgroundColor: [isDarkMode ? "#1e293b" : "#ffffff", isDarkMode ? "#0f172a" : "#ecfdf5", isDarkMode ? "#1e293b" : "#ffffff"]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className={`w-20 h-12 border-2 rounded-lg flex items-center justify-center font-mono text-lg font-bold ${isDarkMode ? 'text-slate-100' : ''}`}
                >
                  ?
                </motion.div>
              </div>
              <ChevronRight className={`w-5 h-5 ${isDarkMode ? 'text-slate-500' : 'text-slate-300'}`} />
              <div className="flex flex-col items-center">
                <div className={`text-xs font-bold mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>执行 & 计数</div>
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold"
                >
                  +1
                </motion.div>
              </div>
            </div>
            <p className={`text-xs font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>只要条件为真，就一直执行</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const OperatorAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [op, setOp] = useState<'+' | '-' | '*' | '/'>('+');
  const results = { '+': 12, '-': 8, '*': 20, '/': 5 };

  return (
    <div className={`relative w-full h-56 flex flex-col items-center justify-center rounded-xl border p-4 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
      <div className={`absolute top-3 right-3 flex rounded-lg p-1 gap-1 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
        {(['+', '-', '*', '/'] as const).map((o) => (
          <button
            key={o}
            onClick={() => setOp(o)}
            className={cn(
              "w-9 h-9 flex items-center justify-center text-sm font-bold rounded-md transition-all",
              op === o ? (isDarkMode ? "bg-slate-700 text-indigo-400" : "bg-white text-indigo-600 shadow-sm") : (isDarkMode ? "text-slate-300 hover:text-slate-100" : "text-slate-500 hover:text-slate-700")
            )}
          >
            {o}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-4">
        <div className={`w-14 h-14 rounded-lg flex items-center justify-center font-bold text-xl shadow-sm ${isDarkMode ? 'bg-slate-700 border-2 border-slate-600 text-slate-100' : 'bg-white border-2 border-slate-200'}`}>10</div>
        <motion.div
          key={op}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl"
        >
          {op}
        </motion.div>
        <div className={`w-14 h-14 rounded-lg flex items-center justify-center font-bold text-xl shadow-sm ${isDarkMode ? 'bg-slate-700 border-2 border-slate-600 text-slate-100' : 'bg-white border-2 border-slate-200'}`}>2</div>
        <ChevronRight className={`w-6 h-6 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={`w-16 h-14 rounded-lg flex items-center justify-center font-bold text-xl shadow-sm ${isDarkMode ? 'bg-green-900/30 border-2 border-green-700 text-green-400' : 'bg-green-50 border-2 border-green-200 text-green-600'}`}
        >
          {results[op]}
        </motion.div>
      </div>
    </div>
  );
};

const ConditionAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div className={`relative w-full h-56 flex flex-col items-center justify-center rounded-xl border p-4 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
      <div className="flex flex-col items-center mt-2">
        <motion.div
          className="w-14 h-14 bg-indigo-900 rounded-lg flex items-center justify-center font-bold text-white text-xl z-10"
        >
          ?
        </motion.div>

        <div className="relative w-48 h-32 mt-0">
          <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
            <line x1="50%" y1="7" x2="25%" y2="90%" stroke={isDarkMode ? '#475569' : '#94a3b8'} strokeWidth="2" />
            <line x1="50%" y1="7" x2="75%" y2="90%" stroke={isDarkMode ? '#475569' : '#94a3b8'} strokeWidth="2" />
          </svg>

          <motion.div
            animate={{
              x: [0, -36, 0, 36, 0],
              y: [0, 70, 0, 70, 0],
              backgroundColor: ['#64748b', '#10b981', '#64748b', '#ef4444', '#64748b']
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1]
            }}
            className="absolute left-1/2 top-0 w-4 h-4 rounded-full -ml-2 -mt-2"
          />
        </div>

        <div className="flex gap-20">
          <div className="flex flex-col items-center">
            <span className={`text-sm font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>True</span>
          </div>
          <div className="flex flex-col items-center">
            <span className={`text-sm font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>False</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const OOPAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div className={`relative w-full h-56 flex flex-col items-center justify-center rounded-xl border p-4 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
      <div className="flex items-center gap-6 mt-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-28 bg-indigo-900 rounded-lg flex flex-col items-center justify-center p-3 border-2 border-indigo-700 mb-2">
            <div className="text-white text-sm font-bold mb-2">CLASS: Dog</div>
            <div className="w-full h-0.5 bg-indigo-700 mb-1"></div>
            <div className="w-full h-0.5 bg-indigo-700 mb-1"></div>
            <div className="w-full h-0.5 bg-indigo-700 mb-1"></div>
          </div>
          <p className={`text-xs font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>蓝图 (Class)</p>
        </motion.div>
        
        <motion.div
          animate={{
            x: [0, 5, 0, -5, 0]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronRight className="w-8 h-8 text-indigo-400" />
        </motion.div>
        
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{
              y: [0, -5, 0]
            }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-indigo-400 mb-2"
          >
            <div className="text-white text-sm font-bold text-center">
              Buddy
              <br />
              <span className="text-xs text-indigo-200">Instance</span>
            </div>
          </motion.div>
          <p className={`text-xs font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>对象 (Object)</p>
        </motion.div>
      </div>
    </div>
  );
};

const VariablesAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [value, setValue] = useState<string>('Hello');

  return (
    <div className={`relative w-full h-56 flex flex-col items-center justify-center rounded-xl border p-4 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
      <div className={`absolute top-3 right-3 flex rounded-lg p-1 gap-1 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
        {['Hello', '42', 'True', '[1,2,3]'].map((v) => (
          <button
            key={v}
            onClick={() => setValue(v)}
            className={cn(
              "px-2 py-1.5 text-xs font-bold rounded-md transition-all",
              value === v ? (isDarkMode ? "bg-slate-700 text-indigo-400" : "bg-white text-indigo-600 shadow-sm") : (isDarkMode ? "text-slate-300 hover:text-slate-100" : "text-slate-500 hover:text-slate-700")
            )}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-5 mt-4">
        <div className="flex items-center gap-3">
          <div className={`w-24 h-12 rounded-lg flex items-center justify-center font-mono text-sm font-bold border ${isDarkMode ? 'bg-indigo-900/50 border-indigo-700 text-slate-100' : 'bg-indigo-100 border-indigo-300'}`}>
            message
          </div>
          <ChevronRight className={`w-5 h-5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
          <motion.div
            key={value}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`w-28 h-12 rounded-lg flex items-center justify-center font-mono text-sm font-bold border shadow-sm ${isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-white border-slate-300'}`}
          >
            {value}
          </motion.div>
        </div>
        <p className={`text-xs font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>变量存储数据值</p>
      </div>
    </div>
  );
};

const DataTypesAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [dataType, setDataType] = useState<'string' | 'number' | 'boolean' | 'list'>('string');
  const examples = {
    string: '"Hello"',
    number: '42',
    boolean: 'True',
    list: '[1, 2, 3]'
  };

  return (
    <div className={`relative w-full h-56 flex flex-col items-center justify-center rounded-xl border p-4 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
      <div className={`absolute top-3 right-3 flex rounded-lg p-1 gap-1 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
        {(['string', 'number', 'boolean', 'list'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setDataType(type)}
            className={cn(
              "px-2 py-1.5 text-xs font-bold rounded-md transition-all",
              dataType === type ? (isDarkMode ? "bg-slate-700 text-indigo-400" : "bg-white text-indigo-600 shadow-sm") : (isDarkMode ? "text-slate-300 hover:text-slate-100" : "text-slate-500 hover:text-slate-700")
            )}
          >
            {type}
          </button>
        ))}
      </div>

      <motion.div
        key={dataType}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-5 mt-8"
      >
        <div className={`w-36 h-24 rounded-lg flex items-center justify-center font-mono text-lg font-bold border-2 shadow-sm ${isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-white border-slate-300'}`}>
          {examples[dataType]}
        </div>
        <div className={`px-4 py-1.5 rounded-full text-sm font-bold ${isDarkMode ? 'bg-indigo-900/50 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
          {dataType}
        </div>
      </motion.div>
    </div>
  );
};

const FunctionsAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [input, setInput] = useState<number>(5);

  return (
    <div className={`relative w-full h-56 flex flex-col items-center justify-center rounded-xl border p-4 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
      <div className={`absolute top-3 right-3 flex rounded-lg p-1 gap-1 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
        {[3, 5, 7, 10].map((num) => (
          <button
            key={num}
            onClick={() => setInput(num)}
            className={cn(
              "w-9 h-9 flex items-center justify-center text-sm font-bold rounded-md transition-all",
              input === num ? (isDarkMode ? "bg-slate-700 text-indigo-400" : "bg-white text-indigo-600 shadow-sm") : (isDarkMode ? "text-slate-300 hover:text-slate-100" : "text-slate-500 hover:text-slate-700")
            )}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 mt-12">
        <div className="w-32 h-16 bg-indigo-900 rounded-lg flex flex-col items-center justify-center p-2 border-2 border-indigo-700">
          <div className="text-white text-xs font-bold">def square(x):</div>
          <div className="text-white text-xs font-mono">return x * x</div>
        </div>
        <div className="flex items-center gap-4">
          <motion.div
            key={input}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold border shadow-sm ${isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-white border-slate-300'}`}
          >
            {input}
          </motion.div>
          <ChevronRight className={`w-5 h-5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={`w-16 h-12 rounded-lg flex items-center justify-center font-bold shadow-sm ${isDarkMode ? 'bg-green-900/30 border border-green-700 text-green-400' : 'bg-green-50 border border-green-200 text-green-600'}`}
          >
            {input * input}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const DataStructuresAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [structure, setStructure] = useState<'list' | 'tuple' | 'str' | 'set' | 'dict'>('list');

  return (
    <div className={`relative w-full h-56 flex flex-col items-center justify-center rounded-xl border p-4 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
      <div className={`absolute top-3 left-3 right-3 flex rounded-lg p-1 gap-1 justify-center ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
        {(['list', 'tuple', 'str', 'set', 'dict'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setStructure(type)}
            className={cn(
              "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
              structure === type ? (isDarkMode ? "bg-slate-700 text-indigo-400" : "bg-white text-indigo-600 shadow-sm") : (isDarkMode ? "text-slate-300 hover:text-slate-100" : "text-slate-500 hover:text-slate-700")
            )}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      <motion.div
        key={structure}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4 mt-12"
      >
        {structure === 'list' && (
          <div className="flex flex-col items-center">
            <div className="flex gap-4 mb-2">
              <div className="flex flex-col items-center">
                <span className={`text-xs mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>索引 0</span>
                <div className={`w-16 h-12 rounded-lg flex items-center justify-center font-bold shadow-sm ${isDarkMode ? 'bg-slate-700 border-2 border-indigo-700 text-indigo-400' : 'bg-white border-2 border-indigo-400 text-indigo-600'}`}>10</div>
              </div>
              <div className="flex flex-col items-center">
                <span className={`text-xs mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>索引 1</span>
                <div className={`w-16 h-12 rounded-lg flex items-center justify-center font-bold shadow-sm ${isDarkMode ? 'bg-slate-700 border-2 border-indigo-700 text-indigo-400' : 'bg-white border-2 border-indigo-400 text-indigo-600'}`}>20</div>
              </div>
              <div className="flex flex-col items-center">
                <span className={`text-xs mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>索引 2</span>
                <div className={`w-16 h-12 rounded-lg flex items-center justify-center font-bold shadow-sm ${isDarkMode ? 'bg-slate-700 border-2 border-indigo-700 text-indigo-400' : 'bg-white border-2 border-indigo-400 text-indigo-600'}`}>30</div>
              </div>
            </div>
          </div>
        )}

        {structure === 'tuple' && (
          <div className="flex items-center">
            <div className={`flex gap-2 px-4 py-2 rounded-full border ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-100 border-slate-200'}`}>
              {[1, 2, 3].map((num, index) => (
                <div key={index} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-sm ${isDarkMode ? 'bg-slate-600 border-2 border-slate-500 text-slate-100' : 'bg-white border-2 border-slate-300 text-slate-700'}`}>
                  {num}
                </div>
              ))}
            </div>
          </div>
        )}

        {structure === 'str' && (
          <div className="flex gap-2">
            {['P', 'Y', 'T', 'H', 'O', 'N'].map((char, index) => (
              <motion.div
                key={index}
                animate={{
                  y: [0, -5, 0, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
                className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center font-bold text-white shadow-sm"
              >
                {char}
              </motion.div>
            ))}
          </div>
        )}

        {structure === 'set' && (
          <div className="relative w-32 h-32">
            <svg className="absolute inset-0" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke={isDarkMode ? '#475569' : '#94a3b8'} strokeWidth="2" fill="none" strokeDasharray="4" />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 bg-green-500 rounded-md flex items-center justify-center font-bold text-white shadow-sm transform rotate-12">C</div>
            </div>
            <motion.div
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-green-500 rounded-md flex items-center justify-center font-bold text-white shadow-sm transform -rotate-12">A</div>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div className="w-12 h-12 bg-green-500 rounded-md flex items-center justify-center font-bold text-white shadow-sm transform rotate-45">B</div>
              </div>
            </motion.div>
          </div>
        )}

        {structure === 'dict' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-lg border font-bold ${isDarkMode ? 'bg-yellow-900/30 border-yellow-700 text-yellow-400' : 'bg-yellow-100 border-yellow-200 text-yellow-800'}`}>
                Key: name
              </div>
              <ChevronRight className={`w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
              <div className={`px-4 py-2 rounded-lg border font-bold ${isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-white border-slate-200 text-slate-700'}`}>
                Value: Alice
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-lg border font-bold ${isDarkMode ? 'bg-yellow-900/30 border-yellow-700 text-yellow-400' : 'bg-yellow-100 border-yellow-200 text-yellow-800'}`}>
                Key: age
              </div>
              <ChevronRight className={`w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
              <div className={`px-4 py-2 rounded-lg border font-bold ${isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-white border-slate-200 text-slate-700'}`}>
                Value: 25
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const PythonBasics = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [activeTopic, setActiveTopic] = useState('variables');

  const topics: Topic[] = [
    {
      id: 'variables',
      title: '变量 (Variables)',
      icon: <Variable className="w-5 h-5" />,
      description: '变量用于存储数据值。在Python中，变量不需要声明类型。',
      code: 'message = "Hello, World!"\nprint(message)',
      animation: <VariablesAnimation isDarkMode={isDarkMode} />
    },
    {
      id: 'data-types',
      title: '数据类型 (Data Types)',
      icon: <Type className="w-5 h-5" />,
      description: 'Python有多种数据类型，包括字符串、数字、布尔值、列表等。',
      code: 'string = "Hello"\nnumber = 42\nbool_value = True\nlist_data = [1, 2, 3]',
      animation: <DataTypesAnimation isDarkMode={isDarkMode} />
    },
    {
      id: 'condition',
      title: '条件控制 (If/Else)',
      icon: <GitBranch className="w-5 h-5" />,
      description: '使用if, elif, else来根据条件执行不同的代码块。Python使用缩进来定义代码块。',
      code: 'if score >= 60:\n    print("及格")\nelse:\n    print("不及格")',
      animation: <ConditionAnimation isDarkMode={isDarkMode} />
    },
    {
      id: 'loops',
      title: '循环 (Loops)',
      icon: <Repeat className="w-5 h-5" />,
      description: 'for循环用于遍历序列（如列表或范围），while循环在给定条件为真时持续运行。',
      code: '# For 循环\nfor i in range(3):\n    print(i)\n\n# While 循环\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1',
      animation: <LoopAnimation isDarkMode={isDarkMode} />
    },
    {
      id: 'functions',
      title: '函数 (Functions)',
      icon: <Box className="w-5 h-5" />,
      description: '函数是组织好的、可重复使用的、用来实现特定功能的代码块。',
      code: 'def square(x):\n    return x * x\n\nresult = square(5)\nprint(result)',
      animation: <FunctionsAnimation isDarkMode={isDarkMode} />
    },
    {
      id: 'operators',
      title: '运算符 (Operators)',
      icon: <Calculator className="w-5 h-5" />,
      description: 'Python支持各种运算符，包括算术、比较、逻辑等运算符。',
      code: 'a = 10\nb = 2\n\nprint(a + b)  # 加法\nprint(a - b)  # 减法\nprint(a * b)  # 乘法\nprint(a / b)  # 除法',
      animation: <OperatorAnimation isDarkMode={isDarkMode} />
    },
    {
      id: 'data-structures',
      title: '数据结构 (Data Structures)',
      icon: <Database className="w-5 h-5" />,
      description: 'Python提供了多种内置数据结构，如字符串、列表、字典、元组和集合。',
      code: '# 字符串\nmy_str = "Hello"\n\n# 列表\nmy_list = [1, 2, 3]\n\n# 字典\nmy_dict = {"name": "Buddy", "age": 3}\n\n# 元组\nmy_tuple = (1, 2, 3)\n\n# 集合\nmy_set = {1, 2, 3}',
      animation: <DataStructuresAnimation isDarkMode={isDarkMode} />
    },
    {
      id: 'oop',
      title: '面向对象 (OOP)',
      icon: <Layers className="w-5 h-5" />,
      description: 'Python是一种面向对象的编程语言，支持类和对象的概念。',
      code: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n\nmy_dog = Dog("Buddy")\nprint(my_dog.name)',
      animation: <OOPAnimation isDarkMode={isDarkMode} />
    }
  ];

  const activeTopicData = topics.find(topic => topic.id === activeTopic) || topics[0];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* 左侧导航 */}
        <div className="w-full md:w-auto md:min-w-[200px]">
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'} border-4 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} shadow-lg`}>
            <h2 className={`text-xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>学习路径</h2>
            <div className="space-y-2">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setActiveTopic(topic.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all",
                    activeTopic === topic.id
                      ? "bg-primary text-white shadow-md"
                      : isDarkMode
                      ? "text-slate-300 hover:bg-slate-700"
                      : "text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <span className={activeTopic === topic.id ? "text-white" : isDarkMode ? "text-slate-400" : "text-slate-500"}>
                    {topic.icon}
                  </span>
                  <span>{topic.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧内容 */}
        <div className="flex-1">
          <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'} border-4 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} shadow-lg`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-primary/20' : 'bg-primary/10'}`}>
                {activeTopicData.icon}
              </div>
              <h1 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {activeTopicData.title}
              </h1>
            </div>

            <p className={`mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {activeTopicData.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 可视化动画 */}
              <div>
                <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  可视化流程
                </h3>
                {activeTopicData.animation}
              </div>

              {/* 代码示例 */}
              <div>
                <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  代码示例
                </h3>
                <div className={`p-4 rounded-xl bg-slate-900 text-green-400 font-mono text-sm overflow-x-auto`}>
                  <pre>{activeTopicData.code}</pre>
                </div>
              </div>
            </div>

            {/* 小贴士 */}
            <div className={`mt-6 p-4 rounded-xl bg-amber-50 border-2 border-amber-200 ${isDarkMode ? 'bg-amber-900/30 border-amber-700/50' : ''}`}>
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className={`font-bold mb-1 ${isDarkMode ? 'text-amber-300' : 'text-amber-800'}`}>小贴士</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-amber-200' : 'text-amber-700'}`}>
                    Python是一门非常注重可读性的语言。保持代码简洁，并始终使用4个空格进行缩进，这是Python社区的通用标准。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythonBasics;