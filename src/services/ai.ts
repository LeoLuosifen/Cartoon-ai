type DeepSeekRole = "system" | "user" | "assistant";

type DeepSeekMessage = {
  role: DeepSeekRole;
  content: string;
};

type DeepSeekChatCompletionResponse = {
  choices?: Array<{
    message?: { role?: DeepSeekRole; content?: string };
  }>;
  error?: { message?: string };
};

const DEFAULT_BASE_URL = "https://api.deepseek.com";
const DEFAULT_MODEL = "deepseek-chat";

function getDeepSeekApiKey(): string | undefined {
  // 优先从 Vite 环境变量获取（前端标准方式）
  const viteKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
  if (viteKey) return viteKey;

  // 兼容逻辑：处理非标准注入或 Node 环境
  const nodeKey = typeof process !== "undefined" 
    ? (process.env.VITE_DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY)
    : undefined;
    
  return nodeKey;
}

function getDeepSeekBaseUrl(): string {
  const viteBase = (import.meta as any)?.env?.VITE_DEEPSEEK_BASE_URL as string | undefined;
  const nodeBase =
    typeof process !== "undefined"
      ? ((process as any)?.env?.VITE_DEEPSEEK_BASE_URL as string | undefined) ||
        ((process as any)?.env?.DEEPSEEK_BASE_URL as string | undefined)
      : undefined;

  const base = (viteBase || nodeBase || DEFAULT_BASE_URL).trim();
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

async function deepSeekChat(messages: DeepSeekMessage[], options?: { temperature?: number; responseFormatJson?: boolean }) {
  const apiKey = getDeepSeekApiKey();
  if (!apiKey) {
    const errorMsg = "缺少 DeepSeek API Key：\n" +
      "1. 请确认根目录存在 .env 文件\n" +
      "2. 确认已设置 VITE_DEEPSEEK_API_KEY\n" +
      "3. 如果刚修改了 .env，请重启开发服务器 (npm run dev)";
    throw new Error(errorMsg);
  }

  const baseUrl = getDeepSeekBaseUrl();
  // 文档示例：`${base_url}/chat/completions`（base_url 可为 https://api.deepseek.com 或 https://api.deepseek.com/v1）
  const endpoint = baseUrl.endsWith("/v1") ? `${baseUrl}/chat/completions` : `${baseUrl}/chat/completions`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      messages,
      temperature: options?.temperature ?? 0.8,
      ...(options?.responseFormatJson ? { response_format: { type: "json_object" } } : {}),
    }),
  });

  const data = (await res.json().catch(() => ({}))) as DeepSeekChatCompletionResponse;
  if (!res.ok) {
    const msg = data?.error?.message || `DeepSeek 请求失败（HTTP ${res.status}）`;
    throw new Error(msg);
  }

  return data;
}

function extractAssistantText(data: DeepSeekChatCompletionResponse): string {
  return data?.choices?.[0]?.message?.content?.trim() || "";
}

export async function generateFortune(type: string) {
  const prompt = `你是一位幽默风趣的卡通算命大师。
运势类型：${type}

请为今天生成一段有趣、鼓舞人心且带有卡通色彩的运势。
包含：
1. 一段风趣的运势文案（最多100字）。
2. 一个幸运分数（0-100）。
3. 一个幸运颜色。
4. 一个幸运数字。
5. 一条搞笑的建议。

请只返回 JSON（不要包含任何额外文本），格式：
{
  "fortune": "...",
  "score": 85,
  "luckyColor": "...",
  "luckyNumber": 7,
  "advice": "..."
}`;

  try {
    const data = await deepSeekChat(
      [
        { role: "system", content: "你是一个严格输出 JSON 的助手。" },
        { role: "user", content: prompt },
      ],
      { temperature: 0.9, responseFormatJson: true },
    );

    const text = extractAssistantText(data);
    return JSON.parse(text || "{}");
  } catch (error) {
    console.error("生成运势出错:", error);
    return {
      fortune: "哎呀！水晶球有点模糊，要不待会儿再试试？",
      score: 50,
      luckyColor: "透明色",
      luckyNumber: 0,
      advice: "今天走路别被自己的脚绊倒哦！",
    };
  }
}

export async function chatWithAI(message: string, history: { role: string; text: string }[]) {
  const systemInstruction =
    "你是一个友好、乐于助人且有点古怪的卡通机器人助手，名叫“小图”。你住在卡通 AI 工具站。你的目标是帮助用户使用工具并进行有趣的对话。保持语气轻松、热情，并多用表情符号！请始终使用中文回答。";

  const messages: DeepSeekMessage[] = [
    { role: "system", content: systemInstruction },
    ...history.map(
      (m): DeepSeekMessage => ({
        role: m.role === "model" || m.role === "assistant" ? "assistant" : "user",
        content: m.text,
      }),
    ),
    { role: "user", content: message },
  ];

  try {
    const data = await deepSeekChat(messages, { temperature: 0.8 });
    const text = extractAssistantText(data);
    return text || "哔哔啵啵！我不知道该说什么。";
  } catch (error) {
    console.error("聊天出错:", error);
    return "滋滋滋！我的电路有点短路了，你能再说一遍吗？";
  }
}
