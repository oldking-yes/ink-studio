# 墨韵 · Ink Studio

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Canvas-FF6B35?style=flat-square&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/SVG-FFB13B?style=flat-square&logo=svg&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/DeepSeek-4B9FEF?style=flat-square&logo=openai&logoColor=white" />
</p>

> 落笔生花，墨染乾坤。输入一个词，AI 为你即兴作诗。

数字水墨诗画实验室 — AI 驱动的创意水墨工具。输入关键词或情绪描述，DeepSeek 大模型即兴创作古典题画诗，Canvas 2D 渲染为水墨画，一键导出 PNG。

🔗 **Live**: [oldking-yes.github.io/ink-studio](https://oldking-yes.github.io/ink-studio)

---

## ✨ 核心特性

### 🤖 AI 题诗
输入「秋思」「江南烟雨」「大漠孤烟」，AI 自动生成五言/七言绝句。DeepSeek 大模型加持，中文古诗风格高度还原。

### 🖼 水墨渲染
4 种画心模板（山水 / 墨竹 / 荷韵 / 泼墨），竖排题诗 + 仿古印章，真实水墨肌理模拟。

### 🎨 五套主题色
墨韵 / 青花 / 金碧 / 朱砂 / 雪景，一键切换不同中式美学风格。

### 🎵 琴韵音景
Web Audio API 古琴泛音随滚动变奏，沉浸式五感体验。

### 💬 素笺留墨
毛笔风留言墙 — 访客可在水墨风格便签上留下评论。

### 🔄 秒级响应
Cloudflare Workers 边缘计算 + DeepSeek API，毫秒级生成。

---

## 🏗 架构

```
GitHub Pages (前端) ←→ Cloudflare Workers (API) ←→ DeepSeek API
```

- **前端**: 纯静态 HTML/CSS/JS → TypeScript 重构，部署在 GitHub Pages
- **API**: Cloudflare Workers serverless 函数，环境变量存 API Key
- **AI**: DeepSeek 大模型，生成五言/七言绝句

---

## 🛠 技术栈

| 层级 | 技术 |
|------|------|
| 场景动画 | SVG 水墨场景（群山·竹林·仙鹤·锦鲤·墨滴·飞花） |
| 画布引擎 | Canvas 2D 题诗作画 + 墨迹扩散模拟 |
| 音效系统 | Web Audio API 古琴泛音 |
| API 层 | Cloudflare Workers + DeepSeek API |
| 样式 | Tailwind CSS |
| 构建 | 零依赖 TypeScript |

---

## 🚀 部署

```bash
git clone https://github.com/oldking-yes/ink-studio.git
```

### 前端（GitHub Pages）
推送 main 分支，GitHub Pages 自动部署。

### API（Cloudflare Workers）
```bash
cd workers
npx wrangler deploy
npx wrangler secret put DEEPSEEK_API_KEY
```

详见 `workers/DEPLOY_WORKER.md`。

---

## 📂 项目结构

```
ink-studio/
├── index.html              # 主页面
├── src/
│   ├── main.ts             # 入口
│   ├── canvas/             # Canvas 水墨渲染引擎
│   ├── svg/                # SVG 场景动画
│   ├── audio/              # Web Audio 音效
│   └── styles/             # Tailwind 样式
├── workers/                # Cloudflare Workers API
│   ├── index.ts
│   └── DEPLOY_WORKER.md
└── public/                 # 静态资源
```

## 📄 License

MIT
