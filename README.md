# EmpathAI

<div align="center">
  <h3>🧠 Add Emotional Intelligence to Your App with 3 Lines of Code</h3>
  <p>Non-intrusive, privacy-first emotion detection SDK using behavioral patterns.</p>

  [![NPM Version](https://img.shields.io/npm/v/empathai-core?style=flat-square&color=blue)](https://www.npmjs.com/package/empathai-core)
  [![Build Status](https://img.shields.io/github/actions/workflow/status/Pikxul/empathai/ci.yml?style=flat-square)](https://github.com/Pikxul/empathai/actions)
  [![License](https://img.shields.io/npm/l/empathai-core?style=flat-square)](LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

  [Live Demo](https://empathai.demo.vercel.app) • [Documentation](packages/core/docs/API.md) • [Contributing](CONTRIBUTING.md)
</div>

---

## 🚀 Why EmpathAI?

EmpathAI detects user emotions (Frustrated, Focused, Bored, Happy, etc.) by analyzing behavioral signals like mouse movements, typing speed, and error rates. **No cameras. No microphones. 100% Privacy-First.**

- **Privacy-First**: No video/audio recording. Uses only behavioral metadata.
- **Framework Agnostic**: Works with React, Vue, Angular, Svelte, or Vanilla JS.
- **Lightweight**: ~5KB minified + gzipped.
- **Real-time**: sub-second emotion inference.

## 📦 Installation

```bash
npm install empathai-core
# or
yarn add empathai-core
# or
pnpm add empathai-core
```

## ⚡ Quick Start

```javascript
import { createEmpathAI } from 'empathai-core';

const empathAI = createEmpathAI({
  onEmotionDetected: (emotion) => {
    console.log(`Current user emotion: ${emotion.type} (${emotion.confidence * 100}%)`);
  }
});

// Start listening to signals
empathAI.init();

// Stop listening when done
// empathai.destroy();
```

## 🧩 Supported Emotions

| Emotion | Detected By... |
|---------|----------------|
| **Focused** | steady typing, smooth mouse movements, low error rate |
| **Frustrated** | erratic mouse movements, high backspace/delete usage |
| **Bored** | low activity, random meandering mouse movements |
| **Happy** | smooth interactions, moderate activity |
| **Confused** | (Coming soon) erratic pauses |
| **Stressed** | (Coming soon) rapid, high-pressure typing |

## 🤝 Contributing

We welcome contributions! Please check out our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

## 📄 License

MIT © [Mrityunjoy (Piklu)](https://github.com/Pikxul)

