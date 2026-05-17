# 部署到 GitHub Pages 步骤

## 第一步：在 GitHub 上创建仓库

1. 打开 https://github.com/new
2. 仓库名：`ink-studio`
3. 描述：`墨韵 · 数字水墨诗画实验室`
4. 公开（Public）
5. **不要勾选** "Initialize this repository with a README"（因为本地已经有）
6. 点击 "Create repository"

## 第二步：推送代码

在电脑上打开终端（CMD 或 PowerShell），执行：

```bash
cd D:\桌面\nebula-website
git remote add origin https://github.com/oldking-yes/ink-studio.git
git push -u origin main
```

## 第三步：开启 GitHub Pages

1. 打开 https://github.com/oldking-yes/ink-studio/settings/pages
2. Source 选 **Deploy from a branch**
3. Branch 选 `main`，文件夹选 `/ (root)`
4. 点 Save
5. 等 1-2 分钟，你的页面就会出现在：
   **https://oldking-yes.github.io/ink-studio/**

**提示**：如果 git push 报 SSL 错误，先试试：
```bash
git config --global http.sslVerify false
git push -u origin main
```
