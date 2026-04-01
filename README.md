# 卡通工具站

## 项目介绍

卡通工具站是一个基于 AI 的多功能工具平台，提供各种有趣的卡通风格 AI 工具。目前已实现神秘运势生成器和点名功能，未来将持续添加更多创意工具，为用户带来丰富的交互体验。

## 功能特性

- **神秘运势生成器**：通过 AI 生成个性化的运势预测
- **点名功能**：随机选择名字的工具
- **Python 基础知识**：交互式 Python 学习教程，包含动画展示
- **AI 聊天助手**：内置浮动聊天窗口，随时解答问题
- **响应式设计**：适配不同屏幕尺寸
- **动画效果**：流畅的视觉体验
- **可扩展架构**：为未来功能扩展预留接口

## 技术栈

- **前端框架**：React 19.0.0 + TypeScript
- **构建工具**：Vite
- **样式方案**：Tailwind CSS 4.1.14
- **UI 组件**：Ant Design 6.3.3
- **动画库**：Framer Motion 12.38.0
- **图标库**：Lucide React 0.546.0
- **日期处理**：dayjs 1.11.20
- **AI 服务**：DeepSeek API
- **其他**：Google GenAI、dotenv

## 项目结构

```
Cartoon-ai/
├── public/
│   └── img/
│       └── Crystal_Ball.ico
├── src/
│   ├── components/
│   │   ├── FloatingChat.tsx
│   │   ├── FortuneGenerator.tsx
│   │   ├── NamePicker.tsx
│   │   ├── PythonBasics.tsx
│   │   └── Navbar.tsx
│   ├── services/
│   │   └── ai.ts
│   ├── utils/
│   │   └── cn.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitattributes
├── .gitignore
├── LICENSE
├── README.md
├── index.html
├── metadata.json
├── package-lock.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 快速开始

### 前提条件

- Node.js 18+
- DeepSeek API Key（[获取 API Key](https://platform.deepseek.com/)）

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd Cartoon-ai
   ```
2. **安装依赖**
   ```bash
   npm install
   ```
3. **配置环境变量**

   在项目根目录创建 `.env.local` 文件，并添加以下内容：
   ```env
   VITE_DEEPSEEK_API_KEY=your_deepseek_api_key
   ```
   替换 `your_deepseek_api_key` 为你的 DeepSeek API Key。
4. **启动开发服务器**
   ```bash
   npm run dev
   ```
   项目将在 `http://localhost:3000` 启动。

## 生产构建

1. **构建项目**
   ```bash
   npm run build
   ```
2. **预览构建结果**
   ```bash
   npm run preview
   ```

## 如何使用

### 神秘运势生成器

- 选择运势类型，点击生成按钮获取 AI 生成的运势预测
- 查看运势详情和历史记录

### 点名功能

- 使用随机点名工具选择名字

### 聊天助手

- 点击右下角的聊天图标，与 AI 助手进行对话

### Python 基础知识

- 选择左侧导航菜单中的 Python 基础知识
- 浏览不同的 Python 概念，包括变量、数据类型、条件控制、循环、函数、运算符、数据结构和面向对象编程
- 查看每个概念的可视化动画展示和代码示例

## 功能说明

### 运势生成

- 系统会调用 DeepSeek API 生成个性化的运势内容
- 生成的运势会被缓存，相同类型的运势在同一天内不会重复生成
- 每次生成后会有 5 秒的冷却时间，防止频繁请求

### 点名功能

- 随机选择名字的工具，适用于各种需要随机选择的场景

### 聊天助手

- 内置 AI 聊天助手，可以回答问题并提供帮助

## 注意事项

- 本项目目前使用 DeepSeek API，需要有效的 API Key
- 运势预测仅供娱乐，请勿当真
- 频繁调用 API 可能会产生费用，请合理使用

## 许可证

[MIT License](LICENSE)

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

- 项目地址：<https://cartoon.us.ci/>
- 如有问题，请在 GitHub 仓库提交 Issue 或者邮箱联系

