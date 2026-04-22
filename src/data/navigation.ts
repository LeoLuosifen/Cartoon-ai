export interface NavItem {
  name: string;
  url: string;
  description: string;
  icon?: string;
}

export interface NavCategory {
  id: string;
  name: string;
  items: NavItem[];
}

export const navigationData: NavCategory[] = [
  {
    id: 'ai',
    name: 'AI',
    items: [
      { name: 'ChatGPT', url: 'https://chat.openai.com', description: 'OpenAI的对话AI', icon: 'https://icons.duckduckgo.com/ip3/chat.openai.com.ico' },
      { name: 'Claude', url: 'https://claude.ai', description: 'Anthropic的AI助手', icon: 'https://icons.duckduckgo.com/ip3/claude.ai.ico' },
      { name: 'Gemini', url: 'https://gemini.google.com', description: 'Google的AI模型', icon: 'https://icons.duckduckgo.com/ip3/gemini.google.com.ico' },
      { name: 'Perplexity', url: 'https://perplexity.ai', description: 'AI搜索引擎', icon: 'https://icons.duckduckgo.com/ip3/perplexity.ai.ico' },
      { name: 'Midjourney', url: 'https://www.midjourney.com', description: 'AI图像生成', icon: 'https://icons.duckduckgo.com/ip3/midjourney.com.ico' },
      { name: 'Stable Diffusion', url: 'https://stability.ai', description: '开源AI图像生成', icon: 'https://icons.duckduckgo.com/ip3/stability.ai.ico' },
      { name: 'Copilot', url: 'https://github.com/features/copilot', description: 'GitHub的AI编程助手', icon: 'https://icons.duckduckgo.com/ip3/github.com.ico' },
      { name: '文心一言', url: 'https://yiyan.baidu.com', description: '百度AI对话助手', icon: 'https://icons.duckduckgo.com/ip3/yiyan.baidu.com.ico' },
      { name: '通义千问', url: 'https://tongyi.aliyun.com', description: '阿里云AI对话助手', icon: '/svg/qianwen.svg' },
      { name: '讯飞星火', url: 'https://xinghuo.xfyun.cn', description: '讯飞AI对话助手', icon: 'https://icons.duckduckgo.com/ip3/xinghuo.xfyun.cn.ico' },
      { name: 'Kimi', url: 'https://kimi.moonshot.cn', description: '月之暗面AI助手', icon: 'https://icons.duckduckgo.com/ip3/kimi.moonshot.cn.ico' },
      { name: 'DeepSeek', url: 'https://www.deepseek.com', description: '深度求索AI助手', icon: 'https://icons.duckduckgo.com/ip3/deepseek.com.ico' },
      { name: '豆包', url: 'https://www.doubao.com', description: '字节跳动AI助手', icon: 'https://icons.duckduckgo.com/ip3/doubao.com.ico' },
      { name: '智谱GLM', url: 'https://chatglm.cn', description: '智谱AI对话助手', icon: 'https://icons.duckduckgo.com/ip3/chatglm.cn.ico' },
      { name: 'MiniMax', url: 'https://www.minimax.chat', description: 'MiniMax AI助手', icon: '/svg/MiniMax.svg' }
    ]
  },
  {
    id: 'programming',
    name: '编程',
    items: [
      { name: 'GitHub', url: 'https://github.com', description: '代码托管平台', icon: 'https://icons.duckduckgo.com/ip3/github.com.ico' },
      { name: 'Stack Overflow', url: 'https://stackoverflow.com', description: '编程问答平台', icon: 'https://icons.duckduckgo.com/ip3/stackoverflow.com.ico' },
      { name: 'LeetCode', url: 'https://leetcode.com', description: '编程刷题平台', icon: '/svg/leetcode.svg' },
      { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', description: 'Web开发文档', icon: 'https://icons.duckduckgo.com/ip3/developer.mozilla.org.ico' },
      { name: 'Python', url: 'https://www.python.org', description: 'Python官方网站', icon: '/svg/python.svg' },
      { name: 'TypeScript', url: 'https://www.typescriptlang.org', description: 'TypeScript官方网站', icon: 'https://icons.duckduckgo.com/ip3/typescriptlang.org.ico' },
      { name: 'React', url: 'https://react.dev', description: 'React官方网站', icon: 'https://icons.duckduckgo.com/ip3/react.dev.ico' },
      { name: 'Vue', url: 'https://vuejs.org', description: 'Vue官方网站', icon: '/svg/Vue.svg' },
      { name: 'Java', url: 'https://www.oracle.com/java', description: 'Java官方网站', icon: 'https://icons.duckduckgo.com/ip3/oracle.com.ico' },
      { name: 'HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', description: 'HTML官方文档', icon: '/svg/html.svg' },
      { name: 'CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', description: 'CSS官方文档', icon: '/svg/css.svg' },
      { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', description: 'JavaScript官方文档', icon: '/svg/js.svg' },
      { name: 'MySQL', url: 'https://www.mysql.com', description: 'MySQL官方网站', icon: 'https://icons.duckduckgo.com/ip3/mysql.com.ico' }
    ]
  },
  {
    id: 'email',
    name: '邮箱',
    items: [
      { name: 'Gmail', url: 'https://mail.google.com', description: 'Google邮箱', icon: 'https://icons.duckduckgo.com/ip3/mail.google.com.ico' },
      { name: 'Outlook', url: 'https://outlook.live.com', description: 'Microsoft邮箱', icon: 'https://icons.duckduckgo.com/ip3/outlook.live.com.ico' },
      { name: 'QQ邮箱', url: 'https://mail.qq.com', description: '腾讯QQ邮箱', icon: '/svg/QQ.svg' },
      { name: '163邮箱', url: 'https://mail.163.com', description: '网易163邮箱', icon: 'https://icons.duckduckgo.com/ip3/mail.163.com.ico' },
    ]
  },
  {
    id: 'community',
    name: '社区',
    items: [
      { name: 'Reddit', url: 'https://www.reddit.com', description: '全球最大社区平台', icon: 'https://icons.duckduckgo.com/ip3/reddit.com.ico' },
      { name: 'GitHub Discussions', url: 'https://github.com/discussions', description: 'GitHub社区讨论', icon: 'https://icons.duckduckgo.com/ip3/github.com.ico' },
      { name: 'V2EX', url: 'https://www.v2ex.com', description: '中文技术社区', icon: '/svg/v2ex.svg' },
      { name: '知乎', url: 'https://www.zhihu.com', description: '中文问答社区', icon: '/svg/zhihu.svg' },
      { name: '掘金', url: 'https://juejin.cn', description: '中文技术社区', icon: '/svg/juejin.svg' },
      { name: 'SegmentFault', url: 'https://segmentfault.com', description: '中文编程社区', icon: '/svg/sf.svg' },
      { name: 'Stack Exchange', url: 'https://stackexchange.com', description: '问答社区网络', icon: 'https://icons.duckduckgo.com/ip3/stackexchange.com.ico' },
      { name: 'Product Hunt', url: 'https://www.producthunt.com', description: '产品分享社区', icon: 'https://icons.duckduckgo.com/ip3/producthunt.com.ico' }
    ]
  },
  {
    id: 'images',
    name: '图片',
    items: [
      { name: 'Unsplash', url: 'https://unsplash.com', description: '免费高清图片', icon: 'https://icons.duckduckgo.com/ip3/unsplash.com.ico' },
      { name: 'Pexels', url: 'https://www.pexels.com', description: '免费图片素材', icon: 'https://icons.duckduckgo.com/ip3/pexels.com.ico' },
      { name: 'Pixabay', url: 'https://pixabay.com', description: '免费图片和视频', icon: '/svg/pixabay.svg' },
      { name: 'Freepik', url: 'https://www.freepik.com', description: '免费矢量图和图片', icon: 'https://icons.duckduckgo.com/ip3/freepik.com.ico' },
      { name: 'Canva', url: 'https://www.canva.com', description: '在线设计工具', icon: 'https://icons.duckduckgo.com/ip3/canva.com.ico' },
      { name: 'Figma', url: 'https://www.figma.com', description: '协作设计工具', icon: 'https://icons.duckduckgo.com/ip3/figma.com.ico' },
      { name: 'Dribbble', url: 'https://dribbble.com', description: '设计作品分享平台', icon: 'https://icons.duckduckgo.com/ip3/dribbble.com.ico' },
      { name: 'Behance', url: 'https://www.behance.net', description: '创意作品展示平台', icon: 'https://icons.duckduckgo.com/ip3/behance.net.ico' }
    ]
  },
  {
    id: 'fun',
    name: '摸鱼',
    items: [
      { name: 'Bilibili', url: 'https://www.bilibili.com', description: '弹幕视频网站', icon: 'https://icons.duckduckgo.com/ip3/bilibili.com.ico' },
      { name: 'YouTube', url: 'https://www.youtube.com', description: '视频分享平台', icon: 'https://icons.duckduckgo.com/ip3/youtube.com.ico' },
      { name: 'Netflix', url: 'https://www.netflix.com', description: '流媒体视频服务', icon: '/svg/netflix.svg' },
      { name: 'Spotify', url: 'https://www.spotify.com', description: '音乐流媒体服务', icon: 'https://icons.duckduckgo.com/ip3/spotify.com.ico' },
      { name: 'Twitch', url: 'https://www.twitch.tv', description: '游戏直播平台', icon: '/svg/twitch.svg' },
      { name: 'Steam', url: 'https://store.steampowered.com', description: '游戏分发平台', icon: 'https://icons.duckduckgo.com/ip3/store.steampowered.com.ico' },
      { name: 'Awwwards', url: 'https://www.awwwards.com', description: '优秀网页设计展示', icon: 'https://icons.duckduckgo.com/ip3/awwwards.com.ico' },
      { name: 'Coolors', url: 'https://coolors.co', description: '颜色方案生成器', icon: 'svg/coolors.svg' }
    ]
  },
  {
    id: 'social',
    name: '自媒体',
    items: [
      { name: '微信公众平台', url: 'https://mp.weixin.qq.com', description: '微信公众号管理', icon: 'https://icons.duckduckgo.com/ip3/mp.weixin.qq.com.ico' },
      { name: '微博', url: 'https://weibo.com', description: '新浪微博', icon: 'https://icons.duckduckgo.com/ip3/weibo.com.ico' },
      { name: '抖音', url: 'https://www.douyin.com', description: '短视频平台', icon: '/svg/douyin.svg' },
      { name: '小红书', url: 'https://www.xiaohongshu.com', description: '生活方式分享平台', icon: 'https://icons.duckduckgo.com/ip3/xiaohongshu.com.ico' },
      { name: 'Medium', url: 'https://medium.com', description: '写作平台', icon: 'https://icons.duckduckgo.com/ip3/medium.com.ico' },
      { name: 'Substack', url: 'https://substack.com', description: '电子邮件通讯平台', icon: '/svg/substack.svg' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com', description: '职业社交平台', icon: 'https://icons.duckduckgo.com/ip3/linkedin.com.ico' },
      { name: 'Twitter', url: 'https://x.com', description: '社交媒体平台', icon: 'https://icons.duckduckgo.com/ip3/x.com.ico' }
    ]
  }
];
