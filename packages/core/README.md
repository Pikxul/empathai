# @empathai/core

[![npm version](https://img.shields.io/npm/v/empathai-core.svg)](https://www.npmjs.com/package/empathai-core)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub](https://img.shields.io/github/last-commit/Pikxul/empathai?style=flat-square)](https://github.com/Pikxul/empathai)

**EmpathAI Core** — lightweight, non-intrusive emotion detection for web apps (keyboard + mouse).

---

## What it does

`empathai-core` analyzes user interaction signals (mouse movement, typing rhythm, clicks) and returns inferred emotional states (e.g. `focused`, `frustrated`, `bored`, `neutral`) together with a basic confidence score.  
It is intentionally **privacy-first** — no camera/mic required.

> **EmpathAI Core** is a privacy-first, non-intrusive **emotion signal engine** for web applications.  
It detects user emotional states in real time using **behavioral signals** such as mouse movement and typing patterns.

⚠️ This package is **NOT a recommendation engine** and **NOT an ML model**.  
It is a **foundational signal layer** designed to be consumed by higher-level systems (AI, analytics, UX, decision engines).

---

## ✨ What EmpathAI Core Does

- Captures **non-intrusive user behavior signals**
- Infers **basic emotional states** (deterministic v1)
- Emits **structured emotion data** with confidence & timestamp
- Works entirely **on the client**
- Stores **no personal data**
- Safe for **BFSI / SaaS / FinTech / enterprise / privacy-sensitive environments**

---

## 🚫 What EmpathAI Core Does NOT Do

- ❌ No camera access  
- ❌ No microphone access  
- ❌ No personal data collection  
- ❌ No emotion prediction via ML (yet)  
- ❌ No recommendations or decisions  

EmpathAI Core provides **signals**, not decisions.

---

## 📦 Installation

```bash
npm install empathai-core
# or
pnpm add empathai-core
