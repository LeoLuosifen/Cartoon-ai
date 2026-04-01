interface TarotCard {
  id: number;
  name: string;
  meaning: string;
  icon: string;
  color: string;
  description: string;
  type: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  number?: string;
}

// 大阿卡纳牌
const majorArcana: TarotCard[] = [
  {
    id: 1,
    name: '愚人',
    meaning: '新的开始和冒险',
    icon: 'Star',
    color: 'from-yellow-200 to-yellow-400',
    description: '代表新的开始、冒险和无忧无虑的精神。',
    type: 'major',

  },
  {
    id: 2,
    name: '魔术师',
    meaning: '创造力和技巧',
    icon: 'Wand',
    color: 'from-red-200 to-red-400',
    description: '象征着创造力、技巧和意志力。',
    type: 'major',

  },
  {
    id: 3,
    name: '女祭司',
    meaning: '直觉和潜意识',
    icon: 'Moon',
    color: 'from-indigo-200 to-indigo-400',
    description: '代表直觉、潜意识和神秘的智慧。',
    type: 'major',

  },
  {
    id: 4,
    name: '皇后',
    meaning: '丰饶和母性',
    icon: 'Heart',
    color: 'from-green-200 to-green-400',
    description: '象征着丰饶、母性和创造力。',
    type: 'major',

  },
  {
    id: 5,
    name: '皇帝',
    meaning: '权威和结构',
    icon: 'Shield',
    color: 'from-purple-200 to-purple-400',
    description: '代表权威、结构和领导力。',
    type: 'major',

  },
  {
    id: 6,
    name: '教皇',
    meaning: '传统和信仰',
    icon: 'Star',
    color: 'from-yellow-200 to-yellow-400',
    description: '象征着传统、信仰和精神指导。',
    type: 'major',

  },
  {
    id: 7,
    name: '恋人',
    meaning: '关系和选择',
    icon: 'Heart',
    color: 'from-red-200 to-red-400',
    description: '象征着关系、爱情和重要的选择。',
    type: 'major',

  },
  {
    id: 8,
    name: '战车',
    meaning: '胜利和控制',
    icon: 'Shield',
    color: 'from-orange-200 to-orange-400',
    description: '代表胜利、控制和意志力。',
    type: 'major',

  },
  {
    id: 9,
    name: '力量',
    meaning: '勇气和意志力',
    icon: 'Shield',
    color: 'from-purple-200 to-purple-400',
    description: '代表内在的力量、勇气和意志力。',
    type: 'major',

  },
  {
    id: 10,
    name: '隐士',
    meaning: '内省和智慧',
    icon: 'Wand',
    color: 'from-green-200 to-green-400',
    description: '象征着内省、智慧和寻求真理。',
    type: 'major',

  },
  {
    id: 11,
    name: '命运之轮',
    meaning: '命运和变化',
    icon: 'Star',
    color: 'from-yellow-200 to-yellow-400',
    description: '代表命运的转变和新的开始，暗示着机遇和变化。',
    type: 'major',

  },
  {
    id: 12,
    name: '正义',
    meaning: '公正和平衡',
    icon: 'Sword',
    color: 'from-blue-200 to-blue-400',
    description: '象征着公正、平衡和道德。',
    type: 'major',

  },
  {
    id: 13,
    name: '倒吊人',
    meaning: '牺牲和视角',
    icon: 'Wand',
    color: 'from-green-200 to-green-400',
    description: '代表牺牲、视角和新的理解。',
    type: 'major',

  },
  {
    id: 14,
    name: '死神',
    meaning: '结束和转变',
    icon: 'Sword',
    color: 'from-gray-200 to-gray-400',
    description: '象征着结束、转变和新的开始。',
    type: 'major',

  },
  {
    id: 15,
    name: '节制',
    meaning: '平衡和调和',
    icon: 'Coffee',
    color: 'from-blue-200 to-blue-400',
    description: '代表平衡、调和和自我控制。',
    type: 'major',

  },
  {
    id: 16,
    name: '魔鬼',
    meaning: '诱惑和束缚',
    icon: 'Shield',
    color: 'from-purple-200 to-purple-400',
    description: '象征着诱惑、束缚和物质欲望。',
    type: 'major',

  },
  {
    id: 17,
    name: '高塔',
    meaning: '突然的变化',
    icon: 'Sword',
    color: 'from-orange-200 to-orange-400',
    description: '代表突然的变化、破坏和觉醒。',
    type: 'major',

  },
  {
    id: 18,
    name: '星星',
    meaning: '希望和灵感',
    icon: 'Star',
    color: 'from-indigo-200 to-indigo-400',
    description: '象征着希望、灵感和精神指引。',
    type: 'major',

  },
  {
    id: 19,
    name: '月亮',
    meaning: '直觉和潜意识',
    icon: 'Moon',
    color: 'from-indigo-200 to-indigo-400',
    description: '代表直觉、潜意识和情感的深度。',
    type: 'major',

  },
  {
    id: 20,
    name: '太阳',
    meaning: '成功和幸福',
    icon: 'Sun',
    color: 'from-orange-200 to-orange-400',
    description: '象征着成功、幸福和充满活力的未来。',
    type: 'major',

  },
  {
    id: 21,
    name: '审判',
    meaning: '重生和觉醒',
    icon: 'Sword',
    color: 'from-blue-200 to-blue-400',
    description: '代表重生、觉醒和精神成长。',
    type: 'major',

  },
  {
    id: 22,
    name: '世界',
    meaning: '完成和实现',
    icon: 'Star',
    color: 'from-green-200 to-green-400',
    description: '象征着完成、实现和整体。',
    type: 'major',

  }
];

// 小阿卡纳牌 - 权杖
const wands: TarotCard[] = [
  {
    id: 23,
    name: '权杖 Ace',
    meaning: '新的行动和创造力',
    icon: 'Wand',
    color: 'from-red-200 to-red-400',
    description: '代表新的开始、创造力和行动力。',
    type: 'minor',
    suit: 'wands',
    number: 'Ace',

  },
  {
    id: 24,
    name: '权杖 2',
    meaning: '平衡和计划',
    icon: 'Wand',
    color: 'from-red-200 to-red-400',
    description: '象征着平衡、计划和决策。',
    type: 'minor',
    suit: 'wands',
    number: '2',

  },
  {
    id: 25,
    name: '权杖 3',
    meaning: '远见和规划',
    icon: 'Wand',
    color: 'from-red-200 to-red-400',
    description: '代表远见、规划和团队合作。',
    type: 'minor',
    suit: 'wands',
    number: '3',

  },
  {
    id: 26,
    name: '权杖 4',
    meaning: '稳定和庆祝',
    icon: 'Wand',
    color: 'from-red-200 to-red-400',
    description: '象征着稳定、庆祝和家庭。',
    type: 'minor',
    suit: 'wands',
    number: '4',

  },
  {
    id: 27,
    name: '权杖 5',
    meaning: '冲突和竞争',
    icon: 'Wand',
    color: 'from-red-200 to-red-400',
    description: '代表冲突、竞争和挑战。',
    type: 'minor',
    suit: 'wands',
    number: '5',

  },
  {
    id: 28,
    name: '权杖 6',
    meaning: '胜利和成功',
    icon: 'Wand',
    color: 'from-red-200 to-red-400',
    description: '象征着胜利、成功和认可。',
    type: 'minor',
    suit: 'wands',
    number: '6',

  },
  {
    id: 29,
    name: '权杖 7',
    meaning: '勇气和坚持',
    icon: 'Wand',
    color: 'from-red-200 to-red-400',
    description: '代表勇气、坚持和防御。',
    type: 'minor',
    suit: 'wands',
    number: '7',

  },
  {
    id: 30,
    name: '权杖 8',
    meaning: '行动和速度',
    icon: 'Wand',
    color: 'from-red-200 to-red-400',
    description: '象征着行动、速度和进展。',
    type: 'minor',
    suit: 'wands',
    number: '8',

  },
  {
    id: 31,
    name: '权杖 9',
    meaning: '警惕和防御',
    icon: 'Wand',
    color: 'from-red-200 to-red-400',
    description: '代表警惕、防御和准备。',
    type: 'minor',
    suit: 'wands',
    number: '9',

  },
  {
    id: 32,
    name: '权杖 10',
    meaning: '负担和责任',
    icon: 'Wand',
    color: 'from-red-200 to-red-400',
    description: '象征着负担、责任和压力。',
    type: 'minor',
    suit: 'wands',
    number: '10',

  },
  {
    id: 33,
    name: '权杖侍从',
    meaning: '创意和探索',
    icon: 'Wand',
    color: 'from-red-200 to-red-400',
    description: '代表创意、探索和新的想法。',
    type: 'minor',
    suit: 'wands',
    number: 'Page',

  },
  {
    id: 34,
    name: '权杖骑士',
    meaning: '行动和冒险',
    icon: 'Wand',
    color: 'from-red-200 to-red-400',
    description: '象征着行动、冒险和热情。',
    type: 'minor',
    suit: 'wands',
    number: 'Knight',

  },
  {
    id: 35,
    name: '权杖皇后',
    meaning: '领导力和创造力',
    icon: 'Wand',
    color: 'from-red-200 to-red-400',
    description: '代表领导力、创造力和热情。',
    type: 'minor',
    suit: 'wands',
    number: 'Queen',

  },
  {
    id: 36,
    name: '权杖国王',
    meaning: '权威和稳定',
    icon: 'Wand',
    color: 'from-red-200 to-red-400',
    description: '象征着权威、稳定和领导力。',
    type: 'minor',
    suit: 'wands',
    number: 'King',

  }
];

// 小阿卡纳牌 - 圣杯
const cups: TarotCard[] = [
  {
    id: 37,
    name: '圣杯 Ace',
    meaning: '新的情感和关系',
    icon: 'Cup',
    color: 'from-blue-200 to-blue-400',
    description: '代表新的情感开始、爱和关系。',
    type: 'minor',
    suit: 'cups',
    number: 'Ace',

  },
  {
    id: 38,
    name: '圣杯 2',
    meaning: '合作和平衡',
    icon: 'Cup',
    color: 'from-blue-200 to-blue-400',
    description: '象征着合作、平衡和和谐的关系。',
    type: 'minor',
    suit: 'cups',
    number: '2',

  },
  {
    id: 39,
    name: '圣杯 3',
    meaning: '庆祝和友谊',
    icon: 'Cup',
    color: 'from-blue-200 to-blue-400',
    description: '代表庆祝、友谊和社交。',
    type: 'minor',
    suit: 'cups',
    number: '3',

  },
  {
    id: 40,
    name: '圣杯 4',
    meaning: '不满和选择',
    icon: 'Cup',
    color: 'from-blue-200 to-blue-400',
    description: '象征着不满、选择和冷漠。',
    type: 'minor',
    suit: 'cups',
    number: '4',

  },
  {
    id: 41,
    name: '圣杯 5',
    meaning: '失落和悲伤',
    icon: 'Cup',
    color: 'from-blue-200 to-blue-400',
    description: '代表失落、悲伤和遗憾。',
    type: 'minor',
    suit: 'cups',
    number: '5',

  },
  {
    id: 42,
    name: '圣杯 6',
    meaning: '慷慨和礼物',
    icon: 'Cup',
    color: 'from-blue-200 to-blue-400',
    description: '象征着慷慨、礼物和互助。',
    type: 'minor',
    suit: 'cups',
    number: '6',

  },
  {
    id: 43,
    name: '圣杯 7',
    meaning: '梦想和幻象',
    icon: 'Cup',
    color: 'from-blue-200 to-blue-400',
    description: '代表梦想、幻象和选择。',
    type: 'minor',
    suit: 'cups',
    number: '7',

  },
  {
    id: 44,
    name: '圣杯 8',
    meaning: '离开和寻找',
    icon: 'Cup',
    color: 'from-blue-200 to-blue-400',
    description: '象征着离开、寻找和新的开始。',
    type: 'minor',
    suit: 'cups',
    number: '8',

  },
  {
    id: 45,
    name: '圣杯 9',
    meaning: '满足和幸福',
    icon: 'Cup',
    color: 'from-blue-200 to-blue-400',
    description: '代表满足、幸福和情感的丰富。',
    type: 'minor',
    suit: 'cups',
    number: '9',

  },
  {
    id: 46,
    name: '圣杯 10',
    meaning: '家庭和和谐',
    icon: 'Cup',
    color: 'from-blue-200 to-blue-400',
    description: '象征着家庭、和谐和情感的满足。',
    type: 'minor',
    suit: 'cups',
    number: '10',

  },
  {
    id: 47,
    name: '圣杯侍从',
    meaning: '情感和直觉',
    icon: 'Cup',
    color: 'from-blue-200 to-blue-400',
    description: '代表情感、直觉和敏感。',
    type: 'minor',
    suit: 'cups',
    number: 'Page',

  },
  {
    id: 48,
    name: '圣杯骑士',
    meaning: '浪漫和追求',
    icon: 'Cup',
    color: 'from-blue-200 to-blue-400',
    description: '象征着浪漫、追求和情感的表达。',
    type: 'minor',
    suit: 'cups',
    number: 'Knight',

  },
  {
    id: 49,
    name: '圣杯皇后',
    meaning: '爱和关怀',
    icon: 'Cup',
    color: 'from-blue-200 to-blue-400',
    description: '代表爱、关怀和情感的滋养。',
    type: 'minor',
    suit: 'cups',
    number: 'Queen',

  },
  {
    id: 50,
    name: '圣杯国王',
    meaning: '情感的稳定和成熟',
    icon: 'Cup',
    color: 'from-blue-200 to-blue-400',
    description: '象征着情感的稳定、成熟和领导力。',
    type: 'minor',
    suit: 'cups',
    number: 'King',

  }
];

// 小阿卡纳牌 - 宝剑
const swords: TarotCard[] = [
  {
    id: 51,
    name: '宝剑 Ace',
    meaning: '新的思想和清晰',
    icon: 'Sword',
    color: 'from-gray-200 to-gray-400',
    description: '代表新的思想、清晰的思路和决策。',
    type: 'minor',
    suit: 'swords',
    number: 'Ace',

  },
  {
    id: 52,
    name: '宝剑 2',
    meaning: '平衡和选择',
    icon: 'Sword',
    color: 'from-gray-200 to-gray-400',
    description: '象征着平衡、选择和决策的需要。',
    type: 'minor',
    suit: 'swords',
    number: '2',

  },
  {
    id: 53,
    name: '宝剑 3',
    meaning: '悲伤和痛苦',
    icon: 'Sword',
    color: 'from-gray-200 to-gray-400',
    description: '代表悲伤、痛苦和心碎。',
    type: 'minor',
    suit: 'swords',
    number: '3',

  },
  {
    id: 54,
    name: '宝剑 4',
    meaning: '休息和恢复',
    icon: 'Sword',
    color: 'from-gray-200 to-gray-400',
    description: '象征着休息、恢复和冥想。',
    type: 'minor',
    suit: 'swords',
    number: '4',

  },
  {
    id: 55,
    name: '宝剑 5',
    meaning: '冲突和胜利',
    icon: 'Sword',
    color: 'from-gray-200 to-gray-400',
    description: '代表冲突、胜利和竞争。',
    type: 'minor',
    suit: 'swords',
    number: '5',

  },
  {
    id: 56,
    name: '宝剑 6',
    meaning: '平静和过渡',
    icon: 'Sword',
    color: 'from-gray-200 to-gray-400',
    description: '象征着平静、过渡和离开。',
    type: 'minor',
    suit: 'swords',
    number: '6',

  },
  {
    id: 57,
    name: '宝剑 7',
    meaning: '策略和欺骗',
    icon: 'Sword',
    color: 'from-gray-200 to-gray-400',
    description: '代表策略、欺骗和机智。',
    type: 'minor',
    suit: 'swords',
    number: '7',

  },
  {
    id: 58,
    name: '宝剑 8',
    meaning: '限制和监禁',
    icon: 'Sword',
    color: 'from-gray-200 to-gray-400',
    description: '象征着限制、监禁和困境。',
    type: 'minor',
    suit: 'swords',
    number: '8',

  },
  {
    id: 59,
    name: '宝剑 9',
    meaning: '焦虑和恐惧',
    icon: 'Sword',
    color: 'from-gray-200 to-gray-400',
    description: '代表焦虑、恐惧和失眠。',
    type: 'minor',
    suit: 'swords',
    number: '9',

  },
  {
    id: 60,
    name: '宝剑 10',
    meaning: '痛苦和结束',
    icon: 'Sword',
    color: 'from-gray-200 to-gray-400',
    description: '象征着痛苦、结束和新的开始。',
    type: 'minor',
    suit: 'swords',
    number: '10',

  },
  {
    id: 61,
    name: '宝剑侍从',
    meaning: '消息和好奇心',
    icon: 'Sword',
    color: 'from-gray-200 to-gray-400',
    description: '代表消息、好奇心和学习。',
    type: 'minor',
    suit: 'swords',
    number: 'Page',

  },
  {
    id: 62,
    name: '宝剑骑士',
    meaning: '行动和沟通',
    icon: 'Sword',
    color: 'from-gray-200 to-gray-400',
    description: '象征着行动、沟通和快速的思维。',
    type: 'minor',
    suit: 'swords',
    number: 'Knight',

  },
  {
    id: 63,
    name: '宝剑皇后',
    meaning: '智慧和清晰',
    icon: 'Sword',
    color: 'from-gray-200 to-gray-400',
    description: '代表智慧、清晰和洞察力。',
    type: 'minor',
    suit: 'swords',
    number: 'Queen',

  },
  {
    id: 64,
    name: '宝剑国王',
    meaning: '权威和逻辑',
    icon: 'Sword',
    color: 'from-gray-200 to-gray-400',
    description: '象征着权威、逻辑和领导力。',
    type: 'minor',
    suit: 'swords',
    number: 'King',

  }
];

// 小阿卡纳牌 - 星币
const pentacles: TarotCard[] = [
  {
    id: 65,
    name: '星币 Ace',
    meaning: '新的财富和机会',
    icon: 'Coins',
    color: 'from-yellow-200 to-yellow-400',
    description: '代表新的财富机会、物质成功和稳定。',
    type: 'minor',
    suit: 'pentacles',
    number: 'Ace',

  },
  {
    id: 66,
    name: '星币 2',
    meaning: '平衡和管理',
    icon: 'Coins',
    color: 'from-yellow-200 to-yellow-400',
    description: '象征着平衡、管理和资源的分配。',
    type: 'minor',
    suit: 'pentacles',
    number: '2',

  },
  {
    id: 67,
    name: '星币 3',
    meaning: '合作和技能',
    icon: 'Coins',
    color: 'from-yellow-200 to-yellow-400',
    description: '代表合作、技能和工艺。',
    type: 'minor',
    suit: 'pentacles',
    number: '3',

  },
  {
    id: 68,
    name: '星币 4',
    meaning: '稳定和安全',
    icon: 'Coins',
    color: 'from-yellow-200 to-yellow-400',
    description: '象征着稳定、安全和占有。',
    type: 'minor',
    suit: 'pentacles',
    number: '4',

  },
  {
    id: 69,
    name: '星币 5',
    meaning: '贫困和困难',
    icon: 'Coins',
    color: 'from-yellow-200 to-yellow-400',
    description: '代表贫困、困难和财务挑战。',
    type: 'minor',
    suit: 'pentacles',
    number: '5',

  },
  {
    id: 70,
    name: '星币 6',
    meaning: '慈善和分享',
    icon: 'Coins',
    color: 'from-yellow-200 to-yellow-400',
    description: '象征着慈善、分享和平衡的给予。',
    type: 'minor',
    suit: 'pentacles',
    number: '6',

  },
  {
    id: 71,
    name: '星币 7',
    meaning: '勤奋和耐心',
    icon: 'Coins',
    color: 'from-yellow-200 to-yellow-400',
    description: '代表勤奋、耐心和投资。',
    type: 'minor',
    suit: 'pentacles',
    number: '7',

  },
  {
    id: 72,
    name: '星币 8',
    meaning: '技能和专注',
    icon: 'Coins',
    color: 'from-yellow-200 to-yellow-400',
    description: '象征着技能、专注和工艺。',
    type: 'minor',
    suit: 'pentacles',
    number: '8',

  },
  {
    id: 73,
    name: '星币 9',
    meaning: '成功和富足',
    icon: 'Coins',
    color: 'from-yellow-200 to-yellow-400',
    description: '代表成功、富足和物质的满足。',
    type: 'minor',
    suit: 'pentacles',
    number: '9',

  },
  {
    id: 74,
    name: '星币 10',
    meaning: '财富和传承',
    icon: 'Coins',
    color: 'from-yellow-200 to-yellow-400',
    description: '象征着财富、传承和家庭的稳定。',
    type: 'minor',
    suit: 'pentacles',
    number: '10',

  },
  {
    id: 75,
    name: '星币侍从',
    meaning: '学习和技能',
    icon: 'Coins',
    color: 'from-yellow-200 to-yellow-400',
    description: '代表学习、技能和新的开始。',
    type: 'minor',
    suit: 'pentacles',
    number: 'Page',

  },
  {
    id: 76,
    name: '星币骑士',
    meaning: '努力和实用',
    icon: 'Coins',
    color: 'from-yellow-200 to-yellow-400',
    description: '象征着努力、实用和责任。',
    type: 'minor',
    suit: 'pentacles',
    number: 'Knight',

  },
  {
    id: 77,
    name: '星币皇后',
    meaning: '富足和慷慨',
    icon: 'Coins',
    color: 'from-yellow-200 to-yellow-400',
    description: '代表富足、慷慨和母性的关怀。',
    type: 'minor',
    suit: 'pentacles',
    number: 'Queen',

  },
  {
    id: 78,
    name: '星币国王',
    meaning: '成功和稳定',
    icon: 'Coins',
    color: 'from-yellow-200 to-yellow-400',
    description: '象征着成功、稳定和领导力。',
    type: 'minor',
    suit: 'pentacles',
    number: 'King',

  }
];

// 合并所有牌
const tarotCards: TarotCard[] = [
  ...majorArcana,
  ...wands,
  ...cups,
  ...swords,
  ...pentacles
];

export default tarotCards;
export type { TarotCard };