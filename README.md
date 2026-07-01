# Donough Blog

> 基于 Next.js 16 构建的现代化个人博客系统，支持可视化拖拽布局配置，可部署至 Cloudflare Workers或Vercel平台。

## 📋 项目概述

### 项目名称

**Donough Blog** - 一个功能丰富的个人技术博客平台

### 简介

Donough Blog 是一个使用 Next.js 16 和 React 19 构建的现代化个人博客系统。项目采用卡片式首页设计，支持可视化拖拽布局编辑、Markdown 博客撰写、代码高亮、数学公式渲染等功能。博客支持部署到 Cloudflare Workers，实现全球边缘网络加速。让你不写代码就开始写 blog，管理 blog 内容。无需服务器，无需费用。

### 主要功能和用途

- 📝 **博客文章管理** - 支持 Markdown 编写，代码高亮，数学公式（KaTeX）
- 🎨 **可视化布局编辑** - 首页卡片支持拖拽排序和偏移调整
- 🎯 **可配置主题** - 支持自定义卡片色、背景色等主题配置
- 🎵 **首页背景播放器** - 首页背景音乐播放功能
- 🖼️ **图片工具箱** - 图片处理工具
- 💼 **项目展示** - 个人项目展示页面
- 🎭 **Live2D 模型** - 支持 Live2D 看板娘
- 📱 **响应式设计** - 完美适配移动端和桌面端
- ❄️ **节日特效** - 支持圣诞节下雪等节日效果
- 🌐 **RSS 订阅** - 自动生成 RSS Feed
- 🌍 **Cloudflare 部署** - 支持边缘网络部署，全球加速

---

## 🛠️ 技术栈说明

### 前端框架和库

| 技术         | 版本     | 用途                         |
| ------------ | -------- | ---------------------------- |
| Next.js      | 16.0.10  | React 应用框架，支持 SSR/SSG |
| React        | 19.2.1   | UI 组件库                    |
| React DOM    | 19.2.0   | DOM 渲染                     |
| motion       | 12.23.24 | 动画库（原 framer-motion）   |
| lucide-react | 0.553.0  | 图标库                       |

### 样式和 UI

| 技术                | 版本  | 用途                |
| ------------------- | ----- | ------------------- |
| Tailwind CSS        | 4     | 实用优先的 CSS 框架 |
| tailwind-merge      | 3.3.1 | Tailwind 类名合并   |
| tailwindcss-animate | 1.0.7 | Tailwind 动画插件   |
| clsx                | 2.1.1 | 类名条件拼接        |

### 状态管理

| 技术    | 版本  | 用途             |
| ------- | ----- | ---------------- |
| zustand | 5.0.8 | 轻量级状态管理库 |

### 数据请求

| 技术 | 版本  | 用途                   |
| ---- | ----- | ---------------------- |
| SWR  | 2.3.6 | React Hooks 数据请求库 |

### Markdown 和代码处理

| 技术              | 版本    | 用途               |
| ----------------- | ------- | ------------------ |
| marked            | 17.0.0  | Markdown 解析器    |
| shiki             | 3.15.0  | 代码高亮引擎       |
| katex             | 0.16.27 | 数学公式渲染       |
| html-react-parser | 5.2.8   | HTML 转 React 组件 |

### 部署和构建

| 技术                   | 版本    | 用途                          |
| ---------------------- | ------- | ----------------------------- |
| @opennextjs/cloudflare | 1.19.11 | Cloudflare Workers 部署适配器 |
| wrangler               | 4.53.0  | Cloudflare CLI 工具           |
| next-sitemap           | 4.2.3   | 自动生成 sitemap              |

### 其他工具

| 技术        | 版本    | 用途                           |
| ----------- | ------- | ------------------------------ |
| sonner      | 2.0.7   | Toast 通知组件                 |
| dayjs       | 1.11.18 | 日期处理库                     |
| ts-debounce | 4.0.0   | TypeScript 防抖函数            |
| jsrsasign   | 11.1.0  | RSA 加密库（用于 GitHub Auth） |

### 开发环境

| 技术                        | 版本   | 用途              |
| --------------------------- | ------ | ----------------- |
| TypeScript                  | 5+     | 类型检查          |
| Prettier                    | 3.6.2  | 代码格式化        |
| prettier-plugin-tailwindcss | 0.7.1  | Tailwind 类名排序 |
| code-inspector-plugin       | 1.2.10 | 点击源码定位插件  |
| @svgr/webpack               | 8.1.0  | SVG 转 React 组件 |

---

## 📁 项目结构

```
donough-blog/
├── src/                          # 源代码目录
│   ├── app/                      # Next.js App Router 目录
│   │   ├── (home)/              # 首页路由组
│   │   │   ├── config-dialog/   # 配置对话框组件
│   │   │   ├── stores/          # Zustand 状态管理
│   │   │   ├── services/        # 服务层
│   │   │   ├── page.tsx         # 首页主组件
│   │   │   ├── hi-card.tsx      # 中心卡片组件
│   │   │   ├── art-card.tsx     # 首图卡片组件
│   │   │   ├── clock-card.tsx   # 时钟卡片组件
│   │   │   ├── calendar-card.tsx# 日历卡片组件
│   │   │   ├── social-buttons.tsx # 社交按钮组件
│   │   │   ├── share-card.tsx   # 分享卡片组件
│   │   │   ├── aritcle-card.tsx # 文章卡片组件
│   │   │   ├── write-buttons.tsx# 写作按钮组件
│   │   │   ├── like-position.tsx# 点赞位置组件
│   │   │   ├── hat-card.tsx     # 帽子卡片组件
│   │   │   └── beian-card.tsx   # 备案卡片组件
│   │   ├── about/               # 关于页面
│   │   ├── blog/                # 博客文章页面
│   │   ├── bloggers/            # 博主页面
│   │   ├── clock/               # 时钟页面
│   │   ├── image-toolbox/       # 图片工具箱页面
│   │   ├── live2d/              # Live2D 页面
│   │   ├── music/               # 音乐播放器页面
│   │   ├── pictures/            # 图片展示页面
│   │   ├── projects/            # 项目展示页面
│   │   ├── rss.xml/             # RSS Feed 路由
│   │   ├── share/               # 分享页面
│   │   ├── snippets/            # 代码片段页面
│   │   ├── svgs/                # SVG 展示页面
│   │   ├── write/               # 写作页面
│   │   ├── wuthering-waves/     # 鸣潮相关页面
│   │   ├── layout.tsx           # 根布局组件
│   │   └── sitemap.ts           # Sitemap 生成
│   ├── components/               # 可复用组件
│   │   ├── liquid-grass/        # 液体草地效果组件
│   │   ├── blog-preview.tsx     # 博客预览组件
│   │   ├── blog-sidebar.tsx     # 博客侧边栏组件
│   │   ├── blog-toc.tsx         # 博客目录组件
│   │   ├── card.tsx             # 通用卡片组件
│   │   ├── code-block.tsx       # 代码块组件
│   │   ├── color-picker.tsx     # 颜色选择器组件
│   │   ├── color-picker-panel.tsx # 颜色选择面板
│   │   ├── dialog-modal.tsx     # 对话框模态框
│   │   ├── editable-star-rating.tsx # 可编辑星级评分
│   │   ├── like-button.tsx      # 点赞按钮组件
│   │   ├── markdown-image.tsx   # Markdown 图片组件
│   │   ├── music-card.tsx       # 音乐卡片组件
│   │   ├── nav-card.tsx         # 导航卡片组件
│   │   ├── scroll-top-button.tsx # 回到顶部按钮
│   │   ├── select.tsx           # 选择器组件
│   │   ├── star-rating.tsx      # 星级评分组件
│   │   └── wip.tsx              # 施工中提示组件
│   ├── config/                   # 配置文件
│   │   ├── card-styles-default.json # 卡片样式默认配置
│   │   ├── card-styles.json     # 卡片样式配置
│   │   └── site-content.json    # 网站内容配置
│   ├── hooks/                    # 自定义 React Hooks
│   │   ├── use-auth.ts          # 认证 Hook
│   │   ├── use-blog-index.ts    # 博客索引 Hook
│   │   ├── use-categories.ts    # 分类 Hook
│   │   ├── use-center.ts        # 居中布局 Hook
│   │   ├── use-markdown-render.tsx # Markdown 渲染 Hook
│   │   ├── use-read-articles.ts # 已读文章 Hook
│   │   └── use-size.ts          # 屏幕尺寸 Hook
│   ├── layout/                   # 布局组件
│   │   ├── backgrounds/         # 背景效果组件
│   │   ├── footer.tsx           # 页脚组件
│   │   ├── head.tsx             # Head 组件
│   │   ├── header.tsx           # 页头组件
│   │   └── index.tsx            # 布局主组件
│   ├── lib/                      # 工具库
│   │   ├── aes256-util.ts       # AES256 加密工具
│   │   ├── auth.ts              # 认证工具
│   │   ├── blog-index.ts        # 博客索引工具
│   │   ├── color.ts             # 颜色工具
│   │   ├── file-utils.ts        # 文件工具
│   │   ├── github-client.ts     # GitHub API 客户端
│   │   ├── load-blog.ts         # 博客加载工具
│   │   ├── log.ts               # 日志工具
│   │   ├── markdown-renderer.ts # Markdown 渲染器
│   │   └── utils.ts             # 通用工具函数
│   ├── styles/                   # 样式文件
│   │   ├── article.css          # 文章样式
│   │   ├── globals.css          # 全局样式
│   │   └── theme.css            # 主题样式
│   ├── svgs/                    # SVG 图标
│   └── consts.ts                # 常量定义
├── public/                       # 静态资源目录
│   ├── blogs/                    # 博客 Markdown 文件
│   ├── images/                   # 图片资源
│   ├── live2d/                   # Live2D 模型文件
│   ├── music/                    # 音乐文件
│   ├── favicon.png               # 网站图标
│   └── manifest.json             # PWA 配置
├── scripts/                      # 脚本目录
│   └── gen-svgs-index.js         # 生成 SVG 索引脚本
├── .next/                        # Next.js 构建输出
├── node_modules/                 # 依赖包
├── .npmrc                        # npm 配置
├── .prettierrc                   # Prettier 配置
├── .prettierignore               # Prettier 忽略配置
├── next.config.ts                 # Next.js 配置
├── open-next.config.ts            # OpenNext Cloudflare 配置
├── postcss.config.mjs             # PostCSS 配置
├── tsconfig.json                  # TypeScript 配置
├── wrangler.toml                 # Cloudflare Wrangler 配置
├── package.json                   # 项目配置
└── README.md                      # 项目说明文档
```

---

## 🔧 功能模块介绍

### 1. 首页模块 (`src/app/(home)/`)

首页采用卡片式布局设计，用户可以通过配置对话框进行可视化编辑。

**核心组件：**

- `page.tsx` - 首页主组件，负责卡片布局和编辑模式管理
- `hi-card.tsx` - 中心卡片，显示博主信息和头像
- `art-card.tsx` - 首图卡片，展示艺术图片
- `clock-card.tsx` - 时钟卡片，显示实时时钟
- `calendar-card.tsx` - 日历卡片，显示日历
- `social-buttons.tsx` - 社交按钮，链接到社交媒体
- `share-card.tsx` - 分享卡片，提供分享功能
- `aritcle-card.tsx` - 文章卡片，展示最新文章
- `write-buttons.tsx` - 写作按钮，快速访问写作页面
- `like-position.tsx` - 点赞位置组件
- `hat-card.tsx` - 帽子卡片，装饰性组件
- `beian-card.tsx` - 备案信息卡片

**配置功能：**

- `config-dialog/` - 配置对话框，包含多个配置面板
  - `home-layout.tsx` - 首页布局配置（卡片大小、顺序、偏移、启用状态）
  - `color-config.tsx` - 颜色主题配置
  - `site-settings/` - 网站设置（社交按钮、头像、背景等）

**状态管理：**

- `stores/config-store.ts` - 配置状态管理（Zustand）
- `stores/layout-edit-store.ts` - 布局编辑状态管理

### 2. 博客模块 (`src/app/blog/`)

博客文章展示和阅读模块。

**功能：**

- Markdown 文章渲染
- 代码高亮（Shiki）
- 数学公式渲染（KaTeX）
- 文章目录（TOC）
- 文章侧边栏
- 点赞功能
- 阅读进度跟踪

**相关组件：**

- `src/components/blog-preview.tsx` - 博客预览
- `src/components/blog-sidebar.tsx` - 博客侧边栏
- `src/components/blog-toc.tsx` - 博客目录
- `src/components/like-button.tsx` - 点赞按钮
- `src/components/code-block.tsx` - 代码块组件
- `src/components/markdown-image.tsx` - Markdown 图片

### 3. 写作模块 (`src/app/write/`)

博客文章写作和管理模块。

**功能：**

- Markdown 编辑器
- 文章保存
- 文章分类管理

### 4. 音乐模块 (`src/app/music/`)

音乐播放器模块。

**相关组件：**

- `src/components/music-card.tsx` - 音乐卡片组件

### 5. Live2D 模块 (`src/app/live2d/`)

Live2D 看板娘模块。

### 6. 项目展示模块 (`src/app/projects/`)

个人项目展示页面。

### 7. 图片工具箱模块 (`src/app/image-toolbox/`)

图片处理工具。

### 8. 布局模块 (`src/layout/`)

全局布局组件。

**组件：**

- `index.tsx` - 布局主组件，包含头部、内容和页脚
- `header.tsx` - 页头组件，包含导航菜单
- `footer.tsx` - 页脚组件
- `head.tsx` - HTML Head 组件，设置 Meta 标签

**背景效果：**

- `backgrounds/snowfall` - 下雪效果（圣诞节特效）

### 9. 工具库模块 (`src/lib/`)

通用工具函数库。

**核心工具：**

- `markdown-renderer.ts` - Markdown 渲染器，支持代码高亮和数学公式
- `load-blog.ts` - 博客加载工具，从文件系统或 GitHub 加载博客
- `blog-index.ts` - 博客索引工具，生成博客列表
- `auth.ts` - 认证工具，支持 GitHub OAuth
- `github-client.ts` - GitHub API 客户端
- `color.ts` - 颜色工具函数
- `aes256-util.ts` - AES256 加密工具
- `file-utils.ts` - 文件工具函数
- `utils.ts` - 通用工具函数

### 10. 自定义 Hooks (`src/hooks/`)

可复用的 React Hooks。

**Hooks：**

- `use-auth.ts` - 认证 Hook
- `use-blog-index.ts` - 博客索引 Hook
- `use-categories.ts` - 分类 Hook
- `use-center.ts` - 居中布局 Hook
- `use-markdown-render.tsx` - Markdown 渲染 Hook
- `use-read-articles.ts` - 已读文章 Hook
- `use-size.ts` - 屏幕尺寸 Hook

---

## 🚀 关键命令说明

### 安装依赖

```bash
# 使用 pnpm 安装依赖（推荐）
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 开发环境启动

```bash
# 启动开发服务器（使用 Turbopack，端口 8080）
pnpm dev

# 或使用 npm
npm run dev

# 或使用 yarn
yarn run dev
```

开发服务器启动后，访问 `http://localhost:8080` 查看项目。

### 构建项目

```bash
# 构建生产版本（标准 Next.js 构建）
pnpm build

# 构建 Cloudflare 版本
pnpm build:cf

# CI 环境构建 Cloudflare 版本（使用 hoisted node linker）
pnpm build:cf:ci
```

### 启动生产服务器

```bash
# 启动 Next.js 生产服务器
pnpm start
```

### Cloudflare 部署

```bash
# 预览 Cloudflare 版本（本地）
pnpm preview

# 部署到 Cloudflare Workers
pnpm deploy
```

### 类型生成

```bash
# 生成 Cloudflare 环境类型定义
pnpm cf-typegen
```

### SVG 索引生成

```bash
# 生成 SVG 组件索引
pnpm svg
```

### 代码格式化

```bash
# 使用 Prettier 格式化代码
npx prettier --write .
```

---

## 📖 使用指南

### 快速开始

1. **克隆项目**

   ```bash
   git clone <repository-url>
   cd donough-blog
   ```

2. **安装依赖**

   ```bash
   pnpm install
   ```

3. **启动开发服务器**

   ```bash
   pnpm dev
   ```

4. **访问项目**
   打开浏览器访问 `http://localhost:8080`

### 配置说明

#### 网站内容配置 (`src/config/site-content.json`)

该文件包含网站的主要配置：

```json
{
  "meta": {
    "title": "网站标题",
    "description": "网站描述",
    "username": "用户名",
    "nickName": "昵称"
  },
  "theme": {
    "colorBrand": "#b9caf4",      // 品牌色
    "colorPrimary": "#161617",     // 主色
    "colorSecondary": "#32505e",   // 副色
    "colorBrandSecondary": "#1fd5e7bd", // 副品牌色
    "colorBg": "#eeeeee",          // 背景色
    "colorBorder": "#ffffff",      // 边框色
    "colorCard": "#e8ebf297",      // 卡片背景色
    "colorArticle": "#ffffffcc"    // 文章背景色
  },
  "backgroundColors": ["#138AFE", "#B83E71", ...], // 背景颜色列表
  "artImages": [...],              // 首图图片列表
  "currentArtImageId": "...",      // 当前首图 ID
  "backgroundImages": [...],       // 背景图片列表
  "currentBackgroundImageId": "...", // 当前背景图片 ID
  "socialButtons": [...],          // 社交按钮配置
  "clockShowSeconds": true,        // 时钟显示秒
  "summaryInContent": true,        // 内容中显示摘要
  "isCachePem": false,             // 是否缓存 PEM
  "hideEditButton": true,          // 隐藏编辑按钮
  "enableCategories": true,        // 启用分类
  "currentHatIndex": 3,            // 当前帽子索引
  "hatFlipped": true,              // 帽子翻转
  "enableChristmas": false,        // 启用圣诞节特效
  "beian": {                       // 备案信息
    "text": "",
    "link": ""
  }
}
```

#### 卡片样式配置 (`src/config/card-styles.json`)

该文件配置首页各卡片的样式和布局：

```json
{
	"artCard": {
		"width": 500, // 宽度
		"height": 300, // 高度
		"order": 1, // 显示顺序
		"offsetX": null, // 横向偏移（null 表示无偏移）
		"offsetY": null, // 纵向偏移
		"enabled": true // 是否启用
	}
	// ... 其他卡片配置
}
```

### 首页布局编辑

1. **打开配置对话框**
   - 快捷键：`Ctrl + L` 或 `Cmd + ,`
   - 或点击页面上的设置按钮

2. **进入布局编辑模式**
   - 在配置对话框中切换到"首页布局"标签
   - 点击"进入主页拖拽布局"按钮

3. **拖拽调整布局**
   - 拖拽卡片调整位置
   - 点击"保存偏移"保存布局
   - 点击"取消"放弃修改

4. **手动调整卡片属性**
   - 在"首页布局"标签中，可以手动调整：
     - 卡片宽度和高度
     - 显示顺序
     - 横向和纵向偏移
     - 是否启用该卡片

### 博客撰写

1. **创建博客文件**
   - 在 `public/blogs/` 目录下创建 Markdown 文件
   - 文件命名格式：`[id].md` 或 `[category]/[id].md`

2. **Markdown 前置元数据**

   ```markdown
   ---
   title: 文章标题
   date: 2024-01-01
   tags: [标签1, 标签2]
   categories: [分类1, 分类2]
   summary: 文章摘要
   ---

   文章内容...
   ```

3. **Markdown 扩展**
   - 代码高亮：使用标准的 Markdown 代码块语法
   - 数学公式：使用 `$行内公式$` 或 `$$块级公式$$`
   - 图片：支持本地图片和远程图片

### 开发注意事项

1. **Node.js 版本**
   - 建议使用 Node.js 18+ 或 20+

2. **pnpm 使用**
   - 项目推荐使用 pnpm 作为包管理器
   - 如使用 Cloudflare 部署，需要使用 `pnpm install --node-linker=hoisted`

3. **Turbopack**
   - 开发环境使用 Turbopack 加速构建
   - 某些 webpack 插件可能不兼容，需注意

4. **Cloudflare 部署限制**
   - Cloudflare Workers 不支持 `next/image` 的默认 loader
   - 已在 `next.config.ts` 中配置 `images.unoptimized: true`

5. **SVG 处理**
   - SVG 文件通过 `@svgr/webpack` 转为 React 组件
   - 运行 `pnpm svg` 生成 SVG 索引文件

6. **代码格式化**
   - 项目使用 Prettier 进行代码格式化
   - 配置了 `prettier-plugin-tailwindcss` 自动排序 Tailwind 类名

---

## 🌐 部署说明

### 生产环境部署（Cloudflare Workers）

#### 环境要求

- Cloudflare 账号
- Node.js 18+
- pnpm
- Wrangler CLI（已包含在 devDependencies）

#### 部署流程

1. **安装 Wrangler CLI（如未安装）**

   ```bash
   pnpm add -D wrangler
   ```

2. **登录 Cloudflare**

   ```bash
   npx wrangler login
   ```

3. **本地构建测试**

   ```bash
   # 构建 Cloudflare 版本
   pnpm build:cf

   # 本地预览
   pnpm preview
   ```

4. **部署到生产环境**

   ```bash
   pnpm deploy
   ```

5. **CI/CD 部署**

   在 CI 环境中使用以下命令：

   ```bash
   pnpm run build:cf:ci
   npx wrangler deploy
   ```

#### Cloudflare 配置 (`wrangler.toml`)

```toml
main = ".open-next/worker.js"
name = "donough-blog"
compatibility_date = "2026-06-09"
compatibility_flags = ["nodejs_compat"]

[assets]
directory = ".open-next/assets"
binding = "ASSETS"

[build]
command = "pnpm run build:cf"

[observability]
[observability.logs]
enabled = true
head_sampling_rate = 1
invocation_logs = true
persist = true
```

#### 环境变量配置

如需配置环境变量，可在 Cloudflare Dashboard 中设置，或在 `wrangler.toml` 中添加：

```toml
[vars]
VARIABLE_NAME = "value"

[secrets]
SECRET_NAME = "secret-value"  # 使用 wrangler secret put 命令设置
```

### 传统部署（VPS/云服务器）

#### 环境要求

- Node.js 18+
- pnpm
- PM2（可选，用于进程管理）

#### 部署流程

1. **构建项目**

   ```bash
   pnpm build
   ```

2. **启动生产服务器**

   ```bash
   pnpm start
   ```

3. **使用 PM2 管理进程（可选）**

   ```bash
   # 安装 PM2
   npm install -g pm2

   # 启动应用
   pm2 start pnpm --name "donough-blog" -- start

   # 保存进程列表
   pm2 save

   # 设置开机自启
   pm2 startup
   ```

4. **配置反向代理（Nginx 示例）**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Docker 部署（可选）

创建 `Dockerfile`：

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
```

构建和运行：

```bash
# 构建镜像
docker build -t donough-blog .

# 运行容器
docker run -p 3000:3000 donough-blog
```

---

## 📝 其他说明

### PWA 支持

项目已配置 PWA 支持，`public/manifest.json` 包含 PWA 配置。

### SEO 优化

- 自动生成 sitemap（`src/app/sitemap.ts`）
- 支持 Open Graph 和 Twitter Card
- 可自定义 Meta 标签（`src/layout/head.tsx`）

### 性能优化

- 使用 Turbopack 加速开发构建
- 启用 React Compiler（实验性）
- 静态页面预渲染
- 代码分割和懒加载

### 浏览器兼容性

- 现代浏览器（Chrome, Firefox, Safari, Edge）
- 移动端浏览器
- IE 不支持（使用了现代 JavaScript 特性）

---

## 📄 许可证

MIT License

---

## 🙏 致谢

感谢所有开源项目的贡献，包括但不限于：

- Next.js
- React
- Tailwind CSS
- Zustand
- Shiki
- KaTeX

---

## 📧 联系方式

- GitHub: [donough-chen](https://github.com/donough-chen)
- 稀土掘金: [donough-chen](https://juejin.cn/user/1574156383564551)
- Email: donough_chen@163.com

---

**最后更新时间：** 2026-07-01
