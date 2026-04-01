import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Scroll, Star, Sun, Moon, Heart, Shield, Wand, Coffee, Sword, DollarSign } from 'lucide-react';
import { chatWithAI } from '../services/ai';
import tarotCards, { TarotCard } from '../data/tarot';

// 根据图标名称渲染对应的图标组件
const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'Star':
      return <Star className="w-8 h-8" />;
    case 'Sun':
      return <Sun className="w-8 h-8" />;
    case 'Moon':
      return <Moon className="w-8 h-8" />;
    case 'Heart':
      return <Heart className="w-8 h-8" />;
    case 'Shield':
      return <Shield className="w-8 h-8" />;
    case 'Wand':
      return <Wand className="w-8 h-8" />;
    case 'Cup':
      return <Coffee className="w-8 h-8" />;
    case 'Sword':
      return <Sword className="w-8 h-8" />;
    case 'Coins':
      return <DollarSign className="w-8 h-8" />;
    default:
      return <Star className="w-8 h-8" />;
  }
};

interface TarotGameProps {
  isDarkMode: boolean;
}

const TarotGame = ({ isDarkMode }: TarotGameProps) => {
  const [step, setStep] = useState<'question' | 'spread' | 'shuffling' | 'selecting' | 'revealing' | 'reading' | 'limit'>('question');
  const [question, setQuestion] = useState('');
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [reading, setReading] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<TarotCard[]>([]);
  const [spreadType, setSpreadType] = useState<'single' | 'three'>('single');

  // 检查用户是否已经在当天使用过
  useEffect(() => {
    checkUsageLimit();
  }, []);

  const checkUsageLimit = (): boolean => {
    const lastUsed = localStorage.getItem('tarotLastUsed');
    
    if (lastUsed) {
      const lastDate = new Date(lastUsed);
      const today = new Date();
      if (lastDate.toDateString() === today.toDateString()) {
        // 检查是否已经使用了单张和三张的塔罗牌功能
        const singleUsed = localStorage.getItem('tarotSingleUsed') === 'true';
        const threeUsed = localStorage.getItem('tarotThreeUsed') === 'true';
        
        // 只有当同时使用了单张和三张，才显示之前的结论
        if (singleUsed && threeUsed) {
          setStep('reading');
          return true; // 已经使用过
        }
      }
    }
    return false; // 未使用过
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      // 检查使用限制
      const hasUsed = checkUsageLimit();
      // 如果已经被限制（两个牌阵都使用了），直接返回
      if (hasUsed) {
        // 检查是否两个牌阵都使用了
        const singleUsed = localStorage.getItem('tarotSingleUsed') === 'true';
        const threeUsed = localStorage.getItem('tarotThreeUsed') === 'true';
        if (singleUsed && threeUsed) {
          return;
        }
      }
      setStep('spread');
    }
  };

  const handleSpreadSelect = (type: 'single' | 'three') => {
    setSpreadType(type);
    setStep('shuffling');
    // 洗牌逻辑
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5).slice(0, 3); // 始终洗3张牌，这样可以同时支持单张和三张
    setShuffledCards(shuffled);
    // 模拟洗牌动画
    setTimeout(() => {
      setStep('selecting');
    }, 2000);
  };

  const handleCardSelect = async (cardIndex: number) => {
    // 添加到已翻开的牌
    const newRevealedCards = [...revealedCards, cardIndex];
    setRevealedCards(newRevealedCards);
    
    if (spreadType === 'single' || newRevealedCards.length === 3) {
      // 单张牌或三张牌都翻开了，进入等待结果步骤
      setStep('revealing');
      // 延迟一下，让翻完牌的结果停留2秒后再出结论
      await new Promise(resolve => setTimeout(resolve, 2000));
      // 调用 generateReading 函数，保存结果到 localStorage
      await generateReading(cardIndex, newRevealedCards, spreadType);
      // 保持在选择牌步骤，显示分析结果
      setStep('selecting');
    }
  };

  const generateReading = async (cardIndex: number, revealedCardIndices: number[] = [cardIndex], currentSpreadType: 'single' | 'three' = spreadType) => {
    setIsLoading(true);
    
    let response = '';
    try {
      if (currentSpreadType === 'single') {
        const card = shuffledCards[cardIndex];
        const prompt = `你是一位专业的塔罗牌解读师，精通塔罗牌的规则和含义。

用户的问题：${question}

抽到的塔罗牌：${card.name}

牌意：${card.meaning}

牌的详细描述：${card.description}

牌的类型：${card.type === 'major' ? '大阿卡纳' : '小阿卡纳'}
${card.type === 'minor' && card.suit ? `牌的花色：${card.suit === 'wands' ? '权杖' : card.suit === 'cups' ? '圣杯' : card.suit === 'swords' ? '宝剑' : '星币'}` : ''}

请根据塔罗牌的规则，按照以下流程为用户提供一个详细、专业且有洞察力的解读：
1. 先看整体：这张牌给你的第一直觉是什么？能量是顺畅的还是阻塞的？
2. 再看单张：解读牌面含义，结合牌的类型和花色（如果是小阿卡纳）。
3. 最后整合：将牌的含义与用户的问题相结合，提供具体的见解。
4. 给出建议：提炼出1-2个可落地的方向或建议，而非判决。
5. 强调塔罗牌展示的是"如果沿着当前路径走下去，最可能出现的趋势"，而不是不可更改的命运。

解读应该：
- 直接回答用户的问题
- 结合牌的含义和描述
- 保持语气专业但友好
- 不要使用过于技术化的术语
- 回答要简洁明了，不超过300字

请用中文回答。`;

        response = await chatWithAI(prompt, []);
        setReading(response);
      } else {
        // 三张牌的情况
        const cards = revealedCardIndices.map(index => shuffledCards[index]);
        const pastCard = cards[0];
        const presentCard = cards[1];
        const futureCard = cards[2];
        
        const prompt = `你是一位专业的塔罗牌解读师，精通塔罗牌的规则和含义。

用户的问题：${question}

抽到的塔罗牌（过去-现在-未来）：
1. 过去：${pastCard.name} - ${pastCard.meaning}
   详细描述：${pastCard.description}
   类型：${pastCard.type === 'major' ? '大阿卡纳' : '小阿卡纳'}
   ${pastCard.type === 'minor' && pastCard.suit ? `花色：${pastCard.suit === 'wands' ? '权杖' : pastCard.suit === 'cups' ? '圣杯' : pastCard.suit === 'swords' ? '宝剑' : '星币'}` : ''}

2. 现在：${presentCard.name} - ${presentCard.meaning}
   详细描述：${presentCard.description}
   类型：${presentCard.type === 'major' ? '大阿卡纳' : '小阿卡纳'}
   ${presentCard.type === 'minor' && presentCard.suit ? `花色：${presentCard.suit === 'wands' ? '权杖' : presentCard.suit === 'cups' ? '圣杯' : presentCard.suit === 'swords' ? '宝剑' : '星币'}` : ''}

3. 未来：${futureCard.name} - ${futureCard.meaning}
   详细描述：${futureCard.description}
   类型：${futureCard.type === 'major' ? '大阿卡纳' : '小阿卡纳'}
   ${futureCard.type === 'minor' && futureCard.suit ? `花色：${futureCard.suit === 'wands' ? '权杖' : futureCard.suit === 'cups' ? '圣杯' : futureCard.suit === 'swords' ? '宝剑' : '星币'}` : ''}

请根据塔罗牌的规则，按照以下流程为用户提供一个详细、专业且有洞察力的解读：
1. 先看整体：这三张牌给你的第一直觉是什么？能量是顺畅的还是阻塞的？
2. 再看单张：逐张解读牌面含义，结合位置含义（过去/现在/未来）和牌的类型、花色（如果是小阿卡纳）。
3. 最后整合：牌与牌之间的关系——是否有重复的牌、对立的牌、递进的牌，以及它们如何共同回应用户的问题。
4. 给出建议：提炼出1-2个可落地的方向或建议，而非判决。
5. 强调塔罗牌展示的是"如果沿着当前路径走下去，最可能出现的趋势"，而不是不可更改的命运。

解读应该：
- 直接回答用户的问题
- 结合牌的含义和描述
- 保持语气专业但友好
- 不要使用过于技术化的术语
- 回答要简洁明了，不超过400字

请用中文回答。`;

        response = await chatWithAI(prompt, []);
        setReading(response);
      }
    } catch (error) {
      console.error('生成塔罗牌解读出错:', error);
      if (currentSpreadType === 'single') {
        const card = shuffledCards[cardIndex];
        response = `根据您的问题"${question}"，抽到的「${card.name}」牌代表着${card.meaning}。${card.description}这张牌暗示着您${card.meaning}，需要${card.meaning.includes('新的开始') ? '勇气去拥抱变化' : card.meaning.includes('成功') ? '保持积极的态度' : card.meaning.includes('直觉') ? '相信自己的直觉' : card.meaning.includes('关系') ? '认真考虑重要的选择' : card.meaning.includes('力量') ? '发挥内在的力量' : '花时间内省和反思'}。不要害怕未知，相信自己的能力，您的努力将会得到回报。`;
        setReading(response);
      } else {
        response = `根据您的问题"${question}"，抽到的三张牌代表着过去、现在和未来的不同方面。过去的经历塑造了现在的状况，而现在的选择将影响未来的发展。请保持积极的心态，相信自己的能力，勇敢面对挑战，您的努力将会得到回报。`;
        setReading(response);
      }
    } finally {
      setIsLoading(false);
      
      // 保存使用时间和结果
      localStorage.setItem('tarotLastUsed', new Date().toISOString());
      // 分别保存单张和三张的结果
      if (currentSpreadType === 'single') {
        localStorage.setItem('tarotSingleReading', response);
        localStorage.setItem('tarotSingleCards', JSON.stringify(revealedCardIndices));
        localStorage.setItem('tarotSingleShuffledCards', JSON.stringify(shuffledCards));
        localStorage.setItem('tarotSingleUsed', 'true');
      } else {
        localStorage.setItem('tarotThreeReading', response);
        localStorage.setItem('tarotThreeCards', JSON.stringify(revealedCardIndices));
        localStorage.setItem('tarotThreeShuffledCards', JSON.stringify(shuffledCards));
        localStorage.setItem('tarotThreeUsed', 'true');
      }
    }
  };

  const resetGame = () => {
    setStep('question');
    setQuestion('');
    setRevealedCards([]);
    setReading('');
    setShuffledCards([]);
    // 重置后再次检查使用限制
    checkUsageLimit();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'} border-4 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} shadow-lg`}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-primary/20' : 'bg-primary/10'}`}>
            <Scroll className="w-6 h-6 text-primary" />
          </div>
          <h1 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            塔罗牌游戏
          </h1>
        </div>

        {/* 步骤 1: 输入问题 */}
        {step === 'question' && (
          <div className="space-y-6">
            <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              请输入您的问题，塔罗牌将为您提供指引。
            </p>
            
            {/* 问题提示 */}
            <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'} border-2 ${isDarkMode ? 'border-slate-600' : 'border-slate-200'}`}>
              <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>提问建议：</h4>
              <ul className={`list-disc pl-5 space-y-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <li>尽量提出开放式问题，而非封闭式问题</li>
                <li>问题要具体，避免模糊不清</li>
                <li>关注自身，而非过度窥探他人隐私</li>
                <li>保持真诚的心态，不要为了测试而提问</li>
              </ul>
              <p className={`mt-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                例如：<span className="italic">如果我争取这次升职，我的优势和可能遇到的阻碍是什么？结果会如何发展？</span>
              </p>
            </div>
            
            <form onSubmit={handleQuestionSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  您的问题
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="请输入您的问题..."
                  className={`w-full p-4 rounded-xl border-4 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-200 text-slate-900'} focus:outline-none focus:ring-2 focus:ring-primary resize-none h-32`}
                  required
                  rows={4}
                  maxLength={200}
                />
                <p className={`text-right text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {question.length}/200
                </p>
              </div>
              <button
                type="submit"
                disabled={!question.trim()}
                className={`w-full py-3 px-6 rounded-xl font-bold text-white transition-all ${question.trim() ? 'bg-primary border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]' : 'bg-slate-500 border-4 border-slate-600 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'}`}
              >
                下一步
              </button>
            </form>
          </div>
        )}

        {/* 步骤 2: 选择牌阵 */}
        {step === 'spread' && (
          <div className="space-y-6">
            <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              请选择牌阵类型
            </p>
            <div className="grid grid-cols-2 gap-4">
              {/* 单张牌 */}
              <motion.div
                whileHover={localStorage.getItem('tarotSingleUsed') !== 'true' ? { y: -5, scale: 1.02 } : {}}
                whileTap={localStorage.getItem('tarotSingleUsed') !== 'true' ? { y: 0, scale: 0.98 } : {}}
                onClick={() => localStorage.getItem('tarotSingleUsed') !== 'true' && handleSpreadSelect('single')}
                className={`p-6 rounded-xl border-4 shadow-lg ${
                  localStorage.getItem('tarotSingleUsed') === 'true'
                    ? `${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-200 border-slate-300'} cursor-not-allowed opacity-70`
                    : `${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'} cursor-pointer`
                }`}
              >
                <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>单张牌</h3>
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  适合简单问题，提供直接的指引和洞察
                </p>
                {localStorage.getItem('tarotSingleUsed') === 'true' && (
                  <div className={`mt-4 p-2 rounded ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'} flex items-center gap-2`}>
                    <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>今天已使用</span>
                  </div>
                )}
              </motion.div>
              
              {/* 三张牌 */}
              <motion.div
                whileHover={localStorage.getItem('tarotThreeUsed') !== 'true' ? { y: -5, scale: 1.02 } : {}}
                whileTap={localStorage.getItem('tarotThreeUsed') !== 'true' ? { y: 0, scale: 0.98 } : {}}
                onClick={() => localStorage.getItem('tarotThreeUsed') !== 'true' && handleSpreadSelect('three')}
                className={`p-6 rounded-xl border-4 shadow-lg ${
                  localStorage.getItem('tarotThreeUsed') === 'true'
                    ? `${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-200 border-slate-300'} cursor-not-allowed opacity-70`
                    : `${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'} cursor-pointer`
                }`}
              >
                <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>三张牌</h3>
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  适合复杂问题，提供过去、现在、未来的全面视角
                </p>
                {localStorage.getItem('tarotThreeUsed') === 'true' && (
                  <div className={`mt-4 p-2 rounded ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'} flex items-center gap-2`}>
                    <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>今天已使用</span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}

        {/* 步骤 2: 洗牌动画 */}
        {step === 'shuffling' && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative w-32 h-44">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0, rotate: 0 }}
                  animate={{
                    y: [0, -10, 0, -5, 0],
                    rotate: [0, 5, -5, 2, 0]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  style={{ zIndex: 4 - i }}
                  className={`absolute inset-0 rounded-lg bg-indigo-900 border-4 border-slate-900 shadow-lg`}
                >
                  <div className="absolute inset-4 rounded bg-indigo-800 flex items-center justify-center">
                    <Scroll className="w-16 h-16 text-indigo-300" />
                  </div>
                </motion.div>
              ))}
            </div>
            <p className={`mt-6 text-lg font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              正在洗牌中...
            </p>
            <p className={`mt-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              请保持专注于您的问题，让能量注入牌中...
            </p>
          </div>
        )}

        {/* 步骤 3: 选择牌 */}
        {step === 'selecting' && (
          <div className="space-y-6">
            {revealedCards.length === (spreadType === 'single' ? 1 : 3) && reading && (
              <div className="space-y-4">
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  塔罗牌解读
                </h3>
                <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-50'} border-2 ${isDarkMode ? 'border-slate-600' : 'border-slate-200'}`}>
                  <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {reading}
                  </p>
                </div>
              </div>
            )}
            
            <p className={`text-center ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {spreadType === 'single' ? '请凭第一直觉选择这张牌' : `请凭第一直觉选择一张牌（已翻开 ${revealedCards.length}/3 张）`}
            </p>
            <p className={`text-center text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              不要犹豫，相信你的直觉，第一感觉往往是最准确的
            </p>
            <div className={`grid ${spreadType === 'single' ? 'grid-cols-1 justify-items-center' : 'grid-cols-3'} gap-4`}>
              {shuffledCards.slice(0, spreadType === 'single' ? 1 : 3).map((card, index) => (
                <motion.div
                  key={index}
                  whileHover={!revealedCards.includes(index) ? { y: -10, scale: 1.05 } : {}}
                  whileTap={!revealedCards.includes(index) ? { y: 0, scale: 0.95 } : {}}
                  onClick={() => !revealedCards.includes(index) && handleCardSelect(index)}
                  className={`aspect-[3/4] rounded-lg border-4 shadow-lg relative overflow-hidden ${
                    revealedCards.includes(index)
                      ? `${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-100 border-slate-300'} cursor-not-allowed`
                      : `${isDarkMode ? 'bg-indigo-900 border-slate-900' : 'bg-indigo-900 border-slate-900'} shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] cursor-pointer`
                  }`}
                >
                  {revealedCards.includes(index) ? (
                    /* 牌面 */
                    <motion.div
                      initial={{ rotateY: 180 }}
                      animate={{ rotateY: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className={`w-full h-full rounded-lg bg-gradient-to-br ${card.color} border-4 border-slate-900 shadow-lg flex flex-col items-center justify-center`}
                    >
                      <div className="text-center p-4 w-full h-full flex flex-col items-center justify-center">
                        {/* 卡牌图标 */}
                        <div className="w-20 h-20 mb-3 flex items-center justify-center">
                          {renderIcon(card.icon)}
                        </div>
                        
                        {/* 卡牌标题 */}
                        <h3 className="text-lg font-bold text-slate-800 mb-1">
                          {card.name}
                        </h3>
                        
                        {/* 卡牌含义 */}
                        <p className="text-xs font-medium text-slate-700 mb-2 text-center px-2">
                          {card.meaning}
                        </p>
                        
                        {/* 像素感装饰 */}
                        <div className="absolute top-2 left-2 w-3 h-3 bg-white/30 rounded" />
                        <div className="absolute top-2 right-2 w-3 h-3 bg-white/30 rounded" />
                        <div className="absolute bottom-2 left-2 w-3 h-3 bg-white/30 rounded" />
                        <div className="absolute bottom-2 right-2 w-3 h-3 bg-white/30 rounded" />
                      </div>
                    </motion.div>
                  ) : (
                    /* 牌背 */
                    <div className="w-full h-full bg-indigo-800 flex items-center justify-center">
                      <Scroll className="w-12 h-12 text-indigo-300" />
                      {/* 像素感装饰 */}
                      <div className="absolute top-2 left-2 w-4 h-4 bg-indigo-700 rounded" />
                      <div className="absolute top-2 right-2 w-4 h-4 bg-indigo-700 rounded" />
                      <div className="absolute bottom-2 left-2 w-4 h-4 bg-indigo-700 rounded" />
                      <div className="absolute bottom-2 right-2 w-4 h-4 bg-indigo-700 rounded" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* 步骤 4: 等待结果 */}
        {step === 'revealing' && (
          <div className="flex flex-col items-center justify-center py-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-24 h-24 mb-6 flex items-center justify-center"
            >
              <Star className="w-24 h-24 text-yellow-400" />
            </motion.div>
            <p className={`text-lg font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} mb-2`}>
              正在解读中...
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              请稍候，AI 正在为您解读塔罗牌的含义...
            </p>
          </div>
        )}

        {/* 步骤 5: AI 解读 */}
        {step === 'reading' && (
          <div className="space-y-6">
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              塔罗牌解读
            </h3>
            
            {/* 显示单张牌结果 */}
            <div className="space-y-4">
              <h4 className={`text-md font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                单张牌解读：
              </h4>
              {localStorage.getItem('tarotSingleReading') ? (
                <div className="space-y-3">
                  {/* 单张牌 */}
                  {localStorage.getItem('tarotSingleShuffledCards') && localStorage.getItem('tarotSingleCards') && (
                    <div className="grid grid-cols-1 gap-4">
                      {JSON.parse(localStorage.getItem('tarotSingleCards') || '[]').map((index: number, i: number) => {
                        const shuffledCards = JSON.parse(localStorage.getItem('tarotSingleShuffledCards') || '[]');
                        const card = shuffledCards[index];
                        return (
                          <div key={i} className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'} border-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-300'}`}>
                            <div className="flex flex-col items-center">
                              <div className={`w-16 h-16 mb-3 flex items-center justify-center rounded-full bg-gradient-to-br ${card.color}`}>
                                {renderIcon(card.icon)}
                              </div>
                              <h5 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-1`}>
                                {card.name}
                              </h5>
                              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-center`}>
                                {card.meaning}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {/* 单张牌解读 */}
                  <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-50'} border-2 ${isDarkMode ? 'border-slate-600' : 'border-slate-200'}`}>
                    <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      {localStorage.getItem('tarotSingleReading')}
                    </p>
                  </div>
                </div>
              ) : (
                <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'} border-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-300'}`}>
                  <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    您今天还没有使用单张牌功能，请返回选择牌阵。
                  </p>
                </div>
              )}
            </div>
            
            {/* 显示三张牌结果 */}
            <div className="space-y-4">
              <h4 className={`text-md font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                三张牌解读：
              </h4>
              {localStorage.getItem('tarotThreeReading') ? (
                <div className="space-y-3">
                  {/* 三张牌 */}
                  {localStorage.getItem('tarotThreeShuffledCards') && localStorage.getItem('tarotThreeCards') && (
                    <div className="grid grid-cols-3 gap-4">
                      {JSON.parse(localStorage.getItem('tarotThreeCards') || '[]').map((index: number, i: number) => {
                        const shuffledCards = JSON.parse(localStorage.getItem('tarotThreeShuffledCards') || '[]');
                        const card = shuffledCards[index];
                        const positions = ['过去', '现在', '未来'];
                        return (
                          <div key={i} className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'} border-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-300'}`}>
                            <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} mb-2`}>
                              {positions[i]}
                            </p>
                            <div className="flex flex-col items-center">
                              <div className={`w-16 h-16 mb-3 flex items-center justify-center rounded-full bg-gradient-to-br ${card.color}`}>
                                {renderIcon(card.icon)}
                              </div>
                              <h5 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-1`}>
                                {card.name}
                              </h5>
                              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-center`}>
                                {card.meaning}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {/* 三张牌解读 */}
                  <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-50'} border-2 ${isDarkMode ? 'border-slate-600' : 'border-slate-200'}`}>
                    <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      {localStorage.getItem('tarotThreeReading')}
                    </p>
                  </div>
                </div>
              ) : (
                <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'} border-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-300'}`}>
                  <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    您今天还没有使用三张牌功能，请返回选择牌阵。
                  </p>
                </div>
              )}
            </div>
            

          </div>
        )}

        {/* 步骤 6: 使用限制 */}
        {step === 'limit' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-amber-900/30' : 'bg-amber-50'} border-2 ${isDarkMode ? 'border-amber-700/50' : 'border-amber-200'}`}>
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-amber-300' : 'text-amber-800'}`}>使用限制</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-amber-200' : 'text-amber-700'}`}>
                    您今天已经使用过塔罗牌功能了。为了保持神秘感，每天只能使用一次，明天再试吧！
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={resetGame}
              className={`w-full py-3 px-6 rounded-xl font-bold ${isDarkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'} border-4 ${isDarkMode ? 'border-slate-600' : 'border-slate-300'} transition-all`}
            >
              返回
            </button>
          </div>
        )}

        {/* 小贴士 */}
        <div className={`mt-6 p-4 rounded-xl ${isDarkMode ? 'bg-amber-900/30 border-amber-700/50' : 'bg-amber-50 border-amber-200'} border-2`}>
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className={`font-bold mb-1 ${isDarkMode ? 'text-amber-300' : 'text-amber-800'}`}>小贴士</h4>
              <p className={`text-sm ${isDarkMode ? 'text-amber-200' : 'text-amber-700'}`}>
                塔罗牌是一种象征性的工具，其解读应该作为参考，而不是绝对的预言。保持开放的心态，相信自己的直觉。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarotGame;