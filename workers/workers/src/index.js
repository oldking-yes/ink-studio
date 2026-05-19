/**
 * ink-studio API — AI 题画诗生成器
 *
 * Cloudflare Workers 端点
 * 接收前端关键词 → 调用 DeepSeek API → 返回生成的古典诗词
 *
 * 环境变量：
 *   DEEPSEEK_API_KEY — DeepSeek API 密钥
 */

// CORS 头 —— 只允许你的 GitHub Pages 域名
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://oldking-yes.github.io',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

// DeepSeek API 配置
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';

// 系统提示词 —— 定义 AI 诗人的角色
const SYSTEM_PROMPT = `你是一位擅长中国古典诗词的诗人。根据用户输入的关键词或情绪描述，创作一首符合意境的中国古典诗词。

要求：
1. 采用五言绝句（每句5字×4句）或七言绝句（每句7字×4句）格式
2. 为诗作拟一个标题，2-5字
3. 落款使用"AI 墨客"
4. 风格要与关键词匹配（如"秋思"应清冷、"江南"应柔美、"豪放"应壮阔）
5. 只输出 JSON，不要多余文字

输出格式：
{"title":"诗题","poem":"诗句内容（用逗号分隔每句）","author":"AI 墨客"}`;

export default {
  async fetch(request, env) {
    // 处理 CORS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // 只接受 POST
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    try {
      // 解析请求体
      const { keyword } = await request.json();
      if (!keyword || typeof keyword !== 'string' || keyword.trim().length === 0) {
        return new Response(JSON.stringify({ error: '请输入关键词' }), {
          status: 400,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }

      // 截断过长输入
      const sanitized = keyword.trim().slice(0, 30);

      // 检查 API Key
      const apiKey = env.DEEPSEEK_API_KEY;
      if (!apiKey) {
        return new Response(JSON.stringify({ error: '服务端配置错误' }), {
          status: 500,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }

      // 调用 DeepSeek API
      const response = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: DEEPSEEK_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: `关键词：${sanitized}` },
          ],
          temperature: 0.8,
          max_tokens: 256,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('DeepSeek API error:', response.status, errText);
        return new Response(JSON.stringify({ error: 'AI 生成失败，请稍后重试' }), {
          status: 502,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';
      
      // 解析 JSON 响应
      let poem;
      try {
        // 尝试直接解析
        poem = JSON.parse(content);
      } catch {
        // 如果 AI 返回了带额外文字的内容，尝试提取 JSON 部分
        const jsonMatch = content.match(/\{[\s\S]*"poem"[\s\S]*\}/);
        if (jsonMatch) {
          poem = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('无法解析 AI 输出');
        }
      }

      // 校验字段
      if (!poem.title || !poem.poem) {
        throw new Error('AI 输出缺少必要字段');
      }

      return new Response(JSON.stringify(poem), {
        status: 200,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });

    } catch (err) {
      console.error('Worker error:', err);
      return new Response(JSON.stringify({ error: '服务异常，请稍后重试' }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }
  },
};
