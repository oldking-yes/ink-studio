/**
 * ink-studio AI 题诗 API — Vercel Serverless 版
 *
 * 部署到 Vercel 后，前端调这个地址：
 *   POST https://你的项目名.vercel.app/api/generate-poem
 *
 * 环境变量（在 Vercel Dashboard 设置）：
 *   DEEPSEEK_API_KEY = sk-你的key
 */

export default async function handler(req, res) {
  // CORS —— 只允许你的 GitHub Pages
  res.setHeader('Access-Control-Allow-Origin', 'https://oldking-yes.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { keyword } = req.body || {};
    if (!keyword || !keyword.trim()) {
      return res.status(400).json({ error: '请输入关键词' });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: '服务端配置错误' });
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一位擅长中国古典诗词的诗人。根据用户输入的关键词或情绪描述，创作一首符合意境的古典诗词。格式：五言或七言绝句（4句）。输出JSON：{"title":"诗题","poem":"句1，句2，句3，句4","author":"AI 墨客"}',
          },
          { role: 'user', content: `关键词：${keyword.trim().slice(0, 30)}` },
        ],
        temperature: 0.8,
        max_tokens: 256,
      }),
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'AI 生成失败' });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    // 解析 JSON
    let poem;
    try {
      poem = JSON.parse(content);
    } catch {
      const m = content.match(/\{[\s\S]*"poem"[\s\S]*\}/);
      if (m) poem = JSON.parse(m[0]);
      else throw new Error('parse failed');
    }

    return res.status(200).json(poem);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: '服务异常' });
  }
}
