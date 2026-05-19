# ink-studio API 部署指南

## 方式一：一键部署（需要 API Token）

1. 在 https://dash.cloudflare.com/profile/api-tokens 创建 Token
   - 权限：Workers Scripts → Edit
   - 资源：All resources

2. 终端执行：
```bash
set CLOUDFLARE_API_TOKEN=你的token
cd D:\桌面\nebula-website\workers
npx wrangler deploy
```

3. 设置 DeepSeek Key：
```bash
npx wrangler secret put DEEPSEEK_API_KEY
# 粘贴你的 DeepSeek API Key
```

## 方式二：Dashboard 手动部署

1. 打开 https://dash.cloudflare.com → Workers & Pages
2. 创建 Worker → 取名 `ink-studio-api`
3. 把 `workers/src/index.js` 内容粘贴进去 → 部署
4. 设置 → 环境变量 → 添加 `DEEPSEEK_API_KEY`
5. 记下 Worker URL：`https://ink-studio-api.你的用户名.workers.dev`
