# 📦 ISTA Pro — 包装测试数字化管理平台

> 基于 ISTA（国际安全运输协会）全系列标准的交互式包装测试规划工具

[![ISTA Standards](https://img.shields.io/badge/ISTA-Standards-blue)](https://ista.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## ✨ 功能特性

| 模块 | 功能 |
|------|------|
| 🔍 **标准速查面板** | 13+ ISTA 标准（1A/2A/3A/6-Series）实时搜索与筛选 |
| 📐 **跌落测试计算器** | 按重量/标准自动计算跌落高度，Canvas 3D 可视化 10 步序列 |
| 🌀 **振动/压力计算器** | 堆码静载荷公式 `F = W × (n-1) × SF`，振动 PSD 参数查询 |
| 📊 **对比矩阵速查表** | 全标准横向对比，色码标注必选/可选项目 |
| 📄 **测试规划报告** | 一键生成 PDF 格式测试规划报告（含完整 10 步落摔序列）|
| 🔗 **n8n JSON Schema** | 结构化测试数据导出，支持自动化工作流集成 |

## 🚀 快速开始

```bash
# 克隆仓库
git clone https://github.com/xi2001118/ISTA-pro.git
cd ISTA-pro

# 本地预览（Python）
python -m http.server 5500
# 然后打开 http://localhost:5500

# 或使用 Node.js
npx serve .
```

## 📋 支持的 ISTA 标准

| 系列 | 标准 | 适用场景 |
|------|------|---------|
| Series 1 | 1A / 1B / 1C / 1G / 1H | 非模拟完整性测试 |
| Series 2 | 2A / 2B | 部分模拟运输测试 |
| Series 3 | 3A / 3B / 3E | 全模拟运输测试 |
| Series 6 | Amazon SIOC / Prep / Walmart / Sam's / Target | 零售商专项认证 |

## 🔧 技术栈

- **前端**：原生 HTML5 + Vanilla JavaScript（无框架依赖）
- **样式**：自定义 CSS 设计系统（暗色主题）
- **可视化**：HTML5 Canvas API（等距 2.5D 箱体渲染）
- **集成**：JSON Schema（n8n / Zapier 自动化工作流）

## 📐 ISTA 3A 跌落高度（最新标准）

| 重量范围 | 标准跌落高度 | Face 3 特殊高度 |
|---------|------------|---------------|
| < 32 kg | **46 cm** (18 in) | **91 cm** (36 in) |
| 32～70 kg | **30 cm** (12 in) | **60 cm** (24 in) |
| 小袋包装 ≤ 4.5 kg | **61 cm** (24 in) | — |

## 📐 ISTA 2A 跌落高度

| 重量范围 | 跌落高度 |
|---------|---------|
| < 10 kg (21 lb) | **97 cm** (38 in) |
| 10～19 kg (21～41 lb) | **81 cm** (32 in) |
| 19～28 kg (41～61 lb) | **66 cm** (26 in) |
| 28～45 kg (61～100 lb) | **51 cm** (20 in) |
| 45～68 kg (100～150 lb) | **31 cm** (12 in) |

## 📄 License

MIT © 2024 xi2001118

---
> ⚠️ 本工具仅供规划参考，正式 ISTA 认证测试须由 ISTA 授权实验室执行。
